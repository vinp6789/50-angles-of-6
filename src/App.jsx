import { useState, useEffect, useRef, useCallback, useMemo } from "react";

/* ─────────────────────────────────────────
   DATA — 50 ANGLES OF 6
───────────────────────────────────────── */
const DOMAINS = {
  Music:       { color:"#c9605a", glow:"#e8907a", bg:"rgba(201,96,90,0.12)",  note:261.63 },
  Science:     { color:"#4a9b8e", glow:"#6dd4c5", bg:"rgba(74,155,142,0.12)", note:293.66 },
  Spirituality:{ color:"#b07d3a", glow:"#e0b06a", bg:"rgba(176,125,58,0.12)", note:329.63 },
  Math:        { color:"#7ab050", glow:"#a8d870", bg:"rgba,122,176,80,0.12)", note:349.23 },
  Religion:    { color:"#9b6ab0", glow:"#c99ee0", bg:"rgba(155,106,176,0.12)",note:392.00 },
  Psychology:  { color:"#5a7fc9", glow:"#8ab0f0", bg:"rgba(90,127,201,0.12)", note:440.00 },
  Nature:      { color:"#2d8a4f", glow:"#50c878", bg:"rgba(45,138,79,0.12)",  note:493.88 },
  Health:      { color:"#c97a4a", glow:"#e8a870", bg:"rgba(201,122,74,0.12)", note:523.25 },
  Culture:     { color:"#3a8fb0", glow:"#60c0e0", bg:"rgba(58,143,176,0.12)", note:587.33 },
  Tech:        { color:"#8a7ac9", glow:"#b0a0f0", bg:"rgba(138,122,201,0.12)",note:659.25 },
  Finance:     { color:"#6b8a50", glow:"#90b870", bg:"rgba(107,138,80,0.12)", note:698.46 },
  History:     { color:"#a06050", glow:"#c89070", bg:"rgba(160,96,80,0.12)",  note:783.99 },
};

