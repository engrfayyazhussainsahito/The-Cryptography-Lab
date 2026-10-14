/**
 * CRYPTIX // Post-Quantum Cryptography (PQC) Lab
 * Implements Module-LWE noisy lattice simulator, ML-KEM key size comparisons,
 * Broken PQC post-mortem analysis (SIKE & Rainbow), and Hybrid Key Combiner.
 */

window.PqcLab = {
  currentPqcTab: 'lwe',

  init() {
    this.bindEvents();
    this.runLWE();
    this.updateKeySizes();
    this.runHybridCombiner();
  },

  bindEvents() {
    document.querySelectorAll('.pqc-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.pqc-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentPqcTab = btn.dataset.tab;
        this.updateView();
      });
    });

    ['lwe-mod-q', 'lwe-noise-toggle'].forEach(id => {
      document.getElementById(id)?.addEventListener('change', () => this.runLWE());
    });
    document.getElementById('btn-regen-lwe')?.addEventListener('click', () => this.runLWE());
    document.getElementById('btn-combine-hybrid')?.addEventListener('click', () => this.runHybridCombiner());
  },

  updateView() {
    const vLwe = document.getElementById('pqc-view-lwe');
    const vSizes = document.getElementById('pqc-view-sizes');
    const vBreaks = document.getElementById('pqc-view-breaks');
    const vHybrid = document.getElementById('pqc-view-hybrid');

    if (vLwe) vLwe.style.display = this.currentPqcTab === 'lwe' ? 'block' : 'none';
    if (vSizes) vSizes.style.display = this.currentPqcTab === 'sizes' ? 'block' : 'none';
    if (vBreaks) vBreaks.style.display = this.currentPqcTab === 'breaks' ? 'block' : 'none';
    if (vHybrid) vHybrid.style.display = this.currentPqcTab === 'hybrid' ? 'block' : 'none';
  },

  runLWE() {
    const q = parseInt(document.getElementById('lwe-mod-q')?.value || '17', 10);
    const withNoise = document.getElementById('lwe-noise-toggle')?.checked ?? true;

    const s = [5, 9];
    const A = [
      [3, 7],
      [11, 2],
      [4, 13],
      [6, 8]
    ];

    const e = withNoise ? [1, -1, 0, 1] : [0, 0, 0, 0];

    const b = [];
    for (let i = 0; i < 4; i++) {
      let val = (A[i][0] * s[0] + A[i][1] * s[1] + e[i]) % q;
      if (val < 0) val += q;
      b.push(val);
    }

    const outEl = document.getElementById('lwe-display');
    if (!outEl) return;

    outEl.innerHTML = `
      <div style="font-family: var(--font-mono); font-size: 0.8rem; line-height: 1.6;">
        <span style="color: var(--accent-cyan);">Public Lattice Matrix A &isin; &Zopf;<sub>${q}</sub><sup>4&times;2</sup>:</span><br>
        [ [${A[0].join(', ')}], [${A[1].join(', ')}], [${A[2].join(', ')}], [${A[3].join(', ')}] ]<br><br>
        <span style="color: var(--accent-emerald);">Secret Vector s &isin; &Zopf;<sub>${q}</sub><sup>2</sup>:</span> [${s.join(', ')}]<br>
        <span style="color: ${withNoise ? 'var(--accent-amber)' : 'var(--text-muted)'};">Noise Error Vector e:</span> [${e.join(', ')}] ${withNoise ? '(&larr; Small discrete Gaussian noise)' : '(&larr; Zero noise)'}<br><br>
        <span style="font-weight: 700;">Resulting Target Vector b = A&middot;s + e mod ${q}:</span><br>
        <strong style="color: var(--accent-cyan); font-size: 1rem;">b = [${b.join(', ')}]</strong><br><br>
        <div style="padding: 8px; border-radius: 6px; background: var(--bg-card); border: 1px solid var(--border-subtle); font-size: 0.75rem;">
          ${withNoise ?
            `<strong style="color: var(--accent-emerald);">&#10003; LWE Hardness Active:</strong> Because noise e is present, recovering s from (A, b) reduces to the Shortest Vector Problem (SVP) on high-dimensional lattices. <em>Immune to Shor\'s algorithm.</em> (Foundation of ML-KEM and ML-DSA).` :
            `<strong style="color: var(--accent-crimson);">&times; Zero Noise Vulnerability:</strong> Without noise e, this is a linear system A&middot;s = b mod ${q}, solved in O(n<sup>3</sup>) via Gaussian Elimination!`
          }
        </div>
      </div>
    `;
  },

  updateKeySizes() {
    const algorithms = [
      { name: 'ECC P-256 / X25519', pk: 32, ct: 32, qSec: '0 bits (Shor Broken)', color: 'var(--accent-crimson)' },
      { name: 'RSA-3072', pk: 384, ct: 384, qSec: '0 bits (Shor Broken)', color: 'var(--accent-crimson)' },
      { name: 'ML-KEM-768 (Kyber, FIPS 203)', pk: 1184, ct: 1088, qSec: 'NIST Cat 3 (192-bit PQ)', color: 'var(--accent-emerald)' },
      { name: 'HQC-128 (NIST Backup KEM 2025)', pk: 2249, ct: 4481, qSec: 'NIST Cat 1 (128-bit PQ)', color: 'var(--accent-cyan)' },
      { name: 'Classic McEliece 348864', pk: 261120, ct: 128, qSec: 'NIST Cat 1 (Code-based)', color: 'var(--accent-violet)' },
      { name: 'ML-DSA-65 (Dilithium, FIPS 204)', pk: 1952, ct: 3293, qSec: 'Signature: NIST Cat 3 PQ', color: 'var(--accent-amber)' },
      { name: 'SLH-DSA-128s (SPHINCS+, FIPS 205)', pk: 32, ct: 7856, qSec: 'Stateless Hash Signature', color: 'var(--accent-cyan)' }
    ];

    const container = document.getElementById('pqc-size-comparison');
    if (!container) return;

    let html = '';
    const maxPk = 261120;

    algorithms.forEach(algo => {
      const widthPct = Math.min(100, Math.max(3, (Math.log10(algo.pk) / Math.log10(maxPk)) * 100));
      html += `
        <div class="benchmark-row" style="margin-bottom: 8px;">
          <div class="benchmark-label-row">
            <span><strong>${algo.name}</strong> <small style="color: ${algo.color};">(${algo.qSec})</small></span>
            <span>PK: ${algo.pk.toLocaleString()} B | CT/Sig: ${algo.ct.toLocaleString()} B</span>
          </div>
          <div class="benchmark-track">
            <div class="benchmark-fill fill-cyan" style="width: ${widthPct}%; background: ${algo.color};"></div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  },

  runHybridCombiner() {
    const ecdhSecret = '0x8f4c2e1a90b34567... (32 bytes X25519)';
    const mlkemSecret = '0x43d99e01f5c6b782... (32 bytes ML-KEM-768)';

    const combinedHex = '0x7e29f10d48a6cb53e891234bc98012dae517f428c091...';

    const outEl = document.getElementById('hybrid-combiner-out');
    if (outEl) {
      outEl.innerHTML = `
        <div style="font-family: var(--font-mono); font-size: 0.8rem; line-height: 1.6;">
          <span style="color: var(--accent-cyan);">Classical Shared Secret (X25519):</span> ${ecdhSecret}<br>
          <span style="color: var(--accent-violet);">Post-Quantum Shared Secret (ML-KEM-768):</span> ${mlkemSecret}<br><br>
          <strong>IETF RFC Standard Hybrid KDF:</strong><br>
          <code>SS<sub>hybrid</sub> = HKDF-Extract(Salt, SS<sub>X25519</sub> &parallel; SS<sub>ML-KEM-768</sub>)</code><br><br>
          <span style="color: var(--accent-emerald); font-weight: 700;">Derived Session Master Secret:</span><br>
          <strong>${combinedHex}</strong><br><br>
          <span style="color: var(--text-muted); font-size: 0.75rem;">Defense-in-depth: If lattice cryptography suffers an unforeseen break, the session remains protected by classical Elliptic Curve Diffie-Hellman.</span>
        </div>
      `;
    }
  }
};
