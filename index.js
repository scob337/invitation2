/* ══════════════════════════════════════════
   ROYAL DARK THEME - JAVASCRIPT
══════════════════════════════════════════ */

/**
 * يمكنك تغيير مسار أو رابط الأغنية من هنا بسهولة
 * ضع مسار الملف المحلي أو رابط الأغنية المباشر بين علامتي التنصيص
 */
const AUDIO_SRC = "sound1.mp3";

/* ── AUDIO ── */
const audio = document.getElementById("bgMusic");
const audioBtn = document.getElementById("audioBtn");
const audioWaves = document.getElementById("audioWaves");
const audioIcon = document.getElementById("audioIcon");
let playing = false;

// Set audio source
if (audio) {
  audio.src = AUDIO_SRC;
}

// Attempt to play on scroll specifically
function checkScrollAndPlay() {
  if (!playing && audio && window.scrollY > 50) {
    playing = true;
    audio.volume = 0.5;
    audio
      .play()
      .then(() => {
        audioWaves.style.opacity = "1";
        audioIcon.style.display = "none";
        window.removeEventListener("scroll", checkScrollAndPlay);
        document.removeEventListener("click", forcePlay);
        document.removeEventListener("touchstart", forcePlay);
      })
      .catch(() => {
        playing = false;
      });
  }
}

function forcePlay() {
  if (!playing && audio) {
    playing = true;
    audio.volume = 0.5;
    audio
      .play()
      .then(() => {
        audioWaves.style.opacity = "1";
        audioIcon.style.display = "none";
        window.removeEventListener("scroll", checkScrollAndPlay);
        document.removeEventListener("click", forcePlay);
        document.removeEventListener("touchstart", forcePlay);
      })
      .catch(() => {
        playing = false;
      });
  }
}

window.addEventListener("scroll", checkScrollAndPlay, { passive: true });
document.addEventListener("click", forcePlay, { once: true, passive: true });
document.addEventListener("touchstart", forcePlay, {
  once: true,
  passive: true,
});

function toggleAudio() {
  if (playing) {
    audio.pause();
    audioWaves.style.opacity = "0";
    audioIcon.style.display = "block";
    playing = false;
  } else {
    audio.volume = 0.5;
    audio.play().catch(() => {});
    audioWaves.style.opacity = "1";
    audioIcon.style.display = "none";
    playing = true;
  }
}

/* ── FX: PARTICLES & SPARKS ── */
function initParticles() {
  const c = document.getElementById("particles");
  for (let i = 0; i < 40; i++) {
    const p = document.createElement("div");
    const sz = Math.random() * 3 + 1;
    p.className = "particle";
    p.style.cssText = `
            width:${sz}px; height:${sz}px;
            left:${Math.random() * 100}%; bottom:-10px;
            animation-duration:${10 + Math.random() * 20}s;
            animation-delay:${Math.random() * 15}s;
            ${Math.random() > 0.5 ? "background:#fff;" : ""}
        `;
    c.appendChild(p);
  }
}

function spawnSparks() {
  const cont = document.getElementById("sparks");
  if (!cont) return;
  setInterval(() => {
    if (Math.random() > 0.6) {
      const spark = document.createElement("div");
      spark.className = "spark";
      const sz = Math.random() * 4 + 2;
      spark.style.width = sz + "px";
      spark.style.height = sz + "px";
      spark.style.left = Math.random() * 100 + "%";
      spark.style.bottom = Math.random() * 20 + "%";
      spark.style.animationDuration = 0.5 + Math.random() * 1.5 + "s";
      cont.appendChild(spark);
      setTimeout(() => spark.remove(), 2000);
    }
  }, 400); // adjust frequency
}

/* ── HERO APPEAR ── */
function initHeroAnims() {
  document.querySelectorAll("[data-animate]").forEach((el) => {
    el.style.animationDelay = el.dataset.delay + "ms";
  });
}

/* ── SCROLL REVEAL ── */
function initReveal() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  document
    .querySelectorAll(".reveal, .reveal-up")
    .forEach((el) => obs.observe(el));
}

