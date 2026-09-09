import React, { useState, useEffect, useRef } from 'react';

import s1  from './assets/s1.jpg';
import s2  from './assets/s2.jpg';
import s3  from './assets/s3.jpg';
import s4  from './assets/s4.jpg';
import s5  from './assets/s5.jpg';
import s6  from './assets/s6.jpg';
import s7  from './assets/s7.jpg';
import s8  from './assets/s8.jpg';
import s9  from './assets/s9.jpg';
import s10 from './assets/s10.jpg';

const BG_SLIDES = [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10];

/**
 * Web Audio API synthesizer for festive chime sounds
 */
const playFestiveSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.12);

      gain.gain.setValueAtTime(0, ctx.currentTime + index * 0.12);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + index * 0.12 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.12 + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + index * 0.12);
      osc.stop(ctx.currentTime + index * 0.12 + 0.7);
    });
  } catch {
    // Audio context blocked or not supported
  }
};

/**
 * Cartoon Red Bow Component
 * Big puffy loops, inner shadow creases, center knot, and draping tails matching user reference
 */
function CartoonBow({ showTails = true }) {
  return (
    <svg
      viewBox="0 0 200 160"
      className="w-56 sm:w-64 h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)] select-none pointer-events-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* DRAPING TAILS */}
      {showTails && (
        <g id="tails">
          {/* Left tail */}
          <path
            d="M92 78 C80 92, 50 112, 46 142 C56 138, 70 135, 82 137 C87 116, 97 96, 102 82 Z"
            fill="#D31D1D"
            stroke="#2B0505"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Right tail */}
          <path
            d="M108 78 C120 92, 150 112, 156 144 C146 139, 132 136, 120 138 C115 116, 105 96, 98 82 Z"
            fill="#E52521"
            stroke="#2B0505"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
        </g>
      )}

      {/* LEFT PUFFY LOOP */}
      <g id="left-loop">
        <path
          d="M90 70 C75 35, 30 20, 16 48 C6 68, 20 102, 70 88 C82 85, 92 78, 96 72 Z"
          fill="#E52521"
          stroke="#2B0505"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path
          d="M68 62 C50 48, 38 48, 30 58 C24 66, 32 80, 56 78 C65 77, 74 72, 80 66 Z"
          fill="#991B1B"
          stroke="#2B0505"
          strokeWidth="2.5"
        />
        <path
          d="M32 38 C45 28, 65 32, 75 42"
          stroke="#FFA5A5"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </g>

      {/* RIGHT PUFFY LOOP */}
      <g id="right-loop">
        <path
          d="M110 70 C125 35, 170 20, 184 48 C194 68, 180 102, 130 88 C118 85, 108 78, 104 72 Z"
          fill="#E52521"
          stroke="#2B0505"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path
          d="M132 62 C150 48, 162 48, 170 58 C176 66, 168 80, 144 78 C135 77, 126 72, 120 66 Z"
          fill="#991B1B"
          stroke="#2B0505"
          strokeWidth="2.5"
        />
        <path
          d="M168 38 C155 28, 135 32, 125 42"
          stroke="#FFA5A5"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </g>

      {/* CENTER KNOT */}
      <g id="center-knot">
        <ellipse
          cx="100"
          cy="74"
          rx="18"
          ry="15"
          fill="#E52521"
          stroke="#2B0505"
          strokeWidth="3.5"
        />
        <path
          d="M93 72 C96 77, 104 77, 107 72"
          stroke="#991B1B"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <ellipse cx="98" cy="69" rx="5" ry="3" fill="#FFA5A5" />
      </g>
    </svg>
  );
}

/**
 * 3D Box Face Component with softer rounded edges and polka dots
 */
