/* ============================================================
   Birthday Gift Box — Vanilla JavaScript
   All DOM manipulation, sound, confetti, and box interactions.
   ============================================================ */

import './index.css';

// ============================
// 🎨  CUSTOMIZATION SECTION
// ============================
const CONFIG = {
  // Birthday message shown when box opens
  message: 'Happy Birthday! 🎉',
  subtitle: 'Wishing you a day filled with joy and laughter!',

  // Colors for the box body (gradient stops)
  boxColor1: '#e11d48',   // rose-600
  boxColor2: '#be123c',   // rose-700
  boxDarker: '#9f1239',   // rose-800 (sides)

  // Lid colors (slightly lighter)
  lidColor1: '#f43f5e',   // rose-500
  lidColor2: '#e11d48',   // rose-600

  // Ribbon color
  ribbonColor: '#facc15',  // yellow-400
  ribbonDark: '#eab308',   // yellow-500

  // Number of confetti particles
  confettiCount: 60,

  // Number of floating hearts
  heartCount: 8,

  // Confetti colors
  confettiColors: ['#facc15', '#f472b6', '#818cf8', '#34d399', '#fb923c', '#f87171', '#a78bfa', '#22d3ee'],
};

// ============================
// 🏗️  BUILD THE PAGE
// ============================
function buildPage() {
  const root = document.getElementById('root');
  root.innerHTML = '';
  root.className = 'bg-birthday min-h-screen flex flex-col items-center justify-center relative select-none';

  // -- Background stars --
  createStars(root, 50);

  // -- Ambient glow --
  const glow = document.createElement('div');
  glow.className = 'absolute rounded-full animate-pulse-glow pointer-events-none';
  glow.style.cssText = 'width:400px;height:400px;background:radial-gradient(circle,rgba(244,63,94,0.25) 0%,transparent 70%);top:50%;left:50%;transform:translate(-50%,-50%);z-index:0;';
  root.appendChild(glow);

  // -- Hint text --
  const hint = document.createElement('div');
  hint.id = 'click-hint';
  hint.className = 'animate-bounce-hint text-white text-base sm:text-lg font-bold tracking-wide mb-8 z-10 flex items-center gap-3';
  hint.style.cssText = 'text-shadow: 0 0 20px rgba(250,204,21,0.6), 0 0 40px rgba(250,204,21,0.3);';
  hint.innerHTML = `
    <span class="inline-block w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping"></span>
    <span class="bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">✨ Click to Open Your Gift! ✨</span>
    <span class="inline-block w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping"></span>
  `;
  root.appendChild(hint);

  // -- 3D Scene container --
  const scene = document.createElement('div');
  scene.className = 'perspective-scene z-10 cursor-pointer';
  scene.id = 'gift-scene';
  scene.style.cssText = 'min-height: 280px; display:flex; align-items:center; justify-content:center;';
  root.appendChild(scene);

  // -- Gift box 3D wrapper --
  const boxWrap = document.createElement('div');
  boxWrap.className = 'gift-box-3d idle-spin relative';
  boxWrap.id = 'gift-box';
  boxWrap.style.cssText = `width:var(--box-size);height:var(--box-size);margin:0 auto;`;
  scene.appendChild(boxWrap);

  // Build the body (bottom 5 faces — top is hidden by lid)
  buildBoxBody(boxWrap);

  // Build the lid (sits on top of body)
  buildLid(boxWrap);

  // Build ribbon & bow (on the box body + lid)
  buildRibbon(boxWrap);

  // -- Birthday message (hidden initially) --
  const msgWrap = document.createElement('div');
  msgWrap.id = 'birthday-message';
  msgWrap.className = 'z-10 mt-8 text-center opacity-0 pointer-events-none hidden';
  msgWrap.innerHTML = `
    <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 drop-shadow-lg">
      ${CONFIG.message}
    </h1>
    <p class="mt-3 text-white/70 text-base sm:text-lg font-medium">
      ${CONFIG.subtitle}
    </p>
  `;
  root.appendChild(msgWrap);

  // -- Close button (hidden initially) --
  const closeBtn = document.createElement('button');
  closeBtn.id = 'close-btn';
  closeBtn.className = 'hidden z-20 mt-6 px-6 py-2.5 rounded-full font-semibold text-sm sm:text-base bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 active:scale-95';
  closeBtn.textContent = '🎁 Close Gift';
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeBox();
  });
  root.appendChild(closeBtn);

  // -- Hearts container --
  const heartsWrap = document.createElement('div');
  heartsWrap.id = 'hearts-container';
  heartsWrap.className = 'absolute pointer-events-none z-30';
  heartsWrap.style.cssText = 'top:50%;left:50%;transform:translate(-50%,-50%);width:200px;height:200px;';
  root.appendChild(heartsWrap);

  // -- Click handler --
  scene.addEventListener('click', openBox);
}

