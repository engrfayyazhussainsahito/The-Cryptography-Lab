/**
 * CRYPTIX // The Newest Developments & Cryptographic Threat Radar
 * Implements Mosca's Theorem Y2Q Quantum Risk Calculator,
 * Cryptographic Algorithm Mortality Table, and Crypto-Agility Configuration Generator.
 */

window.FrontierLab = {
  init() {
    this.bindEvents();
    this.calculateMoscaRisk();
    this.filterMortalityTable();
    this.generateAgilityConfig();
  },

  bindEvents() {
    ['mosca-shelf', 'mosca-migrate', 'mosca-quantum'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.calculateMoscaRisk());
    });

    document.getElementById('mortality-filter')?.addEventListener('input', (e) => {
      this.filterMortalityTable(e.target.value);
    });

    document.getElementById('btn-copy-config')?.addEventListener('click', () => {
      const text = document.getElementById('agility-config-out')?.textContent || '';
      navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById('btn-copy-config');
        if (btn) {
<<<<<<< HEAD
          btn.textContent = 'Copied';
=======
          btn.textContent = 'Copied to Clipboard!';
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
          setTimeout(() => { btn.textContent = 'Copy Config'; }, 2000);
        }
      });
    });
  },

  calculateMoscaRisk() {
    const s = parseInt(document.getElementById('mosca-shelf')?.value || '15', 10);
    const m = parseInt(document.getElementById('mosca-migrate')?.value || '5', 10);
    const q = parseInt(document.getElementById('mosca-quantum')?.value || '8', 10);

<<<<<<< HEAD
    const sEl = document.getElementById('mosca-shelf-val');
    const mEl = document.getElementById('mosca-migrate-val');
    const qEl = document.getElementById('mosca-quantum-val');
    if (sEl) sEl.textContent = `${s} years`;
    if (mEl) mEl.textContent = `${m} years`;
    if (qEl) qEl.textContent = `${q} years`;
=======
    document.getElementById('mosca-shelf-val').textContent = `${s} years`;
    document.getElementById('mosca-migrate-val').textContent = `${m} years`;
    document.getElementById('mosca-quantum-val').textContent = `${q} years`;
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61

    const totalNeed = s + m;
    const isVulnerable = totalNeed > q;

    const outEl = document.getElementById('mosca-risk-out');
    if (!outEl) return;

    if (isVulnerable) {
      outEl.className = 'vuln-box';
      outEl.innerHTML = `
<<<<<<< HEAD
        <div class="vuln-box-title">&times; IMMEDIATE SECURITY HAZARD: S + M &gt; Q (${totalNeed}y &gt; ${q}y)</div>
        <p>Your required protection window is <strong>${totalNeed} years</strong> (Data Shelf Life ${s}y + Migration Time ${m}y), but a cryptanalytically relevant quantum computer is estimated in <strong>${q} years</strong>. Because ${totalNeed} &gt; ${q}, systems are <strong>ALREADY AT RISK TODAY</strong> from <em>Harvest Now, Decrypt Later (HNDL)</em> attacks. Adversaries are actively capturing and storing encrypted traffic now.</p>
=======
        <div class="vuln-box-title">&times; IMMEDIATE SECURITY HAZARD (Mosca's Theorem: S + M &gt; Q)</div>
        <p>Your security requirement is <strong>${totalNeed} years</strong> (Data Shelf Life ${s}y + Migration Time ${m}y), but a quantum computer is projected in <strong>${q} years</strong>. Because ${totalNeed} &gt; ${q}, your systems are <strong>ALREADY AT RISK TODAY</strong> from <em>Harvest Now, Decrypt Later (HNDL)</em> attacks. Adversaries are recording your encrypted traffic now to decrypt it as soon as a CRQC is operational!</p>
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
      `;
    } else {
      outEl.className = 'math-box';
      outEl.style.borderLeftColor = 'var(--accent-emerald)';
      outEl.innerHTML = `
<<<<<<< HEAD
        <div style="color: var(--accent-emerald); font-weight: 700;">&#10003; ACCEPTABLE TIME WINDOW: S + M &le; Q (${totalNeed}y &le; ${q}y)</div>
        <div>Total Window: ${totalNeed} years &le; ${q} years. A ${q - totalNeed}-year buffer exists, assuming post-quantum migration commences immediately.</div>
=======
        <div style="color: var(--accent-emerald); font-weight: 700;">&#10003; ACCEPTABLE TIME WINDOW (S + M &le; Q)</div>
        <div>Total Window: ${totalNeed} years &le; ${q} years. You have a ${q - totalNeed} year safety buffer, provided your post-quantum migration begins immediately.</div>
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
      `;
    }
  },

  mortalityData: [
    { name: 'RSA-2048 / 4096', cat: 'Classical Asymmetric', status: 'QUANTUM VULNERABLE', note: 'Broken in polynomial time by Shor\'s algorithm (O((log N)^3)).' },
<<<<<<< HEAD
    { name: 'ECC (ECDSA / ECDH / X25519)', cat: 'Classical Asymmetric', status: 'QUANTUM VULNERABLE', note: 'Broken by Shor\'s discrete logarithm algorithm.' },
    { name: 'SIKE (Supersingular Isogeny)', cat: 'PQC Isogeny', status: 'CLASSICALLY BROKEN', note: 'Castryck-Decru attack (2022) using auxiliary points broke SIKE on 1 CPU.' },
    { name: 'Rainbow (Multivariate)', cat: 'PQC Signature', status: 'CLASSICALLY BROKEN', note: 'Ward Beullens\' MinRank intersection attack (2022) shattered all security levels.' },
    { name: 'ML-KEM (Kyber, FIPS 203)', cat: 'PQC Lattice KEM', status: 'NIST STANDARDIZED', note: 'Primary post-quantum key encapsulation standard (August 2024).' },
    { name: 'ML-DSA (Dilithium, FIPS 204)', cat: 'PQC Lattice Sig', status: 'NIST STANDARDIZED', note: 'Primary post-quantum digital signature standard (August 2024).' },
    { name: 'SLH-DSA (SPHINCS+, FIPS 205)', cat: 'PQC Hash Sig', status: 'NIST STANDARDIZED', note: 'Stateless hash-based signature. Zero reliance on lattices or number theory.' },
    { name: 'HQC (Hamming Quasi-Cyclic)', cat: 'PQC Code-Based KEM', status: 'NIST SELECTED 2025', note: 'NIST backup general-purpose KEM to hedge against lattice breakthroughs.' },
    { name: 'Ascon-128', cat: 'Lightweight IoT AEAD', status: 'NIST STANDARDIZED 2025', note: 'NIST SP 800-232 finalized standard for energy/area-constrained devices.' },
    { name: 'AES-256', cat: 'Symmetric Block', status: 'QUANTUM RESISTANT', note: 'Grover\'s algorithm halves security to 128 bits, which remains secure.' },
=======
    { name: 'ECC (ECDSA / ECDH / X25519)', cat: 'Classical Asymmetric', status: 'QUANTUM VULNERABLE', note: 'Broken by Shor\'s algorithm on elliptic curves.' },
    { name: 'SIKE (Supersingular Isogeny)', cat: 'PQC Isogeny', status: 'CLASSICALLY BROKEN', note: 'Castryck-Decru attack (2022) using auxiliary points broke SIKE on 1 CPU.' },
    { name: 'Rainbow (Multivariate)', cat: 'PQC Signature', status: 'CLASSICALLY BROKEN', note: 'Ward Beullens\' MinRank intersection attack (2022) shattered all security levels.' },
    { name: 'ML-KEM (Kyber, FIPS 203)', cat: 'PQC Lattice KEM', status: 'NIST STANDARDIZED', note: 'NIST primary post-quantum key encapsulation standard (August 2024).' },
    { name: 'ML-DSA (Dilithium, FIPS 204)', cat: 'PQC Lattice Sig', status: 'NIST STANDARDIZED', note: 'NIST primary post-quantum digital signature standard (August 2024).' },
    { name: 'SLH-DSA (SPHINCS+, FIPS 205)', cat: 'PQC Hash Sig', status: 'NIST STANDARDIZED', note: 'Stateless hash-based signature. Zero reliance on lattices or number theory.' },
    { name: 'HQC (Hamming Quasi-Cyclic)', cat: 'PQC Code-Based KEM', status: 'NIST SELECTED 2025', note: 'NIST backup general-purpose KEM to hedge against lattice breakthroughs.' },
    { name: 'Ascon-128', cat: 'Lightweight IoT AEAD', status: 'NIST STANDARDIZED 2025', note: 'NIST SP 800-232 finalized standard for energy/area-constrained devices.' },
    { name: 'AES-256', cat: 'Symmetric Block', status: 'QUANTUM RESISTANT', note: 'Grover\'s algorithm halves security to 128 bits, which remains completely unbreakable.' },
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
    { name: 'SHA-256 / SHA-3', cat: 'Cryptographic Hash', status: 'QUANTUM RESISTANT', note: 'Grover\'s algorithm requires 2^128 evaluations for preimage resistance.' }
  ],

  filterMortalityTable(query = '') {
    const tbody = document.getElementById('mortality-table-body');
    if (!tbody) return;

    const q = query.toLowerCase();
    const filtered = this.mortalityData.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.cat.toLowerCase().includes(q) ||
      d.status.toLowerCase().includes(q)
    );

    let html = '';
    filtered.forEach(d => {
      let badgeClass = 'status-secure';
      if (d.status.includes('BROKEN')) badgeClass = 'status-compromised';
      else if (d.status.includes('VULNERABLE')) badgeClass = 'status-warning';

      html += `
        <tr style="border-bottom: 1px solid var(--border-subtle); font-size: 0.78rem;">
<<<<<<< HEAD
          <td style="padding: 8px 6px; font-weight: 600; color: var(--text-main);">${d.name}</td>
=======
          <td style="padding: 8px 6px; font-weight: 600; color: #fff;">${d.name}</td>
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
          <td style="padding: 8px 6px; color: var(--text-muted);">${d.cat}</td>
          <td style="padding: 8px 6px;"><span class="status-pill ${badgeClass}">${d.status}</span></td>
          <td style="padding: 8px 6px; color: var(--text-secondary); font-size: 0.72rem;">${d.note}</td>
        </tr>
      `;
    });
    tbody.innerHTML = html;
  },

  generateAgilityConfig() {
    const config = `# NGINX Crypto-Agile Configuration (OpenSSL 3.4+ / BoringSSL)
# Hybrid Post-Quantum Key Exchange with X25519 + ML-KEM-768
ssl_protocols TLSv1.3;
ssl_prefer_server_ciphers off;

# Modern AEAD Cipher Suites
ssl_ciphers TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256;

<<<<<<< HEAD
# Post-Quantum Hybrid Groups (X25519MLKEM768 default in Chromium & Cloudflare)
=======
# Post-Quantum Hybrid Groups (X25519MLKEM768 is default in Chrome 131+ & Cloudflare)
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
ssl_ecdh_curve X25519MLKEM768:x25519:secp384r1;

# Strict Session Security with 0-RTT Anti-Replay
ssl_session_tickets off;
ssl_session_timeout 1d;
ssl_session_cache shared:SSL:50m;

<<<<<<< HEAD
# HTTP Strict Transport Security
=======
# HTTP Strict Transport Security with Preload
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;`;

    const el = document.getElementById('agility-config-out');
    if (el) el.textContent = config;
  }
};