/* ── COUNTDOWN ──
 * التاريخ: 3 أكتوبر 2026
 * البداية: ؤ 7 مساءً
 */
const WEDDate = new Date("2026-10-03T19:00:00").getTime();

function pad(n) {
  return String(n).padStart(2, "0");
}
const pval = {};
function upNum(id, val) {
  const el = document.getElementById(id);
  if (!el || pval[id] === val) return;

  // Quick flip animation for numbers
  el.style.opacity = "0";
  el.style.transform = "rotateX(90deg)";
  setTimeout(() => {
    el.textContent = val;
    el.style.opacity = "1";
    el.style.transform = "rotateX(0)";
    el.style.transition = "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
  }, 150);
  pval[id] = val;
}
function countdown() {
  const d = WEDDate - Date.now();
  if (d <= 0) {
    ["days", "hours", "minutes", "seconds"].forEach((id) => upNum(id, "00"));
    return;
  }
  upNum("days", pad(Math.floor(d / 86400000)));
  upNum("hours", pad(Math.floor((d % 86400000) / 3600000)));
  upNum("minutes", pad(Math.floor((d % 3600000) / 60000)));
  upNum("seconds", pad(Math.floor((d % 60000) / 1000)));
}

/* ── CANVAS (NIGHT THEME) ── */
function initCanvas() {
  const cv = document.getElementById("coupleCanvas");
  if (!cv) return;
  const DPR = window.devicePixelRatio || 1;
  const W = Math.min(window.innerWidth - 40, 800);
  const H = Math.round(W * 0.55);
  cv.width = W * DPR;
  cv.height = H * DPR;
  cv.style.width = W + "px";
  cv.style.height = H + "px";
  const c = cv.getContext("2d");
  c.scale(DPR, DPR);

  const GY = H * 0.85;
  const FH = H * 0.65;
  const S = FH / 200;

  // stars
  const stars = Array.from({ length: 80 }, () => ({
    x: Math.random() * W,
    y: Math.random() * (GY - 50),
    r: Math.random() * 2 + 0.5,
    a: Math.random(),
    va: (Math.random() - 0.5) * 0.03,
  }));

  let tick = 0;
  function draw() {
    requestAnimationFrame(draw);
    tick++;
    c.clearRect(0, 0, W, H);

    // Sky overlay
    c.fillStyle = "transparent";
    c.fillRect(0, 0, W, H);

    // Moon with pulsating glow
    let mglow = Math.sin(tick * 0.05) * 0.05;
    c.fillStyle = `rgba(201,168,76,${0.1 + mglow})`;
    c.beginPath();
    c.arc(W / 2, H * 0.4, H * 0.35, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = `rgba(201,168,76,${0.2 + mglow})`;
    c.beginPath();
    c.arc(W / 2, H * 0.4, H * 0.28, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = "#e8d08a";
    c.beginPath();
    c.arc(W / 2, H * 0.4, H * 0.18, 0, Math.PI * 2);
    c.fill();

    // Stars
    stars.forEach((st) => {
      st.a += st.va;
      if (st.a > 1 || st.a < 0) st.va *= -1;
      c.fillStyle = `rgba(255,255,255,${st.a})`;
      c.beginPath();
      c.arc(st.x, st.y, st.r, 0, Math.PI * 2);
      c.fill();
    });

    // Floor line
    c.fillStyle = "rgba(201,168,76,0.5)";
    c.fillRect(0, GY, W, 2);
    const grad = c.createLinearGradient(0, GY + 2, 0, H);
    grad.addColorStop(0, "rgba(201,168,76,0.15)");
    grad.addColorStop(1, "transparent");
    c.fillStyle = grad;
    c.fillRect(0, GY + 2, W, H - GY);

    // Couple silhouettes (Slight hover)
    let cHover = Math.sin(tick * 0.04) * 2 * S;
    const cx = W / 2,
      cy = GY + cHover;
    c.save();
    c.translate(cx, cy);

    // shadow
    c.fillStyle = "rgba(201,168,76,0.3)";
    c.beginPath();
    c.ellipse(0, 4 - cHover, 45 * S, 6 * S, 0, 0, Math.PI * 2);
    c.fill();

    // Groom (Left) -- solid dark with gold edges
    c.translate(-15 * S, 0);

    c.fillStyle = "#0a0812";
    c.strokeStyle = "#c9a84c";
    c.lineWidth = 1.8;
    // legs
    c.beginPath();
    c.moveTo(-5 * S, 0);
    c.lineTo(-5 * S, -FH * 0.3);
    c.lineTo(5 * S, -FH * 0.3);
    c.lineTo(5 * S, 0);
    c.closePath();
    c.fill();
    c.stroke();
    // body
    c.beginPath();
    c.moveTo(-15 * S, -FH * 0.3);
    c.lineTo(15 * S, -FH * 0.3);
    c.lineTo(20 * S, -FH * 0.7);
    c.lineTo(-20 * S, -FH * 0.7);
    c.closePath();
    c.fill();
    c.stroke();
    // head
    c.beginPath();
    c.arc(0, -FH * 0.85, 12 * S, 0, Math.PI * 2);
    c.fill();
    c.stroke();

    c.translate(30 * S, 0); // Bride (Right)

    // Dress
    c.beginPath();
    c.moveTo(0, -FH * 0.7);
    c.quadraticCurveTo(30 * S, -FH * 0.3, 45 * S, 0);
    c.lineTo(-45 * S, 0);
    c.quadraticCurveTo(-30 * S, -FH * 0.3, 0, -FH * 0.7);
    c.closePath();
    c.fill();
    c.stroke();

    // head
    c.beginPath();
    c.arc(0, -FH * 0.82, 11 * S, 0, Math.PI * 2);
    c.fill();
    c.stroke();
    // hair/veil
    c.beginPath();
    c.moveTo(-5 * S, -FH * 0.88);
    c.quadraticCurveTo(30 * S, -FH * 0.8, 35 * S, -FH * 0.4);
    c.stroke();

    // Embrace Arm
    c.beginPath();
    c.moveTo(-20 * S, -FH * 0.6);
    c.quadraticCurveTo(-30 * S, -FH * 0.6, -40 * S, -FH * 0.5);
    c.stroke();

    c.restore();

    // Floating hearts periodically
    if (tick % 70 === 0) {
      spawnDimHeart(W / 2);
    }
    drawDimHearts(c);
  }

  const dH = [];
  function spawnDimHeart(x) {
    dH.push({
      x: x + (Math.random() - 0.5) * 50,
      y: GY - FH * 0.7,
      a: 1,
      vy: -0.8 - Math.random(),
      s: Math.random() * 0.6 + 0.4,
    });
  }
  function drawDimHearts(c) {
    for (let i = dH.length - 1; i >= 0; i--) {
      let h = dH[i];
      h.y += h.vy;
      h.a -= 0.015;
      if (h.a <= 0) {
        dH.splice(i, 1);
        continue;
      }
      c.save();
      c.globalAlpha = h.a;
      c.translate(h.x, h.y);
      c.scale(h.s, h.s);
      c.fillStyle = "#e8d08a";
      c.beginPath();
      c.moveTo(0, 3);
      c.bezierCurveTo(-3, 0, -6, -3, -6, -6);
      c.bezierCurveTo(-6, -10, -3, -12, 0, -9);
      c.bezierCurveTo(3, -12, 6, -10, 6, -6);
      c.bezierCurveTo(6, -3, 3, 0, 0, 3);
      c.closePath();
      c.fill();
      c.restore();
    }
  }

  const obs = new IntersectionObserver((ent) => {
    if (ent[0].isIntersecting) requestAnimationFrame(draw);
  });
  obs.observe(cv);
}

/* ── RUN ALL DYNAMICS ── */
document.addEventListener("DOMContentLoaded", () => {
  initParticles();
  spawnSparks();
  initHeroAnims();
  initReveal();
  countdown();
  setInterval(countdown, 1000);
  initCanvas();
});
