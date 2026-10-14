/**
 * CRYPTIX // Symmetric Cipher Lab
<<<<<<< HEAD
 * Implements AES-128 State Matrix transformations, Mode of Operation Leak Visualizer,
 * ChaCha20 Quarter Round, and FF1 FPE simulator.
=======
 * Implements AES-128 State Matrix transformations (SubBytes, ShiftRows, MixColumns, AddRoundKey),
 * Mode of Operation Leak Visualizer (ECB vs CBC vs CTR), ChaCha20 Quarter Round, and FF1 FPE simulator.
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
 */

window.SymmetricLab = {
  currentTab: 'aes',

<<<<<<< HEAD
=======
  // Rijndael S-Box
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
  sBox: [
    0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76,
    0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0,
    0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15,
    0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75,
    0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84,
    0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf,
    0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8,
    0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2,
    0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73,
    0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb,
    0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5e, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79,
    0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08,
    0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,
    0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e,
    0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf,
    0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16
  ],

<<<<<<< HEAD
=======
  // 16-byte state (column-major)
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
  aesState: [
    0x32, 0x88, 0x31, 0xe0,
    0x43, 0x5a, 0x31, 0x37,
    0xf6, 0x30, 0x98, 0x07,
    0xa8, 0x8d, 0xa2, 0x34
  ],

  init() {
    this.renderTabs();
    this.renderAESGrid();
    this.bindEvents();
  },

  renderTabs() {
    const tabs = document.querySelectorAll('.sym-tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.currentTab = tab.dataset.tab;
        this.updateView();
      });
    });
  },

  bindEvents() {
    document.getElementById('aes-subbytes')?.addEventListener('click', () => this.runSubBytes());
    document.getElementById('aes-shiftrows')?.addEventListener('click', () => this.runShiftRows());
    document.getElementById('aes-mixcolumns')?.addEventListener('click', () => this.runMixColumns());
    document.getElementById('aes-addroundkey')?.addEventListener('click', () => this.runAddRoundKey());
    document.getElementById('aes-reset')?.addEventListener('click', () => this.resetAES());

    document.getElementById('mode-text-input')?.addEventListener('input', () => this.renderModeLeak());
    document.getElementById('chacha-step-btn')?.addEventListener('click', () => this.runChaChaStep());
    document.getElementById('ff1-input')?.addEventListener('input', () => this.runFF1());
  },

  updateView() {
<<<<<<< HEAD
    const vAes = document.getElementById('sym-view-aes');
    const vModes = document.getElementById('sym-view-modes');
    const vCha = document.getElementById('sym-view-chacha');
    const vFpe = document.getElementById('sym-view-fpe');

    if (vAes) vAes.style.display = this.currentTab === 'aes' ? 'block' : 'none';
    if (vModes) vModes.style.display = this.currentTab === 'modes' ? 'block' : 'none';
    if (vCha) vCha.style.display = this.currentTab === 'chacha' ? 'block' : 'none';
    if (vFpe) vFpe.style.display = this.currentTab === 'fpe' ? 'block' : 'none';
=======
    document.getElementById('sym-view-aes').style.display = this.currentTab === 'aes' ? 'block' : 'none';
    document.getElementById('sym-view-modes').style.display = this.currentTab === 'modes' ? 'block' : 'none';
    document.getElementById('sym-view-chacha').style.display = this.currentTab === 'chacha' ? 'block' : 'none';
    document.getElementById('sym-view-fpe').style.display = this.currentTab === 'fpe' ? 'block' : 'none';
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61

    if (this.currentTab === 'modes') this.renderModeLeak();
    if (this.currentTab === 'chacha') this.initChaCha();
    if (this.currentTab === 'fpe') this.runFF1();
  },

  renderAESGrid() {
    const container = document.getElementById('aes-state-grid');
    if (!container) return;
    container.innerHTML = '';
<<<<<<< HEAD
=======
    // AES state is arranged in 4 rows and 4 cols
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const byte = this.aesState[c * 4 + r];
        const cell = document.createElement('div');
        cell.className = 'matrix-cell';
        cell.id = `aes-cell-${r}-${c}`;
        cell.textContent = byte.toString(16).padStart(2, '0').toUpperCase();
        container.appendChild(cell);
      }
    }
  },

  flashCells() {
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const el = document.getElementById(`aes-cell-${r}-${c}`);
        if (el) {
          el.classList.add('highlight');
<<<<<<< HEAD
          setTimeout(() => el.classList.remove('highlight'), 300);
=======
          setTimeout(() => el.classList.remove('highlight'), 350);
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
        }
      }
    }
  },

  runSubBytes() {
    for (let i = 0; i < 16; i++) {
      this.aesState[i] = this.sBox[this.aesState[i]];
    }
    this.renderAESGrid();
    this.flashCells();
<<<<<<< HEAD
    const stEl = document.getElementById('aes-status-msg');
    if (stEl) {
      stEl.innerHTML = `<strong>SubBytes:</strong> Non-linear byte substitution using the Rijndael S-Box. Provides confusion ($S(x) = M(x^{-1}) + b$ over $GF(2^8)$). Prevents linear & differential cryptanalysis.`;
    }
  },

  runShiftRows() {
    const r1 = [this.aesState[1], this.aesState[5], this.aesState[9], this.aesState[13]];
    this.aesState[1] = r1[1]; this.aesState[5] = r1[2]; this.aesState[9] = r1[3]; this.aesState[13] = r1[0];

    const r2 = [this.aesState[2], this.aesState[6], this.aesState[10], this.aesState[14]];
    this.aesState[2] = r2[2]; this.aesState[6] = r2[3]; this.aesState[10] = r2[0]; this.aesState[14] = r2[1];

=======
    document.getElementById('aes-status-msg').innerHTML =
      `<strong>SubBytes Completed:</strong> Non-linear byte substitution using the Rijndael S-Box. Provides mathematical confusion ($S(x) = M(x^{-1}) + b$ over $GF(2^8)$). Prevents linear & differential cryptanalysis.`;
  },

  runShiftRows() {
    // Row 0: shift 0
    // Row 1: shift left 1
    const r1 = [this.aesState[1], this.aesState[5], this.aesState[9], this.aesState[13]];
    this.aesState[1] = r1[1]; this.aesState[5] = r1[2]; this.aesState[9] = r1[3]; this.aesState[13] = r1[0];

    // Row 2: shift left 2
    const r2 = [this.aesState[2], this.aesState[6], this.aesState[10], this.aesState[14]];
    this.aesState[2] = r2[2]; this.aesState[6] = r2[3]; this.aesState[10] = r2[0]; this.aesState[14] = r2[1];

    // Row 3: shift left 3
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
    const r3 = [this.aesState[3], this.aesState[7], this.aesState[11], this.aesState[15]];
    this.aesState[3] = r3[3]; this.aesState[7] = r3[0]; this.aesState[11] = r3[1]; this.aesState[15] = r3[2];

    this.renderAESGrid();
    this.flashCells();
<<<<<<< HEAD
    const stEl = document.getElementById('aes-status-msg');
    if (stEl) {
      stEl.innerHTML = `<strong>ShiftRows:</strong> Cyclical permutation on state rows. Ensures inter-column byte diffusion across consecutive rounds.`;
    }
=======
    document.getElementById('aes-status-msg').innerHTML =
      `<strong>ShiftRows Completed:</strong> Cyclical permutation on state rows. Ensures inter-column byte diffusion across consecutive rounds.`;
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
  },

  gmul(a, b) {
    let p = 0;
    for (let counter = 0; counter < 8; counter++) {
      if ((b & 1) !== 0) p ^= a;
      const hi_bit_set = (a & 0x80) !== 0;
      a = (a << 1) & 0xff;
<<<<<<< HEAD
      if (hi_bit_set) a ^= 0x1b;
=======
      if (hi_bit_set) a ^= 0x1b; // AES irreducible polynomial x^8 + x^4 + x^3 + x + 1
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
      b >>= 1;
    }
    return p;
  },

  runMixColumns() {
    for (let c = 0; c < 4; c++) {
      const idx = c * 4;
      const s0 = this.aesState[idx];
      const s1 = this.aesState[idx + 1];
      const s2 = this.aesState[idx + 2];
      const s3 = this.aesState[idx + 3];

      this.aesState[idx]     = this.gmul(2, s0) ^ this.gmul(3, s1) ^ s2 ^ s3;
      this.aesState[idx + 1] = s0 ^ this.gmul(2, s1) ^ this.gmul(3, s2) ^ s3;
      this.aesState[idx + 2] = s0 ^ s1 ^ this.gmul(2, s2) ^ this.gmul(3, s3);
      this.aesState[idx + 3] = this.gmul(3, s0) ^ s1 ^ s2 ^ this.gmul(2, s3);
    }
    this.renderAESGrid();
    this.flashCells();
<<<<<<< HEAD
    const stEl = document.getElementById('aes-status-msg');
    if (stEl) {
      stEl.innerHTML = `<strong>MixColumns:</strong> MDS matrix multiplication over $GF(2^8)$. Ensures high diffusion across the state matrix.`;
    }
  },

  runAddRoundKey() {
=======
    document.getElementById('aes-status-msg').innerHTML =
      `<strong>MixColumns Completed:</strong> Maximum Distance Separable (MDS) matrix multiplication over $GF(2^8)$. Ensures high diffusion: flipping 1 input bit alters multiple output bytes.`;
  },

  runAddRoundKey() {
    // Sample Round Key (K_1)
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
    const roundKey = [
      0xd6, 0xaa, 0x74, 0xfd,
      0xd2, 0xaf, 0x72, 0xfa,
      0xda, 0xa6, 0x78, 0xf1,
      0xd0, 0xa1, 0x70, 0xf7
    ];
    for (let i = 0; i < 16; i++) {
      this.aesState[i] ^= roundKey[i];
    }
    this.renderAESGrid();
    this.flashCells();
<<<<<<< HEAD
    const stEl = document.getElementById('aes-status-msg');
    if (stEl) {
      stEl.innerHTML = `<strong>AddRoundKey:</strong> Bitwise XOR of 128-bit state with subkey derived via the Rijndael key schedule.`;
    }
=======
    document.getElementById('aes-status-msg').innerHTML =
      `<strong>AddRoundKey Completed:</strong> Bitwise XOR of 128-bit state with round subkey generated by the Rijndael Key Schedule. Injects the secret key into the cipher state.`;
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
  },

  resetAES() {
    this.aesState = [
      0x32, 0x88, 0x31, 0xe0,
      0x43, 0x5a, 0x31, 0x37,
      0xf6, 0x30, 0x98, 0x07,
      0xa8, 0x8d, 0xa2, 0x34
    ];
    this.renderAESGrid();
<<<<<<< HEAD
    const stEl = document.getElementById('aes-status-msg');
    if (stEl) stEl.innerHTML = `State reset to original plaintext test vector.`;
  },

