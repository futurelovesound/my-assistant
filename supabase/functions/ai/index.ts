// ИИ-функции приложения: подсчёт КБЖУ по описанию/фото и разбор периода. Ключ Anthropic хранится в секретах Supabase.
import Anthropic from "npm:@anthropic-ai/sdk";
import { createClient } from "npm:@supabase/supabase-js@2.117.2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const json = (body: unknown, status = 200) => Response.json(body, { status, headers: cors });

const FOOD_PROMPT = `Ты нутрициолог. Определи блюда и продукты в приёме пищи и оцени вес порций и КБЖУ каждого. Учитывай кухню Казахстана и СНГ. Если вес не указан, бери типичную порцию.
Ответь только JSON-массивом без пояснений: [{"name": "Плов с говядиной", "grams": 250, "kcal": 450, "p": 18, "f": 20, "c": 50}]. name на русском, числа без единиц.`;

const reviewPrompt = (period: number, data: unknown) => `Ты личный коуч по здоровью, режиму и финансам. Цель человека: похудеть, наладить сон, не забывать задачи и копить деньги (валюта: тенге). Ниже данные за ${period} дней в JSON (null = не записано).
Сделай разбор на русском, коротко и конкретно, без вступлений и общих фраз:
1) Что идёт хорошо (1–2 пункта с цифрами).
2) Главные проблемы и связи между сферами (например, сон → калории → настроение → траты), 2–3 пункта с цифрами из данных.
3) План на следующую неделю: 3–5 конкретных действий с числами.
Если данных мало, скажи, что именно записывать. Обычный текст, без markdown-заголовков и звёздочек.

${JSON.stringify(data)}`;

// Claude Opus 5.5 with server-side refusal fallback ("default" routing).
type CreateParams = Parameters<Anthropic["beta"]["messages"]["create"]>[0];
function create(client: Anthropic, p: Pick<CreateParams, "messages" | "output_config">) {
  const params = {
    model: "claude-opus-5-5",
    max_tokens: 16000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    ...p,
  } as unknown as Anthropic.Beta.MessageCreateParamsNonStreaming;
  return client.beta.messages.create(params) as Promise<Anthropic.Beta.BetaMessage>;
}

function textOf(msg: Anthropic.Beta.BetaMessage) {
  return msg.content.filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === "text").map((b) => b.text).join("\n").trim();
}
// Tolerant JSON read: whole reply, a fenced block, or the outermost [...] / {...}.
function parseJson(t: string, open: string, close: string) {
  try { return JSON.parse(t); } catch { /* fall through */ }
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/); if (fence) { try { return JSON.parse(fence[1]); } catch { /* */ } }
  const a = t.indexOf(open), b = t.lastIndexOf(close);
  if (a >= 0 && b > a) { try { return JSON.parse(t.slice(a, b + 1)); } catch { /* */ } }
  return null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  // Only signed-in users of this app may spend the API key.
  const auth = req.headers.get("Authorization") ?? "";
  const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  const { data: { user } } = await sb.auth.getUser(auth.replace(/^Bearer\s+/i, ""));
  if (!user) return json({ error: "unauthorized" }, 401);

  const key = Deno.env.get("ANTHROPIC_API_KEY");
  if (!key) return json({ error: "no_key" }, 503);
  const client = new Anthropic({ apiKey: key });

  const body = await req.json().catch(() => ({}));
  try {
    if (body.kind === "food") {
      const content: Anthropic.Beta.BetaContentBlockParam[] = [];
      if (body.image) content.push({ type: "image", source: { type: "base64", media_type: "image/jpeg", data: body.image } });
      content.push({ type: "text", text: `${FOOD_PROMPT}\n\nОписание: ${body.text || "(только фото)"}` });
      const msg = await create(client, { output_config: { effort: "low" }, messages: [{ role: "user", content }] });
      if (msg.stop_reason === "refusal") return json({ error: "refused" }, 422);
      const items = parseJson(textOf(msg), "[", "]");
      if (!Array.isArray(items)) return json({ error: "bad_json" }, 502);
      return json({ items });
    }
    if (body.kind === "review") {
      const msg = await create(client, { output_config: { effort: "medium" }, messages: [{ role: "user", content: reviewPrompt(Number(body.period) || 7, body.data) }] });
      if (msg.stop_reason === "refusal") return json({ error: "refused" }, 422);
      return json({ text: textOf(msg) });
    }
    if (body.kind === "chat" && typeof body.prompt === "string") {
      // The app builds the prompt (its data + allowed actions); the reply is {reply, actions}.
      const msg = await create(client, { output_config: { effort: "low" }, messages: [{ role: "user", content: body.prompt.slice(0, 60000) }] });
      if (msg.stop_reason === "refusal") return json({ error: "refused" }, 422);
      const out = parseJson(textOf(msg), "{", "}");
      if (!out || typeof out !== "object") return json({ error: "bad_json" }, 502);
      return json({ json: out });
    }
    return json({ error: "bad_request" }, 400);
  } catch (e) {
    if (e instanceof Anthropic.RateLimitError) return json({ error: "rate_limited" }, 429);
    if (e instanceof Anthropic.AuthenticationError) return json({ error: "no_key" }, 503);
    if (e instanceof Anthropic.APIError) return json({ error: "api_error", status: e.status }, 502);
    return json({ error: "error" }, 500);
  }
});
