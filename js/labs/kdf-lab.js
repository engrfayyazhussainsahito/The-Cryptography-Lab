/**
 * CRYPTIX // Key Derivation & Password Hashing (KDF & PAKE) Lab
 * Compares Argon2id, scrypt, bcrypt, and PBKDF2 against GPU cluster brute-force,
 * and simulates the OPAQUE / SRP zero-knowledge password-authenticated key exchange.
 */

window.KdfLab = {
  init() {
    this.bindEvents();
    this.updateBenchmark();
  },

  bindEvents() {
    ['argon-mem', 'argon-iter', 'argon-threads', 'pbkdf2-iter', 'bcrypt-cost'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.updateBenchmark());
    });

    document.getElementById('btn-pake-step')?.addEventListener('click', () => this.advancePake());
  },

  updateBenchmark() {
    const memMB = parseInt(document.getElementById('argon-mem')?.value || '64', 10);
    const iter = parseInt(document.getElementById('argon-iter')?.value || '3', 10);
    const threads = parseInt(document.getElementById('argon-threads')?.value || '4', 10);
    const pbkdf2Iter = parseInt(document.getElementById('pbkdf2-iter')?.value || '600000', 10);
    const bcryptCost = parseInt(document.getElementById('bcrypt-cost')?.value || '12', 10);

    const memValEl = document.getElementById('argon-mem-val');
    const iterValEl = document.getElementById('argon-iter-val');
    const threadsValEl = document.getElementById('argon-threads-val');
    const pbValEl = document.getElementById('pbkdf2-iter-val');
    const bcValEl = document.getElementById('bcrypt-cost-val');

    if (memValEl) memValEl.textContent = `${memMB} MB`;
    if (iterValEl) iterValEl.textContent = `${iter} passes`;
    if (threadsValEl) threadsValEl.textContent = `${threads} threads`;
    if (pbValEl) pbValEl.textContent = `${pbkdf2Iter.toLocaleString()}`;
    if (bcValEl) bcValEl.textContent = `2^${bcryptCost} rounds`;

    const pbkdf2ClusterHps = Math.max(1, Math.floor(5000000000 / pbkdf2Iter) * 8);
    const bcryptClusterHps = Math.max(1, Math.floor(120000 / Math.pow(2, bcryptCost - 5)) * 8);
    const argonClusterHps = Math.max(1, Math.floor((24000 / memMB) * (15 / iter)) * 8);

    const maxHps = Math.max(pbkdf2ClusterHps, bcryptClusterHps, argonClusterHps);
    const bPb = document.getElementById('bar-pbkdf2');
    const bBc = document.getElementById('bar-bcrypt');
    const bAr = document.getElementById('bar-argon2');

    if (bPb) bPb.style.width = `${Math.min(100, Math.max(5, (pbkdf2ClusterHps / maxHps) * 100))}%`;
    if (bBc) bBc.style.width = `${Math.min(100, Math.max(5, (bcryptClusterHps / maxHps) * 100))}%`;
    if (bAr) bAr.style.width = `${Math.min(100, Math.max(5, (argonClusterHps / maxHps) * 100))}%`;

    const hPb = document.getElementById('hps-pbkdf2');
    const hBc = document.getElementById('hps-bcrypt');
    const hAr = document.getElementById('hps-argon2');

    if (hPb) hPb.textContent = `${pbkdf2ClusterHps.toLocaleString()} H/s`;
    if (hBc) hBc.textContent = `${bcryptClusterHps.toLocaleString()} H/s`;
    if (hAr) hAr.textContent = `${argonClusterHps.toLocaleString()} H/s`;

    const totalCombos = 2.18e14;
    const formatTime = (seconds) => {
      if (seconds < 60) return `${Math.round(seconds)} seconds`;
      if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
      if (seconds < 86400) return `${(seconds / 3600).toFixed(1)} hours`;
      if (seconds < 31536000) return `${(seconds / 86400).toFixed(1)} days`;
      const years = seconds / 31536000;
      if (years < 1000) return `${years.toFixed(1)} years`;
      return `${years.toExponential(1)} years`;
    };

    const tPb = document.getElementById('time-pbkdf2');
    const tBc = document.getElementById('time-bcrypt');
    const tAr = document.getElementById('time-argon2');

    if (tPb) tPb.textContent = formatTime(totalCombos / pbkdf2ClusterHps);
    if (tBc) tBc.textContent = formatTime(totalCombos / bcryptClusterHps);
    if (tAr) tAr.textContent = formatTime(totalCombos / argonClusterHps);
  },

  pakeStep: 0,
  advancePake() {
    this.pakeStep = (this.pakeStep + 1) % 4;
    const steps = document.querySelectorAll('.pake-step-item');
    steps.forEach((st, idx) => {
      st.classList.toggle('active', idx === this.pakeStep);
    });

    const statusEl = document.getElementById('pake-flow-status');
    const descriptions = [
      'Step 1: Client blinds password using random scalar r: &alpha; = H<sub>1</sub>(Password)<sup>r</sup> and sends &alpha; to Server. (Server sees only blinded entropy).',
      'Step 2: Server evaluates Oblivious PRF (OPRF) using secret key k: &beta; = &alpha;<sup>k</sup> and returns &beta; with encrypted credential envelope.',
      'Step 3: Client unblinds &beta; using r<sup>-1</sup> to compute PRF output: rw = &beta;<sup>r<sup>-1</sup></sup> = H<sub>1</sub>(P)<sup>k</sup>. Decrypts envelope to retrieve client private key.',
      'Step 4: Authenticated Diffie-Hellman Key Exchange completes! Both parties compute identical Session Key K. Eavesdropper or server cannot perform offline dictionary attacks!'
    ];
    if (statusEl) statusEl.innerHTML = descriptions[this.pakeStep];
  }
};
