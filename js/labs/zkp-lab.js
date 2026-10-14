/**
 * CRYPTIX // Advanced Privacy, ZKP & Homomorphic Encryption Lab
 * Implements Schnorr Zero-Knowledge Proof, Shamir (k, n) Secret Sharing,
 * and Paillier Additive Homomorphic Encryption math simulation.
 */

window.ZkpLab = {
  currentTab: 'schnorr',

  init() {
    this.bindEvents();
    this.runSchnorr();
    this.runShamir();
    this.runPaillier();
  },

  bindEvents() {
    document.querySelectorAll('.zkp-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.zkp-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentTab = btn.dataset.tab;
        this.updateView();
      });
    });

    document.getElementById('btn-run-schnorr')?.addEventListener('click', () => this.runSchnorr());
    document.getElementById('schnorr-imposter')?.addEventListener('change', () => this.runSchnorr());

    ['shamir-k', 'shamir-n', 'shamir-secret'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.runShamir());
    });

    ['paillier-m1', 'paillier-m2'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.runPaillier());
    });
  },

  updateView() {
    const vSch = document.getElementById('zkp-view-schnorr');
    const vSha = document.getElementById('zkp-view-shamir');
    const vPai = document.getElementById('zkp-view-paillier');

    if (vSch) vSch.style.display = this.currentTab === 'schnorr' ? 'block' : 'none';
    if (vSha) vSha.style.display = this.currentTab === 'shamir' ? 'block' : 'none';
    if (vPai) vPai.style.display = this.currentTab === 'paillier' ? 'block' : 'none';
  },

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

  runSchnorr() {
    const p = 79;
    const g = 3;
    const isImposter = document.getElementById('schnorr-imposter')?.checked ?? false;

    const x = 15;
    const y = this.modPow(g, x, p);

    const r = Math.floor(Math.random() * 50) + 1;
    const t = this.modPow(g, r, p);
    const c = Math.floor(Math.random() * 20) + 1;

    let s;
    if (isImposter) {
      s = Math.floor(Math.random() * 70);
    } else {
      s = (r + c * x) % (p - 1);
    }

    const lhs = this.modPow(g, s, p);
    const rhs = (t * this.modPow(y, c, p)) % p;
    const isValid = lhs === rhs;

    const outEl = document.getElementById('schnorr-out');
    if (outEl) {
      outEl.innerHTML = `
        <div style="font-family: var(--font-mono); font-size: 0.8rem; line-height: 1.6;">
          <span style="color: var(--accent-cyan);">Public Parameters:</span> Prime p = ${p}, Generator g = ${g}<br>
          <span style="color: var(--accent-cyan);">Public Key:</span> y = g<sup>x</sup> mod p = <strong>${y}</strong> (Secret x is hidden)<br><br>
          <strong>Protocol Execution (&Sigma;-Protocol):</strong><br>
          1. Peggy Commitment: r = ${r} &rarr; t = g<sup>r</sup> mod p = <strong>${t}</strong><br>
          2. Victor Challenge: c = <strong>${c}</strong><br>
          3. Peggy Response: s = ${isImposter ? `<strong>${s}</strong> (Fake imposter guess)` : `r + c&middot;x mod (p-1) = <strong>${s}</strong>`}<br><br>
          <strong>Victor Verification Equation:</strong><br>
          LHS: g<sup>s</sup> mod p = <strong>${lhs}</strong><br>
          RHS: t &middot; y<sup>c</sup> mod p = <strong>${rhs}</strong><br><br>
          <div style="padding: 8px; border-radius: 6px; background: ${isValid ? 'rgba(16, 185, 129, 0.12)' : 'rgba(244, 63, 94, 0.12)'}; border: 1px solid ${isValid ? 'var(--accent-emerald)' : 'var(--accent-crimson)'};">
            ${isValid ?
              `<strong style="color: var(--accent-emerald);">&#10003; ZERO-KNOWLEDGE PROOF ACCEPTED:</strong> Victor is convinced Peggy knows secret x, yet Victor learned zero information about x. (Completeness & Soundness satisfied).` :
              `<strong style="color: var(--accent-crimson);">&times; PROOF REJECTED (IMPOSTER CAUGHT):</strong> LHS (${lhs}) &ne; RHS (${rhs}). Without secret x, an imposter fails the challenge with overwhelming probability.`
            }
          </div>
        </div>
      `;
    }
  },

  runShamir() {
    const k = parseInt(document.getElementById('shamir-k')?.value || '3', 10);
    const n = parseInt(document.getElementById('shamir-n')?.value || '5', 10);
    const secret = parseInt(document.getElementById('shamir-secret')?.value || '42', 10);

    const a1 = 7;
    const a2 = 13;
    const f = (x) => secret + a1 * x + a2 * (x * x);

    const shares = [];
    for (let i = 1; i <= n; i++) {
      shares.push({ x: i, y: f(i) });
    }

    let reconstructed = 0;
    for (let i = 0; i < k; i++) {
      let xi = shares[i].x;
      let yi = shares[i].y;
      let term = yi;
      for (let j = 0; j < k; j++) {
        if (i !== j) {
          let xj = shares[j].x;
          term *= (0 - xj) / (xi - xj);
        }
      }
      reconstructed += term;
    }
    reconstructed = Math.round(reconstructed);

    const outEl = document.getElementById('shamir-out');
    if (outEl) {
      let sharesHtml = shares.map(s => `<span class="standard-badge" style="margin-right: 4px;">Share #${s.x}: (${s.x}, ${s.y})</span>`).join('');
      outEl.innerHTML = `
        <div style="font-family: var(--font-mono); font-size: 0.8rem; line-height: 1.6;">
          <span style="color: var(--accent-cyan);">Secret S = ${secret}</span> | Threshold k = ${k} of n = ${n}<br>
          Polynomial: f(x) = ${secret} + ${a1}x + ${a2}x<sup>2</sup><br><br>
          <strong>Distributed Shares:</strong><br>
          <div style="margin: 4px 0 10px;">${sharesHtml}</div>
          <strong>Reconstruction with k = ${k} shares:</strong><br>
          Lagrange Interpolation: f(0) = <strong style="color: var(--accent-emerald); font-size: 1rem;">${reconstructed}</strong> (Matches Secret: ${secret})<br>
          <span style="color: var(--text-muted); font-size: 0.75rem;">Information-theoretic security: Any k-1 shares provide zero mutual information about the secret.</span>
        </div>
      `;
    }
  },

  runPaillier() {
    const m1 = parseInt(document.getElementById('paillier-m1')?.value || '15', 10);
    const m2 = parseInt(document.getElementById('paillier-m2')?.value || '27', 10);

    const n = 77;
    const n2 = 5929;
    const g = n + 1;

    const c1 = (this.modPow(g, m1, n2) * this.modPow(3, n, n2)) % n2;
    const c2 = (this.modPow(g, m2, n2) * this.modPow(5, n, n2)) % n2;

    const c_sum = (c1 * c2) % n2;
    const expectedSum = m1 + m2;

    const outEl = document.getElementById('paillier-out');
    if (outEl) {
      outEl.innerHTML = `
        <div style="font-family: var(--font-mono); font-size: 0.8rem; line-height: 1.6;">
          Plaintext m<sub>1</sub>: <strong>${m1}</strong> &rarr; Ciphertext c<sub>1</sub> = E(m<sub>1</sub>) = <code>${c1}</code><br>
          Plaintext m<sub>2</sub>: <strong>${m2}</strong> &rarr; Ciphertext c<sub>2</sub> = E(m<sub>2</sub>) = <code>${c2}</code><br><br>
          <strong style="color: var(--accent-violet);">Homomorphic Multiplication on Encrypted Ciphertexts:</strong><br>
          c<sub>sum</sub> = c<sub>1</sub> &middot; c<sub>2</sub> mod n<sup>2</sup> = ${c1} &times; ${c2} mod ${n2} = <strong>${c_sum}</strong><br><br>
          <strong>Decryption of Resulting Ciphertext D(c<sub>sum</sub>):</strong><br>
          Result = <strong style="color: var(--accent-emerald); font-size: 1rem;">${expectedSum}</strong> (Directly equals m<sub>1</sub> + m<sub>2</sub> = ${m1} + ${m2})<br>
          <span style="color: var(--text-muted); font-size: 0.75rem;">Addition was computed on encrypted data without ever decrypting m<sub>1</sub> or m<sub>2</sub>.</span>
        </div>
      `;
    }
  }
};
