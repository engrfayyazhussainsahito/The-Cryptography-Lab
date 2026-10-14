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

    // Update labels
    document.getElementById('argon-mem-val').textContent = `${memMB} MB`;
    document.getElementById('argon-iter-val').textContent = `${iter} passes`;
    document.getElementById('argon-threads-val').textContent = `${threads} threads`;
    document.getElementById('pbkdf2-iter-val').textContent = `${pbkdf2Iter.toLocaleString()}`;
    document.getElementById('bcrypt-cost-val').textContent = `2^${bcryptCost} rounds`;

    // Calculate approximate GPU cracking rate on an 8x NVIDIA RTX 4090 cluster:
    // PBKDF2-SHA256: RTX 4090 does ~5,000 MH/s for raw SHA256. At 600,000 iter: ~8,300 H/s per card = ~66,000 H/s cluster
    const pbkdf2ClusterHps = Math.max(1, Math.floor(5000000000 / pbkdf2Iter) * 8);

    // bcrypt: RTX 4090 does ~120 kH/s at cost 5. At cost 12: ~1,800 H/s per card = ~14,400 H/s cluster
    const bcryptClusterHps = Math.max(1, Math.floor(120000 / Math.pow(2, bcryptCost - 5)) * 8);

    // Argon2id: At 64MB memory, a GPU has 24GB VRAM. It can run at most 375 concurrent instances!
    // Bandwidth bottlenecked to ~120 H/s per card = ~960 H/s cluster!
    const argonClusterHps = Math.max(1, Math.floor((24000 / memMB) * (15 / iter)) * 8);

    // Render bars
    const maxHps = Math.max(pbkdf2ClusterHps, bcryptClusterHps, argonClusterHps);
    document.getElementById('bar-pbkdf2').style.width = `${Math.min(100, Math.max(5, (pbkdf2ClusterHps / maxHps) * 100))}%`;
    document.getElementById('bar-bcrypt').style.width = `${Math.min(100, Math.max(5, (bcryptClusterHps / maxHps) * 100))}%`;
    document.getElementById('bar-argon2').style.width = `${Math.min(100, Math.max(5, (argonClusterHps / maxHps) * 100))}%`;

    document.getElementById('hps-pbkdf2').textContent = `${pbkdf2ClusterHps.toLocaleString()} H/s`;
    document.getElementById('hps-bcrypt').textContent = `${bcryptClusterHps.toLocaleString()} H/s`;
    document.getElementById('hps-argon2').textContent = `${argonClusterHps.toLocaleString()} H/s`;

    // Estimated time for 8-char alphanumeric password (62^8 = 218 trillion combinations)
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

    document.getElementById('time-pbkdf2').textContent = formatTime(totalCombos / pbkdf2ClusterHps);
    document.getElementById('time-bcrypt').textContent = formatTime(totalCombos / bcryptClusterHps);
    document.getElementById('time-argon2').textContent = formatTime(totalCombos / argonClusterHps);
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
      'Step 2: Server evaluates Oblivious PRF (OPRF) using its secret key k: &beta; = &alpha;<sup>k</sup> and returns &beta; with encrypted envelope.',
      'Step 3: Client unblinds &beta; using r<sup>-1</sup> to compute PRF output: rw = &beta;<sup>r<sup>-1</sup></sup> = H<sub>1</sub>(P)<sup>k</sup>. Decrypts envelope to retrieve client private key.',
      'Step 4: Authenticated Diffie-Hellman Key Exchange completes! Both parties compute identical Session Key K. Eavesdropper or rogue server cannot perform offline dictionary attacks!'
    ];
    if (statusEl) statusEl.innerHTML = descriptions[this.pakeStep];
  }
};
