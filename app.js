// ════════════════════════════════════════════
//  Ranjana's Safe Space — app.js
// ════════════════════════════════════════════

// ── STAR BACKGROUND ──────────────────────────
(function createStars() {
  const container = document.getElementById('starsContainer');
  for (let i = 0; i < 20; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 3}s;
      animation-duration: ${2 + Math.random() * 3}s;
    `;
    container.appendChild(star);
  }
})();

// ── DATE & PROGRESS ──────────────────────────
(function initProgress() {
  const startDate = new Date('2025-06-09'); // Ranjana started
  const examDate  = new Date('2026-06-24'); // Exam day
  const today     = new Date();

  const totalDays   = Math.round((examDate - startDate) / 864e5);
  const elapsed     = Math.max(0, Math.round((today - startDate) / 864e5));
  const daysLeft    = Math.max(0, Math.round((examDate - today) / 864e5));
  const pct         = Math.min(100, Math.round((elapsed / totalDays) * 100));

  document.getElementById('dayNum').textContent  = elapsed;
  document.getElementById('sDays').textContent   = elapsed;
  document.getElementById('sWeeks').textContent  = Math.floor(elapsed / 7);
  document.getElementById('sLeft').textContent   = daysLeft;
  document.getElementById('pctLabel').textContent = pct + '%';

  // Animate bar after short delay
  setTimeout(() => {
    document.getElementById('progFill').style.width = pct + '%';
  }, 400);

  // Countdown message
  const cd = document.getElementById('examCd');
  if (daysLeft <= 0) {
    cd.textContent = 'This is your moment, Ranjana. Go show them everything you\'ve got. 🌟';
  } else if (daysLeft === 1) {
    cd.textContent = 'Tomorrow is exam day. You are ready. You\'ve earned this. 💛';
  } else {
    cd.textContent = `Your exam is on June 24 — ${daysLeft} days away. Everything you've done is preparing you for that moment. ✨`;
  }
})();

// ── VIRTUAL HUG ──────────────────────────────
function triggerHug() {
  const section = document.getElementById('hugSection');
  section.classList.add('hugging');
  burstHearts();
}

function resetHug() {
  document.getElementById('hugSection').classList.remove('hugging');
}

function burstHearts() {
  const container = document.getElementById('heartsContainer');
  const emojis = ['💛', '💜', '🌸', '💖', '✨', '🧸', '💗', '⭐'];
  const count = 14;

  // Centre of screen approximately
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;

  for (let i = 0; i < count; i++) {
    const h = document.createElement('div');
    h.className = 'heart';
    h.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    const angle = (Math.random() * 360) * Math.PI / 180;
    const dist  = 80 + Math.random() * 130;
    const tx    = Math.cos(angle) * dist;
    const ty    = Math.sin(angle) * dist - 60;
    const rot   = (Math.random() - 0.5) * 120 + 'deg';

    h.style.left = cx + 'px';
    h.style.top  = cy + 'px';
    h.style.setProperty('--tx', tx + 'px');
    h.style.setProperty('--ty', ty + 'px');
    h.style.setProperty('--rot', rot);
    h.style.animationDelay = (Math.random() * 0.25) + 's';
    h.style.fontSize = (18 + Math.random() * 14) + 'px';

    container.appendChild(h);
    setTimeout(() => h.remove(), 1800);
  }
}

