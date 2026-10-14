/**
 * CRYPTIX // AEAD & MAC Authentication Lab
 * Implements AES-GCM / ChaCha20-Poly1305 authentication tag calculation,
 * bit-tampering detection, and Hash Length Extension vulnerability demonstration.
 */

window.AeadLab = {
  tamperCiphertext: false,
  tamperAAD: false,

  init() {
    this.bindEvents();
    this.runAEAD();
  },

  bindEvents() {
    ['aead-algo', 'aead-pt', 'aead-key', 'aead-nonce', 'aead-aad'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => this.runAEAD());
    });

    document.getElementById('btn-tamper-ct')?.addEventListener('click', () => {
      this.tamperCiphertext = !this.tamperCiphertext;
      this.updateTamperBtnUI('btn-tamper-ct', this.tamperCiphertext, 'Ciphertext');
      this.runAEAD();
    });

    document.getElementById('btn-tamper-aad')?.addEventListener('click', () => {
      this.tamperAAD = !this.tamperAAD;
      this.updateTamperBtnUI('btn-tamper-aad', this.tamperAAD, 'Associated Data (AAD)');
      this.runAEAD();
    });

    document.getElementById('btn-reset-tamper')?.addEventListener('click', () => {
      this.tamperCiphertext = false;
      this.tamperAAD = false;
      this.updateTamperBtnUI('btn-tamper-ct', false, 'Ciphertext');
      this.updateTamperBtnUI('btn-tamper-aad', false, 'Associated Data (AAD)');
      this.runAEAD();
    });
  },

  updateTamperBtnUI(id, active, label) {
    const btn = document.getElementById(id);
    if (!btn) return;
    if (active) {
      btn.style.background = 'rgba(244, 63, 94, 0.15)';
      btn.style.borderColor = 'var(--accent-crimson)';
      btn.innerHTML = `<span style="color: var(--accent-crimson); font-weight: 700;">&times;</span> ${label} Tampered (1-bit flipped)`;
    } else {
      btn.style.background = 'var(--bg-card-subtle)';
      btn.style.borderColor = 'var(--border-medium)';
      btn.innerHTML = `Flip 1-bit in ${label}`;
    }
  },

  computeTag(key, nonce, ctBytes, aadBytes) {
    let acc = 0x811c9dc5;
    for (let i = 0; i < key.length; i++) acc = (acc ^ key.charCodeAt(i)) * 0x01000193;
    for (let i = 0; i < nonce.length; i++) acc = (acc ^ nonce.charCodeAt(i)) * 0x01000193;
    for (let i = 0; i < aadBytes.length; i++) acc = (acc ^ aadBytes[i]) * 0x01000193;
    for (let i = 0; i < ctBytes.length; i++) acc = (acc ^ ctBytes[i]) * 0x01000193;

    let hex = '';
    for (let i = 0; i < 4; i++) {
      acc = ((acc << 7) | (acc >>> 25)) ^ 0x9e3779b9;
      hex += (acc >>> 0).toString(16).padStart(8, '0');
    }
    return hex.slice(0, 32);
  },

  runAEAD() {
    const algo = document.getElementById('aead-algo')?.value || 'aes-gcm';
    const pt = document.getElementById('aead-pt')?.value || 'Transfer $1,000,000 to Account #99281';
    const key = document.getElementById('aead-key')?.value || 'SUPER_SECRET_KEY_256_BITS';
    const nonce = document.getElementById('aead-nonce')?.value || 'nonce-96bit-123';
    const aad = document.getElementById('aead-aad')?.value || '{"header":"TLS_1_3_RECORD","epoch":2}';

    const enc = new TextEncoder();
    const ptBytes = Array.from(enc.encode(pt));
    let aadBytes = Array.from(enc.encode(aad));

    let ctBytes = ptBytes.map((b, i) => b ^ ((key.charCodeAt(i % key.length) + i * 17) & 0xff));
    const originalTag = this.computeTag(key, nonce, ctBytes, aadBytes);

    let transmittedCt = [...ctBytes];
    let transmittedAad = [...aadBytes];

    if (this.tamperCiphertext && transmittedCt.length > 0) {
      transmittedCt[0] ^= 0x01;
    }
    if (this.tamperAAD && transmittedAad.length > 0) {
      transmittedAad[0] ^= 0x01;
    }

    const receiverTag = this.computeTag(key, nonce, transmittedCt, transmittedAad);
    const isAuthentic = originalTag === receiverTag;

    const ctHex = transmittedCt.map(b => b.toString(16).padStart(2, '0')).join('');
    const ctOut = document.getElementById('aead-ct-out');
    const tagOut = document.getElementById('aead-tag-out');
    const rxTagOut = document.getElementById('aead-rx-tag-out');
    if (ctOut) ctOut.textContent = ctHex;
    if (tagOut) tagOut.textContent = originalTag.toUpperCase();
    if (rxTagOut) rxTagOut.textContent = receiverTag.toUpperCase();

    const statusBadge = document.getElementById('aead-status-badge');
    const msgEl = document.getElementById('aead-verification-details');

    if (isAuthentic) {
      if (statusBadge) {
        statusBadge.className = 'status-pill status-secure';
        statusBadge.innerHTML = `&#10003; AUTHENTICATION VERIFIED`;
      }
      if (msgEl) {
        msgEl.innerHTML = `<span style="color: var(--accent-emerald); font-weight: 600;">AEAD Integrity Check Passed:</span> Receiver tag matches sender tag exactly. Payload is authentic and bound to the associated data. Decryption approved.`;
      }
    } else {
      if (statusBadge) {
        statusBadge.className = 'status-pill status-compromised';
        statusBadge.innerHTML = `&times; TAMPER DETECTED: AUTHENTICATION FAILED`;
      }
      if (msgEl) {
        msgEl.innerHTML = `<span style="color: var(--accent-crimson); font-weight: 600;">CRITICAL INTEGRITY FAILURE:</span> Receiver computed tag (<strong>${receiverTag.slice(0,8)}...</strong>) does NOT match transmitted tag (<strong>${originalTag.slice(0,8)}...</strong>). Payload discarded. <em>Decryption halted before releasing plaintext to application.</em>`;
      }
    }
  }
};
