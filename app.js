
/* ---------- reference data ---------- */
const FOODS = [
  ["Гречка варёная",110,4.2,1.1,21.3],["Рис варёный",116,2.2,0.5,24.9],["Овсянка на воде",88,3,1.7,15],["Овсянка на молоке",102,3.2,4.1,14.2],
  ["Макароны варёные",112,3.5,0.4,23],["Картофель варёный",82,2,0.4,16.7],["Картофель жареный",192,2.8,9.5,23.4],["Булгур варёный",83,3.1,0.2,18.6],
  ["Куриная грудка варёная",137,29.8,1.8,0.5],["Куриное филе жареное",165,31,3.6,0],["Куриное бедро запечённое",210,23,13,0],["Индейка филе",130,29,1.2,0],
  ["Говядина тушёная",232,16.8,18.3,0],["Говядина отварная",254,25.8,16.8,0],["Баранина варёная",293,24.6,21.6,0],["Конина отварная",175,25,8,0],["Казы",330,15,30,0],
  ["Лосось запечённый",208,20,13,0],["Тунец консервированный",116,25.5,1,0],["Минтай отварной",79,17.6,1,0],
  ["Яйцо куриное (1 шт ≈ 55 г)",157,12.7,11.5,0.7],["Омлет",184,9.6,15.4,1.9],["Творог 5%",121,17.2,5,1.8],["Творог 0%",71,16.5,0,1.3],
  ["Йогурт греческий 2%",73,10,2,3.6],["Кефир 2,5%",50,2.9,2.5,4],["Молоко 2,5%",52,2.8,2.5,4.7],["Сыр твёрдый",360,25,28,0],["Брынза",260,17.9,20.1,0.4],
  ["Курт",340,50,12,6],["Кумыс",50,2.1,1.9,5],["Шубат",88,3.5,6,4],
  ["Хлеб ржаной",210,6.7,1.2,42.4],["Хлеб белый",265,8,3.2,49],["Лепёшка (нан)",280,8,4,53],["Баурсак",360,7,17,45],
  ["Плов с мясом",180,7,8,20],["Бешбармак",210,12,10,18],["Манты",220,10,11,20],["Лагман",130,6,5,15],["Самса",330,10,18,32],
  ["Борщ",50,2,2.5,5],["Суп куриный с лапшой",45,3,1.5,5],["Пельмени",250,11,12,26],
  ["Огурец",15,0.8,0.1,2.8],["Помидор",20,1.1,0.2,3.7],["Салат овощной с маслом",90,1,7,5],["Капуста тушёная",75,2,3.3,9],["Брокколи",34,2.8,0.4,6.6],
  ["Авокадо",160,2,14.7,8.5],["Банан",89,1.1,0.3,22.8],["Яблоко",52,0.3,0.2,13.8],["Апельсин",43,0.9,0.2,8.1],["Виноград",72,0.6,0.6,15.4],["Финики",282,2.5,0.4,75],
  ["Грецкий орех",654,15.2,65.2,7],["Миндаль",609,18.6,53.7,13],["Шоколад тёмный",546,6.2,35.4,48.2],["Печенье",450,7,18,65],["Торт",380,5,20,45],
  ["Сахар",399,0,0,99.7],["Мёд",329,0.8,0,81.5],["Масло оливковое",898,0,99.8,0],["Масло сливочное",748,0.5,82.5,0.8],
  ["Чай / кофе без сахара",1,0,0,0],["Капучино",40,2,2,3.5],["Сок апельсиновый",45,0.7,0.2,10.4],["Кола",42,0,0,10.6]
].map(([n,k,p,f,c])=>({n,k,p,f,c}));
const MEALS = ["Завтрак","Обед","Ужин","Перекус"];
const SPORTS = {"Ходьба":3.5,"Бег":9,"Силовая":5,"Йога / пилатес":3,"Велосипед":7,"Плавание":7,"Танцы":6,"HIIT":8,"Другое":4};
const OUT_CATS = ["Продукты","Кафе и доставка","Транспорт","Дом и ЖКУ","Здоровье","Красота","Одежда","Развлечения","Связь и подписки","Образование","Подарки","Другое"];
const IN_CATS = ["Зарплата","Фриланс","Подарок","Другое"];
const ACTIVITY = [[1.2,"Сидячий образ жизни"],[1.375,"Лёгкая активность (1–3 тренировки)"],[1.55,"Средняя (3–5 тренировок)"],[1.725,"Высокая (6–7 тренировок)"]];
const PACES = [[0.25,"Мягко: −0,25 кг в неделю"],[0.5,"Оптимально: −0,5 кг в неделю"],[0.75,"Быстро: −0,75 кг в неделю"]];
const MONTHS = ["январь","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь"];

/* ---------- helpers ---------- */
const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const uid = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-4);
const z = n => String(n).padStart(2, "0");
const dkey = d => d.getFullYear() + "-" + z(d.getMonth() + 1) + "-" + z(d.getDate());
const todayKey = () => dkey(new Date());
const parseKey = k => { const [y, m, d] = k.split("-").map(Number); return new Date(y, m - 1, d); };
const addDays = (k, n) => { const d = parseKey(k); d.setDate(d.getDate() + n); return dkey(d); };
const ymOf = k => k.slice(0, 7);
const addMonths = (ym, n) => { const [y, m] = ym.split("-").map(Number); const d = new Date(y, m - 1 + n, 1); return d.getFullYear() + "-" + z(d.getMonth() + 1); };
const daysInMonth = ym => { const [y, m] = ym.split("-").map(Number); return new Date(y, m, 0).getDate(); };
const monthName = ym => { const [y, m] = ym.split("-").map(Number); const n = MONTHS[m - 1]; return n[0].toUpperCase() + n.slice(1) + " " + y; };
const prettyDay = k => parseKey(k).toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
const weekday = k => parseKey(k).toLocaleDateString("ru-RU", { weekday: "long" });
const tg = n => Math.round(n || 0).toLocaleString("ru-RU") + " ₸";
const r1 = n => Math.round(n * 10) / 10;
const num = v => { if (v === "" || v == null) return null; const n = Number(String(v).replace(",", ".")); return isFinite(n) ? n : null; };
const clone = o => JSON.parse(JSON.stringify(o));
const toMin = t => { if (!t) return null; const [h, m] = t.split(":").map(Number); return h * 60 + m; };
const avg = a => { const v = a.filter(x => x != null && isFinite(x)); return v.length ? v.reduce((s, x) => s + x, 0) / v.length : null; };
const sum = a => a.reduce((s, x) => s + (x || 0), 0);
const hm = h => { if (h == null) return "—"; const t = Math.round(h * 60); return Math.floor(t / 60) + " ч " + z(t % 60) + " м"; };

/* ---------- data store ---------- */
const DEF_SETTINGS = {
  profile: { sex: "f", age: "", height: "", weight: "", target: "", activity: 1.375, pace: 0.5 },
  manual: null, sleepHours: 8, bedtime: "23:00", water: 2000,
  habits: [{ id: "h1", text: "10 000 шагов" }, { id: "h2", text: "Без сладкого после 18:00" }, { id: "h3", text: "20 минут чтения" }],
  reminders: [
    { id: "r1", time: "08:00", text: "Взвеситься, выпить стакан воды, отметить сон" },
    { id: "r2", time: "13:00", text: "Записать завтрак и обед" },
    { id: "r3", time: "19:30", text: "Записать ужин и расходы за день" },
    { id: "r4", time: "21:30", text: "Проверить план дня, перенести невыполненное" },
    { id: "r5", time: "22:30", text: "Убрать телефон, готовиться ко сну" }
  ],
  budgets: {}, foods: []
};
const S = { settings: null, days: {}, money: {}, plans: {}, savings: null, chat: null };
const CFG = window.APP_CONFIG || {};
const sb = window.supabase.createClient(CFG.supabaseUrl, CFG.supabaseKey);
let user = null, mode = "connecting";
const LS = "assistant-cache-v1", LQ = "assistant-queue-v1";
function saveLocal() { try { localStorage.setItem(LS, JSON.stringify(S)); } catch (e) {} }
function loadLocal() { try { const d = JSON.parse(localStorage.getItem(LS) || "null"); if (d) Object.assign(S, d); } catch (e) {} }

function settings() { const s = S.settings || {}; return { ...clone(DEF_SETTINGS), ...s, profile: { ...DEF_SETTINGS.profile, ...(s.profile || {}) } }; }
function getDay(k) { return { date: k, sleep: {}, water: 0, meals: [], workouts: [], health: {}, tasks: [], weight: null, steps: null, ...(S.days[k] || {}) }; }
function getMonth(ym) { return { tx: [], ...(S.money[ym] || {}) }; }
function getPlan(ym) { return { goals: [], focus: "", ...(S.plans[ym] || {}) }; }
function getSavings() { return { goals: [], ...(S.savings || {}) }; }

function applyLocal(path, data) {
  const [col, id] = path.split("/");
  if (col === "settings") S.settings = data;
  else if (col === "chat") S.chat = data;
  else if (col === "savings") S.savings = data;
  else if (col === "days") S.days[id] = data;
  else if (col === "money") S.money[id] = data;
  else if (col === "plans") S.plans[id] = data;
}

/* Offline-first: every change goes to a persisted queue and is pushed to Supabase when online. */
let queue = {};
try { queue = JSON.parse(localStorage.getItem(LQ) || "{}") || {}; } catch (e) { queue = {}; }
const persistQueue = () => { try { localStorage.setItem(LQ, JSON.stringify(queue)); } catch (e) {} };
function put(path, data) {
  applyLocal(path, data); saveLocal();
  queue[path] = { data, v: uid() }; persistQueue();
  render(); flushQueue();
}
const mutDay = (k, fn) => { const d = clone(getDay(k)); fn(d); put("days/" + k, d); };
const mutSettings = fn => { const s = clone(settings()); fn(s); put("settings/main", s); };
const mutMonth = (ym, fn) => { const d = clone(getMonth(ym)); fn(d); put("money/" + ym, d); };
const mutPlan = (ym, fn) => { const d = clone(getPlan(ym)); fn(d); put("plans/" + ym, d); };
const mutSavings = fn => { const d = clone(getSavings()); fn(d); put("savings/main", d); };
let flushing = false;
async function flushQueue() {
  if (flushing || !user || !navigator.onLine) { setSync(); return; }
  flushing = true;
  try {
    for (let i = 0; i < 5; i++) {
      const paths = Object.keys(queue); if (!paths.length) break;
      const snap = {}; paths.forEach(p => snap[p] = queue[p].v);
      const rows = paths.map(p => ({ user_id: user.id, path: p, data: queue[p].data, updated_at: new Date().toISOString() }));
      const { error } = await sb.from("docs").upsert(rows, { onConflict: "user_id,path" });
      if (error) { mode = "error"; break; }
      paths.forEach(p => { if (queue[p] && queue[p].v === snap[p]) delete queue[p]; });
      persistQueue(); mode = "cloud";
    }
  } finally { flushing = false; setSync(); }
}
async function loadAll() {
  const { data, error } = await sb.from("docs").select("path,data");
  if (error) { mode = "error"; setSync(); return; }
  const fresh = { settings: null, days: {}, money: {}, plans: {}, savings: null, chat: null };
  Object.assign(S, fresh);
  data.forEach(r => applyLocal(r.path, r.data));
  Object.keys(queue).forEach(p => applyLocal(p, queue[p].data));
  mode = "cloud"; saveLocal(); setSync(); render();
}
let channel = null;
function subscribe() {
  if (channel) sb.removeChannel(channel);
  channel = sb.channel("docs-" + user.id)
    .on("postgres_changes", { event: "*", schema: "public", table: "docs", filter: "user_id=eq." + user.id }, payload => {
      const r = payload.new;
      if (r && r.path && !queue[r.path]) { applyLocal(r.path, r.data); saveLocal(); render(); }
    }).subscribe();
}
window.addEventListener("online", flushQueue);
window.addEventListener("offline", setSync);
document.addEventListener("visibilitychange", () => { if (!document.hidden && user) { loadAll(); flushQueue(); } });