// ── MOOD RESPONSES ────────────────────────────
const moods = {
  stressed: {
    bg: '#fef3c7', border: '#d97706',
    headline: 'Stressed is just how deeply you care showing up.',
    body: `When your brain feels like a hundred open tabs — that's your dedication talking.
You care so much about this, and that's a beautiful thing. Take a breath.
Close your eyes. Then pick just one concept, one page, one problem — not the whole syllabus. Just one. That's today's win.`,
    tip: '💛 You don\'t have to solve everything right now. One thing at a time.',
    tipBg: '#fffbeb', tipBorder: '#fcd34d'
  },
  tired: {
    bg: '#ede9fe', border: '#7c3aed',
    headline: 'Your tired is earned. That makes it different.',
    body: `Rest is not giving up — it's choosing to come back stronger tomorrow.
You've put in so much already, Ranjana. A rested mind absorbs far more in one hour than an exhausted one in five.
Tonight, you have full permission to stop. The material will be there tomorrow. And so will your strength.`,
    tip: '💜 Tomorrow you\'ll pick it right back up. Tonight, you don\'t have to.',
    tipBg: '#f5f3ff', tipBorder: '#c4b5fd'
  },
  confident: {
    bg: '#dcfce7', border: '#16a34a',
    headline: 'This version of you, right now — yes. This one.',
    body: `Hold onto this feeling. This clarity, this calm belief that it's actually possible — bottle it.
Use this energy to tackle the hardest topic you've been avoiding, or to revisit your weakest area.
Confident days are rare gifts. Let this one do its work.`,
    tip: '🌿 You are more ready than you realise. Keep building on days like this.',
    tipBg: '#f0fdf4', tipBorder: '#6ee7b7'
  },
  overwhelmed: {
    bg: '#fce7f3', border: '#be185d',
    headline: 'The wave feels enormous. And you are standing in it.',
    body: `When everything feels like too much, your mind is trying to hold all of it at once.
You don't have to. Write down what's spinning in your head — just getting it onto paper takes away its power.
Then put the pen down. You're allowed to put it all down for a moment.`,
    tip: '🌸 One thing. One hour. That\'s the whole plan.',
    tipBg: '#fff1f2', tipBorder: '#fda4af'
  }
};

function showMood(type) {
  const m = moods[type];
  const card = document.getElementById('msgCard');
  card.style.background   = m.bg;
  card.style.borderColor  = m.border;
  card.innerHTML = `
    <div class="msg-head" style="color:${m.border}">${m.headline}</div>
    <div class="msg-body">${m.body.replace(/\n/g, '<br>')}</div>
    <div class="msg-tip" style="background:${m.tipBg};border:0.5px solid ${m.tipBorder}">${m.tip}</div>
  `;
  card.classList.add('show');
  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ── SECRET PAGE (5-tap flower) ────────────────
let logoClicks = 0;
let logoTimer  = null;

function handleLogoTap() {
  logoClicks++;
  const badge = document.getElementById('clickBadge');
  badge.style.display = 'flex';
  badge.textContent   = logoClicks;
  clearTimeout(logoTimer);

  if (logoClicks >= 5) {
    logoClicks = 0;
    badge.style.display = 'none';
    openSecret();
  } else {
    logoTimer = setTimeout(() => {
      logoClicks = 0;
      badge.style.display = 'none';
    }, 2200);
  }
}

function openSecret() {
  const wrap = document.getElementById('secretWrap');
  wrap.classList.add('open');
  setTimeout(() => {
    wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function closeSecret() {
  document.getElementById('secretWrap').classList.remove('open');
}

// Attach logo events
const logoWrap = document.getElementById('logoWrap');
logoWrap.addEventListener('click', handleLogoTap);
logoWrap.addEventListener('touchend', function(e) {
  e.preventDefault(); // prevent ghost click on mobile
  handleLogoTap();
}, { passive: false });

// ── KONAMI CODE ───────────────────────────────
const konamiSequence = [38,38,40,40,37,39,37,39,66,65];
let konamiIndex = 0;

document.addEventListener('keydown', function(e) {
  if (e.keyCode === konamiSequence[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiSequence.length) {
      konamiIndex = 0;
      showToast('🎉', 'You found the Konami code! That\'s exactly the energy you bring to every exam question, Ranjana. Unstoppable. 💪');
      burstHearts();
    }
  } else {
    konamiIndex = 0;
  }
});

// ── TOAST ─────────────────────────────────────
function showToast(icon, message) {
  const toast = document.getElementById('toast');
  toast.innerHTML = `<div style="font-size:22px;margin-bottom:5px">${icon}</div><div>${message}</div>`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4500);
}