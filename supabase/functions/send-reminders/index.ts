// Каждые 5 минут (pg_cron) рассылает напоминания из settings/main на все устройства пользователя.
import { createClient } from "npm:@supabase/supabase-js@2.117.2";
import webpush from "npm:web-push@3.6.7";

const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
webpush.setVapidDetails(
  Deno.env.get("VAPID_SUBJECT") ?? "mailto:assistant@example.com",
  Deno.env.get("VAPID_PUBLIC_KEY")!,
  Deno.env.get("VAPID_PRIVATE_KEY")!,
);
const WINDOW_MIN = 6; // cron fires every 5 min; small overlap, duplicates blocked by push_log

function localNow(tz: string) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-CA", {
    timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(new Date()).map((p) => [p.type, p.value]));
  return { day: `${parts.year}-${parts.month}-${parts.day}`, min: Number(parts.hour) * 60 + Number(parts.minute) };
}
const toMin = (t: string) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };

Deno.serve(async (req) => {
  if (req.headers.get("x-cron-secret") !== Deno.env.get("CRON_SECRET")) return new Response("forbidden", { status: 403 });

  const { data: subs, error } = await supabase.from("push_subs").select("endpoint,user_id,sub,tz");
  if (error) return new Response(error.message, { status: 500 });
  const byUser = new Map<string, typeof subs>();
  for (const s of subs ?? []) byUser.set(s.user_id, [...(byUser.get(s.user_id) ?? []), s]);

  let sent = 0;
  for (const [userId, devices] of byUser) {
    const tz = devices[0].tz || "Asia/Almaty";
    const now = localNow(tz);
    const { data: docs } = await supabase.from("docs").select("path,data").eq("user_id", userId)
      .in("path", ["settings/main", `days/${now.day}`]);
    const settings = docs?.find((d) => d.path === "settings/main")?.data ?? {};
    const today = docs?.find((d) => d.path === `days/${now.day}`)?.data ?? {};
    const reminders: { id: string; time: string; text: string; date?: string | null }[] = settings.reminders ?? [];
    // No date = daily; a date = one-time on that local day.
    const due = reminders.filter((r) => { const t = toMin(r.time); return (!r.date || r.date === now.day) && t <= now.min && t > now.min - WINDOW_MIN; });

    for (const r of due) {
      const { error: dup } = await supabase.from("push_log").insert({ user_id: userId, reminder_id: r.id, day: now.day });
      if (dup) continue; // already sent today
      let body = r.text;
      const tasks: { done: boolean }[] = today.tasks ?? [];
      const open = tasks.filter((t) => !t.done).length;
      if (toMin(r.time) >= 20 * 60 && open) body += ` · Не выполнено задач: ${open}`;
      const payload = JSON.stringify({ title: `Напоминание · ${r.time}`, body, tag: r.id, url: "./#today" });
      for (const d of devices) {
        try { await webpush.sendNotification(d.sub, payload, { TTL: 3600 }); sent++; }
        catch (e) {
          const code = (e as { statusCode?: number }).statusCode;
          if (code === 404 || code === 410) await supabase.from("push_subs").delete().eq("endpoint", d.endpoint);
        }
      }
    }
  }
  await supabase.from("push_log").delete().lt("day", new Date(Date.now() - 3 * 864e5).toISOString().slice(0, 10));
  return Response.json({ sent });
});