async function initDb() {
  loadLocal();
  const { data: { session } } = await sb.auth.getSession();
  if (!session) { showLogin(); return; }
  await startSession(session.user);
}
async function startSession(u) {
  user = u; $("#tabs").hidden = false; render();
  await loadAll(); subscribe(); flushQueue();
}
function setSync() {
  const el = $("#sync"); if (!el) return;
  const pending = Object.keys(queue).length;
  if (!navigator.onLine) { el.className = "sync local"; el.textContent = pending ? `Офлайн · ждут отправки: ${pending}` : "Офлайн"; }
  else if (mode === "error") { el.className = "sync local"; el.textContent = "Ошибка синхронизации"; }
  else if (mode === "cloud") { el.className = "sync ok"; el.textContent = pending ? "Сохраняю…" : "Синхронизировано"; }
  else { el.className = "sync"; el.textContent = "Подключаюсь…"; }
}

/* ---------- login ---------- */
let authMode = "in";
function showLogin(msg) {
  $("#tabs").hidden = true;
  $("#main").innerHTML = `
  <div class="card" style="margin-top:8vh">
    <div><div class="eyebrow">Добро пожаловать</div><h1>${authMode === "in" ? "Вход" : "Новый аккаунт"}</h1></div>
    <p class="small muted">Один аккаунт для телефона и компьютера. Данные видишь только ты.</p>
    <form class="stack" id="login" style="gap:10px">
      <input type="email" id="lg-e" name="email" placeholder="Email" autocomplete="email" required style="background:var(--bg);border:1px solid var(--line);border-radius:10px;padding:11px">
      <input type="password" id="lg-p" name="password" placeholder="Пароль, от 6 символов" autocomplete="${authMode === "in" ? "current-password" : "new-password"}" minlength="6" required style="background:var(--bg);border:1px solid var(--line);border-radius:10px;padding:11px">
      <button class="btn pri">${authMode === "in" ? "Войти" : "Создать аккаунт"}</button>
    </form>
    ${msg ? `<div class="note">${esc(msg)}</div>` : ""}
    <button class="btn" id="lg-switch">${authMode === "in" ? "У меня ещё нет аккаунта" : "У меня уже есть аккаунт"}</button>
  </div>`;
  $("#lg-switch").onclick = () => { authMode = authMode === "in" ? "up" : "in"; showLogin(); };
  $("#login").onsubmit = async e => {
    e.preventDefault(); e.stopPropagation();
    const email = $("#lg-e").value.trim(), password = $("#lg-p").value;
    const btn = e.target.querySelector("button"); btn.disabled = true;
    if (authMode === "up") {
      const { data, error } = await sb.auth.signUp({ email, password });
      if (error) { btn.disabled = false; return showLogin(authErr(error)); }
      if (!data.session) { authMode = "in"; return showLogin("Готово. Подтверди email по ссылке из письма и войди."); }
      return startSession(data.session.user);
    }
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    if (error) { btn.disabled = false; return showLogin(authErr(error)); }
    startSession(data.user);
  };
}
function authErr(e) {
  const m = (e && e.message || "").toLowerCase();
  if (m.includes("invalid login")) return "Неверный email или пароль.";
  if (m.includes("not confirmed")) return "Email ещё не подтверждён. Открой письмо и нажми ссылку.";
  if (m.includes("already registered")) return "Такой аккаунт уже есть. Войди.";
  return "Не получилось: " + (e && e.message || "ошибка сети");
}
async function logout() { await sb.auth.signOut(); user = null; try { localStorage.removeItem(LS); localStorage.removeItem(LQ); } catch (e) {} queue = {}; Object.assign(S, { settings: null, days: {}, money: {}, plans: {}, savings: null, chat: null }); authMode = "in"; showLogin(); }

/* ---------- calculations ---------- */
function lastWeight(upTo) {
  const keys = Object.keys(S.days).filter(k => !upTo || k <= upTo).sort().reverse();
  for (const k of keys) if (S.days[k].weight) return S.days[k].weight;
  return num(settings().profile.weight);
}
function targets() {
  const s = settings();
  if (s.manual && s.manual.kcal) return { ...s.manual, auto: false };
  const p = s.profile, w = lastWeight() || num(p.weight), h = num(p.height), a = num(p.age);
  if (!w || !h || !a) return null;
  const bmr = 10 * w + 6.25 * h - 5 * a + (p.sex === "m" ? 5 : -161);
  const tdee = bmr * Number(p.activity || 1.375);
  const kcal = Math.round(Math.max(tdee - Number(p.pace || 0.5) * 1100, p.sex === "m" ? 1500 : 1200) / 10) * 10;
  const pr = Math.round(w * 1.7), fat = Math.round(Math.max(w * 0.8, kcal * 0.25 / 9));
  const carb = Math.max(50, Math.round((kcal - pr * 4 - fat * 9) / 4));
  return { kcal, p: pr, f: fat, c: carb, tdee: Math.round(tdee), bmr: Math.round(bmr), auto: true };
}
const eaten = d => d.meals.reduce((a, m) => ({ k: a.k + (m.k || 0), p: a.p + (m.p || 0), f: a.f + (m.f || 0), c: a.c + (m.c || 0) }), { k: 0, p: 0, f: 0, c: 0 });
function sleepH(d) { const b = toMin(d.sleep && d.sleep.bed), w = toMin(d.sleep && d.sleep.wake); if (b == null || w == null) return null; let m = w - b; if (m <= 0) m += 1440; return m / 60; }
const burned = d => sum(d.workouts.map(w => w.kcal));
function taskStats(d) { const t = d.tasks || []; return { done: t.filter(x => x.done).length, total: t.length }; }
function monthTotals(ym) {
  const tx = getMonth(ym).tx;
  const inc = sum(tx.filter(t => t.t === "in").map(t => t.amt)), out = sum(tx.filter(t => t.t === "out").map(t => t.amt)), sav = sum(tx.filter(t => t.t === "save").map(t => t.amt));
  const byCat = {}; tx.filter(t => t.t === "out").forEach(t => byCat[t.cat] = (byCat[t.cat] || 0) + t.amt);
  return { inc, out, sav, rest: inc - out - sav, byCat, tx };
}

/* ---------- UI state ---------- */
const VIEWS_LIST = [
  ["today", "Сегодня", '<path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/><circle cx="12" cy="12" r="4"/>'],
  ["chat", "Чат", '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>'],
  ["food", "Питание", '<path d="M7 3v8a3 3 0 0 0 6 0V3M10 3v18M17 3c-1.7 1.5-2.5 4-2.5 7H17v11"/>'],
  ["money", "Финансы", '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M16 15h2"/>'],
  ["goals", "Цели", '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".8"/>'],
  ["stats", "Аналитика", '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'],
  ["setup", "Профиль", '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>']
];
const ui = { view: "today", date: todayKey(), month: ymOf(todayKey()), period: 7, meal: guessMeal(), foodQ: "", parsed: null, parseBusy: false, aiText: "", aiBusy: false, txType: "out" };
function guessMeal() { const h = new Date().getHours(); return h < 11 ? "Завтрак" : h < 16 ? "Обед" : h < 21 ? "Ужин" : "Перекус"; }
const hv = (location.hash || "").slice(1); if (VIEWS_LIST.some(v => v[0] === hv)) ui.view = hv;

function renderTabs() {
  $("#tabs .in").innerHTML = VIEWS_LIST.map(([id, l, ic]) =>
    `<button data-act="view" data-v="${id}" class="${ui.view === id ? "on" : ""}" aria-label="${l}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ic}</svg><span>${l}</span></button>`).join("");
}

/* ---------- small components ---------- */
function ring(frac, color, value, label) {
  const R = 30, C = 2 * Math.PI * R, f = Math.max(0, Math.min(1, frac || 0));
  return `<div class="ring"><svg viewBox="0 0 76 76" aria-hidden="true"><circle cx="38" cy="38" r="${R}" fill="none" stroke="var(--surface-2)" stroke-width="7"/>
    <circle cx="38" cy="38" r="${R}" fill="none" stroke="${color}" stroke-width="7" stroke-linecap="round" stroke-dasharray="${C * f} ${C}" transform="rotate(-90 38 38)"/>
    <text x="38" y="42" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)" font-family="Manrope, sans-serif">${Math.round(f * 100)}%</text></svg>
    <div class="vl">${value}</div><div class="lb">${label}</div></div>`;
}
const bar = (frac, cls = "") => `<div class="bar ${cls} ${frac > 1.02 && cls !== "good" ? "over" : ""}"><i style="width:${Math.min(100, Math.max(0, (frac || 0) * 100))}%"></i></div>`;
const scale = (field, val, lo, hi) => `<div class="scale">${[1, 2, 3, 4, 5].map(n => `<button data-act="scale" data-field="${field}" data-n="${n}" class="${val === n ? "on" : ""}">${n}</button>`).join("")}</div><div class="scale-l"><span>${lo}</span><span>${hi}</span></div>`;
function datebar(k) {
  const t = todayKey(), lbl = k === t ? "Сегодня" : k === addDays(t, -1) ? "Вчера" : weekday(k);
  return `<div class="datebar"><button class="arrow" data-act="day" data-n="-1" aria-label="Предыдущий день">‹</button>
    <div class="mid"><div class="eyebrow">${esc(lbl)}</div><h1>${prettyDay(k)}</h1></div>
    <button class="arrow" data-act="day" data-n="1" aria-label="Следующий день" ${k >= t ? "disabled" : ""}>›</button></div>`;
}
function monthbar() {
  return `<div class="datebar"><button class="arrow" data-act="month" data-n="-1" aria-label="Предыдущий месяц">‹</button>
    <div class="mid"><h1>${monthName(ui.month)}</h1></div>
    <button class="arrow" data-act="month" data-n="1" aria-label="Следующий месяц">›</button></div>`;
}
function nextReminder() {
  const s = settings(), now = new Date(), m = now.getHours() * 60 + now.getMinutes();
  const list = [...s.reminders].sort((a, b) => a.time.localeCompare(b.time));
  return list.find(r => toMin(r.time) > m) || null;
}