=======
    document.getElementById('aes-status-msg').innerHTML = `State reset to original plaintext block (128 bits).`;
  },

  // ECB vs CBC vs CTR visualizer
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
  renderModeLeak() {
    const text = document.getElementById('mode-text-input')?.value || 'CONFIDENTIAL DATA CONFIDENTIAL DATA CONFIDENTIAL DATA SECRETS';
    const ecbBox = document.getElementById('ecb-blocks-preview');
    const cbcBox = document.getElementById('cbc-blocks-preview');
    const ctrBox = document.getElementById('ctr-blocks-preview');
    if (!ecbBox) return;

<<<<<<< HEAD
=======
    // Split text into 16-char blocks
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
    const blocks = [];
    for (let i = 0; i < text.length; i += 16) {
      blocks.push(text.slice(i, i + 16).padEnd(16, ' '));
    }

<<<<<<< HEAD
=======
    // Dummy block cipher function
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
    const mockCipher = (blk, iv = 0) => {
      let hash = iv;
      for (let i = 0; i < blk.length; i++) hash = ((hash << 5) - hash) + blk.charCodeAt(i);
      const hex = Math.abs(hash).toString(16).padStart(8, '0');
      return hex.slice(0, 8);
    };

    let ecbHtml = '';
    let cbcHtml = '';
    let ctrHtml = '';

    const seenEcb = new Map();
    let iv = 0x5a5a;

    blocks.forEach((blk, idx) => {
<<<<<<< HEAD
=======
      // ECB
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
      const ecbEnc = mockCipher(blk, 0);
      let isDuplicate = seenEcb.has(ecbEnc);
      seenEcb.set(ecbEnc, true);
      const ecbColor = isDuplicate ? 'var(--accent-crimson)' : 'var(--accent-cyan)';
      ecbHtml += `<div class="subtopic-card" style="border-color: ${ecbColor}; font-family: var(--font-mono); font-size: 0.72rem; padding: 6px;">Block #${idx}: <strong>${ecbEnc}</strong> ${isDuplicate ? '(! REPEATS !)' : ''}</div>`;

<<<<<<< HEAD
      iv = parseInt(mockCipher(blk, iv), 16);
      cbcHtml += `<div class="subtopic-card" style="font-family: var(--font-mono); font-size: 0.72rem; padding: 6px;">Block #${idx}: <strong>${iv.toString(16).slice(0,8)}</strong></div>`;

=======
      // CBC
      iv = parseInt(mockCipher(blk, iv), 16);
      cbcHtml += `<div class="subtopic-card" style="font-family: var(--font-mono); font-size: 0.72rem; padding: 6px;">Block #${idx}: <strong>${iv.toString(16).slice(0,8)}</strong></div>`;

      // CTR
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
      const ctrVal = mockCipher(`NONCE_${idx}`, 0x1234);
      ctrHtml += `<div class="subtopic-card" style="font-family: var(--font-mono); font-size: 0.72rem; padding: 6px;">Block #${idx}: <strong>${ctrVal}</strong></div>`;
    });

    ecbBox.innerHTML = ecbHtml;
<<<<<<< HEAD
    if (cbcBox) cbcBox.innerHTML = cbcHtml;
    if (ctrBox) ctrBox.innerHTML = ctrHtml;
  },