const ANGLES = [
  {id:1,  domain:"Music",        title:"6 Strings",           sub:"Guitar",             desc:"E A D G B E — six strings, infinite music. Every rock anthem, every classical sonata, every blues lament. Six vibrating lines that contain the entire Western musical canon."},
  {id:2,  domain:"Science",      title:"Carbon",              sub:"Element 6",          desc:"Six protons. The atom at the center of all life. Every protein, every strand of DNA, every cell wall — built on element 6. Carbon is the universe's favourite building block."},
  {id:3,  domain:"Spirituality", title:"6 Ritus",             sub:"Vedic Seasons",      desc:"Vasant, Grishma, Varsha, Sharad, Hemant, Shishir. Six seasons of the Vedic year — each with its raga, its diet, its spiritual discipline. Time itself is sixfold."},
  {id:4,  domain:"Math",         title:"Perfect Number",      sub:"1+2+3=6",            desc:"6 equals the sum of its own divisors: 1+2+3=6. The Greeks called this perfect. The next perfect number is 28. Only 51 perfect numbers have ever been found."},
  {id:5,  domain:"Religion",     title:"6 Days",              sub:"Creation",           desc:"In Genesis, God created light, sky, land, stars, creatures and humanity across six days — then rested. Every seven-day week is a monument to this sixfold act of creation."},
  {id:6,  domain:"Psychology",   title:"6 Degrees",           sub:"Separation",         desc:"Any two humans on Earth are connected through no more than six acquaintances. Milgram's 1967 small-world experiment showed that the planet is far more intimate than it seems."},
  {id:7,  domain:"Nature",       title:"Honeycomb",           sub:"Hexagonal Geometry", desc:"Bees build in hexagons. Mathematically proven to use the least wax per unit of storage. Nature discovered optimal packing millions of years before humans could prove it."},
  {id:8,  domain:"Music",        title:"6 Ragas",             sub:"Prahar System",      desc:"Hindustani classical music divides the day into six prahars, each with its family of ragas. Bhairav at dawn. Yaman at dusk. The raga is not just music — it is a time of day."},
  {id:9,  domain:"Science",      title:"Benzene Ring",        sub:"6-Carbon Hexagon",   desc:"Six carbons, hexagonal, alternating bonds. August Kekulé dreamt of a snake biting its tail and woke with the structure. Chemistry's most elegant ring — the foundation of organic synthesis."},
  {id:10, domain:"Health",       title:"6 Rasas",             sub:"Ayurvedic Tastes",   desc:"Sweet, sour, salty, pungent, bitter, astringent. Ayurveda holds that every meal should contain all six tastes to maintain doshic balance. Modern diets rarely achieve more than three."},
  {id:11, domain:"Culture",      title:"Dice",                sub:"6 Faces",            desc:"Six faces, opposite faces summing to seven. Dice found in 5,000-year-old Indus Valley sites. The cube of chance — humanity's oldest instrument of fate."},
  {id:12, domain:"Tech",         title:"IPv6",                sub:"128-bit Addresses",  desc:"340 undecillion unique addresses. Enough for every atom on Earth's surface to have its own IP. IPv4 ran out. IPv6 is the internet's infrastructure for the next millennium."},
  {id:13, domain:"Math",         title:"Triangular",          sub:"T₃ = 6",             desc:"6 is the third triangular number: 1+2+3. Arrange six objects into a triangle and they tile perfectly. It is both triangular and perfect — a rare double distinction."},
  {id:14, domain:"Religion",     title:"Star of David",       sub:"6-Pointed Star",     desc:"Two interlocking triangles — one pointing up, one down. Heaven and earth. God and humanity. The Magen David became the central symbol of Judaism, and of the State of Israel."},
  {id:15, domain:"Nature",       title:"Snowflake",           sub:"6-Fold Symmetry",    desc:"Every snowflake has exactly six-fold symmetry. Water molecules bond at 120° angles, forcing hexagonal growth. No two snowflakes are identical — yet all speak the same grammar of six."},
  {id:16, domain:"Tech",         title:"Hex Colors",          sub:"#RRGGBB",            desc:"Two digits each for red, green, blue — six hexadecimal characters define every color on every screen on Earth. 16.7 million colors, all from six characters. The palette of the digital world."},
  {id:17, domain:"Finance",      title:"Six Sigma",           sub:"99.99966% Quality",  desc:"3.4 defects per million opportunities. Motorola's 1986 methodology became the global gold standard of industrial quality. The sixth sigma — the near-impossible threshold that became normal."},
  {id:18, domain:"Spirituality", title:"6 Darshanas",         sub:"Hindu Philosophy",   desc:"Nyaya, Vaisheshika, Samkhya, Yoga, Mimamsa, Vedanta. Six orthodox schools of Hindu philosophy — six distinct lenses focusing on the same ultimate truth, each from a different angle."},
  {id:19, domain:"Music",        title:"Sextet",              sub:"Chamber Music",      desc:"Six musicians in a room. Brahms' String Sextets are among the most intimate works in chamber music. Large enough for richness, small enough that every voice remains individual."},
  {id:20, domain:"Science",      title:"6 Quarks",            sub:"Standard Model",     desc:"Up, down, charm, strange, top, bottom. Six flavors of quarks — the fundamental constituents of protons, neutrons, and all hadronic matter. The Standard Model is built on six."},
  {id:21, domain:"Math",         title:"Cube Faces",          sub:"6 Faces",            desc:"A cube has six faces, twelve edges, eight vertices. Euler's formula holds: 6−12+8=2. The most familiar Platonic solid — and its face count is six."},
  {id:22, domain:"Psychology",   title:"6 Emotions",          sub:"Paul Ekman",         desc:"Happiness, sadness, fear, disgust, anger, surprise. Paul Ekman's six universal facial expressions — cross-cultural, pre-verbal, evolutionarily hardwired. The emotional alphabet of our species."},
  {id:23, domain:"Nature",       title:"Insect Legs",         sub:"Always 6",           desc:"Every insect — all ten quintillion of them — has exactly six legs. Hexapod morphology is the most successful body plan in evolutionary history. Six legs conquered the land."},
  {id:24, domain:"Spirituality", title:"6 Directions",        sub:"Vedic Space",        desc:"East, west, north, south, above, below. Vedic cosmology assigns a guardian deity to each of the six directions, creating a complete spatial map of the sacred universe."},
  {id:25, domain:"History",      title:"D-Day",               sub:"June 6, 1944",       desc:"The largest seaborne invasion in history. 156,000 Allied troops on five Normandy beaches. The sixth day of the sixth month — a date that changed the outcome of the Second World War."},
  {id:26, domain:"Health",       title:"6-Pack",              sub:"Rectus Abdominis",   desc:"Six discrete muscular segments of the rectus abdominis, separated by tendinous inscriptions. Visible at roughly 10% body fat. Function: spinal flexion and the aspiration of millions."},
  {id:27, domain:"Tech",         title:"Hexadecimal",         sub:"Base-16",            desc:"Programmers think in hex. One hex digit = 4 bits. Memory addresses, color values, SHA hashes — all written in base-16, with digits 0–9 and A–F. The lingua franca of computer internals."},
  {id:28, domain:"Culture",      title:"Six Nations",         sub:"Rugby Union",        desc:"England, France, Ireland, Italy, Scotland, Wales. The oldest international rugby competition, tracing back to 1883. Six nations, centuries of rivalry, one February-March of beautiful brutality."},
  {id:29, domain:"Psychology",   title:"Sixth Sense",         sub:"Intuition",          desc:"Your brain processes 11 million bits per second. You are conscious of perhaps 50. The 'sixth sense' is pattern recognition running silently below awareness — the signal you cannot explain but cannot ignore."},
  {id:30, domain:"Culture",      title:"Sixer",               sub:"Cricket",            desc:"Hit the ball over the boundary on the full — six runs. The most spectacular shot in cricket. MS Dhoni's last-ball six in the 2011 World Cup final: a billion people exhaled at once."},
  {id:31, domain:"Science",      title:"6 Leptons",           sub:"Standard Model",     desc:"Electron, muon, tau and their three neutrinos. Six leptons complete the fermion family alongside the six quarks. The Standard Model's most elegant symmetry: six and six."},
  {id:32, domain:"Religion",     title:"6 Kalimas",           sub:"Islam",              desc:"Six declarations of faith — from Kalima Tayyab (the pure word) to Kalima Radde Kufr (rejection of disbelief). The six verbal pillars of Islamic creedal theology."},
  {id:33, domain:"Music",        title:"Whole Tone Scale",    sub:"6 Equal Steps",      desc:"C D E F♯ G♯ A♯ — six notes, each a whole step apart. No semitones, no leading tone, no resolution. Debussy's scale of the dreamlike and the directionless. Pure harmonic ambiguity."},
  {id:34, domain:"Health",       title:"6 Taste Groups",      sub:"Nutritional Science",desc:"Modern nutritional science maps flavors to six receptor categories on the tongue. Each signals a different macronutrient class. Taste is the body's original nutritional analysis system."},
  {id:35, domain:"Nature",       title:"6th Extinction",      sub:"Anthropocene",       desc:"We are inside the sixth mass extinction event. Species are disappearing at 1,000 times the background rate. The previous five rewrote the biosphere. This one is authored by a single species."},
  {id:36, domain:"History",      title:"Base 60",             sub:"Sumerian Legacy",    desc:"The Sumerians counted in base-60 — sixty seconds, sixty minutes, 360 degrees. Their system multiplied 6×10. You check the time in Sumerian mathematics every time you look at a clock."},
  {id:37, domain:"Finance",      title:"Big 6",               sub:"Accounting Firms",   desc:"Before the mergers: Arthur Andersen, Coopers & Lybrand, Deloitte Touche, Ernst & Young, KPMG, Price Waterhouse. Then Andersen collapsed after Enron. Six became four. One firm took the world down."},
  {id:38, domain:"Music",        title:"EADGBE",              sub:"Guitar Standard",    desc:"The six strings of standard guitar tuning. Every Amateur Does Get Better Eventually. A mnemonic that launches a million guitarists. Standard tuning has remained unchanged for centuries."},
  {id:39, domain:"Science",      title:"6 Kingdoms",          sub:"Classification",     desc:"Bacteria, Archaea, Protista, Fungi, Plantae, Animalia. Every living organism on Earth belongs to one of six kingdoms — a taxonomy of all life, organised in six chapters."},
  {id:40, domain:"Culture",      title:"Rubik's Cube",        sub:"6 Colors, 43 Quintillion States",desc:"Six faces, six colors, 43,252,003,274,489,856,000 possible states — and exactly one solution. The world's best-selling puzzle. Speed-cubers solve it in under 4 seconds. Most of us cannot."},
  {id:41, domain:"Religion",     title:"6 Perfections",       sub:"Buddhism",           desc:"Generosity, morality, patience, diligence, meditation, wisdom — the six pāramitās of Mahayana Buddhism. The Bodhisattva's path across six perfections toward enlightenment for all beings."},
  {id:42, domain:"Tech",         title:"WiFi 6",              sub:"802.11ax",           desc:"9.6 Gbps theoretical throughput. OFDMA for dense environments. WiFi 6 was designed not for raw speed but for efficiency — 10 devices in a room, all streaming, none stuttering."},
  {id:43, domain:"Science",      title:"Graphene",            sub:"1-Atom Hexagonal Lattice",desc:"A single layer of carbon atoms in a hexagonal lattice. 200 times stronger than steel, conducts electricity better than copper, one atom thick. The material of the next century — and it is pure hexagons."},
  {id:44, domain:"Psychology",   title:"6 Thinking Hats",     sub:"Edward de Bono",     desc:"White: facts. Red: emotion. Black: caution. Yellow: optimism. Green: creativity. Blue: process. De Bono's parallel thinking framework — six cognitive modes for navigating any decision."},
  {id:45, domain:"Nature",       title:"Turtle Shell",        sub:"Hexagonal Scutes",   desc:"Many turtle shells display hexagonal scute patterns — the same geometry as honeycombs. Force distributes evenly through hexagonal tiling. Natural armour engineered by evolution."},
  {id:46, domain:"Finance",      title:"Six Sigma Black Belt",sub:"Process Mastery",    desc:"A Six Sigma Black Belt leads defect-reduction projects and mentors Green Belts. The certification has become a career accelerator in manufacturing, healthcare and financial operations worldwide."},
  {id:47, domain:"Music",        title:"Sitar Strings",       sub:"6 Main Strings",     desc:"The sitar's six main playing strings (plus sympathetic strings below). Ravi Shankar took it to Carnegie Hall. George Harrison put it on Norwegian Wood. Six strings changed what the West heard."},
  {id:48, domain:"Math",         title:"360 Degrees",         sub:"6 × 60",             desc:"A full circle is 360° because the Babylonians used base-60 and observed the year has approximately 360 days. 360 = 6 × 60. The geometry we navigate every day was built on six."},
  {id:49, domain:"Tech",         title:"Hexapod Robots",      sub:"6-Legged Locomotion",desc:"Six-legged robots inspired by insects. The tripod gait — three legs always on the ground — gives hexapods unmatched stability. Six legs is not just the most successful biological design; it is also the most robust robotic one."},
  {id:50, domain:"History",      title:"The Sixth Extinction", sub:"Elizabeth Kolbert", desc:"Kolbert's 2014 Pulitzer Prize-winning book. Documents the current biodiversity collapse with scientific precision and moral urgency. We are writing the sixth chapter in Earth's book of extinctions — this time with full awareness."},
];