/* ---------- views ---------- */
function vToday() {
  const k = ui.date, d = getDay(k), s = settings(), T = targets(), e = eaten(d), sh = sleepH(d), ts = taskStats(d);
  const nr = k === todayKey() ? nextReminder() : null;
  const tasks = d.tasks || [];
  const tagFor = t => t.kind === "habit" ? '<span class="tag habit">привычка</span>' : t.kind === "goal" ? '<span class="tag goal">цель месяца</span>' : t.carried ? '<span class="tag carry">перенесено</span>' : "";
  const w = lastWeight(k);
  return `
  ${datebar(k)}
  <div class="card"><div class="rings">
    ${ring(T ? e.k / T.kcal : 0, "var(--gold)", Math.round(e.k) + (T ? " / " + T.kcal : ""), "ккал")}
    ${ring(sh ? sh / s.sleepHours : 0, "var(--sky)", sh ? hm(sh) : "—", "сон")}
    ${ring(d.water / s.water, "var(--sky)", (d.water / 1000).toFixed(2).replace(".", ",") + " л", "вода")}
    ${ring(ts.total ? ts.done / ts.total : 0, "var(--good)", ts.done + " / " + ts.total, "задачи")}
  </div></div>
  ${nr ? `<div class="next"><div class="t">${esc(nr.time)}</div><div class="small"><div class="eyebrow">Следующее напоминание</div>${esc(nr.text)}</div></div>` : ""}

  <div class="card">
    <div class="card-h"><h2>План дня</h2><span class="meta">${ts.done} из ${ts.total} выполнено</span></div>
    ${tasks.length ? `<div class="tasks">${tasks.map(t => `<div class="task ${t.done ? "done" : ""}">
        <input type="checkbox" data-act="task" data-id="${t.id}" ${t.done ? "checked" : ""} aria-label="Выполнено">
        <span class="tx">${esc(t.text)}</span>${tagFor(t)}<button class="x" data-act="deltask" data-id="${t.id}" aria-label="Удалить">×</button></div>`).join("")}</div>`
      : `<div class="empty">Нажми «Собрать план дня»: добавлю ежедневные привычки, невыполненное со вчера и шаги к целям месяца. Свои задачи допиши ниже.</div>`}
    <form class="inline" data-form="addtask"><input type="text" id="f-task" name="text" placeholder="Новая задача на этот день" autocomplete="off"><button class="btn">Добавить</button></form>
    <button class="btn gold" data-act="buildplan">Собрать план дня</button>
  </div>

  <div class="card">
    <div class="card-h"><h2>Сон</h2><span class="meta">ночь перед этим днём · цель ${s.sleepHours} ч</span></div>
    <div class="grid2">
      <label class="f">Легла<input type="time" id="s-bed" data-field="sleep.bed" value="${esc(d.sleep.bed || "")}"></label>
      <label class="f">Проснулась<input type="time" id="s-wake" data-field="sleep.wake" value="${esc(d.sleep.wake || "")}"></label>
    </div>
    ${sh != null ? `<div class="row"><span class="big">${hm(sh)}</span><span class="small ${sh >= s.sleepHours ? "" : "muted"}">${sh >= s.sleepHours ? "норма выполнена" : "недосып " + hm(s.sleepHours - sh)}</span></div>` : ""}
    <div class="eyebrow">Качество сна</div>${scale("sleep.q", d.sleep.q, "разбитая", "выспалась")}
  </div>

  <div class="card">
    <div class="card-h"><h2>Питание</h2><button class="btn sm" data-act="view" data-v="food">Открыть дневник</button></div>
    ${T ? `<div class="row"><span class="big">${Math.max(0, Math.round(T.kcal - e.k))}<small> ккал осталось</small></span></div>
      <div class="grid4">${[["Белки", e.p, T.p], ["Жиры", e.f, T.f], ["Углеводы", e.c, T.c]].map(([l, v, t]) => `<div class="macro"><div class="l"><span>${l}</span><span>${Math.round(v)}/${t}</span></div>${bar(v / t, l === "Белки" ? "good" : "")}</div>`).join("")}
        <div class="macro"><div class="l"><span>Сожжено</span><span>${Math.round(burned(d))}</span></div>${bar(0)}</div></div>`
      : `<div class="empty">Заполни профиль, чтобы рассчитать норму калорий и БЖУ под похудение.</div><button class="btn" data-act="view" data-v="setup">Заполнить профиль</button>`}
  </div>

  <div class="card">
    <div class="card-h"><h2>Вода и тело</h2><span class="meta">цель ${(s.water / 1000).toString().replace(".", ",")} л</span></div>
    <div class="row"><span class="big">${d.water}<small> мл</small></span>
      <button class="btn sm" data-act="water" data-n="250">+250</button><button class="btn sm" data-act="water" data-n="500">+500</button><button class="btn sm" data-act="water" data-n="-250">−250</button></div>
    <div class="grid2">
      <label class="f">Вес утром, кг<input type="number" step="0.1" inputmode="decimal" id="b-w" data-field="weight" value="${d.weight ?? ""}" placeholder="${w ? r1(w) : ""}"></label>
      <label class="f">Шаги<input type="number" inputmode="numeric" id="b-s" data-field="steps" value="${d.steps ?? ""}"></label>
    </div>
  </div>

  <div class="card">
    <div class="card-h"><h2>Спорт</h2><span class="meta">${sum(d.workouts.map(x => x.min))} мин · ${Math.round(burned(d))} ккал</span></div>
    ${d.workouts.length ? `<div class="list">${d.workouts.map(x => `<div class="li"><span class="grow">${esc(x.type)}</span><span class="muted small">${x.min} мин · ${Math.round(x.kcal)} ккал</span><button class="x" data-act="delwork" data-id="${x.id}" aria-label="Удалить">×</button></div>`).join("")}</div>` : `<div class="empty">Тренировок пока нет.</div>`}
    <form class="row" data-form="addwork">
      <select id="w-type" name="type" style="flex:2 1 140px">${Object.keys(SPORTS).map(t => `<option>${t}</option>`).join("")}</select>
      <input type="number" id="w-min" name="min" placeholder="минут" inputmode="numeric" style="flex:1 1 80px" required>
      <button class="btn">Добавить</button>
    </form>
  </div>

  <div class="card">
    <div class="card-h"><h2>Самочувствие</h2></div>
    <div class="eyebrow">Настроение</div>${scale("health.mood", d.health.mood, "плохо", "отлично")}
    <div class="eyebrow">Энергия</div>${scale("health.energy", d.health.energy, "нет сил", "много сил")}
    <label class="check"><input type="checkbox" data-act="vit" ${d.health.vit ? "checked" : ""}> Витамины и лекарства приняты</label>
    <label class="f">Симптомы, цикл, заметки<textarea id="h-note" data-field="health.note" placeholder="Например: болит голова, ПМС, тянет на сладкое">${esc(d.health.note || "")}</textarea></label>
  </div>`;
}

function vFood() {
  const k = ui.date, d = getDay(k), T = targets(), e = eaten(d);
  const byMeal = MEALS.map(m => [m, d.meals.filter(x => x.meal === m)]);
  return `
  ${datebar(k)}
  <div class="card">
    ${T ? `<div class="card-h"><div><div class="eyebrow">Осталось на день</div><div class="big">${Math.round(T.kcal - e.k)}<small> из ${T.kcal} ккал</small></div></div></div>
      ${bar(e.k / T.kcal, "gold")}
      <div class="grid2" style="grid-template-columns:repeat(3,minmax(0,1fr))">${[["Белки", e.p, T.p, "good"], ["Жиры", e.f, T.f, ""], ["Углеводы", e.c, T.c, ""]].map(([l, v, t, c]) => `<div class="macro"><div class="l"><span>${l}</span><span>${Math.round(v)} / ${t} г</span></div>${bar(v / t, c)}</div>`).join("")}</div>
      <div class="note">Белок держи в норме в первую очередь: он сохраняет мышцы при похудении и дольше даёт сытость. Сожжённые на тренировке калории не «доедай», так дефицит надёжнее.</div>`
      : `<div class="empty">Чтобы считать норму, заполни рост, вес, возраст и желаемый вес в профиле.</div><button class="btn" data-act="view" data-v="setup">Заполнить профиль</button>`}
  </div>

  <div class="card">
    <div class="card-h"><h2>Добавить еду</h2><div class="seg">${MEALS.map(m => `<button data-act="meal" data-m="${m}" class="${ui.meal === m ? "on" : ""}">${m}</button>`).join("")}</div></div>
    <div class="eyebrow">Быстро через ИИ</div>
    <textarea id="ai-food" placeholder="Опиши, что съела: «плов 250 г, салат из огурцов, чай с 2 ложками сахара»"></textarea>
    <div class="row"><label class="btn sm" for="food-photo" style="cursor:pointer">Фото тарелки</label><input type="file" id="food-photo" accept="image/*" capture="environment" hidden><span id="photo-name" class="small muted"></span>
      <button class="btn pri" data-act="parsefood" ${ui.parseBusy ? "disabled" : ""}>${ui.parseBusy ? "Считаю…" : "Посчитать КБЖУ"}</button></div>
    ${ui.parsed ? `<div class="list">${ui.parsed.map((x, i) => `<div class="li"><span class="grow">${esc(x.name)} <span class="muted small">${x.grams ? Math.round(x.grams) + " г" : ""}</span></span><span class="small muted">Б ${Math.round(x.p)} Ж ${Math.round(x.f)} У ${Math.round(x.c)}</span><span class="num">${Math.round(x.kcal)}</span><button class="x" data-act="dropparsed" data-i="${i}" aria-label="Убрать">×</button></div>`).join("")}</div>
      <div class="row"><button class="btn pri" data-act="addparsed">Добавить в «${ui.meal}»</button><button class="btn" data-act="clearparsed">Отмена</button><span class="small muted">Оценка ИИ примерная, ±15–20%.</span></div>` : ""}
    <div class="eyebrow">Из базы продуктов (на 100 г)</div>
    <div class="row"><input type="search" id="food-q" placeholder="Найти: гречка, манты, творог…" value="${esc(ui.foodQ)}" style="flex:3 1 160px" autocomplete="off"><input type="number" id="food-g" value="100" inputmode="numeric" style="flex:1 1 70px" aria-label="Граммы"><span class="small muted">г</span></div>
    <div class="res" id="food-res">${foodResults()}</div>
    <details><summary class="small" style="cursor:pointer">Ввести вручную</summary>
      <form class="stack" data-form="addmanual" style="margin-top:10px;gap:8px">
        <input type="text" id="m-name" name="name" placeholder="Название" required>
        <div class="grid4"><input type="number" step="any" id="m-k" name="k" placeholder="ккал" required><input type="number" step="any" id="m-p" name="p" placeholder="Б, г"><input type="number" step="any" id="m-f" name="f" placeholder="Ж, г"><input type="number" step="any" id="m-c" name="c" placeholder="У, г"></div>
        <label class="check"><input type="checkbox" name="save"> Сохранить в мои продукты (значения на 100 г)</label>
        <button class="btn">Добавить порцию</button>
      </form></details>
  </div>

  <div class="card">
    <div class="card-h"><h2>Дневник</h2><span class="meta">${Math.round(e.k)} ккал · Б ${Math.round(e.p)} · Ж ${Math.round(e.f)} · У ${Math.round(e.c)}</span></div>
    ${d.meals.length ? byMeal.filter(([, a]) => a.length).map(([m, a]) => `<div class="meal-h"><span>${m}</span><span class="muted">${Math.round(sum(a.map(x => x.k)))} ккал</span></div>
      <div class="list">${a.map(x => `<div class="li"><span class="grow">${esc(x.name)} <span class="muted small">${x.g ? Math.round(x.g) + " г" : ""}</span></span><span class="small muted">Б ${Math.round(x.p)} Ж ${Math.round(x.f)} У ${Math.round(x.c)}</span><span class="num">${Math.round(x.k)}</span><button class="x" data-act="delmeal" data-id="${x.id}" aria-label="Удалить">×</button></div>`).join("")}</div>`).join("")
      : `<div class="empty">Пока ничего не записано за этот день.</div>`}
  </div>
  ${weightCard()}`;
}
function allFoods() { return [...settings().foods.map(f => ({ ...f, mine: true })), ...FOODS]; }
function foodResults() {
  const q = ui.foodQ.trim().toLowerCase();
  const list = allFoods().filter(f => !q || f.n.toLowerCase().includes(q)).slice(0, q ? 30 : 12);
  if (!list.length) return `<div class="empty" style="padding:10px">Не нашла. Опиши еду в поле ИИ выше или введи вручную.</div>`;
  return list.map(f => `<button data-act="addfood" data-n="${esc(f.n)}"><span>${esc(f.n)}${f.mine ? ' <span class="tag">моё</span>' : ""}</span><span class="small muted">${Math.round(f.k)} ккал · Б${r1(f.p)} Ж${r1(f.f)} У${r1(f.c)}</span></button>`).join("");
}
function weightSeries(n) {
  const t = todayKey(), pts = [];
  for (let i = n - 1; i >= 0; i--) { const k = addDays(t, -i); const w = S.days[k] && S.days[k].weight; pts.push({ k, v: w || null }); }
  return pts;
}
function weightCard() {
  const s = settings(), pts = weightSeries(30), have = pts.filter(p => p.v);
  const target = num(s.profile.target);
  let forecast = "";
  if (have.length >= 3) {
    const xs = have.map(p => (parseKey(p.k) - parseKey(have[0].k)) / 864e5), ys = have.map(p => p.v);
    const mx = avg(xs), my = avg(ys); let nmr = 0, den = 0; xs.forEach((x, i) => { nmr += (x - mx) * (ys[i] - my); den += (x - mx) ** 2; });
    const slope = den ? nmr / den : 0, weekly = slope * 7, cur = ys[ys.length - 1];
    if (target && slope < -0.005 && cur > target) { const days = Math.round((cur - target) / -slope); forecast = `Темп ${r1(weekly).toString().replace(".", ",")} кг в неделю. При таком темпе цель ${target} кг будет примерно ${prettyDay(addDays(todayKey(), days))}.`; }
    else forecast = `Темп ${weekly > 0 ? "+" : ""}${r1(weekly).toString().replace(".", ",")} кг в неделю.` + (target && slope >= 0 ? " Вес не снижается: проверь, сходится ли дефицит калорий и не занижен ли учёт." : "");
  }
  return `<div class="card"><div class="card-h"><h2>Вес за 30 дней</h2><span class="meta">${have.length ? "сейчас " + r1(have[have.length - 1].v) + " кг" : ""}${target ? " · цель " + target + " кг" : ""}</span></div>
    ${have.length >= 2 ? lineChart(pts, target) + `<div class="small">${forecast}</div>` : `<div class="empty">Взвешивайся утром натощак и записывай вес на вкладке «Сегодня». После 2–3 записей здесь появится график и прогноз даты достижения цели.</div>`}</div>`;
}

