// Lightweight canvas particle engine: ambient petals, celebration bursts,
// and a gold-dust sparkle trail. Sprites are pre-rendered once, so each frame
// is just a handful of drawImage calls — smooth on phones.

const TAU = Math.PI * 2;
const rand = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[(Math.random() * arr.length) | 0];

const COLORS = {
  pink: ['#F9CFD8', '#E58FA5'],
  rose: ['#F1A9B4', '#C9667A'],
  blush: ['#FBE0D8', '#EDB4A6'],
  beige: ['#F8E8D2', '#E0BF98'],
  cream: ['#FFF6E8', '#E9D3B2'],
  gold: ['#F0D48C', '#B98A34'],
  deepgold: ['#DDB45E', '#9C6F1E'],
  maroon: ['#B5424C', '#7A1620'],
};

const AMBIENT_MIX = [
  ['petal', 'pink'], ['petal', 'pink'], ['petal', 'rose'], ['petal', 'beige'], ['petal', 'blush'],
  ['petal', 'gold'], ['leaf', 'deepgold'], ['flower', 'cream'], ['flower', 'pink'], ['petal', 'cream'],
];
const BURST_MIX = [
  ['fleck', 'gold'], ['fleck', 'gold'], ['fleck', 'deepgold'], ['fleck', 'gold'], ['fleck', 'cream'],
  ['petal', 'pink'], ['petal', 'rose'], ['petal', 'gold'], ['petal', 'beige'], ['flower', 'pink'],
  ['leaf', 'deepgold'], ['petal', 'maroon'],
];

function makeSprite(kind, colors, px, dpr) {
  const s = Math.round(px * dpr);
  const c = document.createElement('canvas');
  c.width = c.height = s;
  const g = c.getContext('2d');
  g.translate(s / 2, s / 2);
  g.scale(s / 2.3, s / 2.3);
  const [a, b] = colors;
  const grad = g.createLinearGradient(0, -1, 0, 1);
  grad.addColorStop(0, a);
  grad.addColorStop(1, b);
  g.fillStyle = grad;

  if (kind === 'petal') {
    g.beginPath();
    g.moveTo(0, -1);
    g.bezierCurveTo(0.95, -0.55, 0.78, 0.8, 0, 1);
    g.bezierCurveTo(-0.78, 0.8, -0.95, -0.55, 0, -1);
    g.fill();
    g.strokeStyle = 'rgba(255,255,255,.4)';
    g.lineWidth = 0.045;
    g.beginPath();
    g.moveTo(0, -0.78);
    g.quadraticCurveTo(0.06, 0, 0, 0.72);
    g.stroke();
  } else if (kind === 'leaf') {
    g.beginPath();
    g.moveTo(0, -1);
    g.quadraticCurveTo(0.7, -0.1, 0, 1);
    g.quadraticCurveTo(-0.7, -0.1, 0, -1);
    g.fill();
    g.strokeStyle = 'rgba(80,50,10,.35)';
    g.lineWidth = 0.05;
    g.beginPath();
    g.moveTo(0, -0.85);
    g.lineTo(0, 0.85);
    g.stroke();
  } else if (kind === 'flower') {
    for (let i = 0; i < 5; i++) {
      g.save();
      g.rotate((i / 5) * TAU);
      g.beginPath();
      g.ellipse(0, -0.5, 0.34, 0.5, 0, 0, TAU);
      g.fill();
      g.restore();
    }
    g.fillStyle = '#E2B65B';
    g.beginPath();
    g.arc(0, 0, 0.2, 0, TAU);
    g.fill();
  } else {
    // fleck / confetti
    g.beginPath();
    g.roundRect ? g.roundRect(-0.55, -0.26, 1.1, 0.52, 0.12) : g.rect(-0.55, -0.26, 1.1, 0.52);
    g.fill();
    g.strokeStyle = 'rgba(255,255,255,.45)';
    g.lineWidth = 0.05;
    g.beginPath();
    g.moveTo(-0.4, -0.08);
    g.lineTo(0.35, -0.08);
    g.stroke();
  }
  return c;
}

export class PetalField {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    this.w = 0;
    this.h = 0;
    this.particles = [];
    this.sparks = [];
    this.ambient = this.reduced ? 5 : 22;
    this.sprites = {};
    this.running = false;
    this.last = 0;
    this.trailEnabled = true;
    this._lastTrail = { x: -99, y: -99 };

