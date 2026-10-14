/**
 * CRYPTIX // Classical Public-Key Cryptography Lab
 * Implements Toy RSA key generation & step-by-step math,
 * Canvas-based Elliptic Curve Point Addition & Doubling visualizer,
 * and ECDSA Nonce-Reuse Private Key extraction simulator.
 */

window.PublicKeyLab = {
  currentTab: 'rsa',
  curveA: -3,
  curveB: 7,

  init() {
    this.bindEvents();
    this.updateRSA();
    this.initECCCanvas();
    this.runEcdsaLeak();
  },

  bindEvents() {
    // Tab switching
    document.querySelectorAll('.pk-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.pk-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentTab = btn.dataset.tab;
        this.updateView();
      });
    });

    ['rsa-p', 'rsa-q', 'rsa-msg'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.updateRSA());
    });

    ['ecc-slider-p', 'ecc-slider-q'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.drawECC());
    });

    document.getElementById('ecc-mode-double')?.addEventListener('change', () => this.drawECC());
    document.getElementById('btn-extract-ecdsa')?.addEventListener('click', () => this.runEcdsaLeak());
  },

  updateView() {
    document.getElementById('pk-view-rsa').style.display = this.currentTab === 'rsa' ? 'block' : 'none';
    document.getElementById('pk-view-ecc').style.display = this.currentTab === 'ecc' ? 'block' : 'none';
    document.getElementById('pk-view-ecdsa').style.display = this.currentTab === 'ecdsa' ? 'block' : 'none';
    document.getElementById('pk-view-shor').style.display = this.currentTab === 'shor' ? 'block' : 'none';

    if (this.currentTab === 'ecc') this.drawECC();
  },

  // Helper: GCD
  gcd(a, b) {
    return !b ? a : this.gcd(b, a % b);
  },

  // Helper: Extended Euclidean Algorithm for modular inverse
  modInverse(e, phi) {
    let m0 = phi, t, q;
    let x0 = 0, x1 = 1;
    if (phi === 1) return 0;
    while (e > 1) {
      q = Math.floor(e / phi);
      t = phi;
      phi = e % phi;
      e = t;
      t = x0;
      x0 = x1 - q * x0;
      x1 = t;
    }
    if (x1 < 0) x1 += m0;
    return x1;
  },

  // Modular exponentiation (base^exp % mod)
  modPow(base, exp, mod) {
    let res = 1;
    base = base % mod;
    while (exp > 0) {
      if (exp % 2 === 1) res = (res * base) % mod;
      exp = Math.floor(exp / 2);
      base = (base * base) % mod;
    }
    return res;
  },

  updateRSA() {
    const p = parseInt(document.getElementById('rsa-p')?.value || '61', 10);
    const q = parseInt(document.getElementById('rsa-q')?.value || '53', 10);
    const msg = parseInt(document.getElementById('rsa-msg')?.value || '65', 10);

    const n = p * q;
    const phi = (p - 1) * (q - 1);

    // Pick e such that gcd(e, phi) == 1
    const candidateE = [17, 65537, 3, 5, 7, 11, 13];
    let e = 17;
    for (let c of candidateE) {
      if (c < phi && this.gcd(c, phi) === 1) {
        e = c;
        break;
      }
    }

    const d = this.modInverse(e, phi);

    // Encrypt: c = m^e % n
    const ciphertext = this.modPow(msg, e, n);
    // Decrypt: m = c^d % n
    const decrypted = this.modPow(ciphertext, d, n);

    document.getElementById('rsa-modulus-out').textContent = `n = p * q = ${p} * ${q} = ${n}`;
    document.getElementById('rsa-phi-out').textContent = `&phi;(n) = (${p}-1) * (${q}-1) = ${phi}`;
    document.getElementById('rsa-pub-out').textContent = `Public Key (e, n) = (${e}, ${n})`;
    document.getElementById('rsa-priv-out').textContent = `Private Key (d, n) = (${d}, ${n})`;
    document.getElementById('rsa-ct-out').textContent = `Ciphertext c = m^e mod n = ${msg}^${e} mod ${n} = ${ciphertext}`;
    document.getElementById('rsa-pt-out').textContent = `Decrypted m = c^d mod n = ${ciphertext}^${d} mod ${n} = ${decrypted} (Original: ${msg})`;
  },

  // Elliptic Curve Visualizer
  initECCCanvas() {
    this.canvas = document.getElementById('ecc-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.drawECC();
  },

  drawECC() {
    if (!this.ctx) return;
    const cvs = this.canvas;
    const ctx = this.ctx;
    const w = (cvs.width = cvs.clientWidth);
    const h = (cvs.height = cvs.clientHeight);

    ctx.clearRect(0, 0, w, h);

    const ox = w / 2;
    const oy = h / 2;
    const scale = 32;

    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, oy); ctx.lineTo(w, oy);
    ctx.moveTo(ox, 0); ctx.lineTo(ox, h);
    ctx.stroke();

    const a = this.curveA;
    const b = this.curveB;

    // Draw Elliptic Curve: y^2 = x^3 + ax + b
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;

    // Positive branch
    ctx.beginPath();
    let started = false;
    for (let px = -5; px <= 6; px += 0.02) {
      const rhs = px * px * px + a * px + b;
      if (rhs >= 0) {
        const py = Math.sqrt(rhs);
        const sx = ox + px * scale;
        const sy = oy - py * scale;
        if (!started) { ctx.moveTo(sx, sy); started = true; }
        else { ctx.lineTo(sx, sy); }
      }
    }
    ctx.stroke();

    // Negative branch
    ctx.beginPath();
    started = false;
    for (let px = -5; px <= 6; px += 0.02) {
      const rhs = px * px * px + a * px + b;
      if (rhs >= 0) {
        const py = -Math.sqrt(rhs);
        const sx = ox + px * scale;
        const sy = oy - py * scale;
        if (!started) { ctx.moveTo(sx, sy); started = true; }
        else { ctx.lineTo(sx, sy); }
      }
    }
    ctx.stroke();

    // Point P and Point Q
    const pSlider = parseFloat(document.getElementById('ecc-slider-p')?.value || '-1.5');
    const isDoubling = document.getElementById('ecc-mode-double')?.checked;

    let x1 = pSlider;
    let rhs1 = x1 * x1 * x1 + a * x1 + b;
    if (rhs1 < 0) x1 = -1.5;
    let y1 = Math.sqrt(x1 * x1 * x1 + a * x1 + b);

    let x2, y2, lambda;
    if (isDoubling) {
      // Point Doubling: lambda = (3*x1^2 + a) / (2*y1)
      lambda = (3 * x1 * x1 + a) / (2 * y1);
      x2 = x1;
      y2 = y1;
    } else {
      const qSlider = parseFloat(document.getElementById('ecc-slider-q')?.value || '2.0');
      x2 = qSlider;
      let rhs2 = x2 * x2 * x2 + a * x2 + b;
      if (rhs2 < 0) x2 = 2.0;
      y2 = Math.sqrt(x2 * x2 * x2 + a * x2 + b);
      lambda = (y2 - y1) / (x2 - x1);
    }

    // Intersection x3 = lambda^2 - x1 - x2
    const x3 = lambda * lambda - x1 - x2;
    const y3_neg = lambda * (x3 - x1) + y1;
    const y3 = -y3_neg; // Reflect across x-axis

    // Draw chord line through P and Q to -R
    const sx1 = ox + x1 * scale, sy1 = oy - y1 * scale;
    const sx2 = ox + x2 * scale, sy2 = oy - y2 * scale;
    const sx3 = ox + x3 * scale, sy3_neg = oy - y3_neg * scale;
    const sxR = ox + x3 * scale, syR = oy - y3 * scale;

    ctx.strokeStyle = 'rgba(244, 63, 94, 0.7)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    const lineX1 = -5, lineY1 = lambda * (lineX1 - x1) + y1;
    const lineX2 = 6, lineY2 = lambda * (lineX2 - x1) + y1;
    ctx.moveTo(ox + lineX1 * scale, oy - lineY1 * scale);
    ctx.lineTo(ox + lineX2 * scale, oy - lineY2 * scale);
    ctx.stroke();

    // Vertical reflection line from -R to R
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.7)';
    ctx.beginPath();
    ctx.moveTo(sx3, sy3_neg);
    ctx.lineTo(sxR, syR);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Points
    const drawPoint = (x, y, label, color) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.font = '11px JetBrains Mono';
      ctx.fillText(label, x + 8, y - 6);
    };

    drawPoint(sx1, sy1, 'P', '#10b981');
    if (!isDoubling) drawPoint(sx2, sy2, 'Q', '#f59e0b');
    drawPoint(sx3, sy3_neg, '-R', '#64748b');
    drawPoint(sxR, syR, isDoubling ? '2P' : 'R = P+Q', '#a855f7');

    document.getElementById('ecc-coords-out').innerHTML = `
      <strong>Point Coordinates:</strong><br>
      P = (${x1.toFixed(2)}, ${y1.toFixed(2)})<br>
      ${isDoubling ? '2P' : 'R = P+Q'} = (${x3.toFixed(2)}, ${y3.toFixed(2)})<br>
      <span style="color: var(--text-muted); font-size: 0.75rem;">Curve: y<sup>2</sup> = x<sup>3</sup> - 3x + 7. In cryptography, this group operation is performed over finite field &Fopf;<sub>p</sub> (secp256k1 / Curve25519) where discrete log is intractable classically.</span>
    `;
  },

  // ECDSA Nonce Reuse Private Key Leak
  runEcdsaLeak() {
    // Curve parameters (toy group order n = 101)
    const n = 101;
    const z1 = 34; // hash of message 1
    const z2 = 78; // hash of message 2
    const d_true = 42; // true private key
    const k_reused = 15; // fatal reused nonce

    // r = (k * G).x % n
    const r = (k_reused * 7) % n; // toy point scalar

    // s1 = k^-1 * (z1 + r*d) % n
    const k_inv = this.modInverse(k_reused, n);
    const s1 = (k_inv * (z1 + r * d_true)) % n;
    const s2 = (k_inv * (z2 + r * d_true)) % n;

    // Attacker extracts nonce k:
    // k = (z1 - z2) / (s1 - s2) mod n
    const s_diff = (s1 - s2 + n) % n;
    const s_diff_inv = this.modInverse(s_diff, n);
    const z_diff = (z1 - z2 + n) % n;
    const extracted_k = (z_diff * s_diff_inv) % n;

    // Attacker recovers private key d:
    // d = (s1 * k - z1) / r mod n
    const r_inv = this.modInverse(r, n);
    const extracted_d = (((s1 * extracted_k - z1) % n + n) % n * r_inv) % n;

    const outEl = document.getElementById('ecdsa-leak-out');
    if (outEl) {
      outEl.innerHTML = `
        <div style="font-family: var(--font-mono); font-size: 0.8rem; line-height: 1.6;">
          <span style="color: var(--accent-amber);">Signature 1 (Message 1):</span> (r: ${r}, s<sub>1</sub>: ${s1})<br>
          <span style="color: var(--accent-amber);">Signature 2 (Message 2):</span> (r: ${r}, s<sub>2</sub>: ${s2}) <strong style="color: var(--accent-crimson);">&larr; Identical r detected!</strong><br><br>
          <strong>Step 1: Extracted Nonce k:</strong><br>
          k = (z<sub>1</sub> - z<sub>2</sub>) &middot; (s<sub>1</sub> - s<sub>2</sub>)<sup>-1</sup> mod n = <strong>${extracted_k}</strong> (Matches true k: ${k_reused})<br><br>
          <strong>Step 2: Private Key Extracted in O(1):</strong><br>
          d<sub>A</sub> = (s<sub>1</sub> &middot; k - z<sub>1</sub>) &middot; r<sup>-1</sup> mod n = <strong style="color: var(--accent-crimson); font-size: 1rem;">${extracted_d}</strong> (True Key: ${d_true})<br>
          <span style="color: var(--text-muted); font-size: 0.75rem;">This identical vulnerability destroyed Sony's PlayStation 3 security in 2010. Ed25519 (RFC 8032) eliminates this by generating k deterministically: k = H(sk || message).</span>
        </div>
      `;
    }
  }
};