function vMoney() {
  const ym = ui.month, m = monthTotals(ym), prev = monthTotals(addMonths(ym, -1)), s = settings(), sv = getSavings();
  const t = todayKey(), isCur = ymOf(t) === ym, dim = daysInMonth(ym), passed = isCur ? parseKey(t).getDate() : dim;
  const perDay = passed ? m.out / passed : 0, forecast = isCur ? perDay * dim : m.out;
  const cats = OUT_CATS.map(c => ({ c, v: m.byCat[c] || 0, b: num(s.budgets[c]) })).filter(x => x.v || x.b).sort((a, b) => b.v - a.v);
  const allCats = OUT_CATS.map(c => ({ c, v: m.byCat[c] || 0, b: num(s.budgets[c]) }));
  const budgetTotal = sum(Object.values(s.budgets).map(num));
  const insights = [];
  if (m.inc) insights.push([m.sav / m.inc >= 0.2 ? "good" : "warn", `Откладываешь ${Math.round(m.sav / m.inc * 100)}% дохода. Ориентир: от 20%.`]);
  if (prev.out && m.out) { const ch = (isCur ? forecast : m.out) / prev.out - 1; insights.push([ch > 0.05 ? "warn" : "good", `${isCur ? "Прогноз расходов" : "Расходы"} ${ch > 0 ? "выше" : "ниже"} прошлого месяца на ${Math.abs(Math.round(ch * 100))}%.`]); }
  if (cats[0] && m.out) insights.push(["", `Самая большая статья: ${cats[0].c}, ${Math.round(cats[0].v / m.out * 100)}% всех трат.`]);
  allCats.filter(x => x.b && x.v > x.b).forEach(x => insights.push(["bad", `Превышен бюджет «${x.c}» на ${tg(x.v - x.b)}.`]));
  if (budgetTotal && isCur && forecast > budgetTotal) insights.push(["bad", `По текущему темпу месяц закроется на ${tg(forecast - budgetTotal)} выше общего бюджета.`]);
  const catOpts = ui.txType === "out" ? OUT_CATS : ui.txType === "in" ? IN_CATS : (sv.goals.length ? sv.goals.map(g => g.name) : ["Накопления"]);
  return `
  ${monthbar()}
  <div class="card"><div class="grid4">
    <div class="tile"><span class="k">Доход</span><span class="v" style="color:var(--good)">${tg(m.inc)}</span></div>
    <div class="tile"><span class="k">Расход</span><span class="v">${tg(m.out)}</span></div>
    <div class="tile"><span class="k">Отложено</span><span class="v" style="color:var(--gold)">${tg(m.sav)}</span></div>
    <div class="tile"><span class="k">Свободно</span><span class="v" style="color:${m.rest < 0 ? "var(--bad)" : "var(--ink)"}">${tg(m.rest)}</span></div>
  </div>
  <div class="small muted">В среднем ${tg(perDay)} в день${isCur ? ` · прогноз на месяц ${tg(forecast)}` : ""}${budgetTotal ? ` · бюджет ${tg(budgetTotal)}` : ""}</div></div>

  <div class="card">
    <div class="card-h"><h2>Новая операция</h2><div class="seg">${[["out", "Расход"], ["in", "Доход"], ["save", "Отложить"]].map(([v, l]) => `<button data-act="txtype" data-t="${v}" class="${ui.txType === v ? "on" : ""}">${l}</button>`).join("")}</div></div>
    <form class="stack" data-form="addtx" style="gap:8px">
      <div class="grid2"><input type="number" id="t-amt" name="amt" placeholder="Сумма, ₸" inputmode="decimal" required>
        <select id="t-cat" name="cat">${catOpts.map(c => `<option>${esc(c)}</option>`).join("")}</select></div>
      <div class="grid2"><input type="date" id="t-date" name="date" value="${isCur ? t : ym + "-01"}"><input type="text" id="t-note" name="note" placeholder="Комментарий"></div>
      <button class="btn pri">Записать</button>
    </form>
  </div>

  ${insights.length ? `<div class="card"><h2>Выводы</h2><div>${insights.map(([c, x]) => `<div class="insight"><span class="dot ${c}"></span><span>${x}</span></div>`).join("")}</div></div>` : ""}

  <div class="card">
    <div class="card-h"><h2>Расходы по категориям</h2><span class="meta">лимит можно задать справа</span></div>
    <div class="list">${allCats.map(x => `<div class="li" style="flex-wrap:wrap">
      <div class="grow" style="flex:1 1 150px"><div class="row" style="justify-content:space-between"><span>${x.c}</span><span class="num">${tg(x.v)}</span></div>${x.b ? bar(x.v / x.b) : bar(m.out ? x.v / m.out : 0, "gold")}</div>
      <input type="number" data-act="budget" data-c="${x.c}" id="bud-${OUT_CATS.indexOf(x.c)}" value="${x.b ?? ""}" placeholder="лимит" style="width:96px" aria-label="Лимит на ${x.c}"></div>`).join("")}</div>
  </div>

  <div class="card">
    <div class="card-h"><h2>Накопления</h2><span class="meta">всего ${tg(sum(sv.goals.map(g => g.saved)))}</span></div>
    ${sv.goals.length ? `<div class="list">${sv.goals.map(g => {
      const left = Math.max(0, g.target - g.saved); let need = "";
      if (g.deadline && left) { const months = Math.max(1, (parseKey(g.deadline + "-01") - parseKey(ymOf(t) + "-01")) / (864e5 * 30.4) + 1); need = ` · по ${tg(left / months)} в месяц до ${monthName(g.deadline).toLowerCase()}`; }
      return `<div class="li" style="flex-direction:column;align-items:stretch;gap:6px"><div class="row" style="justify-content:space-between"><strong>${esc(g.name)}</strong><span class="row"><span class="num">${tg(g.saved)} / ${tg(g.target)}</span><button class="x" data-act="delsave" data-id="${g.id}" aria-label="Удалить цель">×</button></span></div>
      ${bar(g.saved / g.target, "gold")}<div class="small muted">${left ? "осталось " + tg(left) + need : "Цель достигнута"}</div></div>`; }).join("")}</div>` : `<div class="empty">Добавь цель: подушка безопасности, отпуск, техника. Пополнения записывай через «Отложить».</div>`}
    <form class="stack" data-form="addsave" style="gap:8px">
      <div class="grid2"><input type="text" id="sv-n" name="name" placeholder="На что копим" required><input type="number" id="sv-t" name="target" placeholder="Сумма цели, ₸" required></div>
      <div class="grid2"><label class="f">Срок (месяц)<input type="month" id="sv-d" name="deadline" style="background:var(--bg);border:1px solid var(--line);border-radius:10px;padding:9px 11px"></label><label class="f">Уже есть, ₸<input type="number" id="sv-s" name="saved" placeholder="0"></label></div>
      <button class="btn">Добавить цель</button>
    </form>
  </div>

  <div class="card">
    <div class="card-h"><h2>Операции</h2><span class="meta">${m.tx.length}</span></div>
    ${m.tx.length ? `<div class="list">${[...m.tx].sort((a, b) => b.d.localeCompare(a.d)).map(x => `<div class="li"><span class="small muted" style="width:44px">${parseKey(x.d).getDate()} ${MONTHS[parseKey(x.d).getMonth()].slice(0, 3)}</span>
      <span class="grow">${esc(x.cat)}${x.note ? ` <span class="muted small">· ${esc(x.note)}</span>` : ""}</span>
      <span class="num" style="color:${x.t === "in" ? "var(--good)" : x.t === "save" ? "var(--gold)" : "var(--ink)"}">${x.t === "in" ? "+" : x.t === "save" ? "→ " : "−"}${tg(x.amt)}</span>
      <button class="x" data-act="deltx" data-id="${x.id}" aria-label="Удалить">×</button></div>`).join("")}</div>` : `<div class="empty">Операций за этот месяц нет.</div>`}
  </div>`;
}

function vGoals() {
  const ym = ui.month, p = getPlan(ym), s = settings(), dim = daysInMonth(ym), t = todayKey();
  const doneN = p.goals.filter(g => g.kind === "count" ? g.progress >= g.target : g.done).length;
  const habitDone = (hid, k) => (S.days[k] && (S.days[k].tasks || []).some(x => x.habitId === hid && x.done));
  return `
  ${monthbar()}
  <div class="card">
    <label class="f">Главный фокус месяца<input type="text" id="g-focus" data-plan="focus" value="${esc(p.focus)}" placeholder="Например: минус 2 кг и подушка 300 000 ₸"></label>
  </div>
  <div class="card">
    <div class="card-h"><h2>Цели на месяц</h2><span class="meta">${doneN} из ${p.goals.length} достигнуто</span></div>
    ${p.goals.length ? `<div class="list">${p.goals.map(g => {
      const frac = g.kind === "count" ? g.progress / g.target : g.done ? 1 : 0;
      return `<div class="li" style="flex-direction:column;align-items:stretch;gap:6px">
        <div class="row" style="justify-content:space-between;flex-wrap:nowrap">
          ${g.kind === "count" ? `<span class="grow">${esc(g.text)}</span><span class="row" style="flex-wrap:nowrap"><button class="btn sm" data-act="gstep" data-id="${g.id}" data-n="-1" aria-label="Минус">−</button><span class="num">${g.progress}/${g.target}</span><button class="btn sm" data-act="gstep" data-id="${g.id}" data-n="1" aria-label="Плюс">+</button></span>`
          : `<label class="check grow"><input type="checkbox" data-act="gdone" data-id="${g.id}" ${g.done ? "checked" : ""}> <span style="${g.done ? "text-decoration:line-through;color:var(--muted)" : ""}">${esc(g.text)}</span></label>`}
          <button class="x" data-act="delgoal" data-id="${g.id}" aria-label="Удалить">×</button></div>
        ${g.kind === "count" ? bar(frac, frac >= 1 ? "good" : "gold") : ""}</div>`; }).join("")}</div>`
      : `<div class="empty">Запиши 3–5 целей. Цели с числом («12 тренировок», «прочитать 2 книги») попадают в план дня как шаги, и выполненный шаг сам добавляет +1.</div>`}
    <form class="stack" data-form="addgoal" style="gap:8px">
      <input type="text" id="g-text" name="text" placeholder="Цель, например: 12 тренировок" required>
      <div class="row"><select id="g-kind" name="kind" style="flex:2 1 160px"><option value="count">Счётчик (сделать N раз)</option><option value="check">Галочка (сделать один раз)</option></select>
        <input type="number" id="g-target" name="target" placeholder="N" value="10" style="flex:1 1 70px"><button class="btn">Добавить</button></div>
    </form>
  </div>
  <div class="card">
    <div class="card-h"><h2>Ежедневные привычки</h2><span class="meta">каждый день попадают в план</span></div>
    <div class="list">${s.habits.map(h => `<div class="li"><span class="grow">${esc(h.text)}</span><button class="x" data-act="delhabit" data-id="${h.id}" aria-label="Удалить">×</button></div>`).join("")}</div>
    <form class="inline" data-form="addhabit"><input type="text" id="hb-t" name="text" placeholder="Новая привычка" required><button class="btn">Добавить</button></form>
    ${s.habits.length ? `<div class="hgrid"><table><tr><th></th>${Array.from({ length: dim }, (_, i) => `<th>${i + 1}</th>`).join("")}</tr>
      ${s.habits.map(h => `<tr><th class="h" title="${esc(h.text)}">${esc(h.text)}</th>${Array.from({ length: dim }, (_, i) => { const k = ym + "-" + z(i + 1); return `<td><i class="${k > t ? "fut" : habitDone(h.id, k) ? "on" : ""}"></i></td>`; }).join("")}</tr>`).join("")}
    </table></div>` : ""}
  </div>`;
}

