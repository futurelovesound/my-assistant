// Service worker: offline app shell + push notifications.
const CACHE = "assistant-v1";
const SHELL = ["./", "index.html", "app.js", "config.js", "manifest.webmanifest", "icons/icon-192.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// Network first for our own files, so updates arrive at once; cache when offline.
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  const own = url.origin === self.location.origin;
  const cdn = /cdn\.jsdelivr\.net|fonts\.(googleapis|gstatic)\.com/.test(url.host);
  if (!own && !cdn) return;
  e.respondWith(
    fetch(e.request).then(r => {
      if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
      return r;
    }).catch(() => caches.match(e.request).then(r => r || (e.request.mode === "navigate" ? caches.match("index.html") : undefined)))
  );
});

self.addEventListener("push", e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) { d = { body: e.data && e.data.text() }; }
  e.waitUntil(self.registration.showNotification(d.title || "Мой ассистент", {
    body: d.body || "",
    icon: "icons/icon-192.png",
    badge: "icons/badge-96.png",
    tag: d.tag || "reminder",
    data: { url: d.url || "./#today" }
  }));
});
self.addEventListener("notificationclick", e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || "./#today";
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
    for (const c of list) { if ("focus" in c) { c.navigate(new URL(url, self.registration.scope).href).catch(() => {}); return c.focus(); } }
    return self.clients.openWindow(new URL(url, self.registration.scope).href);
  }));
});