/* ─────────────────────────────────────────
   AUDIO ENGINE — Hexatonic drone + tones
───────────────────────────────────────── */
function useAudio() {
  const ctx = useRef(null);
  const drone = useRef(null);
  const enabled = useRef(false);

  const init = useCallback(() => {
    if (ctx.current) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      ctx.current = new AC();
    } catch(e) {}
  }, []);

  const resume = useCallback(() => {
    if (ctx.current?.state === 'suspended') ctx.current.resume();
  }, []);

  const enable = useCallback(() => {
    init(); resume();
    enabled.current = true;
    // Start subtle ambient drone
    if (!drone.current && ctx.current) {
      const now = ctx.current.currentTime;
      const o1 = ctx.current.createOscillator();
      const o2 = ctx.current.createOscillator();
      const g = ctx.current.createGain();
      const filt = ctx.current.createBiquadFilter();
      filt.type = 'lowpass';
      filt.frequency.value = 400;
      o1.type = 'sine'; o1.frequency.value = 55;   // A1
      o2.type = 'sine'; o2.frequency.value = 82.4; // E2 (perfect fifth)
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(0.04, now + 2);
      o1.connect(filt); o2.connect(filt); filt.connect(g); g.connect(ctx.current.destination);
      o1.start(); o2.start();
      drone.current = g;
    }
  }, [init, resume]);

  const playTone = useCallback((freq, dur=0.7, vol=0.15) => {
    if (!enabled.current || !ctx.current) return;
    resume();
    const now = ctx.current.currentTime;
    // Main tone
    const osc = ctx.current.createOscillator();
    const gain = ctx.current.createGain();
    const rev = ctx.current.createConvolver ? null : null; // skip reverb for simplicity
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(vol, now + 0.015);
    gain.gain.setValueAtTime(vol, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
    // Second harmonic for richness
    const osc2 = ctx.current.createOscillator();
    const g2 = ctx.current.createGain();
    osc2.type = 'sine';
    osc2.frequency.value = freq * 2;
    g2.gain.setValueAtTime(0, now);
    g2.gain.linearRampToValueAtTime(vol * 0.3, now + 0.02);
    g2.gain.exponentialRampToValueAtTime(0.001, now + dur * 0.8);
    osc.connect(gain); gain.connect(ctx.current.destination);
    osc2.connect(g2); g2.connect(ctx.current.destination);
    osc.start(now); osc.stop(now + dur + 0.1);
    osc2.start(now); osc2.stop(now + dur + 0.1);
  }, [resume]);

  const playHex = useCallback(() => {
    // Play hexatonic arpeggio (6 notes)
    if (!enabled.current || !ctx.current) return;
    resume();
    const freqs = [130.81, 155.56, 174.61, 196.00, 220.00, 246.94]; // C D Eb G A B
    freqs.forEach((f,i) => setTimeout(() => playTone(f, 1.0, 0.08), i * 90));
  }, [playTone, resume]);

  const playReveal = useCallback((freq) => {
    if (!enabled.current || !ctx.current) return;
    resume();
    const now = ctx.current.currentTime;
    [freq, freq*1.5, freq*2].forEach((f, i) => {
      const osc = ctx.current.createOscillator();
      const g = ctx.current.createGain();
      osc.type = 'triangle';
      osc.frequency.value = f;
      const t = now + i * 0.12;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.12, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
      osc.connect(g); g.connect(ctx.current.destination);
      osc.start(t); osc.stop(t + 0.7);
    });
  }, [resume]);

  const playClick = useCallback(() => {
    if (!enabled.current || !ctx.current) return;
    resume();
    const now = ctx.current.currentTime;
    const osc = ctx.current.createOscillator();
    const g = ctx.current.createGain();
    osc.type = 'sine'; osc.frequency.value = 1200;
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.06);
    g.gain.setValueAtTime(0.05, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc.connect(g); g.connect(ctx.current.destination);
    osc.start(now); osc.stop(now + 0.1);
  }, [resume]);

  return { enable, playTone, playHex, playReveal, playClick, isEnabled: () => enabled.current };
}