function periodKeys(n) { const t = todayKey(), a = []; for (let i = n - 1; i >= 0; i--) a.push(addDays(t, -i)); return a; }
function vStats() {
  const s = settings(), T = targets(), keys = periodKeys(ui.period), days = keys.map(getDay);
  const sl = days.map(sleepH), kc = days.map(d => d.meals.length ? eaten(d).k : null), pr = days.map(d => d.meals.length ? eaten(d).p : null);
  const mood = days.map(d => d.health.mood || null), tsk = days.map(taskStats);
  const beds = days.map(d => { const b = toMin(d.sleep.bed); return b == null ? null : (b < 720 ? b + 1440 : b); });
  const bm = avg(beds), bsd = bm != null ? Math.sqrt(avg(beds.map(b => b == null ? null : (b - bm) ** 2))) : null;
  const work = sum(days.map(d => d.workouts.length)), workMin = sum(days.map(d => sum(d.workouts.map(w => w.min))));
  const tDone = sum(tsk.map(x => x.done)), tAll = sum(tsk.map(x => x.total));
  const spend = keys.map(k => sum(getMonth(ymOf(k)).tx.filter(x => x.t === "out" && x.d === k).map(x => x.amt)));
  const ins = [];
  const avgSl = avg(sl);
  if (avgSl != null) ins.push([avgSl >= s.sleepHours - 0.25 ? "good" : "warn", `Средний сон ${hm(avgSl)} при цели ${s.sleepHours} ч.`]);
  if (bsd != null && beds.filter(x => x != null).length >= 3) ins.push([bsd <= 45 ? "good" : "warn", `Время отбоя гуляет на ±${Math.round(bsd)} мин. ${bsd > 45 ? "Стабильное время отхода ко сну важнее, чем «отоспаться» в выходные." : "Режим стабильный."} Среднее время отбоя ${z(Math.floor(bm / 60) % 24)}:${z(Math.round(bm % 60))}.`]);
  const pairs = days.map((d, i) => ({ s: sl[i], m: mood[i], k: kc[i] })).filter(x => x.s != null);
  const good = pairs.filter(x => x.s >= 7), bad = pairs.filter(x => x.s < 7);
  if (good.length >= 2 && bad.length >= 2) {
    const mg = avg(good.map(x => x.m)), mb = avg(bad.map(x => x.m)), kg = avg(good.map(x => x.k)), kb = avg(bad.map(x => x.k));
    if (mg != null && mb != null) ins.push(["", `Настроение после сна от 7 ч: ${r1(mg)} из 5, после короткого сна: ${r1(mb)}.`]);
    if (kg != null && kb != null && kb > kg * 1.05) ins.push(["warn", `После недосыпа ешь в среднем на ${Math.round(kb - kg)} ккал больше. Сон напрямую влияет на похудение.`]);
  }
  const avgK = avg(kc), avgP = avg(pr), logged = kc.filter(x => x != null).length;
  if (T && avgK != null) ins.push([Math.abs(avgK - T.kcal) <= T.kcal * 0.1 ? "good" : avgK > T.kcal ? "bad" : "warn", `В среднем ${Math.round(avgK)} ккал при норме ${T.kcal}. Еда записана в ${logged} из ${ui.period} дней.`]);
  if (T && avgP != null && avgP < T.p * 0.8) ins.push(["warn", `Белка ${Math.round(avgP)} г при норме ${T.p} г. Добавь творог, яйца, курицу или рыбу в каждый приём пищи.`]);
  if (tAll) ins.push([tDone / tAll >= 0.7 ? "good" : "warn", `Выполнено ${Math.round(tDone / tAll * 100)}% задач (${tDone} из ${tAll}).`]);
  ins.push([work >= ui.period / 7 * 3 ? "good" : "warn", `Тренировок: ${work}, всего ${workMin} мин. ВОЗ советует от 150 мин в неделю.`]);
  return `
  <div class="row" style="justify-content:space-between"><h1>Аналитика</h1><div class="seg">${[7, 14, 30].map(n => `<button data-act="period" data-n="${n}" class="${ui.period === n ? "on" : ""}">${n} дней</button>`).join("")}</div></div>
  <div class="card"><div class="grid4">
    <div class="tile"><span class="k">Сон в среднем</span><span class="v">${hm(avgSl)}</span></div>
    <div class="tile"><span class="k">Калорий в день</span><span class="v">${avgK != null ? Math.round(avgK) : "—"}</span></div>
    <div class="tile"><span class="k">Задачи</span><span class="v">${tAll ? Math.round(tDone / tAll * 100) + "%" : "—"}</span></div>
    <div class="tile"><span class="k">Потрачено</span><span class="v">${tg(sum(spend))}</span></div>
  </div></div>
  <div class="card"><div class="card-h"><h2>ИИ-разбор периода</h2></div>
    <div class="small muted">Посмотрит на сон, питание, спорт, настроение, задачи и деньги вместе и даст 3–5 конкретных действий.</div>
    <button class="btn pri" data-act="ai" ${ui.aiBusy ? "disabled" : ""}>${ui.aiBusy ? "Анализирую…" : "Сделать разбор"}</button>
    ${ui.aiText ? `<div class="ai-out" id="ai-out">${esc(ui.aiText)}</div>` : `<div id="ai-out" hidden class="ai-out"></div>`}
  </div>
  <div class="card"><h2>Выводы</h2><div>${ins.map(([c, x]) => `<div class="insight"><span class="dot ${c}"></span><span>${x}</span></div>`).join("")}</div></div>
  <div class="card"><div class="card-h"><h2>Сон, часов</h2><span class="meta">линия: цель ${s.sleepHours} ч</span></div>${bars(keys, sl, s.sleepHours, "var(--sky)", v => r1(v))}</div>
  <div class="card"><div class="card-h"><h2>Калории</h2><span class="meta">${T ? "линия: норма " + T.kcal : ""}</span></div>${bars(keys, kc, T && T.kcal, "var(--gold)", v => Math.round(v))}</div>
  <div class="card"><div class="card-h"><h2>Расходы по дням, ₸</h2></div>${bars(keys, spend, null, "var(--ink)", v => Math.round(v / 1000) + "k")}</div>
  ${weightCard()}`;
}

function vSetup() {
  const s = settings(), p = s.profile, T = targets();
  return `
  <h1>Профиль и настройки</h1>
  <div class="card">
    <div class="card-h"><h2>Данные для расчёта БЖУ</h2></div>
    <div class="grid2">
      <label class="f">Пол<select id="p-sex" data-set="profile.sex"><option value="f" ${p.sex === "f" ? "selected" : ""}>Женский</option><option value="m" ${p.sex === "m" ? "selected" : ""}>Мужской</option></select></label>
      <label class="f">Возраст<input type="number" id="p-age" data-set="profile.age" value="${esc(p.age)}" inputmode="numeric"></label>
      <label class="f">Рост, см<input type="number" id="p-h" data-set="profile.height" value="${esc(p.height)}" inputmode="numeric"></label>
      <label class="f">Вес сейчас, кг<input type="number" step="0.1" id="p-w" data-set="profile.weight" value="${esc(p.weight)}" inputmode="decimal"></label>
      <label class="f">Желаемый вес, кг<input type="number" step="0.1" id="p-t" data-set="profile.target" value="${esc(p.target)}" inputmode="decimal"></label>
      <label class="f">Темп похудения<select id="p-pace" data-set="profile.pace">${PACES.map(([v, l]) => `<option value="${v}" ${Number(p.pace) === v ? "selected" : ""}>${l}</option>`).join("")}</select></label>
    </div>
    <label class="f">Активность<select id="p-act" data-set="profile.activity">${ACTIVITY.map(([v, l]) => `<option value="${v}" ${Number(p.activity) === v ? "selected" : ""}>${l}</option>`).join("")}</select></label>
    ${T ? `<div class="grid4"><div class="tile"><span class="k">Калории</span><span class="v">${T.kcal}</span></div><div class="tile"><span class="k">Белки</span><span class="v">${T.p} г</span></div><div class="tile"><span class="k">Жиры</span><span class="v">${T.f} г</span></div><div class="tile"><span class="k">Углеводы</span><span class="v">${T.c} г</span></div></div>
      <div class="note">${T.auto ? `Формула Миффлина – Сан Жеора: базовый обмен ${T.bmr} ккал, расход с активностью ${T.tdee} ккал, минус дефицит под выбранный темп. Белок 1,7 г на кг веса. Норма пересчитывается, когда ты записываешь новый вес.` : "Используется ручная норма."}</div>` : `<div class="empty">Заполни возраст, рост и вес, и я посчитаю норму.</div>`}
    <details ${s.manual ? "open" : ""}><summary class="small" style="cursor:pointer">Задать норму вручную (например, от диетолога)</summary>
      <form class="grid4" data-form="manual" style="margin-top:10px">
        <input type="number" id="mn-k" name="kcal" placeholder="ккал" value="${s.manual ? s.manual.kcal : ""}"><input type="number" id="mn-p" name="p" placeholder="Б" value="${s.manual ? s.manual.p : ""}"><input type="number" id="mn-f" name="f" placeholder="Ж" value="${s.manual ? s.manual.f : ""}"><input type="number" id="mn-c" name="c" placeholder="У" value="${s.manual ? s.manual.c : ""}">
        <button class="btn">Сохранить</button>${s.manual ? `<button type="button" class="btn" data-act="clearmanual">Вернуть авто</button>` : ""}
      </form></details>
  </div>
  <div class="card">
    <div class="card-h"><h2>Сон и вода</h2></div>
    <div class="grid2" style="grid-template-columns:repeat(3,minmax(0,1fr))">
      <label class="f">Цель сна, ч<input type="number" step="0.5" id="st-sh" data-set="sleepHours" value="${s.sleepHours}"></label>
      <label class="f">Отбой<input type="time" id="st-bt" data-set="bedtime" value="${esc(s.bedtime)}"></label>
      <label class="f">Вода, мл<input type="number" step="100" id="st-w" data-set="water" value="${s.water}"></label>
    </div>
  </div>
  <div class="card">
    <div class="card-h"><h2>Напоминания</h2></div>
    <div class="list">${[...s.reminders].sort((a, b) => a.time.localeCompare(b.time)).map(r => `<div class="li"><span class="num" style="width:52px">${esc(r.time)}</span><span class="grow">${esc(r.text)}</span><button class="x" data-act="delrem" data-id="${r.id}" aria-label="Удалить">×</button></div>`).join("")}</div>
    <form class="row" data-form="addrem"><input type="time" id="rm-t" name="time" required style="flex:0 1 120px"><input type="text" id="rm-x" name="text" placeholder="Что напомнить" required style="flex:1 1 160px"><button class="btn">Добавить</button></form>
    <div class="small muted">Время по часовому поясу устройства. Вечерние напоминания (после 20:00) подсказывают, сколько задач дня ещё не выполнено.</div>
  </div>
  <div class="card">
    <div class="card-h"><h2>Данные и аккаунт</h2><span class="meta">${esc(user && user.email || "")}</span></div>
    <div class="small muted">Данные хранятся в твоей базе Supabase и синхронизируются между устройствами. Без интернета всё сохраняется на устройстве и отправится, когда связь появится.</div>
    <div class="row"><button class="btn" data-act="export">Скачать резервную копию</button>
      <label class="btn" for="imp-file" style="cursor:pointer">Загрузить из копии</label><input type="file" id="imp-file" accept="application/json,.json" hidden>
      <button class="btn" data-act="logout">Выйти</button></div>
  </div>
  ${pushCard()}`;
}