// ============================
// 🧊  BOX BODY CONSTRUCTION
// ============================
function buildBoxBody(parent) {
  const faces = [
    { cls: 'face-front',  bg: CONFIG.boxColor1 },
    { cls: 'face-back',   bg: CONFIG.boxColor2 },
    { cls: 'face-left',   bg: CONFIG.boxDarker },
    { cls: 'face-right',  bg: CONFIG.boxDarker },
    { cls: 'face-bottom', bg: CONFIG.boxColor2 },
  ];

  faces.forEach(({ cls, bg }) => {
    const face = document.createElement('div');
    face.className = `box-face ${cls} rounded-sm`;
    face.style.cssText = `
      width: var(--box-size);
      height: var(--box-size);
      background: ${bg};
      border: 1px solid rgba(255,255,255,0.08);
    `;
    parent.appendChild(face);
  });
}

// ============================
// 🧢  LID CONSTRUCTION
// ============================
function buildLid(parent) {
  // Lid wrapper — positioned above the body
  const lidWrap = document.createElement('div');
  lidWrap.className = 'lid-wrap';
  lidWrap.id = 'lid';
  lidWrap.style.cssText = `
    width: var(--lid-size);
    height: var(--lid-height);
    position: absolute;
    top: calc(-1 * var(--lid-height));
    left: calc((var(--box-size) - var(--lid-size)) / 2);
  `;
  parent.appendChild(lidWrap);

  const lidFaces = [
    { cls: 'lid-front',  w: 'var(--lid-size)', h: 'var(--lid-height)', bg: CONFIG.lidColor1 },
    { cls: 'lid-back',   w: 'var(--lid-size)', h: 'var(--lid-height)', bg: CONFIG.lidColor2 },
    { cls: 'lid-left',   w: 'var(--lid-size)', h: 'var(--lid-height)', bg: CONFIG.lidColor2 },
    { cls: 'lid-right',  w: 'var(--lid-size)', h: 'var(--lid-height)', bg: CONFIG.lidColor2 },
    { cls: 'lid-top',    w: 'var(--lid-size)', h: 'var(--lid-size)',   bg: CONFIG.lidColor1 },
  ];

  lidFaces.forEach(({ cls, w, h, bg }) => {
    const face = document.createElement('div');
    face.className = `lid-face ${cls} rounded-sm`;
    face.style.cssText = `
      width: ${w};
      height: ${h};
      background: ${bg};
      border: 1px solid rgba(255,255,255,0.1);
    `;
    lidWrap.appendChild(face);
  });
}

// ============================
// 🎀  RIBBON & BOW
// ============================
function buildRibbon(parent) {
  // Vertical ribbon (front face)
  const vRibbon = document.createElement('div');
  vRibbon.className = 'box-face face-front ribbon-shimmer';
  vRibbon.style.cssText = `
    width: 20px;
    height: var(--box-size);
    left: calc(50% - 10px);
    background: ${CONFIG.ribbonColor};
    z-index: 5;
    border-radius: 2px;
  `;
  parent.appendChild(vRibbon);

  // Horizontal ribbon (front face)
  const hRibbon = document.createElement('div');
  hRibbon.className = 'box-face face-front ribbon-shimmer';
  hRibbon.style.cssText = `
    width: var(--box-size);
    height: 20px;
    top: calc(50% - 10px);
    background: ${CONFIG.ribbonColor};
    z-index: 5;
    border-radius: 2px;
  `;
  parent.appendChild(hRibbon);

  // Ribbon on left face
  const lRibbon = document.createElement('div');
  lRibbon.className = 'box-face face-left';
  lRibbon.style.cssText = `
    width: 20px;
    height: var(--box-size);
    left: calc(50% - 10px);
    background: ${CONFIG.ribbonDark};
    z-index: 5;
    border-radius: 2px;
  `;
  parent.appendChild(lRibbon);

  // Ribbon on right face
  const rRibbon = document.createElement('div');
  rRibbon.className = 'box-face face-right';
  rRibbon.style.cssText = `
    width: 20px;
    height: var(--box-size);
    left: calc(50% - 10px);
    background: ${CONFIG.ribbonDark};
    z-index: 5;
    border-radius: 2px;
  `;
  parent.appendChild(rRibbon);

  // Bow on top of lid
  const bow = document.createElement('div');
  bow.id = 'bow';
  bow.className = 'absolute z-20';
  bow.style.cssText = `
    top: calc(-1 * var(--lid-height) - 30px);
    left: 50%;
    transform: translateX(-50%) translateZ(calc(var(--lid-half) + 5px));
    font-size: 2.5rem;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
    text-shadow: 0 0 20px rgba(250,204,21,0.5);
  `;
  bow.textContent = '🎀';
  parent.appendChild(bow);
}

// ============================
// ⭐  BACKGROUND STARS
// ============================
function createStars(container, count) {
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.cssText = `
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      width: ${1 + Math.random() * 3}px;
      height: ${1 + Math.random() * 3}px;
      --twinkle-dur: ${2 + Math.random() * 4}s;
      --twinkle-delay: ${Math.random() * 4}s;
    `;
    container.appendChild(star);
  }
}