/* ─────────────────────────────────────────
   HEXAGON GEOMETRY HELPERS
───────────────────────────────────────── */
function hexCorners(cx, cy, r) {
  return Array.from({length:6}, (_,i) => {
    const a = Math.PI / 180 * (60 * i - 30);
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });
}
function hexPath(cx, cy, r) {
  return hexCorners(cx, cy, r).map((p,i) => `${i===0?'M':'L'}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' ') + ' Z';
}
// Offset hex grid positions
function hexGridPos(col, row, r) {
  const w = Math.sqrt(3) * r;
  const h = 2 * r;
  const x = w * col + (row % 2 === 0 ? 0 : w / 2);
  const y = h * 0.75 * row;
  return {x, y};
}

/* ─────────────────────────────────────────
   PARTICLES
───────────────────────────────────────── */
let _pid = 0;
function makeParticle(x, y, color) {
  return {
    id: _pid++, x, y,
    vx: (Math.random()-0.5) * 3,
    vy: (Math.random()-1.5) * 3,
    life: 1, decay: 0.02 + Math.random() * 0.02,
    size: 2 + Math.random() * 4,
    color,
  };
}

/* ─────────────────────────────────────────
   BUILD HEX GRID — 50 cells in honeycomb
───────────────────────────────────────── */
// We'll lay out 50 hexes in a honeycomb: rows of 9,8,9,8,9,7 = 50
const GRID_LAYOUT = (() => {
  const cols = [9,8,9,8,8,8];
  const cells = [];
  let id = 1;
  cols.forEach((count, row) => {
    for (let col = 0; col < count && id <= 50; col++, id++) {
      cells.push({ id, row, col });
    }
  });
  return cells;
})();

/* ─────────────────────────────────────────
   MAIN APP
───────────────────────────────────────── */
export default function ShadApp() {
  const audio = useAudio();
  const [phase, setPhase] = useState('intro'); // intro | main
  const [introStep, setIntroStep] = useState(0);
  const [openId, setOpenId] = useState(null);
  const [explored, setExplored] = useState(new Set());
  const [filter, setFilter] = useState('All');
  const [particles, setParticles] = useState([]);
  const [pulse, setPulse] = useState(false);
  const [randomAngle, setRandomAngle] = useState(null);
  const [view, setView] = useState('hex'); // hex | list
  const [audioOn, setAudioOn] = useState(false);
  const [hovered, setHovered] = useState(null);
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);

  // Intro
  useEffect(() => {
    const steps = [0,300,700,1100,1600,2200];
    const timers = steps.map((ms, i) => setTimeout(() => setIntroStep(i+1), ms));
    return () => timers.forEach(clearTimeout);
  }, []);

  // Particle canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = particlesRef.current.filter(p => p.life > 0);
      particlesRef.current.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        p.vy += 0.05; // gravity
        p.life -= p.decay;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI*2);
        ctx.fill();
        ctx.restore();
      });
      animRef.current = requestAnimationFrame(loop);
    }
    loop();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener('resize', resize); };
  }, []);

  const spawnParticles = useCallback((x, y, color) => {
    const newP = Array.from({length:18}, () => makeParticle(x, y, color));
    particlesRef.current = [...particlesRef.current, ...newP];
  }, []);

  const toggleAudio = useCallback(() => {
    if (!audioOn) { audio.enable(); setAudioOn(true); audio.playHex(); }
    else setAudioOn(false);
  }, [audioOn, audio]);

  const enterMain = useCallback(() => {
    audio.enable(); setAudioOn(true);
    audio.playHex();
    setPhase('main');
  }, [audio]);

  const openAngle = useCallback((id, event) => {
    audio.playClick();
    const angle = ANGLES.find(a => a.id === id);
    if (!angle) return;
    // Particle burst at click position
    if (event) {
      const rect = event.currentTarget.getBoundingClientRect();
      spawnParticles(rect.left + rect.width/2, rect.top + rect.height/2, DOMAINS[angle.domain].glow);
    }
    if (openId === id) {
      setOpenId(null);
    } else {
      setOpenId(id);
      audio.playReveal(DOMAINS[angle.domain].note);
      setExplored(prev => new Set([...prev, id]));
      setPulse(true);
      setTimeout(() => setPulse(false), 600);
    }
  }, [openId, audio, spawnParticles]);

  const invokeRandom = useCallback(() => {
    audio.playClick();
    let count = 0;
    const interval = setInterval(() => {
      const r = ANGLES[Math.floor(Math.random() * ANGLES.length)];
      setRandomAngle(r);
      audio.playClick();
      count++;
      if (count > 14) {
        clearInterval(interval);
        const final = ANGLES[Math.floor(Math.random() * ANGLES.length)];
        setRandomAngle(final);
        audio.playReveal(DOMAINS[final.domain].note);
        setExplored(prev => new Set([...prev, final.id]));
      }
    }, 70);
  }, [audio]);

  const progress = Math.round((explored.size / 50) * 100);
  const openAngleData = ANGLES.find(a => a.id === openId);
  const domainList = Object.keys(DOMAINS);
  const filteredAngles = filter === 'All' ? ANGLES : ANGLES.filter(a => a.domain === filter);

  /* ── INTRO ── */
  if (phase === 'intro') {
    return (
      <div style={{
        minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center',
        justifyContent:'center', background:'radial-gradient(ellipse at center, #0d1f18 0%, #060d0a 70%)',
        padding:'40px 20px', position:'relative', overflow:'hidden',
      }}>
        <canvas ref={canvasRef} style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:0}}/>
        {/* Ambient hex shapes */}
        <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0}} xmlns="http://www.w3.org/2000/svg">
          {[[20,20],[80,15],[10,70],[85,65],[50,85],[15,45],[75,40]].map(([cx,cy],i)=>(
            <polygon key={i} points={hexCorners(cx*window.innerWidth/100||cx*8, cy*window.innerHeight/100||cy*6, 60+i*20).map(p=>p.join(',')).join(' ')}
              fill="none" stroke="rgba(45,106,79,0.06)" strokeWidth="1"
              style={{animation:`ambientFloat ${8+i*1.3}s ease-in-out infinite`, animationDelay:`${i*0.7}s`}}
            />
          ))}
        </svg>
        <div style={{position:'relative',zIndex:1,textAlign:'center',maxWidth:'560px'}}>
          {/* Multi-script 6 */}
          <div style={{
            display:'flex', justifyContent:'center', gap:'clamp(12px,3vw,28px)',
            marginBottom:'clamp(16px,3vw,32px)',
            opacity: introStep>=1?1:0, transform: introStep>=1?'translateY(0)':'translateY(20px)',
            transition:'all 0.8s ease',
          }}>
            {['六','6','VI','৬','⑥','⬡'].map((s,i)=>(
              <span key={i} style={{
                fontFamily:'Cinzel,serif', fontSize:'clamp(20px,4vw,36px)', fontWeight:600,
                color: i===1?'#50c878':'rgba(80,200,120,0.5)',
                opacity: introStep>i?1:0, transform: introStep>i?'scale(1)':'scale(0.6)',
                transition:`all 0.6s cubic-bezier(.23,1,.32,1) ${i*0.12}s`,
                display:'inline-block',
              }}>{s}</span>
            ))}
          </div>
          <h1 style={{
            fontFamily:'Cinzel,serif', fontWeight:900,
            fontSize:'clamp(52px,12vw,120px)',
            background:'linear-gradient(160deg, #7dd9a8 0%, #2d8a4f 50%, #50c878 100%)',
            WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent',
            letterSpacing:'6px', lineHeight:0.9,
            opacity:introStep>=2?1:0, transform:introStep>=2?'translateY(0)':'translateY(30px)',
            transition:'all 1s cubic-bezier(.23,1,.32,1)',
          }}>SHAD</h1>
          <p style={{
            fontFamily:'Cormorant Garamond,serif', fontStyle:'italic',
            fontSize:'clamp(16px,2.5vw,24px)', color:'rgba(232,223,196,0.65)', marginTop:'10px',
            opacity:introStep>=2?1:0, transition:'all 0.8s ease 0.2s',
          }}>The Sixfold Mirror</p>
          <div style={{
            width: introStep>=3?'min(260px,60vw)':'0px', height:'1px',
            background:'linear-gradient(90deg,transparent,#2d8a4f,transparent)',
            margin:'clamp(20px,3vw,32px) auto', transition:'width 1s ease',
          }}/>
          <p style={{
            fontSize:'clamp(14px,2vw,18px)', color:'rgba(232,223,196,0.5)', lineHeight:1.6,
            opacity:introStep>=3?1:0, transition:'all 0.8s ease',
          }}>
            One number. Fifty angles. Six domains — music, science, nature, spirit, mind, and matter.
            <br/><em style={{color:'rgba(80,200,120,0.7)'}}>Touch the honeycomb. Hear the resonance.</em>
          </p>
          {/* Resonance preview */}
          <div style={{
            display:'flex', justifyContent:'center', gap:'8px', marginTop:'clamp(16px,3vw,28px)',
            flexWrap:'wrap', opacity:introStep>=4?1:0, transition:'all 0.8s ease',
          }}>
            {['Music','Science','Nature','Spirit','Mind','Matter'].map((d,i)=>(
              <span key={i} style={{
                fontFamily:'JetBrains Mono,monospace', fontSize:'10px', letterSpacing:'2px',
                padding:'5px 10px', border:'1px solid rgba(45,138,79,0.3)', borderRadius:'2px',
                color:'rgba(80,200,120,0.6)',
                opacity:introStep>i+2?1:0, transition:`all 0.5s ease ${i*0.1}s`,
              }}>{d.toUpperCase()}</span>
            ))}
          </div>
          <button onClick={enterMain} style={{
            marginTop:'clamp(24px,4vw,44px)',
            padding:'clamp(12px,2vw,16px) clamp(28px,5vw,48px)',
            background:'transparent', border:'1px solid #2d8a4f', color:'#50c878',
            fontFamily:'Cinzel,serif', fontSize:'clamp(11px,1.5vw,14px)', letterSpacing:'4px',
            textTransform:'uppercase', cursor:'pointer',
            opacity:introStep>=5?1:0, transform:introStep>=5?'translateY(0)':'translateY(16px)',
            transition:'all 0.8s ease, background 0.3s, box-shadow 0.3s, transform 0.2s',
            borderRadius:'2px',
          }}
            onMouseEnter={e=>{e.currentTarget.style.background='rgba(45,106,79,0.2)'; e.currentTarget.style.boxShadow='0 0 40px rgba(45,106,79,0.4)';}}
            onMouseLeave={e=>{e.currentTarget.style.background='transparent'; e.currentTarget.style.boxShadow='none';}}
          >
            ⬡ &nbsp;Enter the Mirror
          </button>
          <p style={{
            marginTop:'clamp(10px,2vw,16px)', fontFamily:'JetBrains Mono,monospace', fontSize:'10px',
            letterSpacing:'3px', color:'rgba(232,223,196,0.2)',
            opacity:introStep>=5?1:0, transition:'all 0.8s ease 0.2s',
          }}>SOUND RECOMMENDED</p>
        </div>
        <style>{`
          @keyframes ambientFloat {
            0%,100%{transform:translateY(0) rotate(0deg)}
            50%{transform:translateY(-20px) rotate(3deg)}
          }
        `}</style>
      </div>
    );
  }

  /* ── MAIN ── */
  const HEX_R = 44; // radius of each hexagon in the grid
  const HEX_PAD = 3;

  return (
    <div style={{
      minHeight:'100vh',
      background:'radial-gradient(ellipse at 50% 0%, #0d1f18 0%, #060d0a 60%)',
      color:'#e8dfc4',
    }}>
      <canvas ref={canvasRef} style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:50}}/>
      <style>{`
        .shad-hex { cursor:pointer; transition:all 0.35s cubic-bezier(.23,1,.32,1); }
        .shad-hex:hover polygon { filter:brightness(1.4); }
        .shad-hex.open polygon { filter:brightness(1.5) drop-shadow(0 0 12px currentColor); }
        .angle-card-anim { animation: cardSlide 0.4s cubic-bezier(.23,1,.32,1) forwards; }
        @keyframes cardSlide { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .pulse-ring { animation: pulseRing 0.6s ease-out forwards; }
        @keyframes pulseRing {
          0%{transform:scale(0.8);opacity:0.8}
          100%{transform:scale(2.5);opacity:0}
        }
        .list-item { transition:all 0.3s ease; }
        .list-item:hover { transform:translateX(6px); }
        .progress-fill { transition: width 0.6s cubic-bezier(.23,1,.32,1); }
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:rgba(45,106,79,0.3);border-radius:2px}
        @keyframes hexBreathe {
          0%,100%{transform:scale(1)} 50%{transform:scale(1.02)}
        }
        .breathe { animation: hexBreathe 4s ease-in-out infinite; }
        @keyframes floatStar {
          0%,100%{opacity:0.3;transform:translateY(0)}
          50%{opacity:0.8;transform:translateY(-8px)}
        }
        .float-star { animation: floatStar 3s ease-in-out infinite; }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{
        position:'sticky', top:0, zIndex:40,
        background:'rgba(6,13,10,0.88)', backdropFilter:'blur(20px)',
        borderBottom:'1px solid rgba(45,106,79,0.2)',
        padding:'12px clamp(12px,3vw,28px)',
        display:'flex', alignItems:'center', justifyContent:'space-between', gap:'8px',
        flexWrap:'wrap',
      }}>
        <div style={{display:'flex',alignItems:'baseline',gap:'10px'}}>
          <span style={{color:'#50c878',fontSize:'18px'}}>⬡</span>
          <span style={{fontFamily:'Cinzel,serif',fontWeight:800,letterSpacing:'4px',fontSize:'clamp(14px,2.5vw,20px)'}}>SHAD</span>
          <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'9px',letterSpacing:'2px',color:'rgba(232,223,196,0.35)'}}>SIXFOLD MIRROR</span>
        </div>

        {/* Resonance progress bar */}
        <div style={{flex:1,maxWidth:'280px',display:'flex',alignItems:'center',gap:'10px'}}>
          <div style={{flex:1,height:'3px',background:'rgba(45,106,79,0.2)',borderRadius:'2px',overflow:'hidden'}}>
            <div className="progress-fill" style={{height:'100%',background:'linear-gradient(90deg,#2d6a4f,#50c878)',width:`${progress}%`}}/>
          </div>
          <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'10px',color:'rgba(80,200,120,0.7)',whiteSpace:'nowrap'}}>
            {explored.size}/50
          </span>
        </div>

        <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
          <button onClick={toggleAudio} style={hdrBtn(audioOn?'rgba(45,106,79,0.3)':'transparent')}>
            {audioOn?'♪ ON':'♪ OFF'}
          </button>
          <button onClick={()=>setView('hex')} style={hdrBtn(view==='hex'?'rgba(45,106,79,0.3)':'transparent')}>⬡ MAP</button>
          <button onClick={()=>setView('list')} style={hdrBtn(view==='list'?'rgba(45,106,79,0.3)':'transparent')}>≡ LIST</button>
        </div>
      </header>

      {/* ── HEX MAP VIEW ── */}
      {view === 'hex' && (
        <div>
          {/* Top area — domain legend + random invoke */}
          <div style={{padding:'clamp(16px,3vw,32px) clamp(12px,3vw,28px) 0', maxWidth:'1100px', margin:'0 auto'}}>
            <div style={{
              display:'flex', alignItems:'center', justifyContent:'space-between',
              flexWrap:'wrap', gap:'12px', marginBottom:'20px',
            }}>
              <div>
                <p style={{fontFamily:'Cormorant Garamond,serif',fontStyle:'italic',fontSize:'clamp(13px,2vw,17px)',color:'rgba(232,223,196,0.5)'}}>
                  Touch any hex to reveal an angle of 6
                </p>
              </div>
              <button onClick={invokeRandom} style={{
                padding:'9px 20px',background:'transparent',
                border:'1px solid rgba(80,200,120,0.35)',color:'#50c878',
                fontFamily:'Cinzel,serif',fontSize:'11px',letterSpacing:'3px',
                cursor:'pointer',borderRadius:'2px',
                transition:'all 0.3s',
              }}
                onMouseEnter={e=>{e.currentTarget.style.background='rgba(45,106,79,0.15)';e.currentTarget.style.boxShadow='0 0 24px rgba(45,106,79,0.3)';}}
                onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.boxShadow='none';}}
              >
                ⟳ RANDOM ANGLE
              </button>
            </div>

            {/* Domain color legend */}
            <div style={{display:'flex',flexWrap:'wrap',gap:'6px',marginBottom:'20px'}}>
              {domainList.map(d=>(
                <button key={d} onClick={()=>{setFilter(d==='All'?'All':d); audio.playTone(DOMAINS[d].note,0.4,0.1);}} style={{
                  padding:'5px 11px',background:'transparent',
                  border:`1px solid ${DOMAINS[d].color}50`,color:DOMAINS[d].glow,
                  fontFamily:'JetBrains Mono,monospace',fontSize:'10px',letterSpacing:'1px',
                  cursor:'pointer',borderRadius:'100px',
                  transition:'all 0.3s',
                }}
                  onMouseEnter={e=>{e.currentTarget.style.background=DOMAINS[d].bg;}}
                  onMouseLeave={e=>{e.currentTarget.style.background='transparent';}}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Honeycomb */}
          <div style={{overflowX:'auto',overflowY:'hidden',padding:'0 clamp(8px,2vw,20px)'}}>
            <HoneycombGrid
              angles={ANGLES}
              domains={DOMAINS}
              layout={GRID_LAYOUT}
              hexR={HEX_R}
              hexPad={HEX_PAD}
              openId={openId}
              explored={explored}
              filter={filter}
              onOpen={openAngle}
              onHover={(id)=>{setHovered(id); if(id) audio.playClick();}}
              hovered={hovered}
            />
          </div>

          {/* Open angle detail card */}
          {openAngleData && (
            <div className="angle-card-anim" style={{
              maxWidth:'680px', margin:'0 auto clamp(20px,4vw,40px)',
              padding:'clamp(20px,3vw,32px)', marginLeft:'clamp(12px,3vw,auto)', marginRight:'clamp(12px,3vw,auto)',
              border:`1px solid ${DOMAINS[openAngleData.domain].color}50`,
              borderLeft:`4px solid ${DOMAINS[openAngleData.domain].color}`,
              background:`linear-gradient(135deg, ${DOMAINS[openAngleData.domain].bg}, rgba(6,13,10,0.9))`,
              borderRadius:'8px', position:'relative', overflow:'hidden',
            }}>
              {/* Hex watermark */}
              <div style={{
                position:'absolute',right:'-20px',top:'-20px',
                fontFamily:'Cinzel,serif',fontWeight:900,fontSize:'120px',
                color:`${DOMAINS[openAngleData.domain].color}08`,
                lineHeight:1,pointerEvents:'none',userSelect:'none',
              }}>{openAngleData.id}</div>

              <div style={{display:'flex',alignItems:'baseline',gap:'14px',marginBottom:'10px',flexWrap:'wrap'}}>
                <span style={{
                  fontFamily:'Cinzel,serif',fontWeight:900,fontSize:'clamp(28px,5vw,48px)',
                  color:DOMAINS[openAngleData.domain].glow,lineHeight:1,
                }}>#{String(openAngleData.id).padStart(2,'0')}</span>
                <span style={{
                  fontFamily:'JetBrains Mono,monospace',fontSize:'11px',letterSpacing:'3px',
                  color:DOMAINS[openAngleData.domain].glow,textTransform:'uppercase',
                }}>
                  {openAngleData.domain}
                </span>
                <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'10px',letterSpacing:'2px',color:'rgba(232,223,196,0.4)'}}>
                  · {openAngleData.sub}
                </span>
              </div>

              <h2 style={{
                fontFamily:'Cinzel,serif',fontWeight:700,
                fontSize:'clamp(20px,3.5vw,32px)',color:'#e8dfc4',lineHeight:1.2,marginBottom:'14px',
              }}>{openAngleData.title}</h2>

              <div style={{width:'50px',height:'1px',background:`${DOMAINS[openAngleData.domain].color}80`,marginBottom:'14px'}}/>

              <p style={{
                fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(15px,2vw,18px)',
                lineHeight:1.7,color:'rgba(232,223,196,0.75)',
              }}>{openAngleData.desc}</p>

              <button onClick={()=>setOpenId(null)} style={{
                marginTop:'18px',background:'transparent',border:'none',
                color:'rgba(232,223,196,0.3)',fontFamily:'JetBrains Mono,monospace',
                fontSize:'11px',letterSpacing:'2px',cursor:'pointer',padding:'4px 0',
              }}>✕ CLOSE</button>
            </div>
          )}

          {/* Random angle oracle result */}
          {randomAngle && !openId && (
            <div className="angle-card-anim" style={{
              maxWidth:'680px',margin:'0 clamp(12px,3vw,auto) 40px',
              padding:'24px 28px',
              border:`1px solid ${DOMAINS[randomAngle.domain].color}40`,
              background:`${DOMAINS[randomAngle.domain].bg}`,
              borderRadius:'8px',
            }}>
              <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'10px',letterSpacing:'4px',color:'rgba(232,223,196,0.35)',marginBottom:'8px'}}>
                ⟳ ORACLE DRAWS
              </div>
              <div style={{display:'flex',alignItems:'baseline',gap:'12px',marginBottom:'6px',flexWrap:'wrap'}}>
                <span style={{fontFamily:'Cinzel,serif',fontWeight:900,fontSize:'40px',color:DOMAINS[randomAngle.domain].glow,lineHeight:1}}>
                  #{String(randomAngle.id).padStart(2,'0')}
                </span>
                <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'11px',letterSpacing:'3px',color:DOMAINS[randomAngle.domain].glow}}>
                  {randomAngle.domain}
                </span>
              </div>
              <h3 style={{fontFamily:'Cinzel,serif',fontWeight:700,fontSize:'clamp(18px,3vw,26px)',color:'#e8dfc4',marginBottom:'10px'}}>
                {randomAngle.title}
              </h3>
              <p style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(14px,2vw,17px)',lineHeight:1.65,color:'rgba(232,223,196,0.7)'}}>
                {randomAngle.desc}
              </p>
              <button onClick={()=>setRandomAngle(null)} style={{
                marginTop:'14px',background:'transparent',border:'none',
                color:'rgba(232,223,196,0.3)',fontFamily:'JetBrains Mono,monospace',fontSize:'11px',
                letterSpacing:'2px',cursor:'pointer',
              }}>✕ DISMISS</button>
            </div>
          )}
        </div>
      )}

      {/* ── LIST VIEW ── */}
      {view === 'list' && (
        <div style={{maxWidth:'900px',margin:'0 auto',padding:'clamp(16px,3vw,32px) clamp(12px,3vw,28px)'}}>
          {/* Big title */}
          <div style={{textAlign:'center',marginBottom:'clamp(24px,4vw,48px)'}}>
            <div style={{
              fontFamily:'Cinzel,serif',fontWeight:900,
              fontSize:'clamp(60px,15vw,140px)',
              background:'linear-gradient(160deg,#7dd9a8,#2d6a4f)',
              WebkitBackgroundClip:'text',backgroundClip:'text',WebkitTextFillColor:'transparent',
              lineHeight:0.9,letterSpacing:'-2px',
            }}>6</div>
            <div style={{fontFamily:'Cormorant Garamond,serif',fontStyle:'italic',fontSize:'clamp(16px,2.5vw,24px)',color:'rgba(232,223,196,0.5)',marginTop:'8px'}}>
              fifty angles
            </div>
          </div>

          {/* Domain filter pills */}
          <div style={{display:'flex',flexWrap:'wrap',gap:'6px',justifyContent:'center',marginBottom:'28px'}}>
            <button onClick={()=>setFilter('All')} style={filterBtn(filter==='All','#50c878','#2d6a4f')}>All 50</button>
            {domainList.map(d=>(
              <button key={d} onClick={()=>{setFilter(d); audio.playTone(DOMAINS[d].note,0.4,0.1);}}
                style={filterBtn(filter===d, DOMAINS[d].glow, DOMAINS[d].color)}>
                {d} ({ANGLES.filter(a=>a.domain===d).length})
              </button>
            ))}
          </div>

          {/* Cards */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:'10px'}}>
            {filteredAngles.map((a,i) => {
              const dom = DOMAINS[a.domain];
              const isOpen = openId === a.id;
              const isSeen = explored.has(a.id);
              return (
                <div key={a.id} className="list-item" onClick={(e)=>openAngle(a.id,e)} style={{
                  padding:'clamp(14px,2vw,20px) clamp(16px,2vw,22px)',
                  border:`1px solid ${isOpen?dom.color+'60':'rgba(232,223,196,0.06)'}`,
                  background: isOpen ? dom.bg : 'rgba(13,31,24,0.4)',
                  borderRadius:'6px', cursor:'pointer',
                  borderLeft: isSeen ? `3px solid ${dom.color}` : '3px solid transparent',
                  animationDelay:`${(i%8)*40}ms`,
                }}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'6px'}}>
                    <span style={{fontFamily:'Cinzel,serif',fontWeight:800,fontSize:'clamp(20px,3vw,28px)',color:dom.glow,lineHeight:1}}>
                      {String(a.id).padStart(2,'0')}
                    </span>
                    <span style={{fontFamily:'JetBrains Mono,monospace',fontSize:'9px',letterSpacing:'2px',color:dom.glow,textTransform:'uppercase'}}>
                      {a.domain}
                    </span>
                  </div>
                  <div style={{fontFamily:'Cinzel,serif',fontWeight:600,fontSize:'clamp(13px,1.8vw,16px)',color:'#e8dfc4',lineHeight:1.3}}>
                    {a.title}
                  </div>
                  <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'9px',letterSpacing:'1px',color:'rgba(232,223,196,0.3)',marginTop:'3px'}}>
                    {a.sub}
                  </div>
                  {isOpen && (
                    <div style={{
                      marginTop:'12px',fontFamily:'Cormorant Garamond,serif',
                      fontSize:'clamp(13px,1.8vw,16px)',lineHeight:1.6,color:'rgba(232,223,196,0.7)',
                      animation:'cardSlide 0.4s ease',
                    }}>{a.desc}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer style={{
        textAlign:'center',padding:'clamp(32px,5vw,60px) 20px clamp(20px,3vw,32px)',
        borderTop:'1px solid rgba(45,106,79,0.1)',marginTop:'20px',
      }}>
        <div style={{
          fontFamily:'Cinzel,serif',fontWeight:900,fontSize:'clamp(50px,10vw,100px)',
          color:'rgba(45,106,79,0.12)',lineHeight:1,
        }}>6</div>
        <div style={{width:'40px',height:'1px',background:'rgba(45,106,79,0.3)',margin:'12px auto'}}/>
        <div style={{fontFamily:'Cinzel,serif',fontSize:'10px',letterSpacing:'5px',color:'rgba(232,223,196,0.3)',textTransform:'uppercase'}}>
          Fifty Angles · Six Domains · One Number
        </div>
        <div style={{fontFamily:'JetBrains Mono,monospace',fontSize:'9px',letterSpacing:'3px',color:'rgba(232,223,196,0.12)',marginTop:'8px',textTransform:'uppercase'}}>
          Built with the Data Motion Skill
        </div>
      </footer>
    </div>
  );
}

/* ─────────────────────────────────────────
   HONEYCOMB GRID COMPONENT
───────────────────────────────────────── */
function HoneycombGrid({ angles, domains, layout, hexR, hexPad, openId, explored, filter, onOpen, onHover, hovered }) {
  const r = hexR;
  const pad = hexPad;
  const w = Math.sqrt(3) * (r + pad);
  const h = 1.5 * (r + pad);

  const rows = 6;
  const rowLengths = [9,8,9,8,8,8];
  const maxRowW = Math.max(...rowLengths) * w + w * 0.5;
  const svgW = maxRowW + r * 2;
  const svgH = rows * h + r * 2;

  return (
    <div style={{display:'flex',justifyContent:'center',minHeight:'340px'}}>
      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        style={{width:'min(1000px, 96vw)', height:'auto', overflow:'visible'}}
        xmlns="http://www.w3.org/2000/svg"
      >
        {layout.map(cell => {
          const angle = angles[cell.id - 1];
          if (!angle) return null;
          const dom = domains[angle.domain];
          const pos = (() => {
            let col = cell.col, row = cell.row;
            const rowOffset = row % 2 === 0 ? 0 : w / 2;
            const cx = r + col * w + rowOffset + w * 0.5;
            const cy = r + row * h + r;
            return {cx, cy};
          })();

          const isOpen = openId === angle.id;
          const isSeen = explored.has(angle.id);
          const isHov = hovered === angle.id;
          const dimmed = filter !== 'All' && angle.domain !== filter;

          const fillOpacity = dimmed ? 0.03 : isSeen ? 0.25 : 0.07;
          const strokeOpacity = dimmed ? 0.06 : isOpen ? 0.9 : isHov ? 0.7 : isSeen ? 0.5 : 0.2;
          const scale = isOpen ? 1.12 : isHov ? 1.06 : 1;

          return (
            <g
              key={cell.id}
              transform={`translate(${pos.cx},${pos.cy}) scale(${scale})`}
              className={`shad-hex ${isOpen?'open':''}`}
              onClick={e=>{
                const svgEl = e.currentTarget.closest('svg');
                const rect = svgEl.getBoundingClientRect();
                const svgScale = rect.width / svgW;
                onOpen(angle.id, {
                  currentTarget: {
                    getBoundingClientRect: () => ({
                      left: rect.left + pos.cx * svgScale - 20,
                      top: rect.top + pos.cy * svgScale - 20,
                      width: 40, height: 40,
                    })
                  }
                });
              }}
              onMouseEnter={()=>onHover(angle.id)}
              onMouseLeave={()=>onHover(null)}
              style={{cursor:'pointer', transformOrigin:`${pos.cx}px ${pos.cy}px`, transition:'transform 0.3s ease'}}
            >
              {/* Glow behind hex when open */}
              {(isOpen || isHov) && (
                <polygon
                  points={hexCorners(0,0,r+8).map(p=>p.join(',')).join(' ')}
                  fill={dom.color} opacity="0.12"
                  style={{filter:`blur(${isOpen?8:4}px)`}}
                />
              )}

              {/* Main hex */}
              <polygon
                points={hexCorners(0,0,r).map(p=>p.join(',')).join(' ')}
                fill={dom.color} fillOpacity={fillOpacity}
                stroke={dom.color} strokeOpacity={strokeOpacity} strokeWidth={isOpen?1.5:0.8}
              />

              {/* Seen indicator — inner glow ring */}
              {isSeen && !isOpen && (
                <polygon
                  points={hexCorners(0,0,r*0.75).map(p=>p.join(',')).join(' ')}
                  fill="none" stroke={dom.color} strokeOpacity="0.3" strokeWidth="0.5"
                />
              )}

              {/* Number label */}
              <text
                textAnchor="middle" dominantBaseline="middle" y="0"
                fontFamily="Cinzel,serif" fontWeight={isOpen?"800":"600"}
                fontSize={isOpen?r*0.54:r*0.44}
                fill={dimmed?'rgba(232,223,196,0.15)':dom.glow}
                fillOpacity={dimmed?0.3:isOpen?1:isHov?0.9:isSeen?0.7:0.4}
              >
                {String(angle.id).padStart(2,'0')}
              </text>

              {/* Domain mini label — only show on hover/open */}
              {(isOpen || isHov) && !dimmed && (
                <text
                  textAnchor="middle" dominantBaseline="middle" y={r * 0.42}
                  fontFamily="JetBrains Mono,monospace" fontSize={r * 0.2}
                  fill={dom.glow} fillOpacity="0.7" letterSpacing="1"
                >
                  {angle.domain.slice(0,4).toUpperCase()}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────
   STYLE HELPERS
───────────────────────────────────────── */
function hdrBtn(active) {
  return {
    padding:'7px 12px', background:active?undefined:'transparent',
    backgroundColor: active||'transparent',
    border:`1px solid rgba(45,106,79,${active?0.6:0.25})`,
    color: active?'#50c878':'rgba(232,223,196,0.5)',
    fontFamily:'JetBrains Mono,monospace', fontSize:'10px', letterSpacing:'2px',
    cursor:'pointer', borderRadius:'2px', transition:'all 0.3s',
    whiteSpace:'nowrap',
  };
}

function filterBtn(active, glow, color) {
  return {
    padding:'6px 14px', background: active?`${color}30`:'transparent',
    border:`1px solid ${active?color+'80':'rgba(232,223,196,0.1)'}`,
    color: active?glow:'rgba(232,223,196,0.45)',
    fontFamily:'Cinzel,serif', fontSize:'11px', letterSpacing:'2px',
    cursor:'pointer', borderRadius:'100px', transition:'all 0.3s',
  };
}