/* ---------- charts ---------- */
function bars(keys, vals, target, color, fmt) {
  const W = 340, H = 150, pl = 4, pr = 4, pt = 16, pb = 18, n = keys.length;
  const max = Math.max(target || 0, ...vals.map(v => v || 0)) * 1.12 || 1;
  const bw = (W - pl - pr) / n, y = v => pt + (H - pt - pb) * (1 - v / max);
  const step = n <= 14 ? 1 : 5;
  let out = `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img">`;
  out += `<line x1="${pl}" x2="${W - pr}" y1="${H - pb}" y2="${H - pb}" stroke="var(--line)"/>`;
  vals.forEach((v, i) => {
    const x = pl + i * bw + bw * 0.18, w = bw * 0.64;
    if (v != null && v > 0) {
      out += `<rect x="${x}" y="${y(v)}" width="${w}" height="${H - pb - y(v)}" rx="${Math.min(3, w / 3)}" fill="${color}" opacity="${i === n - 1 ? 1 : .75}"/>`;
      if (n <= 14) out += `<text x="${x + w / 2}" y="${y(v) - 4}" text-anchor="middle">${fmt(v)}</text>`;
    }
    if (i % step === 0 || i === n - 1) out += `<text x="${x + w / 2}" y="${H - 5}" text-anchor="middle">${parseKey(keys[i]).getDate()}</text>`;
  });
  if (target) out += `<line x1="${pl}" x2="${W - pr}" y1="${y(target)}" y2="${y(target)}" stroke="var(--bad)" stroke-dasharray="4 3" stroke-width="1"/>`;
  return out + `</svg>`;
}
function lineChart(pts, target) {
  const W = 340, H = 140, pl = 30, pr = 8, pt = 10, pb = 18, have = pts.filter(p => p.v);
  let lo = Math.min(...have.map(p => p.v)), hi = Math.max(...have.map(p => p.v));
  if (target && target < lo && lo - target < 6) lo = target;
  lo = Math.floor(lo - 0.5); hi = Math.ceil(hi + 0.5);
  const x = i => pl + (W - pl - pr) * i / (pts.length - 1), y = v => pt + (H - pt - pb) * (1 - (v - lo) / (hi - lo));
  const line = pts.map((p, i) => p.v ? [x(i), y(p.v)] : null).filter(Boolean);
  let o = `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img">`;
  [lo, (lo + hi) / 2, hi].forEach(v => o += `<line x1="${pl}" x2="${W - pr}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)"/><text x="${pl - 4}" y="${y(v) + 3}" text-anchor="end">${r1(v)}</text>`);
  if (target && target >= lo) o += `<line x1="${pl}" x2="${W - pr}" y1="${y(target)}" y2="${y(target)}" stroke="var(--good)" stroke-dasharray="4 3"/>`;
  o += `<path d="M${line.map(p => p.join(",")).join("L")}" fill="none" stroke="var(--sky)" stroke-width="2" stroke-linejoin="round"/>`;
  line.forEach((p, i) => o += `<circle cx="${p[0]}" cy="${p[1]}" r="${i === line.length - 1 ? 4 : 2.5}" fill="var(--sky)"/>`);
  [0, Math.floor((pts.length - 1) / 2), pts.length - 1].forEach(i => o += `<text x="${x(i)}" y="${H - 4}" text-anchor="middle">${parseKey(pts[i].k).getDate()}.${z(parseKey(pts[i].k).getMonth() + 1)}</text>`);
  return o + `</svg>`;
}

/* ---------- render ---------- */
const VIEWS = { today: vToday, chat: vChat, food: vFood, money: vMoney, goals: vGoals, stats: vStats, setup: vSetup };
function render() {
  if (!user) return;
  const main = $("#main");
  const keep = {};
  main.querySelectorAll("form [id], textarea[id]").forEach(el => { if (el.type !== "checkbox" && el.type !== "file") keep[el.id] = el.value; });
  const ae = document.activeElement, focusId = ae && main.contains(ae) ? ae.id : null;
  if (focusId && ae.value != null) keep[focusId] = ae.value;
  const sel = focusId && ae.selectionStart != null ? [ae.selectionStart, ae.selectionEnd] : null;
  const photo = $("#food-photo") && $("#food-photo").files[0];
  main.innerHTML = VIEWS[ui.view]();
  for (const id in keep) { const el = document.getElementById(id); if (el && main.contains(el) && el.value !== keep[id]) el.value = keep[id]; }
  if (focusId) { const el = document.getElementById(focusId); if (el) { el.focus({ preventScroll: true }); if (sel) try { el.setSelectionRange(sel[0], sel[1]); } catch (e) {} } }
  if (photo && $("#food-photo")) { try { const dt = new DataTransfer(); dt.items.add(photo); $("#food-photo").files = dt.files; $("#photo-name").textContent = photo.name; } catch (e) {} }
  renderTabs();
}
let toastT;
function toast(msg, ms = 3500) { const t = $("#toast"); t.textContent = msg; t.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => t.hidden = true, ms); }

/* ---------- actions ---------- */
function setPath(obj, path, val) { const ks = path.split("."); let o = obj; ks.slice(0, -1).forEach(k => { o[k] = o[k] || {}; o = o[k]; }); o[ks[ks.length - 1]] = val; }
function buildPlan() {
  const k = ui.date, s = settings(), y = getDay(addDays(k, -1)), p = getPlan(ymOf(k));
  mutDay(k, d => {
    const has = t => d.tasks.some(x => x.text.trim().toLowerCase() === t.trim().toLowerCase());
    let added = 0;
    s.habits.forEach(h => { if (!d.tasks.some(x => x.habitId === h.id)) { d.tasks.push({ id: uid(), text: h.text, done: false, kind: "habit", habitId: h.id }); added++; } });
    (y.tasks || []).filter(t => !t.done && t.kind !== "habit" && t.kind !== "goal").forEach(t => { if (!has(t.text)) { d.tasks.push({ id: uid(), text: t.text, done: false, carried: true }); added++; } });
    p.goals.filter(g => g.kind === "count" && g.progress < g.target).slice(0, 3).forEach(g => { if (!d.tasks.some(x => x.goalId === g.id)) { d.tasks.push({ id: uid(), text: g.text.replace(/^\d+\s*/, "") + " (шаг к цели)", done: false, kind: "goal", goalId: g.id }); added++; } });
    toast(added ? `Добавлено задач: ${added}` : "План уже собран");
  });
}
document.addEventListener("click", e => {
  const b = e.target.closest("[data-act]"); if (!b || b.tagName === "INPUT" || b.tagName === "SELECT") return;
  const a = b.dataset.act, k = ui.date;
  if (a === "view") { ui.view = b.dataset.v; try { history.replaceState(null, "", "#" + ui.view); } catch (er) {} render(); window.scrollTo(0, 0); }
  else if (a === "day") { const nk = addDays(ui.date, +b.dataset.n); if (nk <= todayKey()) { ui.date = nk; ui.month = ymOf(nk); render(); } }
  else if (a === "month") { ui.month = addMonths(ui.month, +b.dataset.n); render(); }
  else if (a === "deltask") mutDay(k, d => d.tasks = d.tasks.filter(t => t.id !== b.dataset.id));
  else if (a === "buildplan") buildPlan();
  else if (a === "scale") mutDay(k, d => { const cur = b.dataset.field.split(".").reduce((o, x) => o && o[x], d); setPath(d, b.dataset.field, cur === +b.dataset.n ? null : +b.dataset.n); });
  else if (a === "water") mutDay(k, d => d.water = Math.max(0, (d.water || 0) + +b.dataset.n));
  else if (a === "delwork") mutDay(k, d => d.workouts = d.workouts.filter(w => w.id !== b.dataset.id));
  else if (a === "meal") { ui.meal = b.dataset.m; render(); }
  else if (a === "addfood") {
    const f = allFoods().find(x => x.n === b.dataset.n), g = num($("#food-g").value) || 100, m = g / 100;
    mutDay(k, d => d.meals.push({ id: uid(), meal: ui.meal, name: f.n, g, k: f.k * m, p: f.p * m, f: f.f * m, c: f.c * m }));
    toast(`${f.n}, ${g} г → ${ui.meal}`);
  }
  else if (a === "delmeal") mutDay(k, d => d.meals = d.meals.filter(x => x.id !== b.dataset.id));
  else if (a === "parsefood") parseFood();
  else if (a === "dropparsed") { ui.parsed.splice(+b.dataset.i, 1); if (!ui.parsed.length) ui.parsed = null; render(); }
  else if (a === "clearparsed") { ui.parsed = null; render(); }
  else if (a === "addparsed") {
    const items = ui.parsed; ui.parsed = null; const ta = $("#ai-food"); if (ta) ta.value = "";
    const ph = $("#food-photo"); if (ph) ph.value = "";
    mutDay(k, d => items.forEach(x => d.meals.push({ id: uid(), meal: ui.meal, name: x.name, g: x.grams || null, k: x.kcal, p: x.p, f: x.f, c: x.c })));
    toast("Добавлено в «" + ui.meal + "»");
  }
  else if (a === "txtype") { ui.txType = b.dataset.t; render(); }
  else if (a === "deltx") mutMonth(ui.month, m => {
    const tx = m.tx.find(x => x.id === b.dataset.id);
    if (tx && tx.t === "save" && tx.goalId) mutSavings(s => { const g = s.goals.find(g => g.id === tx.goalId); if (g) g.saved = Math.max(0, g.saved - tx.amt); });
    m.tx = m.tx.filter(x => x.id !== b.dataset.id);
  });
  else if (a === "delsave") mutSavings(s => s.goals = s.goals.filter(g => g.id !== b.dataset.id));
  else if (a === "gstep") mutPlan(ui.month, p => { const g = p.goals.find(x => x.id === b.dataset.id); if (g) g.progress = Math.max(0, g.progress + +b.dataset.n); });
  else if (a === "delgoal") mutPlan(ui.month, p => p.goals = p.goals.filter(x => x.id !== b.dataset.id));
  else if (a === "delhabit") mutSettings(s => s.habits = s.habits.filter(h => h.id !== b.dataset.id));
  else if (a === "period") { ui.period = +b.dataset.n; ui.aiText = ""; render(); }
  else if (a === "ai") aiReview();
  else if (a === "delrem") mutSettings(s => s.reminders = s.reminders.filter(r => r.id !== b.dataset.id));
  else if (a === "clearmanual") mutSettings(s => s.manual = null);
  else if (a === "export") exportData();
  else if (a === "chatex") sendChat(b.dataset.t);
  else if (a === "chatclear") put("chat/main", { msgs: [] });
  else if (a === "pushon") enablePush();
  else if (a === "pushoff") disablePush();
  else if (a === "logout") logout();
});
document.addEventListener("change", e => {
  const el = e.target, k = ui.date;
  if (el.id === "imp-file") { if (el.files[0]) importData(el.files[0]); el.value = ""; return; }
  if (el.id === "food-photo") { $("#photo-name").textContent = el.files[0] ? el.files[0].name : ""; return; }
  if (el.dataset.act === "task") {
    const id = el.dataset.id, d0 = getDay(k), t0 = d0.tasks.find(t => t.id === id);
    mutDay(k, d => { const t = d.tasks.find(x => x.id === id); if (t) t.done = el.checked; });
    if (t0 && t0.goalId) mutPlan(ymOf(k), p => { const g = p.goals.find(x => x.id === t0.goalId); if (g) g.progress = Math.max(0, g.progress + (el.checked ? 1 : -1)); });
  }
  else if (el.dataset.act === "vit") mutDay(k, d => d.health.vit = el.checked);
  else if (el.dataset.act === "gdone") mutPlan(ui.month, p => { const g = p.goals.find(x => x.id === el.dataset.id); if (g) g.done = el.checked; });
  else if (el.dataset.act === "budget") mutSettings(s => { const v = num(el.value); if (v) s.budgets[el.dataset.c] = v; else delete s.budgets[el.dataset.c]; });
  else if (el.dataset.field) { const v = el.type === "number" ? num(el.value) : el.value; mutDay(k, d => setPath(d, el.dataset.field, v)); }
  else if (el.dataset.set) { const v = el.type === "number" || el.tagName === "SELECT" && el.id !== "p-sex" ? (num(el.value) ?? "") : el.value; mutSettings(s => setPath(s, el.dataset.set, v)); }
  else if (el.dataset.plan) mutPlan(ui.month, p => p[el.dataset.plan] = el.value);
});
document.addEventListener("input", e => { if (e.target.id === "food-q") { ui.foodQ = e.target.value; $("#food-res").innerHTML = foodResults(); } });
document.addEventListener("submit", e => {
  const f = e.target.closest("form[data-form]"); if (!f) return; e.preventDefault();
  const v = Object.fromEntries(new FormData(f)), k = ui.date, name = f.dataset.form;
  if (name === "chat") { sendChat(v.text); return; }
  if (name === "addtask") { if (!v.text.trim()) return; mutDay(k, d => d.tasks.push({ id: uid(), text: v.text.trim(), done: false })); }
  else if (name === "addwork") {
    const min = num(v.min); if (!min) return; const w = lastWeight(k) || 65;
    mutDay(k, d => d.workouts.push({ id: uid(), type: v.type, min, kcal: SPORTS[v.type] * w * min / 60 }));
  }
  else if (name === "addmanual") {
    const it = { name: v.name.trim(), k: num(v.k) || 0, p: num(v.p) || 0, f: num(v.f) || 0, c: num(v.c) || 0 };
    mutDay(k, d => d.meals.push({ id: uid(), meal: ui.meal, ...it, g: null }));
    if (v.save) mutSettings(s => s.foods = [{ n: it.name, k: it.k, p: it.p, f: it.f, c: it.c }, ...s.foods.filter(x => x.n !== it.name)].slice(0, 200));
  }
  else if (name === "addtx") {
    const amt = num(v.amt); if (!amt || amt <= 0) return;
    const date = v.date || todayKey(), ym = ymOf(date), sv = getSavings();
    const goal = ui.txType === "save" ? sv.goals.find(g => g.name === v.cat) : null;
    mutMonth(ym, m => m.tx.push({ id: uid(), d: date, t: ui.txType, cat: v.cat, amt, note: (v.note || "").trim(), goalId: goal ? goal.id : null }));
    if (goal) mutSavings(s => { const g = s.goals.find(x => x.id === goal.id); g.saved += amt; });
    toast((ui.txType === "in" ? "Доход " : ui.txType === "save" ? "Отложено " : "Расход ") + tg(amt));
  }
  else if (name === "addsave") { const target = num(v.target); if (!target) return; mutSavings(s => s.goals.push({ id: uid(), name: v.name.trim(), target, saved: num(v.saved) || 0, deadline: v.deadline || null })); }
  else if (name === "addgoal") mutPlan(ui.month, p => p.goals.push({ id: uid(), text: v.text.trim(), kind: v.kind, target: Math.max(1, num(v.target) || 1), progress: 0, done: false }));
  else if (name === "addhabit") mutSettings(s => s.habits.push({ id: uid(), text: v.text.trim() }));
  else if (name === "addrem") mutSettings(s => s.reminders.push({ id: uid(), time: v.time, text: v.text.trim() }));
  else if (name === "manual") { const kc = num(v.kcal); mutSettings(s => s.manual = kc ? { kcal: kc, p: num(v.p) || 0, f: num(v.f) || 0, c: num(v.c) || 0 } : null); return; }
  f.reset(); render();
});

