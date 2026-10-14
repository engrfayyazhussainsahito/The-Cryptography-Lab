/**
 * CRYPTIX // Lightweight Cryptography (IoT & Embedded) Lab
 * Implements Ascon-128 (NIST SP 800-232) 320-bit permutation state visualizer
 * and IoT hardware Gate Equivalent (GE) / energy benchmark.
 */

window.LightweightLab = {
  asconWords: [
    0x80400c0600000000n,
    0x0001020304050607n,
    0x08090a0b0c0d0e0fn,
    0x0000000000000001n,
    0x0000000000000002n
  ],
  roundConstants: [
    0xf0n, 0xe1n, 0xd2n, 0xc3n, 0xb4n, 0xa5n,
    0x96n, 0x87n, 0x78n, 0x69n, 0x5an, 0x4bn
  ],
  currentRound: 0,

  init() {
    this.bindEvents();
    this.renderState();
  },

  bindEvents() {
    document.getElementById('btn-ascon-round')?.addEventListener('click', () => this.runAsconRound());
    document.getElementById('btn-ascon-reset')?.addEventListener('click', () => this.resetAscon());
  },

  renderState() {
    for (let i = 0; i < 5; i++) {
      const el = document.getElementById(`ascon-x${i}`);
      if (el) {
        el.textContent = '0x' + this.asconWords[i].toString(16).padStart(16, '0').toUpperCase();
      }
    }
    const rndEl = document.getElementById('ascon-round-num');
    if (rndEl) rndEl.textContent = this.currentRound;
  },

  resetAscon() {
    this.asconWords = [
      0x80400c0600000000n,
      0x0001020304050607n,
      0x08090a0b0c0d0e0fn,
      0x0000000000000001n,
      0x0000000000000002n
    ];
    this.currentRound = 0;
    this.renderState();
    const stEl = document.getElementById('ascon-step-status');
    if (stEl) stEl.textContent = 'State reset to initial 320-bit vector.';
  },

  rotr64(x, n) {
    const shift = BigInt(n);
    const mask = 0xffffffffffffffffn;
    return (((x >> shift) | (x << (64n - shift))) & mask);
  },

  runAsconRound() {
    if (this.currentRound >= 12) {
      const stEl = document.getElementById('ascon-step-status');
      if (stEl) stEl.textContent = 'All 12 rounds of Ascon-p[12] completed.';
      return;
    }

    const mask = 0xffffffffffffffffn;
    const cr = this.roundConstants[this.currentRound];

    this.asconWords[2] = (this.asconWords[2] ^ cr) & mask;

    let [x0, x1, x2, x3, x4] = this.asconWords;
    x0 ^= x4; x4 ^= x3; x2 ^= x1;
    let t0 = (~x0) & x1;
    let t1 = (~x1) & x2;
    let t2 = (~x2) & x3;
    let t3 = (~x3) & x4;
    let t4 = (~x4) & x0;
    x0 ^= t1; x1 ^= t2; x2 ^= t3; x3 ^= t4; x4 ^= t0;
    x1 ^= x0; x0 ^= x4; x3 ^= x2; x2 = ~x2;

    x0 = (x0 ^ this.rotr64(x0, 19) ^ this.rotr64(x0, 28)) & mask;
    x1 = (x1 ^ this.rotr64(x1, 61) ^ this.rotr64(x1, 39)) & mask;
    x2 = (x2 ^ this.rotr64(x2, 1)  ^ this.rotr64(x2, 6))  & mask;
    x3 = (x3 ^ this.rotr64(x3, 10) ^ this.rotr64(x3, 17)) & mask;
    x4 = (x4 ^ this.rotr64(x4, 7)  ^ this.rotr64(x4, 41)) & mask;

    this.asconWords = [x0, x1, x2, x3, x4];
    this.currentRound++;
    this.renderState();

    const stEl = document.getElementById('ascon-step-status');
    if (stEl) {
      stEl.innerHTML = `
        <strong>Round #${this.currentRound} Executed:</strong> Added constant 0x${cr.toString(16)}, executed bit-sliced S-box, and diffused with 64-bit rotations.
      `;
    }
  }
};
