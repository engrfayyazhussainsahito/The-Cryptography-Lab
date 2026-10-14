/**
 * CRYPTIX // Protocols & Systems Lab
 * Implements interactive TLS 1.3 1-RTT handshake inspector,
 * Signal Double Ratchet state machine with Forward & Post-Compromise Security,
 * and Merkle Tree inclusion proof generator.
 */

window.ProtocolLab = {
  currentTab: 'tls',
  ratchetStep: 0,
  isCompromised: false,

  init() {
    this.bindEvents();
    this.renderHandshakeStep(0);
    this.updateRatchetUI();
    this.generateMerkleTree();
  },

  bindEvents() {
    document.querySelectorAll('.proto-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.proto-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentTab = btn.dataset.tab;
        this.updateView();
      });
    });

    document.querySelectorAll('.tls-step-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.renderHandshakeStep(parseInt(btn.dataset.step, 10));
      });
    });

    document.getElementById('btn-ratchet-send')?.addEventListener('click', () => this.advanceRatchet(false));
    document.getElementById('btn-ratchet-compromise')?.addEventListener('click', () => this.advanceRatchet(true));
    document.getElementById('btn-ratchet-reset')?.addEventListener('click', () => this.resetRatchet());

    document.querySelectorAll('.merkle-leaf-select').forEach(btn => {
      btn.addEventListener('click', () => {
        this.showMerkleProof(parseInt(btn.dataset.leaf, 10));
      });
    });
  },

  updateView() {
    const vTls = document.getElementById('proto-view-tls');
    const vRat = document.getElementById('proto-view-ratchet');
    const vMer = document.getElementById('proto-view-merkle');

    if (vTls) vTls.style.display = this.currentTab === 'tls' ? 'block' : 'none';
    if (vRat) vRat.style.display = this.currentTab === 'ratchet' ? 'block' : 'none';
    if (vMer) vMer.style.display = this.currentTab === 'merkle' ? 'block' : 'none';
  },

  tlsSteps: [
    {
      title: 'Step 1: ClientHello (1-RTT Post-Quantum Hybrid Initiation)',
      origin: 'Client &rarr; Server',
      payload: 'CipherSuites: TLS_AES_256_GCM_SHA384, TLS_CHACHA20_POLY1305_SHA256\nSupported_Groups: x25519_mlkem768\nKey_Share: Ephemeral Public Keys (X25519: 32B + ML-KEM-768: 1184B)\nExtensions: EncryptedClientHello (ECH)',
      state: 'Handshake State: Ephemeral client entropy transmitted in initial packet.'
    },
    {
      title: 'Step 2: ServerHello + Encrypted Extensions',
      origin: 'Server &rarr; Client',
      payload: 'Selected_Group: x25519_mlkem768\nKey_Share: Server Ephemeral Key + ML-KEM Ciphertext (1088B)\nEncryptedExtensions: ALPN [h2, h3]\nCertificate: Server X.509 chain\nCertificateVerify: Signed with ML-DSA-65\nFinished: HMAC-SHA384 over handshake transcript',
      state: 'Server completes hybrid key exchange. Derives Handshake Secret via HKDF.'
    },
    {
      title: 'Step 3: Client Finished & Application Traffic Established',
      origin: 'Client &rarr; Server',
      payload: 'Finished: HMAC-SHA384 transcript authentication\nApplication Data: AES-256-GCM symmetric session keys active.\nForward Secrecy: Guaranteed via destroyed ephemeral DH keys.',
      state: 'Bidirectional encrypted data channel active. Protected against Harvest Now, Decrypt Later quantum recording.'
    }
  ],

  renderHandshakeStep(idx) {
    const data = this.tlsSteps[idx];
    if (!data) return;

    document.querySelectorAll('.tls-step-btn').forEach((b, i) => {
      b.classList.toggle('active', i === idx);
    });

    const outEl = document.getElementById('tls-step-details');
    if (outEl) {
      outEl.innerHTML = `
        <div style="font-family: var(--font-mono); font-size: 0.8rem; line-height: 1.6;">
          <h5 style="color: var(--accent-cyan); font-size: 0.95rem; margin-bottom: 4px;">${data.title}</h5>
          <span class="standard-badge" style="margin-bottom: 8px; display: inline-block;">${data.origin}</span>
          <pre class="math-box" style="margin: 6px 0; font-size: 0.75rem; white-space: pre-wrap;">${data.payload}</pre>
          <p style="color: var(--text-secondary); margin-top: 6px; font-size: 0.8rem;">${data.state}</p>
        </div>
      `;
    }
  },

  advanceRatchet(triggerCompromise) {
    this.ratchetStep++;
    if (triggerCompromise) this.isCompromised = true;

    let healed = false;
    if (this.isCompromised && !triggerCompromise && this.ratchetStep > 2) {
      healed = true;
      this.isCompromised = false;
    }

    this.updateRatchetUI(healed);
  },

  resetRatchet() {
    this.ratchetStep = 0;
    this.isCompromised = false;
    this.updateRatchetUI();
  },

  updateRatchetUI(healed = false) {
    const el = document.getElementById('ratchet-state-display');
    if (!el) return;

    const round = this.ratchetStep;
    const sender = round % 2 === 0 ? 'Alice' : 'Bob';
    const rootKey = `0xROOT_${(round * 1337 + 0xbeef).toString(16).padStart(6, '0')}`;
    const chainKey = `0xCHAIN_${(round * 777 + 0xcafe).toString(16).padStart(6, '0')}`;
    const msgKey = `0xMSG_${(round * 999 + 0x1234).toString(16).padStart(6, '0')}`;
    const dhEphemeral = `ECDH_Pair_v${Math.floor(round / 2) + 1}`;

    el.innerHTML = `
      <div style="font-family: var(--font-mono); font-size: 0.8rem; line-height: 1.6;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span>Turn: <strong>#${round} (${sender} Sending)</strong></span>
          <span class="status-pill ${this.isCompromised ? 'status-compromised' : 'status-secure'}">
            ${this.isCompromised ? '&times; DEVICE RAM COMPROMISED' : '&#10003; SECURE CHANNEL'}
          </span>
        </div>
        Root Key (KDF): <code>${rootKey}</code><br>
        Chain Key: <code>${chainKey}</code><br>
        Message Key: <code>${msgKey}</code> (Wiped immediately after encryption)<br>
        DH Ratchet: <code>${dhEphemeral}</code><br><br>
        <div style="padding: 8px; border-radius: 6px; background: var(--bg-card); border: 1px solid var(--border-subtle); font-size: 0.75rem;">
          ${this.isCompromised ?
            `<strong style="color: var(--accent-crimson);">Device Compromised:</strong> Attacker extracted current keys. Attacker CANNOT decrypt past messages (Forward Secrecy). Click "Send Next Message" to watch the DH Ratchet self-heal!` :
            (healed ?
              `<strong style="color: var(--accent-emerald);">&#10003; Post-Compromise Healing Complete:</strong> A fresh DH Ratchet exchange occurred. Fresh uncompromised entropy was mixed into the Root Key, locking the adversary out of future messages.` :
              `<strong>Properties:</strong> Symmetric KDF advances per message (Forward Secrecy). Asymmetric DH ratchet advances per reply (Future Secrecy).`
            )
          }
        </div>
      </div>
    `;
  },

  mockHash(val) {
    let h = 0x811c9dc5;
    for (let i = 0; i < val.length; i++) h = (h ^ val.charCodeAt(i)) * 0x01000193;
    return (h >>> 0).toString(16).slice(0, 6);
  },

  generateMerkleTree() {
    this.txs = ['Tx1: Alice->Bob $50', 'Tx2: Carol->Dave $12', 'Tx3: Eve->Frank $90', 'Tx4: Grace->Heidi $35'];
    this.h1 = this.mockHash(this.txs[0]);
    this.h2 = this.mockHash(this.txs[1]);
    this.h3 = this.mockHash(this.txs[2]);
    this.h4 = this.mockHash(this.txs[3]);

    this.h12 = this.mockHash(this.h1 + this.h2);
    this.h34 = this.mockHash(this.h3 + this.h4);
    this.root = this.mockHash(this.h12 + this.h34);

    this.showMerkleProof(0);
  },

  showMerkleProof(leafIdx) {
    const el = document.getElementById('merkle-proof-display');
    if (!el) return;

    const tx = this.txs[leafIdx];
    let proofSibling1, proofSibling2;

    if (leafIdx === 0) {
      proofSibling1 = `H2 (${this.h2})`;
      proofSibling2 = `H34 (${this.h34})`;
    } else if (leafIdx === 1) {
      proofSibling1 = `H1 (${this.h1})`;
      proofSibling2 = `H34 (${this.h34})`;
    } else if (leafIdx === 2) {
      proofSibling1 = `H4 (${this.h4})`;
      proofSibling2 = `H12 (${this.h12})`;
    } else {
      proofSibling1 = `H3 (${this.h3})`;
      proofSibling2 = `H12 (${this.h12})`;
    }

    el.innerHTML = `
      <div style="font-family: var(--font-mono); font-size: 0.8rem; line-height: 1.6;">
        <span style="color: var(--accent-cyan);">Selected Leaf:</span> <strong>${tx}</strong><br>
        Merkle Root: <strong style="color: var(--accent-emerald);">0x${this.root}</strong><br><br>
        <strong>Cryptographic Inclusion Audit Path:</strong><br>
        1. Leaf Hash: <code>H${leafIdx+1} = 0x${this['h'+(leafIdx+1)]}</code><br>
        2. Sibling Hash 1: <code>${proofSibling1}</code><br>
        3. Sibling Hash 2: <code>${proofSibling2}</code><br><br>
        <em>Verification requires only 2 intermediate hashes (log<sub>2</sub>(4) = 2) without downloading the full transaction ledger.</em>
      </div>
    `;
  }
};
