/**
 * CRYPTIX // Historical & Classical Cipher Lab
 * Implements Caesar, Atbash, Vigenere, Playfair, Hill (2x2), Enigma (3-rotor), and OTP Key Reuse.
 */

window.HistoricalLab = {
  currentCipher: 'caesar',

  init() {
    this.bindEvents();
    this.update();
  },

  bindEvents() {
    const cipherSelect = document.getElementById('hist-cipher-select');
    if (cipherSelect) {
      cipherSelect.addEventListener('change', (e) => {
        this.currentCipher = e.target.value;
        this.renderCipherControls();
        this.update();
      });
    }

    const inputArea = document.getElementById('hist-input');
    if (inputArea) {
      inputArea.addEventListener('input', () => this.update());
    }
  },

  renderCipherControls() {
    const controlsContainer = document.getElementById('hist-specific-controls');
    if (!controlsContainer) return;

    if (this.currentCipher === 'caesar') {
      controlsContainer.innerHTML = `
        <div class="control-group">
          <label class="control-label">Shift Key (0 - 25): <span id="caesar-shift-val" class="value-badge">3</span></label>
          <input type="range" id="caesar-shift" min="0" max="25" value="3" class="crypto-slider">
        </div>
      `;
      document.getElementById('caesar-shift').addEventListener('input', (e) => {
        document.getElementById('caesar-shift-val').textContent = e.target.value;
        this.update();
      });
    } else if (this.currentCipher === 'atbash') {
      controlsContainer.innerHTML = `
        <div class="math-box" style="margin: 0.25rem 0; font-size: 0.8rem;">
          Affine substitution where letter $x$ maps to $25 - x$. Fixed alphabet reversal: A &harr; Z, B &harr; Y.
        </div>
      `;
    } else if (this.currentCipher === 'vigenere') {
      controlsContainer.innerHTML = `
        <div class="control-group">
          <label class="control-label">Passphrase / Key Word</label>
          <input type="text" id="vigenere-key" value="CIPHER" class="crypto-input" placeholder="e.g. CIPHER">
        </div>
      `;
      document.getElementById('vigenere-key').addEventListener('input', () => this.update());
    } else if (this.currentCipher === 'playfair') {
      controlsContainer.innerHTML = `
        <div class="control-group">
          <label class="control-label">Keyword (5x5 Polybius Matrix, I/J merged)</label>
          <input type="text" id="playfair-key" value="MONARCHY" class="crypto-input" placeholder="e.g. MONARCHY">
          <div id="playfair-grid-preview" style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 4px; margin-top: 8px;"></div>
        </div>
      `;
      document.getElementById('playfair-key').addEventListener('input', () => this.update());
    } else if (this.currentCipher === 'hill') {
      controlsContainer.innerHTML = `
        <div class="control-group">
          <label class="control-label">2x2 Invertible Key Matrix [a, b; c, d] mod 26</label>
          <div class="input-row">
            <input type="number" id="hill-a" value="3" class="crypto-input" placeholder="a">
            <input type="number" id="hill-b" value="3" class="crypto-input" placeholder="b">
            <input type="number" id="hill-c" value="2" class="crypto-input" placeholder="c">
            <input type="number" id="hill-d" value="5" class="crypto-input" placeholder="d">
          </div>
          <div id="hill-det-status" style="font-family: var(--font-mono); font-size: 0.75rem; margin-top: 4px;"></div>
        </div>
      `;
      ['hill-a', 'hill-b', 'hill-c', 'hill-d'].forEach(id => {
        document.getElementById(id).addEventListener('input', () => this.update());
      });
    } else if (this.currentCipher === 'enigma') {
      controlsContainer.innerHTML = `
        <div class="control-group">
          <label class="control-label">Enigma I (Rotors I - II - III, Reflector B)</label>
          <div class="enigma-rotors">
            <div class="enigma-rotor">
              <span class="rotor-name">Rotor I (Left)</span>
              <button class="rotor-step-btn" id="r1-up">&and;</button>
              <div class="rotor-window" id="r1-win">A</div>
              <button class="rotor-step-btn" id="r1-dn">&or;</button>
            </div>
            <div class="enigma-rotor">
              <span class="rotor-name">Rotor II (Mid)</span>
              <button class="rotor-step-btn" id="r2-up">&and;</button>
              <div class="rotor-window" id="r2-win">A</div>
              <button class="rotor-step-btn" id="r2-dn">&or;</button>
            </div>
            <div class="enigma-rotor">
              <span class="rotor-name">Rotor III (Right)</span>
              <button class="rotor-step-btn" id="r3-up">&and;</button>
              <div class="rotor-window" id="r3-win">A</div>
              <button class="rotor-step-btn" id="r3-dn">&or;</button>
            </div>
          </div>
          <label class="control-label" style="margin-top: 6px;">Plugboard Steckerbrett (Letter Pairs)</label>
          <input type="text" id="enigma-plugboard" value="AV BS CG DL FU" class="crypto-input" placeholder="e.g. AV BS DL">
        </div>
      `;
      this.enigmaState = { r1: 0, r2: 0, r3: 0 };
      this.bindEnigmaRotorButtons();
    } else if (this.currentCipher === 'otp') {
      controlsContainer.innerHTML = `
        <div class="control-group">
          <label class="control-label">One-Time Pad & Two-Time Pad Vulnerability Demo</label>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 6px;">
            Demonstrates Shannon's perfect secrecy with random key, and catastrophic key reuse where $C_1 \\oplus C_2 = M_1 \\oplus M_2$.
          </p>
          <div class="control-group">
            <label class="control-label">Second Message $M_2$ (Encrypted under SAME key)</label>
            <input type="text" id="otp-m2" value="SEND AIR SUPPORT" class="crypto-input">
          </div>
        </div>
      `;
      document.getElementById('otp-m2').addEventListener('input', () => this.update());
    }
  },

  bindEnigmaRotorButtons() {
    const updateWindows = () => {
      document.getElementById('r1-win').textContent = String.fromCharCode(65 + this.enigmaState.r1);
      document.getElementById('r2-win').textContent = String.fromCharCode(65 + this.enigmaState.r2);
      document.getElementById('r3-win').textContent = String.fromCharCode(65 + this.enigmaState.r3);
      this.update();
    };

    document.getElementById('r1-up').onclick = () => { this.enigmaState.r1 = (this.enigmaState.r1 + 1) % 26; updateWindows(); };
    document.getElementById('r1-dn').onclick = () => { this.enigmaState.r1 = (this.enigmaState.r1 + 25) % 26; updateWindows(); };
    document.getElementById('r2-up').onclick = () => { this.enigmaState.r2 = (this.enigmaState.r2 + 1) % 26; updateWindows(); };
    document.getElementById('r2-dn').onclick = () => { this.enigmaState.r2 = (this.enigmaState.r2 + 25) % 26; updateWindows(); };
    document.getElementById('r3-up').onclick = () => { this.enigmaState.r3 = (this.enigmaState.r3 + 1) % 26; updateWindows(); };
    document.getElementById('r3-dn').onclick = () => { this.enigmaState.r3 = (this.enigmaState.r3 + 25) % 26; updateWindows(); };
    document.getElementById('enigma-plugboard').addEventListener('input', () => this.update());
  },

  update() {
    const input = document.getElementById('hist-input')?.value || 'ATTACK AT DAWN';
    const outputEl = document.getElementById('hist-output');
    const detailsEl = document.getElementById('hist-details');
    if (!outputEl) return;

    let cipherText = '';
    let details = '';

    if (this.currentCipher === 'caesar') {
      const shift = parseInt(document.getElementById('caesar-shift')?.value || '3', 10);
      cipherText = input.replace(/[a-zA-Z]/g, (char) => {
        const code = char.charCodeAt(0);
        const base = code >= 97 ? 97 : 65;
        return String.fromCharCode(((code - base + shift) % 26) + base);
      });
      details = `Monoalphabetic shift: $c \\equiv (p + ${shift}) \\pmod{26}$. Broken in $O(26)$ brute-force operations or frequency analysis of letter 'E'.`;
    } else if (this.currentCipher === 'atbash') {
      cipherText = input.replace(/[a-zA-Z]/g, (char) => {
        const code = char.charCodeAt(0);
        const base = code >= 97 ? 97 : 65;
        return String.fromCharCode(base + (25 - (code - base)));
      });
      details = `Atbash reciprocal cipher: zero key required. Letters reversed ($A \\leftrightarrow Z, B \\leftrightarrow Y$). Offers zero cryptographic security.`;
    } else if (this.currentCipher === 'vigenere') {
      const key = (document.getElementById('vigenere-key')?.value || 'CIPHER').toUpperCase().replace(/[^A-Z]/g, '') || 'KEY';
      let keyIndex = 0;
      cipherText = input.replace(/[a-zA-Z]/g, (char) => {
        const code = char.charCodeAt(0);
        const base = code >= 97 ? 97 : 65;
        const shift = key.charCodeAt(keyIndex % key.length) - 65;
        keyIndex++;
        return String.fromCharCode(((code - base + shift) % 26) + base);
      });
      details = `Polyalphabetic cipher with key length ${key.length}. Defeats single-letter frequency analysis but broken via Kasiski examination and Babbage-Friedman Index of Coincidence ($IC$).`;
    } else if (this.currentCipher === 'playfair') {
      const keyword = (document.getElementById('playfair-key')?.value || 'MONARCHY').toUpperCase().replace(/[^A-Z]/g, '');
      const { grid, encrypted } = this.runPlayfair(input, keyword);
      cipherText = encrypted;
      this.renderPlayfairGrid(grid);
      details = `Digraph substitution on 5x5 matrix. Eliminates single-letter frequencies but preserves bigram distributions.`;
    } else if (this.currentCipher === 'hill') {
      const a = parseInt(document.getElementById('hill-a')?.value || '3', 10);
      const b = parseInt(document.getElementById('hill-b')?.value || '3', 10);
      const c = parseInt(document.getElementById('hill-c')?.value || '2', 10);
      const d = parseInt(document.getElementById('hill-d')?.value || '5', 10);
      const res = this.runHill(input, a, b, c, d);
      cipherText = res.output;
      details = res.status;
      const statusEl = document.getElementById('hill-det-status');
      if (statusEl) statusEl.innerHTML = res.status;
    } else if (this.currentCipher === 'enigma') {
      const pbStr = document.getElementById('enigma-plugboard')?.value || '';
      const res = this.runEnigma(input, this.enigmaState || {r1:0, r2:0, r3:0}, pbStr);
      cipherText = res.ciphertext;
      details = `Enigma Machine: 3 stepped rotors ($26^3 = 17,576$ states), Reflector B (guaranteeing a letter NEVER encrypts to itself, a fatal flaw exploited by Turing's Bombe), and Steckerbrett.`;
    } else if (this.currentCipher === 'otp') {
      const m2 = document.getElementById('otp-m2')?.value || 'SEND AIR SUPPORT';
      const res = this.runOTP(input, m2);
      cipherText = `C1 (Hex): ${res.c1Hex}\nC2 (Hex): ${res.c2Hex}`;
      details = `Two-Time Pad Analysis: XORing $C_1 \\oplus C_2 = M_1 \\oplus M_2$: ${res.xorAscii}. Notice how the key is completely canceled out! An eavesdropper can use "crib-dragging" to reconstruct both plaintexts in minutes.`;
    }

    outputEl.textContent = cipherText;
    if (detailsEl) detailsEl.innerHTML = details;
  },

  runPlayfair(text, key) {
    let alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'; // 'J' merged with 'I'
    let seen = new Set();
    let matrixStr = '';
    for (let char of (key + alphabet)) {
      if (char === 'J') char = 'I';
      if (!seen.has(char) && alphabet.includes(char)) {
        seen.add(char);
        matrixStr += char;
      }
    }
    const grid = [];
    for (let r = 0; r < 5; r++) {
      grid.push(matrixStr.slice(r * 5, (r + 1) * 5).split(''));
    }

    // Clean text and prepare digraphs
    let cleaned = text.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
    let digraphs = [];
    for (let i = 0; i < cleaned.length; i++) {
      let c1 = cleaned[i];
      let c2 = cleaned[i + 1];
      if (!c2) {
        digraphs.push([c1, 'X']);
      } else if (c1 === c2) {
        digraphs.push([c1, 'X']);
      } else {
        digraphs.push([c1, c2]);
        i++;
      }
    }

    const findPos = (c) => {
      for (let r = 0; r < 5; r++) {
        for (let col = 0; col < 5; col++) {
          if (grid[r][col] === c) return { r, col };
        }
      }
      return { r: 0, col: 0 };
    };

    let encrypted = '';
    for (let [c1, c2] of digraphs) {
      let p1 = findPos(c1);
      let p2 = findPos(c2);
      if (p1.r === p2.r) { // Same row
        encrypted += grid[p1.r][(p1.col + 1) % 5] + grid[p2.r][(p2.col + 1) % 5];
      } else if (p1.col === p2.col) { // Same col
        encrypted += grid[(p1.r + 1) % 5][p1.col] + grid[(p2.r + 1) % 5][p2.col];
      } else { // Rectangle
        encrypted += grid[p1.r][p2.col] + grid[p2.r][p1.col];
      }
    }

    return { grid, encrypted };
  },

  renderPlayfairGrid(grid) {
    const el = document.getElementById('playfair-grid-preview');
    if (!el) return;
    el.innerHTML = '';
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        const cell = document.createElement('div');
        cell.className = 'matrix-cell';
        cell.style.aspectRatio = '1';
        cell.style.fontSize = '0.75rem';
        cell.textContent = grid[r][c];
        el.appendChild(cell);
      }
    }
  },

  runHill(text, a, b, c, d) {
    const mod = (n, m) => ((n % m) + m) % m;
    const det = mod(a * d - b * c, 26);

    const gcd = (x, y) => (!y ? x : gcd(y, x % y));
    if (gcd(det, 26) !== 1) {
      return {
        output: '[ERROR: Matrix Invertibility Failure]',
        status: `<span style="color: var(--accent-crimson);">&times; Determinant = ${det}. Since gcd(${det}, 26) &ne; 1, key matrix is NOT invertible mod 26 and cannot be decrypted!</span>`
      };
    }

    // Extended Euclidean to find det inverse
    let detInv = -1;
    for (let i = 1; i < 26; i++) {
      if ((det * i) % 26 === 1) {
        detInv = i;
        break;
      }
    }

    let cleaned = text.toUpperCase().replace(/[^A-Z]/g, '');
    if (cleaned.length % 2 !== 0) cleaned += 'X';

    let out = '';
    for (let i = 0; i < cleaned.length; i += 2) {
      const p1 = cleaned.charCodeAt(i) - 65;
      const p2 = cleaned.charCodeAt(i + 1) - 65;
      const c1 = mod(a * p1 + b * p2, 26);
      const c2 = mod(c * p1 + d * p2, 26);
      out += String.fromCharCode(65 + c1) + String.fromCharCode(65 + c2);
    }

    return {
      output: out,
      status: `<span style="color: var(--accent-emerald);">&#10003; Valid Key Matrix: Det = ${det}, Modular Inverse = ${detInv}. $C \\equiv K \\cdot P \\pmod{26}$. Vulnerable to Known-Plaintext Attack (KPA) using linear algebra over $\\mathbb{Z}_{26}$.</span>`
    };
  },

  runEnigma(text, initRotor, plugboardStr) {
    // Historical wirings
    const ROTOR_I   = 'EKMFLGDQVZNTOWYHXUSPAIBRCJ';
    const ROTOR_II  = 'AJDKSIRUXBLHWTMCQGZNPYFVOE';
    const ROTOR_III = 'BDFHJLCPRTXVZNYEIWGAKMUSQO';
    const REFLECTOR_B = 'YRUHQSLDPXNGOKMIEBFZCWVJAT';

    const r3Notch = 21; // V (steps R2)
    const r2Notch = 4;  // E (steps R1)

    // Build plugboard map
    const plugMap = {};
    for (let i = 0; i < 26; i++) plugMap[i] = i;
    const pairs = plugboardStr.toUpperCase().match(/[A-Z]{2}/g) || [];
    pairs.forEach(pair => {
      const a = pair.charCodeAt(0) - 65;
      const b = pair.charCodeAt(1) - 65;
      plugMap[a] = b;
      plugMap[b] = a;
    });

    let r1 = initRotor.r1;
    let r2 = initRotor.r2;
    let r3 = initRotor.r3;

    let cleaned = text.toUpperCase().replace(/[^A-Z]/g, '');
    let ciphertext = '';

    const forward = (charIdx, wiring, pos) => {
      const shifted = (charIdx + pos) % 26;
      const mapped = wiring.charCodeAt(shifted) - 65;
      return (mapped - pos + 26) % 26;
    };

    const reverse = (charIdx, wiring, pos) => {
      const shifted = (charIdx + pos) % 26;
      const targetChar = String.fromCharCode(65 + shifted);
      const mapped = wiring.indexOf(targetChar);
      return (mapped - pos + 26) % 26;
    };

    for (let i = 0; i < cleaned.length; i++) {
      // Rotor stepping mechanism (double stepping of middle rotor)
      if (r2 === r2Notch) {
        r1 = (r1 + 1) % 26;
        r2 = (r2 + 1) % 26;
      } else if (r3 === r3Notch) {
        r2 = (r2 + 1) % 26;
      }
      r3 = (r3 + 1) % 26;

      let c = cleaned.charCodeAt(i) - 65;
      // 1. Plugboard in
      c = plugMap[c];
      // 2. Rotors forward (R3 -> R2 -> R1)
      c = forward(c, ROTOR_III, r3);
      c = forward(c, ROTOR_II, r2);
      c = forward(c, ROTOR_I, r1);
      // 3. Reflector B
      c = REFLECTOR_B.charCodeAt(c) - 65;
      // 4. Rotors reverse (R1 -> R2 -> R3)
      c = reverse(c, ROTOR_I, r1);
      c = reverse(c, ROTOR_II, r2);
      c = reverse(c, ROTOR_III, r3);
      // 5. Plugboard out
      c = plugMap[c];

      ciphertext += String.fromCharCode(65 + c);
    }

    return { ciphertext };
  },

  runOTP(m1, m2) {
    const toBytes = str => Array.from(new TextEncoder().encode(str));
    const toHex = arr => arr.map(b => b.toString(16).padStart(2, '0')).join(' ');

    const b1 = toBytes(m1);
    const b2 = toBytes(m2);
    const maxLen = Math.max(b1.length, b2.length);

    // Deterministic pseudo-key simulation
    const key = [];
    for (let i = 0; i < maxLen; i++) {
      key.push((i * 47 + 101) % 256);
    }

    const c1 = b1.map((b, i) => b ^ key[i]);
    const c2 = b2.map((b, i) => b ^ key[i]);

    // Attack: C1 XOR C2 = M1 XOR M2
    const minLen = Math.min(b1.length, b2.length);
    const xorStream = [];
    let xorAscii = '';
    for (let i = 0; i < minLen; i++) {
      const diff = c1[i] ^ c2[i];
      xorStream.push(diff);
      xorAscii += (diff >= 32 && diff <= 126) ? String.fromCharCode(diff) : '.';
    }

    return {
      c1Hex: toHex(c1),
      c2Hex: toHex(c2),
      xorAscii: xorAscii || '[None]'
    };
  }
};