=======
    cbcBox.innerHTML = cbcHtml;
    ctrBox.innerHTML = ctrHtml;
  },

  // ChaCha20 Quarter Round
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
  chachaState: { a: 0x11111111, b: 0x22222222, c: 0x33333333, d: 0x44444444, step: 0 },

  initChaCha() {
    this.chachaState = { a: 0x11111111, b: 0x22222222, c: 0x33333333, d: 0x44444444, step: 0 };
    this.renderChaCha();
  },

  renderChaCha() {
    const toHex = (n) => '0x' + (n >>> 0).toString(16).padStart(8, '0').toUpperCase();
<<<<<<< HEAD
    const aEl = document.getElementById('chacha-a');
    const bEl = document.getElementById('chacha-b');
    const cEl = document.getElementById('chacha-c');
    const dEl = document.getElementById('chacha-d');
    if (aEl) aEl.textContent = toHex(this.chachaState.a);
    if (bEl) bEl.textContent = toHex(this.chachaState.b);
    if (cEl) cEl.textContent = toHex(this.chachaState.c);
    if (dEl) dEl.textContent = toHex(this.chachaState.d);
=======
    document.getElementById('chacha-a').textContent = toHex(this.chachaState.a);
    document.getElementById('chacha-b').textContent = toHex(this.chachaState.b);
    document.getElementById('chacha-c').textContent = toHex(this.chachaState.c);
    document.getElementById('chacha-d').textContent = toHex(this.chachaState.d);
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
  },

  runChaChaStep() {
    const rotl = (v, c) => ((v << c) | (v >>> (32 - c))) >>> 0;
    const add = (x, y) => (x + y) >>> 0;
    const xor = (x, y) => (x ^ y) >>> 0;

    let { a, b, c, d, step } = this.chachaState;
    let desc = '';

    if (step % 4 === 0) {
      a = add(a, b);
      d = rotl(xor(d, a), 16);
      desc = `Step 1: a += b; d = (d &oplus; a) &olarr; 16`;
    } else if (step % 4 === 1) {
      c = add(c, d);
      b = rotl(xor(b, c), 12);
      desc = `Step 2: c += d; b = (b &oplus; c) &olarr; 12`;
    } else if (step % 4 === 2) {
      a = add(a, b);
      d = rotl(xor(d, a), 8);
      desc = `Step 3: a += b; d = (d &oplus; a) &olarr; 8`;
    } else {
      c = add(c, d);
      b = rotl(xor(b, c), 7);
      desc = `Step 4: c += d; b = (b &oplus; c) &olarr; 7`;
    }

    this.chachaState = { a, b, c, d, step: step + 1 };
    this.renderChaCha();
<<<<<<< HEAD
    const descEl = document.getElementById('chacha-step-desc');
    if (descEl) descEl.innerHTML = `<strong>Action:</strong> ${desc}`;
  },

=======
    document.getElementById('chacha-step-desc').innerHTML = `<strong>Quarter-Round Action:</strong> ${desc}`;
  },

  // Format-Preserving Encryption (FF1)
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
  runFF1() {
    const input = document.getElementById('ff1-input')?.value || '4532-8901-2345-6789';
    const outEl = document.getElementById('ff1-output');
    if (!outEl) return;

<<<<<<< HEAD
=======
    // FPE preserves character set and length exactly
    // Digits map to digits, dashes remain in place
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
    let pseudoEncrypted = '';
    let hash = 0x7fed13;
    for (let i = 0; i < input.length; i++) {
      const ch = input[i];
      if (ch >= '0' && ch <= '9') {
        hash = (hash * 37 + (ch.charCodeAt(0) - 48) + i * 13) % 1000000;
        pseudoEncrypted += (hash % 10).toString();
      } else {
        pseudoEncrypted += ch;
      }
    }
    outEl.textContent = pseudoEncrypted;
  }
};