// ============================
// 🔊  SOUND EFFECT (Web Audio)
// ============================
function playOpenSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();

    // Bright chime
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.15);
    gain1.gain.setValueAtTime(0.3, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc1.connect(gain1).connect(ctx.destination);
    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.6);

    // Second sparkle tone
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1320, ctx.currentTime + 0.1);
    osc2.frequency.exponentialRampToValueAtTime(2640, ctx.currentTime + 0.3);
    gain2.gain.setValueAtTime(0.15, ctx.currentTime + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
    osc2.connect(gain2).connect(ctx.destination);
    osc2.start(ctx.currentTime + 0.1);
    osc2.stop(ctx.currentTime + 0.7);
  } catch (e) {
    // Audio not supported — silently skip
  }
}

// ============================
// 🎊  CONFETTI BURST
// ============================
function launchConfetti() {
  for (let i = 0; i < CONFIG.confettiCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'confetti-particle';
    const color = CONFIG.confettiColors[Math.floor(Math.random() * CONFIG.confettiColors.length)];
    const x = Math.random() * window.innerWidth;
    const duration = 2 + Math.random() * 2;
    const delay = Math.random() * 0.5;
    const size = 6 + Math.random() * 8;
    const rotation = Math.random() * 360;

    particle.style.cssText = `
      left: ${x}px;
      top: -20px;
      width: ${size}px;
      height: ${size * 0.6}px;
      background: ${color};
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      --fall-duration: ${duration}s;
      --fall-delay: ${delay}s;
      transform: rotate(${rotation}deg);
    `;

    document.body.appendChild(particle);

    // Clean up after animation
    setTimeout(() => particle.remove(), (duration + delay) * 1000 + 200);
  }
}

// ============================
// 💕  FLOATING HEARTS
// ============================
function launchHearts() {
  const container = document.getElementById('hearts-container');
  const hearts = ['💖', '💝', '💗', '💜', '🩷', '✨', '⭐', '🌟'];

  for (let i = 0; i < CONFIG.heartCount; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart-particle';
    const duration = 2 + Math.random() * 2;
    const delay = Math.random() * 1.5;

    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.cssText = `
      left: ${20 + Math.random() * 60}%;
      bottom: 0;
      --float-duration: ${duration}s;
      --float-delay: ${delay}s;
    `;

    container.appendChild(heart);

    setTimeout(() => heart.remove(), (duration + delay) * 1000 + 200);
  }
}

// ============================
// 📦  OPEN BOX
// ============================
let isOpen = false;

function openBox() {
  if (isOpen) return;
  isOpen = true;

  const giftBox = document.getElementById('gift-box');
  const lid = document.getElementById('lid');
  const hint = document.getElementById('click-hint');
  const msg = document.getElementById('birthday-message');
  const closeBtn = document.getElementById('close-btn');

  // Stop idle rotation
  giftBox.classList.remove('idle-spin');
  giftBox.classList.add('opened');

  // Open the lid
  lid.classList.add('open');

  // Hide hint
  hint.style.opacity = '0';
  hint.style.transition = 'opacity 0.3s ease';
  setTimeout(() => hint.classList.add('hidden'), 300);

  // Play sound
  playOpenSound();

  // Launch effects
  setTimeout(() => {
    launchConfetti();
    launchHearts();
  }, 400);

  // Show message
  setTimeout(() => {
    msg.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
    msg.classList.add('animate-message-reveal');
  }, 500);

  // Show close button
  setTimeout(() => {
    closeBtn.classList.remove('hidden');
    closeBtn.classList.add('animate-fade-slide-up');
  }, 800);
}

// ============================
// 📦  CLOSE BOX
// ============================
function closeBox() {
  if (!isOpen) return;
  isOpen = false;

  const giftBox = document.getElementById('gift-box');
  const lid = document.getElementById('lid');
  const hint = document.getElementById('click-hint');
  const msg = document.getElementById('birthday-message');
  const closeBtn = document.getElementById('close-btn');

  // Close the lid
  lid.classList.remove('open');

  // Hide message
  msg.classList.add('opacity-0', 'pointer-events-none');
  msg.classList.remove('animate-message-reveal');
  setTimeout(() => msg.classList.add('hidden'), 400);

  // Hide close button
  closeBtn.classList.add('hidden');
  closeBtn.classList.remove('animate-fade-slide-up');

  // Restart idle rotation after a beat
  setTimeout(() => {
    giftBox.classList.remove('opened');
    giftBox.classList.add('idle-spin');
  }, 600);

  // Show hint again
  setTimeout(() => {
    hint.classList.remove('hidden');
    hint.style.opacity = '1';
  }, 800);
}

// ============================
// 🚀  INITIALIZE
// ============================
document.addEventListener('DOMContentLoaded', buildPage);
