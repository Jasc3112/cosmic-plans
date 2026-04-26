// =====================================================
// CONFIG — edita tras crear el repo
// =====================================================
const CONFIG = {
  githubUser: 'Jasc3112',
  githubRepo: 'cosmic-plans',
};

// =====================================================
// DATA
// =====================================================
const PLANS = [
  { id: 'cafe-largo',       emoji: '☕', title: 'Café Largo',              desc: 'Un café largo en un sitio con alma — Artesano (La Candelaria) o Franca (Los Palos Grandes). Plan para distraernos mejor.' },
  { id: 'avila-tour',       emoji: '🍓', title: 'Tour por el Ávila',       desc: 'Subir al Ávila a que tú me hagas tour. Pero spoiler: yo quiero fresas con crema arriba 👀' },
  { id: 'bowling',          emoji: '🎳', title: 'Bowling',                 desc: 'Una partida de bowling. Regla simple: el que pierda paga la cena 😈' },
  { id: 'cocinar',          emoji: '🍳', title: 'Cocinar Juntos',          desc: 'Vamos al supermercado, compramos lo que se nos antoje y… te enseño a cocinar arroz 🍚 (técnica top-secret).' },
  { id: 'turista-ccs',      emoji: '🏛️', title: 'Día Turista en Caracas',  desc: 'Plan a pie por Caracas: Centro Histórico, alguna plaza, museos chévere, almuerzo en sitios random. Pies cansados, fotos absurdas.' },
  { id: 'escalada',         emoji: '🧗', title: 'Probar Escalada',         desc: 'Una clase de prueba en Exit Escalada (La Urbina). El equipo lo prestan, salir de la zona de confort incluida.' },
  { id: 'chocolate-libros', emoji: '📚', title: 'Chocolate y Libros',      desc: 'Café-librería en El Hatillo: pedir chocolate caliente y agarrar libros random del estante para hojear juntos. Plan tipo invierno acogedor.' },
  { id: 'plan-aburrido',    emoji: '🌳', title: 'Plan "Aburrido"',         desc: 'Plaza Altamira o Parque Los Caobos. Sin música, sin lujos. Solo existir juntos un rato.' },
  { id: 'jardin-botanico',  emoji: '🌿', title: 'Jardín Botánico',         desc: 'Caminar por un sitio inmenso y silencioso. Hablar de cosas que importan.' },
  { id: 'picnic-laguito',   emoji: '🧺', title: 'Picnic en el Laguito',    desc: 'Manta, quesos, pan, snacks y conversación frente al lago en el Círculo Militar.' },
  { id: 'galipan',          emoji: '🌄', title: 'Día en Galipán',          desc: 'Subir en rústico desde Cotiza, almorzar en Hacienda Vieja o Le Galipanier. Desconectar de la ciudad.' },
  { id: 'el-hatillo',       emoji: '🍝', title: 'Cena en El Hatillo',      desc: 'Caminar el pueblo, cena en Sempre Dritto o tapas. Clima fresco, callecitas, todo cute.' },
  { id: 'playa',            emoji: '🌊', title: 'Escapada a la Playa',     desc: 'La Guaira o Higuerote. Toldo, pescado fresco frente al mar, desconectar del ruido.' },
];

// Random BMO + characters quotes (mostrarlas como tips)
const BMO_QUOTES = [
  '¿Sabías que algorítmicamente esto sigue sin ser una cita? 👀',
  'Garnet diría: "veo futuras risas"',
  'Finn dice: ¡matemático! Sigue eligiendo.',
  'Pearl: "es importante ser organizada con los planes"',
  'Esto sigue sin ser una cita… ¿o sí? 💕',
  'BMO te observa con cariño',
  'Amethyst dice: "elige el más divertido"',
  'Princesa Bubblegum aprobaría tu selección',
  'Steven cree en ti ⭐',
  'Jake dice: "los planes simples son los mejores, hermano"',
  'Si dudas, elige el que te haga sonreír',
  'Lapis dice: "está bien tomarse el tiempo"',
  'Marceline aprueba el plan más random',
];

// Easter eggs por tarjeta — aparecen con probabilidad al elegirlas
const CARD_EGGS = {
  'cafe-largo':       'El café es solo café. Esto no es una cita 🕊️ (¿o sí?)',
  'avila-tour':       'Recordatorio cósmico: tú prometiste fresas con crema 🍓',
  'bowling':          'Lleva la billetera. Por las dudas. 🪙',
  'cocinar':          'Si el arroz queda quemado, fingimos que era plan B 🍚',
  'turista-ccs':      'Caracas a pie cuenta como aventura legítima 🚶',
  'escalada':         'Caerse cuenta como aventura. La caída elegante, el doble.',
  'chocolate-libros': 'Tip: el libro más random suele ser el mejor 📖',
  'plan-aburrido':    'El plan más "aburrido" suele ser el revelador 🪐',
  'jardin-botanico':  'El silencio cómodo es la prueba final',
  'picnic-laguito':   'Pan, queso y vibes. Todo lo demás es opcional',
  'galipan':          'El frío de Galipán está hecho para abrigarse 🤔',
  'el-hatillo':       'Caminar tomados de la mano es OPCIONAL pero recomendado por BMO',
  'playa':            'Recordatorio: protector solar > todo lo demás 🧴',
};