/* ---------- AI (Supabase edge function "ai" → Claude API) ---------- */
async function callAI(body) {
  const { data, error } = await sb.functions.invoke("ai", { body });
  if (error) {
    let code = "error";
    try { const j = await error.context.json(); code = j.error || code; } catch (e) {}
    throw { code };
  }
  return data;
}
const aiErr = c => ({ no_key: "ИИ не подключён: в Supabase не задан ключ Anthropic.", rate_limited: "Слишком много запросов, попробуй через минуту.", refused: "ИИ не смог обработать запрос, переформулируй.", bad_json: "ИИ ответил неразборчиво, попробуй ещё раз." }[c] || (navigator.onLine ? "Не получилось, попробуй ещё раз." : "Нет интернета."));
function shrinkImage(file, max = 1280) {
  return new Promise((res, rej) => {
    const img = new Image(), url = URL.createObjectURL(file);
    img.onload = () => {
      const k = Math.min(1, max / Math.max(img.width, img.height)), c = document.createElement("canvas");
      c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height); URL.revokeObjectURL(url);
      res(c.toDataURL("image/jpeg", 0.85).split(",")[1]);
    };
    img.onerror = rej; img.src = url;
  });
}
async function parseFood() {
  const text = ($("#ai-food").value || "").trim(), file = $("#food-photo") && $("#food-photo").files[0];
  if (!text && !file) { toast("Опиши еду или прикрепи фото"); return; }
  ui.parseBusy = true; render();
  try {
    const image = file ? await shrinkImage(file) : null;
    const res = await callAI({ kind: "food", text, image });
    const arr = (Array.isArray(res.items) ? res.items : []).map(x => ({ name: String(x.name || "Блюдо"), grams: num(x.grams), kcal: num(x.kcal) || 0, p: num(x.p) || 0, f: num(x.f) || 0, c: num(x.c) || 0 }));
    ui.parsed = arr.length ? arr : null; if (!arr.length) toast("Не удалось распознать еду");
  } catch (e) { toast(aiErr(e && e.code)); }
  ui.parseBusy = false; render();
}
function summaryFor(n) {
  const s = settings(), T = targets();
  const days = periodKeys(n).map(k => { const d = getDay(k), e = eaten(d), t = taskStats(d);
    return { date: k, sleep_h: sleepH(d) && r1(sleepH(d)), bed: d.sleep.bed || null, sleep_q: d.sleep.q || null, kcal: d.meals.length ? Math.round(e.k) : null, protein: d.meals.length ? Math.round(e.p) : null,
      water_ml: d.water || null, weight: d.weight, steps: d.steps, workout_min: sum(d.workouts.map(w => w.min)) || null, mood: d.health.mood || null, energy: d.health.energy || null,
      note: d.health.note || null, tasks: t.total ? t.done + "/" + t.total : null,
      spend: sum(getMonth(ymOf(k)).tx.filter(x => x.t === "out" && x.d === k).map(x => x.amt)) || null }; });
  const m = monthTotals(ymOf(todayKey()));
  return { targets: T && { kcal: T.kcal, protein: T.p, fat: T.f, carbs: T.c }, sleep_target_h: s.sleepHours, bedtime_target: s.bedtime, weight_goal: num(s.profile.target),
    month_goals: getPlan(ymOf(todayKey())).goals.map(g => ({ goal: g.text, progress: g.kind === "count" ? g.progress + "/" + g.target : g.done ? "done" : "open" })),
    finance_month: { income: m.inc, spent: m.out, saved: m.sav, by_category: m.byCat, budgets: s.budgets }, savings: getSavings().goals.map(g => ({ name: g.name, saved: g.saved, target: g.target })), days };
}
async function aiReview() {
  ui.aiBusy = true; ui.aiText = ""; render();
  const o = $("#ai-out"); if (o) { o.hidden = false; o.textContent = "Анализирую, это займёт до минуты…"; }
  try { const res = await callAI({ kind: "review", period: ui.period, data: summaryFor(ui.period) }); ui.aiText = res.text || ""; }
  catch (e) { toast(aiErr(e && e.code)); }
  ui.aiBusy = false; render();
}

/* ---------- backup ---------- */
function exportData() {
  const blob = new Blob([JSON.stringify(S, null, 2)], { type: "application/json" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "assistant-backup-" + todayKey() + ".json";
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
async function importData(file) {
  try {
    const d = JSON.parse(await file.text());
    const rows = [];
    if (d.settings) rows.push(["settings/main", d.settings]);
    if (d.savings) rows.push(["savings/main", d.savings]);
    ["days", "money", "plans"].forEach(c => Object.entries(d[c] || {}).forEach(([id, v]) => rows.push([c + "/" + id, v])));
    if (!rows.length) { toast("В файле нет данных ассистента"); return; }
    rows.forEach(([p, v]) => { applyLocal(p, v); queue[p] = { data: v, v: uid() }; });
    persistQueue(); saveLocal(); render(); await flushQueue();
    toast(`Перенесено записей: ${rows.length}`);
  } catch (e) { toast("Не получилось прочитать файл"); }
}

/* ---------- push notifications ---------- */
const pushSupported = () => "serviceWorker" in navigator && "PushManager" in window && "Notification" in window;
const isStandalone = () => window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent);
let pushState = "unknown";
async function refreshPushState() {
  if (!pushSupported()) { pushState = isIOS() && !isStandalone() ? "ios-install" : "unsupported"; return; }
  try { const reg = await navigator.serviceWorker.ready; const sub = await reg.pushManager.getSubscription(); pushState = sub && Notification.permission === "granted" ? "on" : Notification.permission === "denied" ? "denied" : "off"; }
  catch (e) { pushState = "off"; }
}
function b64ToBytes(s) { const p = "=".repeat((4 - s.length % 4) % 4), b = atob((s + p).replace(/-/g, "+").replace(/_/g, "/")); return Uint8Array.from(b, c => c.charCodeAt(0)); }
async function enablePush() {
  try {
    const perm = await Notification.requestPermission();
    if (perm !== "granted") { pushState = "denied"; render(); return; }
    const reg = await navigator.serviceWorker.ready;
    const sub = (await reg.pushManager.getSubscription()) || await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64ToBytes(CFG.vapidPublicKey) });
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Almaty";
    const { error } = await sb.from("push_subs").upsert({ endpoint: sub.endpoint, user_id: user.id, sub: sub.toJSON(), tz }, { onConflict: "endpoint" });
    if (error) throw error;
    pushState = "on"; render(); toast("Уведомления включены на этом устройстве");
  } catch (e) { toast("Не удалось включить уведомления"); }
}
async function disablePush() {
  try { const reg = await navigator.serviceWorker.ready; const sub = await reg.pushManager.getSubscription();
    if (sub) { await sb.from("push_subs").delete().eq("endpoint", sub.endpoint); await sub.unsubscribe(); } } catch (e) {}
  pushState = "off"; render();
}
function pushCard() {
  const body = {
    "on": `<div class="row"><span class="tag habit">включены</span><span class="small muted">Напоминания из списка выше приходят на это устройство, даже когда приложение закрыто.</span></div><button class="btn sm" data-act="pushoff">Выключить на этом устройстве</button>`,
    "off": `<div class="small muted">Включи на каждом устройстве, где хочешь получать напоминания.</div><button class="btn pri" data-act="pushon">Включить уведомления</button>`,
    "denied": `<div class="note">Уведомления запрещены в настройках браузера. Разреши их для этого сайта и обнови страницу.</div>`,
    "ios-install": `<div class="note">На iPhone уведомления работают только в установленном приложении: нажми «Поделиться» → «На экран Домой», открой ассистента с иконки и включи уведомления здесь.</div>`,
    "unsupported": `<div class="note">Этот браузер не поддерживает уведомления. Открой приложение в Chrome, Edge или Safari.</div>`,
    "unknown": `<div class="small muted">Проверяю…</div>`
  }[pushState];
  return `<div class="card"><div class="card-h"><h2>Push-уведомления</h2></div>${body}</div>`;
}