    this.resize = this.resize.bind(this);
    this.loop = this.loop.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onDown = this.onDown.bind(this);

    this.buildSprites();
    this.resize();
    window.addEventListener('resize', this.resize);
    window.addEventListener('pointermove', this.onMove, { passive: true });
    window.addEventListener('pointerdown', this.onDown, { passive: true });
    // Seed ambient petals across the screen so it feels alive immediately.
    for (let i = 0; i < this.ambient; i++) this.spawnAmbient(true);
  }

  buildSprites() {
    const keys = new Set([...AMBIENT_MIX, ...BURST_MIX].map(([k, c]) => `${k}:${c}`));
    keys.forEach((key) => {
      const [kind, color] = key.split(':');
      this.sprites[key] = makeSprite(kind, COLORS[color], 44, this.dpr);
    });
  }

  resize() {
    const r = this.canvas.getBoundingClientRect();
    this.w = r.width;
    this.h = r.height;
    this.canvas.width = Math.round(this.w * this.dpr);
    this.canvas.height = Math.round(this.h * this.dpr);
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.last = performance.now();
    requestAnimationFrame(this.loop);
  }

  destroy() {
    this.running = false;
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('pointermove', this.onMove);
    window.removeEventListener('pointerdown', this.onDown);
  }

  setAmbient(n) {
    this.ambient = this.reduced ? Math.min(n, 6) : n;
  }

  spawnAmbient(anywhere = false) {
    const [kind, color] = pick(AMBIENT_MIX);
    const depth = Math.random(); // 0 = far/small/slow, 1 = near/big/fast
    const size = 11 + depth * 17;
    this.particles.push({
      key: `${kind}:${color}`,
      x: rand(-20, this.w + 20),
      y: anywhere ? rand(-20, this.h) : rand(-60, -14),
      vx: rand(-8, 10),
      vy: 16 + depth * 34 + rand(0, 10),
      sway: rand(10, 28),
      sf: rand(0.6, 1.5),
      ph: rand(0, TAU),
      rot: rand(0, TAU),
      vr: rand(-1.6, 1.6),
      flip: rand(0, TAU),
      fs: rand(1.2, 3.2),
      size,
      alpha: 0.45 + depth * 0.5,
      burst: false,
      t: 0,
    });
  }

  // Celebration: confetti + petals raining from the top (or exploding from a point)
  burst({ count = 160, x = null, y = null, spread = 1, duration = 0 } = {}) {
    const n = this.reduced ? Math.min(count, 40) : count;
    const spawn = () => {
      const [kind, color] = pick(BURST_MIX);
      const isFleck = kind === 'fleck';
      const fromPoint = x != null;
      const px = fromPoint ? x : rand(-10, this.w + 10);
      const py = fromPoint ? y : rand(-this.h * 0.35, -10);
      const ang = fromPoint ? rand(-Math.PI, 0) : 0;
      const pow = fromPoint ? rand(120, 460) * spread : 0;
      this.particles.push({
        key: `${kind}:${color}`,
        x: px,
        y: py,
        vx: fromPoint ? Math.cos(ang) * pow : rand(-30, 30),
        vy: fromPoint ? Math.sin(ang) * pow : rand(60, 200),
        sway: isFleck ? rand(6, 16) : rand(14, 36),
        sf: rand(1, 2.6),
        ph: rand(0, TAU),
        rot: rand(0, TAU),
        vr: rand(-6, 6),
        flip: rand(0, TAU),
        fs: rand(4, 11),
        size: isFleck ? rand(7, 13) : rand(12, 24),
        alpha: rand(0.75, 1),
        burst: true,
        term: isFleck ? rand(110, 200) : rand(70, 140),
        t: 0,
      });
    };
    if (duration > 0) {
      const batches = Math.ceil(duration / 120);
      for (let i = 0; i < batches; i++) {
        setTimeout(() => {
          for (let k = 0; k < n / batches; k++) spawn();
        }, i * 120);
      }
    } else {
      for (let i = 0; i < n; i++) spawn();
    }
  }

  sparkle(x, y, n = 1, big = false) {
    for (let i = 0; i < n; i++) {
      this.sparks.push({
        x: x + rand(-6, 6),
        y: y + rand(-6, 6),
        vx: rand(-26, 26),
        vy: rand(-34, 12),
        life: 0,
        ttl: rand(0.5, 1.0),
        size: big ? rand(7, 13) : rand(4, 8),
        rot: rand(0, TAU),
      });
    }
  }

  local(e) {
    const r = this.canvas.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    return x < 0 || y < 0 || x > r.width || y > r.height ? null : { x, y };
  }

  onMove(e) {
    if (!this.trailEnabled || this.reduced) return;
    if (e.pointerType === 'mouse' && e.buttons === 0 && Math.random() > 0.35) return;
    const p = this.local(e);
    if (!p) return;
    const d = Math.hypot(p.x - this._lastTrail.x, p.y - this._lastTrail.y);
    if (d < 16) return;
    this._lastTrail = p;
    this.sparkle(p.x, p.y, 1);
  }

  onDown(e) {
    if (this.reduced) return;
    const p = this.local(e);
    if (p) this.sparkle(p.x, p.y, 7, true);
  }

  loop(now) {
    if (!this.running) return;
    requestAnimationFrame(this.loop);
    if (document.hidden) {
      this.last = now;
      return;
    }
    const dt = Math.min((now - this.last) / 1000, 0.05);
    this.last = now;
    this.update(dt);
    this.draw();
  }

  update(dt) {
    const { particles } = this;
    let ambientCount = 0;
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.t += dt;
      p.rot += p.vr * dt;
      p.flip += p.fs * dt;
      if (p.burst) {
        p.vy = Math.min(p.vy + 240 * dt, p.term);
        p.vx *= 1 - 0.9 * dt;
      } else {
        ambientCount++;
      }
      p.x += (p.vx + Math.sin(p.t * p.sf + p.ph) * p.sway) * dt;
      p.y += p.vy * dt;
      if (p.y > this.h + 30 || p.x < -60 || p.x > this.w + 60) {
        particles.splice(i, 1);
        if (!p.burst) ambientCount--;
      }
    }
    // top ambient field up (or let it drain when ambient target drops)
    if (ambientCount < this.ambient && Math.random() < dt * 3.2) this.spawnAmbient(false);

    for (let i = this.sparks.length - 1; i >= 0; i--) {
      const s = this.sparks[i];
      s.life += dt;
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      s.vy += 40 * dt;
      s.rot += dt * 2;
      if (s.life > s.ttl) this.sparks.splice(i, 1);
    }
  }

  draw() {
    const { ctx, dpr } = this;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const p of this.particles) {
      const cf = Math.cos(p.flip);
      const cr = Math.cos(p.rot);
      const sr = Math.sin(p.rot);
      ctx.globalAlpha = p.alpha * (0.5 + 0.5 * Math.abs(cf));
      ctx.setTransform(cr * dpr, sr * dpr, -sr * cf * dpr, cr * cf * dpr, p.x * dpr, p.y * dpr);
      ctx.drawImage(this.sprites[p.key], -p.size / 2, -p.size / 2, p.size, p.size);
    }

    // sparkles — 4-point gold stars
    ctx.globalCompositeOperation = 'lighter';
    for (const s of this.sparks) {
      const k = 1 - s.life / s.ttl;
      ctx.globalAlpha = k * 0.9;
      ctx.setTransform(dpr, 0, 0, dpr, s.x * dpr, s.y * dpr);
      ctx.rotate(s.rot);
      const r = s.size * (0.4 + 0.6 * k);
      ctx.fillStyle = '#ffe3a0';
      ctx.beginPath();
      ctx.moveTo(0, -r);
      ctx.quadraticCurveTo(0, 0, r, 0);
      ctx.quadraticCurveTo(0, 0, 0, r);
      ctx.quadraticCurveTo(0, 0, -r, 0);
      ctx.quadraticCurveTo(0, 0, 0, -r);
      ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
  }
}

// Singleton facade so any component can fire effects without prop-drilling.
export const petals = {
  field: null,
  burst: (o) => petals.field?.burst(o),
  sparkle: (x, y, n, big) => {
    const f = petals.field;
    if (!f) return;
    const r = f.canvas.getBoundingClientRect();
    f.sparkle(x - r.left, y - r.top, n, big);
  },
  setAmbient: (n) => petals.field?.setAmbient(n),
  size: () => ({ w: petals.field?.w ?? 390, h: petals.field?.h ?? 800 }),
};