// =====================================================
// STATE (localStorage)
// =====================================================
const STORAGE_KEY = 'cosmic-plans-state-v2';
let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return (parsed && typeof parsed === 'object') ? parsed : {};
  } catch { return {}; }
}
function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
}

// =====================================================
// SCREEN NAV
// =====================================================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =====================================================
// CARDS RENDER
// =====================================================
function renderCards() {
  const grid = document.getElementById('cardsGrid');
  grid.innerHTML = '';
  PLANS.forEach(plan => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = plan.id;
    if (state[plan.id]) card.classList.add(state[plan.id]);

    card.innerHTML = `
      <span class="status-badge">${badgeText(state[plan.id])}</span>
      <span class="emoji" aria-hidden="true">${plan.emoji}</span>
      <h3>${plan.title}</h3>
      <p>${plan.desc}</p>
    `;

    let clickTimer = null;
    const DBLCLICK_DELAY = 260;

    card.addEventListener('click', () => {
      if (clickTimer) return;
      clickTimer = setTimeout(() => {
        toggleSingle(plan.id);
        clickTimer = null;
      }, DBLCLICK_DELAY);
    });

    card.addEventListener('dblclick', () => {
      if (clickTimer) { clearTimeout(clickTimer); clickTimer = null; }
      toggleDouble(plan.id);
    });

    grid.appendChild(card);
  });
  updateCounters();
  updateSubmitState();
}

function badgeText(status) {
  if (status === 'interested') return '⭐ Me interesa';
  if (status === 'maybe')      return '🤔 Tal vez';
  return '';
}

// =====================================================
// CARD TOGGLE
// =====================================================
function toggleSingle(id) {
  const wasInterested = state[id] === 'interested';
  if (wasInterested) delete state[id];
  else state[id] = 'interested';
  saveState();
  refreshCard(id);
  updateCounters();
  updateSubmitState();

  if (!wasInterested) {
    if (CARD_EGGS[id] && Math.random() < 0.45) showBmoTip(CARD_EGGS[id]);
    else showBmoTip();
  }
}

function toggleDouble(id) {
  const wasMaybe = state[id] === 'maybe';
  if (wasMaybe) delete state[id];
  else state[id] = 'maybe';
  saveState();
  refreshCard(id);
  updateCounters();
  updateSubmitState();
  if (!wasMaybe) showBmoTip('Anotado: tal vez 🤔 Lo pensamos.');
}

function refreshCard(id) {
  const card = document.querySelector(`.card[data-id="${id}"]`);
  if (!card) return;
  card.classList.remove('interested', 'maybe');
  if (state[id]) card.classList.add(state[id]);
  const badge = card.querySelector('.status-badge');
  badge.textContent = badgeText(state[id]);
}

function updateCounters() {
  const interested = Object.values(state).filter(v => v === 'interested').length;
  const maybe      = Object.values(state).filter(v => v === 'maybe').length;
  document.getElementById('interestedCount').textContent = interested;
  document.getElementById('maybeCount').textContent = maybe;
}

function updateSubmitState() {
  document.getElementById('submitBtn').disabled = Object.keys(state).length === 0;
}

// =====================================================
// BMO TIPS
// =====================================================
let lastTipIdx = -1;
function showBmoTip(forcedText) {
  const tip = document.getElementById('bmoTip');
  let text = forcedText;
  if (!text) {
    let i;
    do { i = Math.floor(Math.random() * BMO_QUOTES.length); }
    while (i === lastTipIdx && BMO_QUOTES.length > 1);
    lastTipIdx = i;
    text = BMO_QUOTES[i];
  }
  tip.textContent = '🤖 ' + text;
  tip.classList.add('visible');
  clearTimeout(tip._t);
  tip._t = setTimeout(() => tip.classList.remove('visible'), 3600);
}