function GiftFace({ className = '', isShaded = false }) {
  const dots = [
    { top: '16%', left: '12%', size: 'w-4 h-4 sm:w-5 sm:h-5' },
    { top: '48%', left: '8%', size: 'w-5 h-5 sm:w-6 sm:h-6' },
    { top: '78%', left: '14%', size: 'w-4.5 h-4.5 sm:w-5 sm:h-5' },
    { top: '65%', left: '26%', size: 'w-3.5 h-3.5 sm:w-4 sm:h-4' },
    { top: '18%', right: '12%', size: 'w-5 h-5 sm:w-6 sm:h-6' },
    { top: '50%', right: '8%', size: 'w-4 h-4 sm:w-5 sm:h-5' },
    { top: '80%', right: '14%', size: 'w-5 h-5 sm:w-6 sm:h-6' },
    { top: '32%', right: '25%', size: 'w-4 h-4 sm:w-4.5 sm:h-4.5' },
  ];

  return (
    <div
      className={`box-face ${className} rounded-2xl border-[3px] border-[#0e3b1c] overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]`}
      style={{
        backgroundColor: isShaded ? '#146838' : '#1A8247',
      }}
    >
      {/* White Polka Dots */}
      {dots.map((dot, idx) => (
        <span
          key={idx}
          className={`absolute rounded-full bg-white border border-black/15 shadow-[inset_0_1px_3px_rgba(0,0,0,0.25)] ${dot.size}`}
          style={{
            top: dot.top,
            left: dot.left,
            right: dot.right,
          }}
        />
      ))}

      {/* Vertical Red Ribbon down center with rounded soft contours */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-12 sm:w-14 bg-[#E52521] border-x-[3px] border-[#2B0505] shadow-[inset_0_0_10px_rgba(0,0,0,0.3)] flex items-center justify-center">
        <div className="w-2 h-full bg-white/20 blur-[0.5px]" />
      </div>
    </div>
  );
}

/**
 * 3D Lid Faces with correctly centered top and 3D bow
 */
function LidFaces({ animState = 'idle' }) {
  const animClass = animState === 'opening'
    ? 'slide-to-top'
    : animState === 'closing'
    ? 'slide-return-down'
    : '';

  return (
    <div className={`lid-wrap ${animClass}`}>
      {/* Front rim */}
      <div className="lid-face lid-front rounded-b-xl bg-[#1E8C4D] border-[3px] border-[#0e3b1c] overflow-hidden">
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-12 sm:w-14 bg-[#E52521] border-x-[3px] border-[#2B0505]" />
        <span className="absolute top-3 left-4 w-3 h-3 rounded-full bg-white border border-black/20" />
        <span className="absolute top-3 right-4 w-3 h-3 rounded-full bg-white border border-black/20" />
      </div>

      {/* Back rim */}
      <div className="lid-face lid-back rounded-b-xl bg-[#146838] border-[3px] border-[#0e3b1c] overflow-hidden">
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-12 sm:w-14 bg-[#D31D1D] border-x-[3px] border-[#2B0505]" />
      </div>

      {/* Left rim */}
      <div className="lid-face lid-left rounded-b-xl bg-[#146838] border-[3px] border-[#0e3b1c] overflow-hidden">
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-12 sm:w-14 bg-[#D31D1D] border-x-[3px] border-[#2B0505]" />
        <span className="absolute top-3 left-4 w-3 h-3 rounded-full bg-white border border-black/20" />
      </div>

      {/* Right rim */}
      <div className="lid-face lid-right rounded-b-xl bg-[#1E8C4D] border-[3px] border-[#0e3b1c] overflow-hidden">
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-12 sm:w-14 bg-[#E52521] border-x-[3px] border-[#2B0505]" />
        <span className="absolute top-3 right-4 w-3 h-3 rounded-full bg-white border border-black/20" />
      </div>

      {/* Lid Top Face (Precisely centered, darker emerald facet with crossing ribbon & 3D bow) */}
      <div className="lid-face lid-top rounded-2xl bg-[#12532B] border-[3px] border-[#0e3b1c] overflow-visible shadow-[inset_0_0_15px_rgba(0,0,0,0.3)]">
        {/* Ribbon Cross: Vertical band */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-12 sm:w-14 bg-[#E52521] border-x-[3px] border-[#2B0505]" />

        {/* Ribbon Cross: Horizontal band */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-12 sm:h-14 bg-[#E52521] border-y-[3px] border-[#2B0505]" />

        {/* Top white polka dots */}
        <span className="absolute top-4 left-4 w-3.5 h-3.5 rounded-full bg-white border border-black/20" />
        <span className="absolute top-4 right-4 w-3.5 h-3.5 rounded-full bg-white border border-black/20" />
        <span className="absolute bottom-4 left-4 w-3.5 h-3.5 rounded-full bg-white border border-black/20" />
        <span className="absolute bottom-4 right-4 w-3.5 h-3.5 rounded-full bg-white border border-black/20" />

        {/* 3D Puffy Cartoon Red Bow standing upright in the exact center of the lid */}
        <div
          className="absolute left-1/2 top-1/2 pointer-events-none"
          style={{
            transform: 'translate(-50%, -50%) rotateX(-90deg) translateY(-32px)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Main Front-facing Bow */}
          <div style={{ transform: 'translateZ(2px)' }}>
            <CartoonBow showTails={true} />
          </div>

          {/* Cross-layered bow for rich 3D volume at all 360-degree rotation angles */}
          <div
            className="absolute top-0 left-0"
            style={{
              transform: 'rotateY(90deg)',
              transformOrigin: 'center center',
            }}
          >
            <CartoonBow showTails={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InteractiveBirthdayGift({
  recipientName = "Special Someone",
  headerText = "Happy Birthday!",
  subText = "You have a special surprise waiting for you 🎁",
  title = "Happy Birthday! 🎉",
  message = "Wishing you a wonderful day filled with joy, laughter, and everything that brings you happiness! May the year ahead be packed with exciting adventures.",
  senderName = "With love ❤️",
  onOpen,
  onClose,
}) {
  const [stage, setStage] = useState('closed'); // 'closed' | 'opening' | 'open' | 'closing'
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  const [bgNext, setBgNext]   = useState(1);
  const [bgFading, setBgFading] = useState(false);
  const boxRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const timerRef = useRef([]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    return () => {
      timerRef.current.forEach((id) => clearTimeout(id));
    };
  }, []);

  // Preload all background images so they display smoothly
  useEffect(() => {
    BG_SLIDES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Continuous background crossfade every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBgFading(true);
      setTimeout(() => {
        setBgIndex((prev) => (prev + 1) % BG_SLIDES.length);
        setBgNext((prev) => (prev + 1) % BG_SLIDES.length);
        setBgFading(false);
      }, 1200); // crossfade duration
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const clearAllTimers = () => {
    timerRef.current.forEach((id) => clearTimeout(id));
    timerRef.current = [];
  };

  // Strictly prevent repeated/double clicks during the entire animation
  const handleOpen = () => {
    if (stage !== 'closed' || isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    // Capture the exact 3D orientation of the box at the moment of click
    if (boxRef.current) {
      const computed = window.getComputedStyle(boxRef.current).transform;
      boxRef.current.style.animation = 'none';
      boxRef.current.style.transform = computed;
    }

    if (onOpen) onOpen();

    if (prefersReducedMotion) {
      setStage('open');
      isAnimatingRef.current = false;
      return;
    }

    setStage('opening');
    clearAllTimers();

    // Lid slides up, box slides down, then reveal birthday scene
    const t = setTimeout(() => {
      setStage('open');
      isAnimatingRef.current = false;
    }, 750);

    timerRef.current.push(t);
  };

  const handleClose = () => {
    if (stage !== 'open' || isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    if (onClose) onClose();

    if (prefersReducedMotion) {
      if (boxRef.current) {
        boxRef.current.style.animation = '';
        boxRef.current.style.transform = '';
      }
      setStage('closed');
      isAnimatingRef.current = false;
      return;
    }

    setStage('closing');
    clearAllTimers();

    // Closing animation: top lid smoothly slides downward, box smoothly slides upward back together
    const t = setTimeout(() => {
      // Resume slow rotation once box and lid are reunited
      if (boxRef.current) {
        boxRef.current.style.animation = '';
        boxRef.current.style.transform = '';
      }
      setStage('closed');
      isAnimatingRef.current = false;
    }, 650);

    timerRef.current.push(t);
  };

  const isClosed = stage === 'closed';
  const isOpening = stage === 'opening';
  const isOpen = stage === 'open';
  const isClosing = stage === 'closing';

  const boxBodyAnimClass = isOpening
    ? 'slide-to-bottom'
    : isClosing
    ? 'slide-return-up'
    : '';

  const sceneAnimClass = isOpening
    ? 'scene-parting-fade'
    : isClosing
    ? 'scene-parting-return'
    : '';

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden select-none py-10 px-4">

      {/* ── Crossfade Background Slideshow ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Current slide (base) */}
        <img
          key={`base-${bgIndex}`}
          src={BG_SLIDES[bgIndex]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 1 }}
        />
        {/* Next slide fading in on top */}
        <img
          key={`fade-${bgNext}`}
          src={BG_SLIDES[bgNext]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: bgFading ? 1 : 0,
            transition: bgFading ? 'opacity 1.2s ease-in-out' : 'none',
          }}
        />
        {/* Light subtle overlay so photos remain clear and vibrant */}
        <div className="absolute inset-0 bg-black/15" />
      </div>

      {/* ========================================================= */}
      {/* 3D ROTATING GIFT CONTAINER                                */}
      {/* ========================================================= */}
      <div
        className={`relative z-10 flex flex-col items-center justify-start pt-8 ${
          isOpen ? 'hidden' : 'opacity-100'
        }`}
      >



        {/* Interactive Button wrapping 3D Scene */}
        <button
          type="button"
          onClick={handleOpen}
          disabled={!isClosed}
          aria-label="Open birthday gift"
          className="relative group p-6 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400/80 rounded-3xl cursor-pointer disabled:cursor-default"
        >
          {/* Ambient Glow underneath */}
          <div
            className={`absolute -inset-10 rounded-full bg-gradient-to-tr from-emerald-500/30 via-red-500/20 to-yellow-400/20 blur-3xl transition-opacity duration-700 ${
              isOpening ? 'opacity-90 scale-125' : 'opacity-40 group-hover:opacity-75'
            }`}
          />

          {/* 3D Perspective Scene */}
          <div
            className={`perspective-scene relative flex items-center justify-center min-h-[340px] sm:min-h-[390px] ${sceneAnimClass}`}
          >
            {/* The 3D Gift Box (Retains exact captured 3D rotation) */}
            <div
              ref={boxRef}
              className={`gift-box-3d ${
                isClosed
                  ? 'slow-rotate'
                  : ''
              }`}
              style={{
                width: 'var(--box-size)',
                height: 'var(--box-size)',
                margin: '0 auto',
              }}
            >
              {/* Box Body Wrapper (Slides down on open, slides upward on close) */}
              <div className={`box-body-3d ${boxBodyAnimClass}`}>
                {/* 5 Box Body Faces with softened rounded-2xl edges */}
                <GiftFace className="face-front" isShaded={false} />
                <GiftFace className="face-back" isShaded={true} />
                <GiftFace className="face-left" isShaded={true} />
                <GiftFace className="face-right" isShaded={false} />
                <div
                  className="box-face face-bottom rounded-2xl bg-[#0e3b1c] border-[3px] border-[#071f0e]"
                />

                {/* Inside Chamber Face */}
                <div
                  className="box-face face-top rounded-2xl bg-gradient-to-b from-[#FFF5A5] via-[#ff4744] to-[#12532B] border-[3px] border-[#0e3b1c] flex items-center justify-center overflow-hidden shadow-[0_0_50px_#ffea79]"
                >
                  <div className="w-full h-full bg-radial from-amber-200 via-pink-500 to-transparent opacity-90 flex items-center justify-center">
                    <span className="text-4xl animate-pulse">✨</span>
                  </div>
                </div>
              </div>

              {/* 3D Lid (Slides up on open, slides downward on close) */}
              <LidFaces animState={stage} />
            </div>
          </div>
        </button>

        {/* ── Header + Subtitle — animate with the gift ── */}
        <div className={`text-center mt-5 select-none transition-all duration-700 ease-in-out ${
          isOpening
            ? 'opacity-0 translate-y-6 pointer-events-none'
            : isClosing
            ? 'animate-slide-down-in'
            : 'opacity-100 translate-y-0'
        }`}>
          <div className="inline-block bg-white/80 backdrop-blur-md px-6 py-3.5 rounded-2xl shadow-[0_6px_25px_rgba(0,0,0,0.18)] border border-white/50 max-w-md mx-auto">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0e3b1c] mb-1.5">
              {headerText}
            </h1>
            <p className="text-xs sm:text-sm font-medium tracking-wide text-[#5c1c1c] leading-relaxed">
              {subText}
            </p>
          </div>
        </div>

      </div>



      {/* ========================================================= */}
      {/* INSIDE THE BOX / CELEBRATION SCENE                        */}
      {/* ========================================================= */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-800 ease-out ${
          isOpen
            ? 'opacity-100 scale-100 pointer-events-auto'
            : isClosing
            ? 'opacity-0 scale-75 pointer-events-none'
            : 'opacity-0 scale-125 pointer-events-none'
        }`}
      >
        {/* Background Radiant Glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
          <div className="w-[45rem] h-[45rem] rounded-full bg-emerald-500/15 blur-3xl animate-pulse" />
          <div className="absolute w-[32rem] h-[32rem] rounded-full bg-red-500/20 blur-2xl" />
          <div className="absolute w-[18rem] h-[18rem] rounded-full bg-amber-400/20 blur-xl" />
        </div>

        {/* Birthday Message (Emerges directly over background without card box/container) */}
        <div className="relative z-10 w-full max-w-lg mx-auto text-center flex flex-col items-center animate-[fadeSlideUp_0.6s_ease-out_both] px-4">
          {/* Message */}
          <p className="text-white text-lg sm:text-xl md:text-2xl leading-relaxed font-semibold drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] mb-8 max-h-[60vh] overflow-y-auto px-4">
            {message}
          </p>

          {/* "Close Gift" Button */}
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close gift and return to box"
            className="w-full sm:w-auto min-h-[48px] px-8 py-3 rounded-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-base shadow-[0_8px_25px_rgba(0,0,0,0.5)] border border-white/30 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300 transition-all duration-200 cursor-pointer"
          >
            <span>Close Gift 🎁</span>
          </button>
        </div>
      </div>
    </div>
  );
}