/* ---------- assistant chat ---------- */
function getChat() { return { msgs: [], ...(S.chat || {}) }; }
const CHAT_EXAMPLES = [
  "Легла в 23:40, встала в 7:10, выспалась на 4",
  "На обед бешбармак и чай с сахаром",
  "Потратила 4500 на такси и 12000 на продукты",
  "Добавь задачу: позвонить маме, и отметь чтение выполненным",
  "Сколько калорий мне осталось сегодня?",
  "Отложила 50 000 на подушку"
];
function vChat() {
  const c = getChat();
  return `
  <div class="row" style="justify-content:space-between"><h1>Ассистент</h1>${c.msgs.length ? `<button class="btn sm" data-act="chatclear">Очистить</button>` : ""}</div>
  <div class="chat-log" id="chat-log">
    ${c.msgs.length ? c.msgs.map(m => `<div class="bubble ${m.role === "user" ? "me" : "bot"}">${esc(m.text)}${m.acts && m.acts.length ? `<div class="acts">${m.acts.map(a => `<span>${esc(a)}</span>`).join("")}</div>` : ""}</div>`).join("")
      : `<div class="card"><h2>Пиши как подруге</h2><div class="small muted">Что съела, сколько спала, на что потратила, какие задачи добавить или отметить. Я разложу всё по разделам и отвечу на вопросы по твоим данным.</div>
        <div class="chips">${CHAT_EXAMPLES.map(x => `<button class="chip" data-act="chatex" data-t="${esc(x)}">${esc(x)}</button>`).join("")}</div></div>`}
    ${ui.chatBusy ? `<div class="bubble bot muted">Записываю…</div>` : ""}
  </div>
  <form class="chat-in" data-form="chat">
    <textarea id="chat-t" name="text" rows="2" placeholder="Например: съела 2 яйца и тост, потратила 3000 на кофе" autocomplete="off"></textarea>
    <button class="btn pri" ${ui.chatBusy ? "disabled" : ""} aria-label="Отправить">Отправить</button>
  </form>`;
}
function chatPrompt(text, history) {
  const k = todayKey(), d = getDay(k), T = targets(), e = eaten(d), m = monthTotals(ymOf(k)), s = settings(), now = new Date();
  const ctx = {
    now: `${k} ${z(now.getHours())}:${z(now.getMinutes())}, ${weekday(k)}`,
    today: { tasks: (d.tasks || []).map(t => ({ text: t.text, done: t.done })), eaten_kcal: Math.round(e.k), protein_g: Math.round(e.p), water_ml: d.water, sleep: d.sleep, weight: d.weight },
    targets: T && { kcal: T.kcal, protein: T.p, fat: T.f, carbs: T.c, kcal_left: Math.round(T.kcal - e.k) },
    month_money: { income: m.inc, spent: m.out, saved: m.sav, by_category: m.byCat },
    expense_categories: OUT_CATS, income_categories: IN_CATS, savings_goals: getSavings().goals.map(g => ({ name: g.name, saved: g.saved, target: g.target })),
    month_goals: getPlan(ymOf(k)).goals.map(g => ({ text: g.text, kind: g.kind, progress: g.progress, target: g.target, done: g.done })),
    sports: Object.keys(SPORTS), meals: MEALS, reminders: s.reminders.map(r => r.time + " " + r.text)
  };
  return `Ты личный ассистент внутри приложения-трекера (сон, питание, задачи, спорт, здоровье, финансы в тенге). Цель хозяйки: похудеть, наладить сон, ничего не забывать, копить деньги.
Она пишет, что сделать или записать. Разбери сообщение на действия и ответь коротко по-русски, на «ты». На вопросы отвечай по данным из контекста. Не выдумывай: если не хватает важного (например, суммы), спроси и не добавляй это действие.

Верни только JSON: {"reply": "текст ответа", "actions": [ ... ]}. Допустимые действия (date по умолчанию сегодня, «вчера» = предыдущий день):
{"type":"add_meal","date":"YYYY-MM-DD","meal":"Завтрак|Обед|Ужин|Перекус","name":"...","grams":число|null,"kcal":число,"p":число,"f":число,"c":число}  оцени КБЖУ сама, учитывай кухню Казахстана и СНГ; каждое блюдо отдельным действием
{"type":"set_sleep","date":"...","bed":"HH:MM","wake":"HH:MM","quality":1-5|null}  date = день, когда проснулась
{"type":"add_water","date":"...","ml":число}
{"type":"set_weight","date":"...","kg":число}
{"type":"set_steps","date":"...","steps":число}
{"type":"add_workout","date":"...","sport":"одно из sports","min":число}
{"type":"set_health","date":"...","mood":1-5|null,"energy":1-5|null,"note":"..."|null,"vit":true|null}
{"type":"add_task","date":"...","text":"..."}
{"type":"done_task","date":"...","text":"точный текст задачи из today.tasks"}
{"type":"add_tx","date":"...","kind":"out|in|save","amount":число,"category":"для out из expense_categories, для in из income_categories, для save имя из savings_goals","note":"..."}
{"type":"add_goal","text":"...","kind":"count|check","target":число}
{"type":"goal_progress","text":"точный текст цели из month_goals","delta":число}
{"type":"add_reminder","time":"HH:MM","text":"..."}
В reply коротко скажи, что записала. Полезную подсказку (например, сколько ккал осталось) добавляй, только если она к месту.

Контекст: ${JSON.stringify(ctx)}
${history.length ? "Предыдущие сообщения:\n" + history.map(m => (m.role === "user" ? "Она: " : "Ты: ") + m.text).join("\n") + "\n" : ""}
Новое сообщение: ${text}`;
}
function applyActions(list) {
  const done = [], t = todayKey();
  const dateOf = a => (/^\d{4}-\d{2}-\d{2}$/.test(a.date || "") && a.date <= t ? a.date : t);
  const lc = s => String(s || "").trim().toLowerCase();
  for (const a of list) {
    try {
      const k = dateOf(a), when = k === t ? "" : ` (${prettyDay(k)})`;
      if (a.type === "add_meal") {
        const meal = MEALS.includes(a.meal) ? a.meal : guessMeal();
        mutDay(k, d => d.meals.push({ id: uid(), meal, name: String(a.name || "Блюдо"), g: num(a.grams), k: num(a.kcal) || 0, p: num(a.p) || 0, f: num(a.f) || 0, c: num(a.c) || 0 }));
        done.push(`${meal}: ${a.name}, ${Math.round(num(a.kcal) || 0)} ккал${when}`);
      } else if (a.type === "set_sleep") {
        mutDay(k, d => { if (a.bed) d.sleep.bed = a.bed; if (a.wake) d.sleep.wake = a.wake; if (num(a.quality)) d.sleep.q = num(a.quality); });
        done.push(`Сон: ${a.bed || "?"}–${a.wake || "?"}${when}`);
      } else if (a.type === "add_water" && num(a.ml)) {
        mutDay(k, d => d.water = Math.max(0, (d.water || 0) + num(a.ml))); done.push(`Вода +${num(a.ml)} мл${when}`);
      } else if (a.type === "set_weight" && num(a.kg)) {
        mutDay(k, d => d.weight = num(a.kg)); done.push(`Вес ${num(a.kg)} кг${when}`);
      } else if (a.type === "set_steps" && num(a.steps)) {
        mutDay(k, d => d.steps = num(a.steps)); done.push(`Шаги: ${num(a.steps)}${when}`);
      } else if (a.type === "add_workout" && num(a.min)) {
        const type = SPORTS[a.sport] ? a.sport : "Другое", w = lastWeight(k) || 65;
        mutDay(k, d => d.workouts.push({ id: uid(), type, min: num(a.min), kcal: SPORTS[type] * w * num(a.min) / 60 }));
        done.push(`Спорт: ${type}, ${num(a.min)} мин${when}`);
      } else if (a.type === "set_health") {
        mutDay(k, d => { if (num(a.mood)) d.health.mood = num(a.mood); if (num(a.energy)) d.health.energy = num(a.energy); if (a.note) d.health.note = [d.health.note, a.note].filter(Boolean).join("; "); if (a.vit === true) d.health.vit = true; });
        done.push(`Самочувствие отмечено${when}`);
      } else if (a.type === "add_task" && a.text) {
        mutDay(k, d => d.tasks.push({ id: uid(), text: String(a.text).trim(), done: false })); done.push(`Задача: ${a.text}${when}`);
      } else if (a.type === "done_task") {
        const d0 = getDay(k), task = d0.tasks.find(x => lc(x.text) === lc(a.text)) || d0.tasks.find(x => lc(x.text).includes(lc(a.text)) || lc(a.text).includes(lc(x.text)));
        if (task && !task.done) {
          mutDay(k, d => { const x = d.tasks.find(y => y.id === task.id); if (x) x.done = true; });
          if (task.goalId) mutPlan(ymOf(k), p => { const g = p.goals.find(x => x.id === task.goalId); if (g) g.progress += 1; });
          done.push(`Выполнено: ${task.text}`);
        }
      } else if (a.type === "add_tx" && num(a.amount) > 0) {
        const kind = ["out", "in", "save"].includes(a.kind) ? a.kind : "out", amt = num(a.amount);
        let cat = a.category, goal = null;
        if (kind === "out" && !OUT_CATS.includes(cat)) cat = "Другое";
        if (kind === "in" && !IN_CATS.includes(cat)) cat = "Другое";
        if (kind === "save") { goal = getSavings().goals.find(g => lc(g.name) === lc(cat)) || null; cat = goal ? goal.name : "Накопления"; }
        mutMonth(ymOf(k), m => m.tx.push({ id: uid(), d: k, t: kind, cat, amt, note: String(a.note || "").trim(), goalId: goal ? goal.id : null }));
        if (goal) mutSavings(s => { const g = s.goals.find(x => x.id === goal.id); if (g) g.saved += amt; });
        done.push(`${kind === "in" ? "Доход" : kind === "save" ? "Отложено" : "Расход"}: ${tg(amt)}, ${cat}${when}`);
      } else if (a.type === "add_goal" && a.text) {
        mutPlan(ymOf(t), p => p.goals.push({ id: uid(), text: String(a.text).trim(), kind: a.kind === "check" ? "check" : "count", target: Math.max(1, num(a.target) || 1), progress: 0, done: false }));
        done.push(`Цель месяца: ${a.text}`);
      } else if (a.type === "goal_progress") {
        const g0 = getPlan(ymOf(t)).goals.find(g => lc(g.text) === lc(a.text)) || getPlan(ymOf(t)).goals.find(g => lc(g.text).includes(lc(a.text)));
        if (g0) { mutPlan(ymOf(t), p => { const g = p.goals.find(x => x.id === g0.id); if (g.kind === "check") g.done = true; else g.progress = Math.max(0, g.progress + (num(a.delta) || 1)); }); done.push(`Прогресс цели: ${g0.text}`); }
      } else if (a.type === "add_reminder" && /^\d{1,2}:\d{2}$/.test(a.time || "") && a.text) {
        const time = a.time.padStart(5, "0");
        mutSettings(s => s.reminders.push({ id: uid(), time, text: String(a.text).trim() })); done.push(`Напоминание ${time}: ${a.text}`);
      }
    } catch (e) { /* skip a malformed action, keep the rest */ }
  }
  return done;
}
async function sendChat(text) {
  text = String(text || "").trim(); if (!text || ui.chatBusy) return;
  const ta = $("#chat-t"); if (ta) ta.value = "";
  const history = getChat().msgs.slice(-6);
  put("chat/main", { msgs: [...getChat().msgs, { id: uid(), role: "user", text, ts: Date.now() }].slice(-40) });
  ui.chatBusy = true; render(); scrollChat();
  let reply, acts = [];
  try {
    const res = await askJSON(chatPrompt(text, history));
    acts = applyActions(Array.isArray(res && res.actions) ? res.actions : []);
    reply = String((res && res.reply) || (acts.length ? "Готово." : "Не поняла, напиши по-другому."));
  } catch (e) { reply = aiErr(e && e.code); }
  put("chat/main", { msgs: [...getChat().msgs, { id: uid(), role: "assistant", text: reply, acts, ts: Date.now() }].slice(-40) });
  ui.chatBusy = false; render(); scrollChat();
}
function scrollChat() { if (ui.view === "chat") requestAnimationFrame(() => window.scrollTo(0, document.body.scrollHeight)); }
document.addEventListener("keydown", e => {
  if (e.target.id === "chat-t" && e.key === "Enter" && !e.shiftKey && !e.isComposing) { e.preventDefault(); e.target.form.requestSubmit(); }
});
async function askJSON(prompt) { const res = await callAI({ kind: "chat", prompt }); return res.json; }

/* ---------- in-app reminders ---------- */
let lastMin = new Date().getHours() * 60 + new Date().getMinutes();
setInterval(() => {
  const now = new Date(), m = now.getHours() * 60 + now.getMinutes();
  if (m === lastMin) return;
  const hit = settings().reminders.filter(r => { const t = toMin(r.time); return t > lastMin && t <= m; });
  lastMin = m;
  if (hit.length && !document.hidden) toast("Напоминание: " + hit.map(r => r.text).join(" · "), 12000);
  if (ui.view === "today") render();
}, 20000);

if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").then(() => refreshPushState().then(render)).catch(() => {});
else refreshPushState();
initDb();