// =====================================================
// SUMMARY + SUBMISSION
// =====================================================
function buildSummary() {
  const interested = PLANS.filter(p => state[p.id] === 'interested');
  const maybe      = PLANS.filter(p => state[p.id] === 'maybe');
  const container  = document.getElementById('summaryContent');

  let html = '';
  if (interested.length) {
    html += `<div class="summary-section interested">
      <h3>⭐ Me interesa (${interested.length})</h3>
      <ul class="summary-list">${interested.map(p => `<li><span>${p.emoji}</span><strong>${escapeHtml(p.title)}</strong></li>`).join('')}</ul>
    </div>`;
  }
  if (maybe.length) {
    html += `<div class="summary-section maybe">
      <h3>🤔 Tal vez, lo pienso (${maybe.length})</h3>
      <ul class="summary-list">${maybe.map(p => `<li><span>${p.emoji}</span><strong>${escapeHtml(p.title)}</strong></li>`).join('')}</ul>
    </div>`;
  }
  if (!interested.length && !maybe.length) {
    html = `<p style="text-align:center;color:var(--text-soft);">No hay nada elegido todavía 🌙</p>`;
  }
  container.innerHTML = html;
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}

function buildMarkdown() {
  const date = new Date().toLocaleString('es-VE', { dateStyle: 'long', timeStyle: 'short' });
  const interested = PLANS.filter(p => state[p.id] === 'interested');
  const maybe      = PLANS.filter(p => state[p.id] === 'maybe');
  const passed     = PLANS.filter(p => !state[p.id]);

  let md  = `# Cronograma inesperado — respuestas ✨\n\n`;
  md += `**Fecha:** ${date}\n\n`;
  md += `---\n\n`;
  md += `## ⭐ Me interesa (${interested.length})\n\n`;
  md += interested.length
    ? interested.map(p => `- ${p.emoji} **${p.title}** — ${p.desc}`).join('\n') + '\n\n'
    : '_(ninguno)_\n\n';
  md += `## 🤔 Tal vez, lo pienso (${maybe.length})\n\n`;
  md += maybe.length
    ? maybe.map(p => `- ${p.emoji} **${p.title}** — ${p.desc}`).join('\n') + '\n\n'
    : '_(ninguno)_\n\n';
  md += `## ○ Sin selección (${passed.length})\n\n`;
  md += passed.length
    ? passed.map(p => `- ${p.emoji} ${p.title}`).join('\n') + '\n'
    : '_(ninguno)_\n';
  return md;
}

function openGithubIssue() {
  const date = new Date().toLocaleDateString('es-VE');
  const interested = Object.values(state).filter(v => v === 'interested').length;
  const maybe = Object.values(state).filter(v => v === 'maybe').length;
  const title = `Cronograma inesperado (${date}) — ${interested}⭐ ${maybe}🤔`;
  const body = buildMarkdown();
  const url = `https://github.com/${CONFIG.githubUser}/${CONFIG.githubRepo}/issues/new`
            + `?title=${encodeURIComponent(title)}`
            + `&body=${encodeURIComponent(body)}`
            + `&labels=respuestas`;
  window.open(url, '_blank', 'noopener');
}

async function copyResults() {
  const md = buildMarkdown();
  let ok = false;
  try {
    await navigator.clipboard.writeText(md);
    ok = true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = md;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { ok = document.execCommand('copy'); } catch {}
    ta.remove();
  }
  if (ok) flashButton('copyBtn', '✓ Copiado al portapapeles');
  else alert('No se pudo copiar automáticamente. Selecciona el texto manualmente:\n\n' + md);
}

function flashButton(id, text) {
  const btn = document.getElementById(id);
  const orig = btn.textContent;
  btn.textContent = text;
  btn.disabled = true;
  setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 1800);
}

function resetAll() {
  if (!confirm('¿Reiniciar todas las elecciones? Esto borra lo seleccionado.')) return;
  state = {};
  saveState();
  renderCards();
  showBmoTip('Limpiado. Lienzo cósmico en blanco ✨');
}

// =====================================================
// INIT
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('startBtn').addEventListener('click', () => {
    showScreen('cards');
    renderCards();
    setTimeout(() => showBmoTip('Tip: 1 click = me interesa, 2 clicks = tal vez ⭐'), 600);
  });
  document.getElementById('submitBtn').addEventListener('click', () => {
    buildSummary();
    showScreen('summary');
  });
  document.getElementById('resetBtn').addEventListener('click', resetAll);
  document.getElementById('sendGithub').addEventListener('click', openGithubIssue);
  document.getElementById('copyBtn').addEventListener('click', copyResults);
  document.getElementById('backBtn').addEventListener('click', () => showScreen('cards'));

  // BMO egg button
  document.getElementById('bmoEgg').addEventListener('click', () => {
    showBmoTip();
  });

  // tiny easter egg: type "stars" anywhere
  let buf = '';
  document.addEventListener('keydown', e => {
    if (e.key.length !== 1) return;
    buf = (buf + e.key.toLowerCase()).slice(-6);
    if (buf.endsWith('stars')) {
      document.body.style.animation = 'pulse 0.6s';
      setTimeout(() => document.body.style.animation = '', 600);
      showBmoTip('💎 Garnet, Pearl, Amethyst… ¡Steven! ✨');
    }
  });
});
