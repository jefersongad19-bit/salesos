/* ═══════════════════════════════════════════════════
   SalesOS — Service Worker
   Update 100% silencioso:
   - Bump CACHE_VERSION a cada deploy
   - skipWaiting + clients.claim assume controle na hora
   - index.html sempre network-first (nunca serve versão velha)
   - assets cache-first (rápido e offline)
═══════════════════════════════════════════════════ */

const CACHE_VERSION = 'sos-v4-2026-06-22-02';
const CORE = './';
const INDEX = './index.html';

// Assets que vale pré-cachear (single-file, então só o essencial)
const PRECACHE = [
  './',
  './index.html',
  './manifest.json'
];

/* ── INSTALL ── */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_VERSION)
      .then(c => c.addAll(PRECACHE).catch(() => {}))
      .then(() => self.skipWaiting())   // não espera abas fecharem
  );
});

/* ── ACTIVATE ── limpa caches de versões antigas ── */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())  // assume controle das abas abertas
  );
});

/* ── MENSAGEM do index pedindo update imediato ── */
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
  // Página pedindo qual versão está ativa (pro selo do Config)
  if (e.data && e.data.type === 'GET_VERSION' && e.ports && e.ports[0]) {
    e.ports[0].postMessage({ version: CACHE_VERSION });
  }
});

/* ── NOTIFICAÇÕES (#7) ──
   Ao tocar numa notificação: foca uma aba aberta (ou abre uma nova)
   e pede pra navegar até a aba Tarefas.
═══════════════════════════════════════════════════ */
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const alvo = (e.notification.data && e.notification.data.goto) || 'tasks';
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const c of list) {
        if ('focus' in c) {
          c.postMessage({ type: 'NAV', goto: alvo });
          return c.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow('./index.html#' + alvo);
      }
    })
  );
});

/* ── FETCH ──
   - navegação / index.html → network-first (cai pro cache só offline)
   - resto → cache-first com atualização em background
═══════════════════════════════════════════════════ */
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // só lida com mesma origem
  if (url.origin !== self.location.origin) return;

  const isDoc = req.mode === 'navigate' ||
                url.pathname.endsWith('/') ||
                url.pathname.endsWith('index.html');

  if (isDoc) {
    // NETWORK-FIRST: garante que a versão nova sempre aparece
    e.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then(c => c.put(INDEX, copy));
          return res;
        })
        .catch(() => caches.match(INDEX).then(r => r || caches.match(CORE)))
    );
    return;
  }

  // CACHE-FIRST para os demais assets
  e.respondWith(
    caches.match(req).then(cached => {
      const network = fetch(req)
        .then(res => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE_VERSION).then(c => c.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
