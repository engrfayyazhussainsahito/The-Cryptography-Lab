/**
 * CRYPTIX // Main Application Controller
<<<<<<< HEAD
 * Authored & Curated by Fayyaz H. Sahito
 * Cybersecurity Teacher, Researcher & Innovator
 * Controls Theme Toggle (Dark/Light), Smooth Navigation, Search Index, and Lab Initializations.
 */

window.App = {
  currentTheme: 'dark',

  init() {
    this.initTheme();
    this.initNavigation();
    this.initSearch();
    this.initAllLabs();
    this.initKaTeX();
  },

  // Dark & Light Theme Management
  initTheme() {
    const saved = localStorage.getItem('cryptix-theme');
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    this.currentTheme = saved || (prefersLight ? 'light' : 'dark');
    this.applyTheme(this.currentTheme);

    const toggleBtn = document.getElementById('btn-theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(this.currentTheme);
        localStorage.setItem('cryptix-theme', this.currentTheme);
=======
 * Inspired by Jesper Landberg creative aesthetics.
 * Controls smooth transitions, audio feedback, global search index,
 * interactive cursor follower, and initializes all cryptographic labs.
 */

window.App = {
  soundEnabled: true,
  audioCtx: null,

  init() {
    this.initCursor();
    this.initAudio();
    this.initNavigation();
    this.initSearch();
    this.initDeployModal();
    this.initAllLabs();
    this.initMathJaxOrKaTeX();
  },

  // Interactive Cursor Follower
  initCursor() {
    const dot = document.querySelector('.cursor-dot');
    const follower = document.querySelector('.cursor-follower');
    if (!dot || !follower) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    });

    const loop = () => {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      follower.style.left = `${followerX}px`;
      follower.style.top = `${followerY}px`;
      requestAnimationFrame(loop);
    };
    loop();

    // Hover scale effects on interactive elements
    const interactives = 'a, button, input, select, textarea, .topic-pill, .subtopic-card, .matrix-cell, .stat-chip';
    document.querySelectorAll(interactives).forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
        this.playHoverTone();
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  },

  // Synthesized Web Audio API UI Sound Effects
  initAudio() {
    const toggleBtn = document.getElementById('btn-sound-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        this.soundEnabled = !this.soundEnabled;
        toggleBtn.innerHTML = this.soundEnabled ?
          `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>` :
          `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`;
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
      });
    }
  },

<<<<<<< HEAD
  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const toggleBtn = document.getElementById('btn-theme-toggle');
    if (!toggleBtn) return;

    if (theme === 'light') {
      toggleBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
        <span>Dark Mode</span>
      `;
    } else {
      toggleBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
        <span>Light Mode</span>
      `;
    }
=======
  getAudioContext() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) this.audioCtx = new AudioCtxClass();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  },

  playHoverTone() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {}
  },

  playClickTone() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch (e) {}
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
  },

  // Active Pill Scroll Spy & Smooth Navigation
  initNavigation() {
    const pills = document.querySelectorAll('.topic-pill');
    const sections = document.querySelectorAll('.crypto-section');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          pills.forEach(p => {
            const matches = p.getAttribute('href') === `#${id}`;
            p.classList.toggle('active', matches);
            if (matches) {
              p.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
          });
        }
      });
    }, { rootMargin: '-20% 0px -60% 0px' });

    sections.forEach(sec => observer.observe(sec));
<<<<<<< HEAD
  },

  // Global Search Modal (Ctrl+K)
=======

    pills.forEach(p => {
      p.addEventListener('click', (e) => {
        this.playClickTone();
      });
    });
  },

  // Global Search Modal
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
  initSearch() {
    const searchModal = document.getElementById('search-modal');
    const searchInput = document.getElementById('global-search-input');
    const searchResults = document.getElementById('search-results-list');
<<<<<<< HEAD
    const openBtn = document.getElementById('btn-open-search');
=======
    const openBtns = [document.getElementById('btn-open-search'), document.querySelector('.search-trigger')];
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
    const closeBtn = document.getElementById('btn-close-search');

    const openSearch = () => {
      searchModal?.classList.add('active');
      searchInput?.focus();
<<<<<<< HEAD
=======
      this.playClickTone();
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
    };

    const closeSearch = () => {
      searchModal?.classList.remove('active');
    };

<<<<<<< HEAD
    openBtn?.addEventListener('click', openSearch);
=======
    openBtns.forEach(b => b?.addEventListener('click', openSearch));
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
    closeBtn?.addEventListener('click', closeSearch);

    searchModal?.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearch();
    });

    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchModal?.classList.contains('active') ? closeSearch() : openSearch();
      }
      if (e.key === 'Escape') closeSearch();
    });

<<<<<<< HEAD
    // Comprehensive Search Database
    const searchDatabase = [
      { name: 'Caesar Cipher', cat: 'Domain 01: Classical', section: 'section-1-classical', desc: 'Monoalphabetic shift substitution with frequency analysis vulnerability.' },
      { name: 'Atbash Cipher', cat: 'Domain 01: Classical', section: 'section-1-classical', desc: 'Biblical reciprocal alphabet reversal cipher.' },
      { name: 'Vigenère Cipher', cat: 'Domain 01: Classical', section: 'section-1-classical', desc: 'Polyalphabetic substitution broken by Kasiski and Friedman IC.' },
      { name: 'Playfair Cipher', cat: 'Domain 01: Classical', section: 'section-1-classical', desc: '5x5 digraph substitution matrix.' },
      { name: 'Hill Cipher', cat: 'Domain 01: Classical', section: 'section-1-classical', desc: 'Linear algebra modular matrix encryption mod 26.' },
      { name: 'Enigma Machine', cat: 'Domain 01: Classical', section: 'section-1-classical', desc: '3-rotor mechanical cipher with reflector and plugboard Steckerbrett.' },
      { name: 'Lorenz SZ42', cat: 'Domain 01: Classical', section: 'section-1-classical', desc: '12-wheel teleprinter cipher solved by Bill Tutte and Colossus.' },
      { name: 'One-Time Pad (OTP)', cat: 'Domain 01: Classical', section: 'section-1-classical', desc: 'Shannon perfect secrecy theorem and catastrophic two-time pad reuse attack.' },

      { name: 'AES (Rijndael, FIPS 197)', cat: 'Domain 02: Symmetric Block', section: 'section-2-symmetric', desc: 'SubBytes, ShiftRows, MixColumns, AddRoundKey over GF(2^8).' },
      { name: 'DES / 3DES & Sweet32', cat: 'Domain 02: Symmetric Block', section: 'section-2-symmetric', desc: 'Feistel networks, 56-bit key deprecation and birthday collision attacks.' },
      { name: 'ChaCha20 & Salsa20 (RFC 8439)', cat: 'Domain 02: Stream Ciphers', section: 'section-2-symmetric', desc: 'High-speed Add-Rotate-Xor (ARX) stream cipher immune to cache-timing.' },
      { name: 'ECB Penguin Mode Leak', cat: 'Domain 02: Cipher Modes', section: 'section-2-symmetric', desc: 'Electronic Codebook structural pattern leakage visualizer.' },
      { name: 'CBC, CTR, CFB, OFB, XTS', cat: 'Domain 02: Cipher Modes', section: 'section-2-symmetric', desc: 'Operational modes and XTS disk encryption standards.' },
      { name: 'Format-Preserving Encryption (FF1/FF3-1)', cat: 'Domain 02: FPE', section: 'section-2-symmetric', desc: 'NIST SP 800-38G credit card and SSN tokenization preserving schemas.' },

      { name: 'AES-GCM (Galois/Counter Mode)', cat: 'Domain 03: AEAD', section: 'section-3-aead', desc: 'NIST SP 800-38D GHASH authenticator and nonce reuse hazard.' },
      { name: 'ChaCha20-Poly1305', cat: 'Domain 03: AEAD', section: 'section-3-aead', desc: 'RFC 8439 high-performance authenticated encryption.' },
      { name: 'XChaCha20-Poly1305', cat: 'Domain 03: AEAD', section: 'section-3-aead', desc: '192-bit extended nonce safe for random generation.' },
      { name: 'HMAC & CMAC', cat: 'Domain 03: MACs', section: 'section-3-aead', desc: 'Keyed message authentication immune to length extension.' },
      { name: 'SipHash', cat: 'Domain 03: MACs', section: 'section-3-aead', desc: 'Protects hash tables from collision Denial-of-Service attacks.' },

      { name: 'SHA-2 (SHA-256 / SHA-512)', cat: 'Domain 04: Hash Functions', section: 'section-4-hash', desc: 'Standard Merkle-Damgård cryptographic hash functions.' },
      { name: 'SHA-3 (Keccak-f[1600])', cat: 'Domain 04: Hash Functions', section: 'section-4-hash', desc: 'FIPS 202 sponge construction with rate and capacity.' },
      { name: 'BLAKE3', cat: 'Domain 04: Hash Functions', section: 'section-4-hash', desc: 'Tree-based SIMD parallel cryptographic hash.' },
      { name: 'Strict Avalanche Criterion (SAC)', cat: 'Domain 04: Avalanche Heatmap', section: 'section-4-hash', desc: '256-bit matrix proving 50% bit-diffusion upon 1-bit input flip.' },
      { name: 'Poseidon & Rescue', cat: 'Domain 04: ZK Algebraic Hashes', section: 'section-4-hash', desc: 'Low-degree field hashes minimizing zk-SNARK constraints.' },

      { name: 'Argon2id (Winner of PHC)', cat: 'Domain 05: Key Derivation', section: 'section-5-kdf', desc: 'RFC 9106 memory-hard password hashing standard.' },
      { name: 'PBKDF2 & bcrypt & scrypt', cat: 'Domain 05: Key Derivation', section: 'section-5-kdf', desc: 'GPU/ASIC cracking resistance benchmarks.' },
      { name: 'HKDF (RFC 5869)', cat: 'Domain 05: Key Derivation', section: 'section-5-kdf', desc: 'Extract-then-Expand cryptographic master key derivation.' },
      { name: 'OPAQUE & SRP PAKE', cat: 'Domain 05: Zero-Knowledge PAKE', section: 'section-5-kdf', desc: 'Password-Authenticated Key Exchange with zero password exposure.' },

      { name: 'RSA (Rivest-Shamir-Adleman)', cat: 'Domain 06: Classical Public-Key', section: 'section-6-publickey', desc: 'Integer factorization trapdoor permutation (OAEP and PSS).' },
      { name: 'Diffie-Hellman & ECDH', cat: 'Domain 06: Classical Public-Key', section: 'section-6-publickey', desc: 'Forward-secret discrete logarithm key exchange.' },
      { name: 'Elliptic Curves (P-256, secp256k1, X25519)', cat: 'Domain 06: Classical Public-Key', section: 'section-6-publickey', desc: 'Weierstrass and Montgomery curve point arithmetic.' },
      { name: 'ECDSA Nonce-Reuse Disaster', cat: 'Domain 06: Classical Public-Key', section: 'section-6-publickey', desc: 'Sony PS3 private key extraction from duplicate nonce k.' },
      { name: 'Shor\'s Quantum Algorithm', cat: 'Domain 06: Classical Public-Key', section: 'section-6-publickey', desc: 'Polynomial-time O((log N)^3) factoring and discrete log quantum threat.' },

      { name: 'ML-KEM (Kyber, FIPS 203)', cat: 'Domain 07: Post-Quantum', section: 'section-7-pqc', desc: 'NIST primary module-lattice key encapsulation mechanism standard.' },
      { name: 'ML-DSA (Dilithium, FIPS 204)', cat: 'Domain 07: Post-Quantum', section: 'section-7-pqc', desc: 'NIST primary module-lattice digital signature standard.' },
      { name: 'SLH-DSA (SPHINCS+, FIPS 205)', cat: 'Domain 07: Post-Quantum', section: 'section-7-pqc', desc: 'NIST stateless hash-based signature standard.' },
      { name: 'FN-DSA (Falcon, FIPS 206)', cat: 'Domain 07: Post-Quantum', section: 'section-7-pqc', desc: 'Fast-Fourier lattice signature standard.' },
      { name: 'HQC (Hamming Quasi-Cyclic)', cat: 'Domain 07: Post-Quantum', section: 'section-7-pqc', desc: 'NIST selected backup code-based KEM (2025).' },
      { name: 'SIKE & Rainbow Breaks', cat: 'Domain 07: Post-Quantum', section: 'section-7-pqc', desc: 'Castryck-Decru isogeny attack and Beullens MinRank break post-mortem.' },
      { name: 'Hybrid TLS (X25519 + ML-KEM)', cat: 'Domain 07: Post-Quantum', section: 'section-7-pqc', desc: 'Defense-in-depth dual key exchange in modern browsers.' },

      { name: 'BB84 QKD Protocol', cat: 'Domain 08: Quantum Cryptography', section: 'section-8-quantum', desc: 'Single-photon polarization bases with Heisenberg eavesdropper detection.' },
      { name: 'E91 Bell State Entanglement', cat: 'Domain 08: Quantum Cryptography', section: 'section-8-quantum', desc: 'CHSH inequality test proving unconditional channel security.' },
      { name: 'Wiesner\'s Quantum Money', cat: 'Domain 08: Quantum Cryptography', section: 'section-8-quantum', desc: 'Uncloneable banknotes founded on the No-Cloning Theorem.' },

      { name: 'Schnorr Zero-Knowledge Proof', cat: 'Domain 09: Advanced PETs', section: 'section-9-advanced', desc: 'Sigma-protocol proof of discrete log with zero witness leakage.' },
      { name: 'Shamir Secret Sharing (k, n)', cat: 'Domain 09: Advanced PETs', section: 'section-9-advanced', desc: 'Lagrange polynomial threshold secret splitting and recovery.' },
      { name: 'Paillier Homomorphic Encryption', cat: 'Domain 09: Advanced PETs', section: 'section-9-advanced', desc: 'Additive homomorphism on encrypted ciphertexts.' },
      { name: 'zk-SNARKs & zk-STARKs', cat: 'Domain 09: Advanced PETs', section: 'section-9-advanced', desc: 'Groth16, PLONK, Halo2, FRI, and Nova folding schemes.' },

      { name: 'TLS 1.3 1-RTT Handshake', cat: 'Domain 10: Protocols', section: 'section-10-protocols', desc: 'Forward-secret post-quantum transport security and ECH.' },
      { name: 'Signal Double Ratchet Algorithm', cat: 'Domain 10: Protocols', section: 'section-10-protocols', desc: 'KDF chain and DH ratchet forward secrecy and post-compromise healing.' },
      { name: 'Merkle Tree Inclusion Proofs', cat: 'Domain 10: Protocols', section: 'section-10-protocols', desc: 'Logarithmic audit paths for verifiable ledger transactions.' },

      { name: 'Ascon-128 (NIST SP 800-232)', cat: 'Domain 11: Lightweight IoT', section: 'section-11-lightweight', desc: '320-bit permutation sponge for smart devices and embedded systems.' },
      { name: 'PRESENT & SIMON / SPECK', cat: 'Domain 11: Lightweight IoT', section: 'section-11-lightweight', desc: 'Low-Gate-Equivalent (GE) block ciphers for sub-milliwatt devices.' },

      { name: 'Mosca\'s Theorem Y2Q Calculator', cat: 'Domain 12: Frontier Roadmap', section: 'section-12-frontier', desc: 'Harvest Now, Decrypt Later quantum risk assessment formula.' },
      { name: 'Cryptographic Algorithm Mortality', cat: 'Domain 12: Frontier Roadmap', section: 'section-12-frontier', desc: 'Live status database of broken, vulnerable, and NIST-approved standards.' },
      { name: 'Crypto-Agile Nginx Configuration', cat: 'Domain 12: Frontier Roadmap', section: 'section-12-frontier', desc: 'Production OpenSSL 3.4+ hybrid TLS configuration generator.' }
=======
    // Search Index across all 12 domains
    const searchDatabase = [
      { name: 'Caesar Cipher', cat: 'Topic 1: Classical Ciphers', section: 'section-1-classical', desc: 'Monoalphabetic substitution with modular shift.' },
      { name: 'Atbash Cipher', cat: 'Topic 1: Classical Ciphers', section: 'section-1-classical', desc: 'Reciprocal Hebrew alphabet reversal cipher.' },
      { name: 'Vigenère Cipher', cat: 'Topic 1: Classical Ciphers', section: 'section-1-classical', desc: 'Polyalphabetic substitution with repeating keyword.' },
      { name: 'Playfair Cipher', cat: 'Topic 1: Classical Ciphers', section: 'section-1-classical', desc: 'Digraph substitution using a 5x5 Polybius grid.' },
      { name: 'Hill Cipher', cat: 'Topic 1: Classical Ciphers', section: 'section-1-classical', desc: 'Linear algebra modular matrix encryption mod 26.' },
      { name: 'Enigma Machine', cat: 'Topic 1: Classical Ciphers', section: 'section-1-classical', desc: '3-rotor mechanical cipher machine with Steckerbrett.' },
      { name: 'Lorenz SZ42', cat: 'Topic 1: Classical Ciphers', section: 'section-1-classical', desc: 'Teleprinter stream cipher cracked at Bletchley Park.' },
      { name: 'One-Time Pad (OTP)', cat: 'Topic 1: Classical Ciphers', section: 'section-1-classical', desc: 'Shannon perfect secrecy cipher and two-time pad key reuse flaw.' },

      { name: 'AES (Rijndael, FIPS 197)', cat: 'Topic 2: Symmetric Block', section: 'section-2-symmetric', desc: 'SubBytes, ShiftRows, MixColumns, AddRoundKey over GF(2^8).' },
      { name: 'DES / 3DES', cat: 'Topic 2: Symmetric Block', section: 'section-2-symmetric', desc: 'Feistel cipher, 56-bit key deprecation and meet-in-the-middle.' },
      { name: 'Blowfish & Twofish', cat: 'Topic 2: Symmetric Block', section: 'section-2-symmetric', desc: 'Bruce Schneier key-dependent S-box block ciphers.' },
      { name: 'Serpent & Camellia', cat: 'Topic 2: Symmetric Block', section: 'section-2-symmetric', desc: 'Ultra-secure AES finalist and Japanese standard ciphers.' },
      { name: 'SM4 & Kuznyechik', cat: 'Topic 2: Symmetric Block', section: 'section-2-symmetric', desc: 'Chinese and Russian national standard block ciphers.' },
      { name: 'ChaCha20 & Salsa20', cat: 'Topic 2: Stream Ciphers', section: 'section-2-symmetric', desc: 'ARX high-speed stream ciphers (RFC 8439).' },
      { name: 'RC4 (Broken)', cat: 'Topic 2: Stream Ciphers', section: 'section-2-symmetric', desc: 'Insecure stream cipher with initial byte biases and WEP break.' },
      { name: 'ECB Penguin Mode Leak', cat: 'Topic 2: Cipher Modes', section: 'section-2-symmetric', desc: 'Electronic Codebook pattern leakage demonstration.' },
      { name: 'CBC, CTR, CFB, OFB, XTS', cat: 'Topic 2: Cipher Modes', section: 'section-2-symmetric', desc: 'Block cipher operational modes and disk encryption.' },
      { name: 'Format-Preserving Encryption (FF1/FF3-1)', cat: 'Topic 2: FPE', section: 'section-2-symmetric', desc: 'NIST SP 800-38G credit card and SSN tokenization.' },

      { name: 'AES-GCM (Galois/Counter Mode)', cat: 'Topic 3: AEAD & MACs', section: 'section-3-aead', desc: 'AEAD using GHASH Galois field multiplication.' },
      { name: 'ChaCha20-Poly1305', cat: 'Topic 3: AEAD & MACs', section: 'section-3-aead', desc: 'RFC 8439 standard high-performance authenticated encryption.' },
      { name: 'XChaCha20-Poly1305', cat: 'Topic 3: AEAD & MACs', section: 'section-3-aead', desc: '192-bit extended nonce safe for random nonce generation.' },
      { name: 'HMAC & CMAC', cat: 'Topic 3: Message Auth Codes', section: 'section-3-aead', desc: 'RFC 2104 key-hashing immune to length extension attacks.' },
      { name: 'SipHash', cat: 'Topic 3: MACs', section: 'section-3-aead', desc: 'Fast keyed hash defending against hash table collision DoS.' },

      { name: 'SHA-2 (SHA-256 / SHA-512)', cat: 'Topic 4: Hash Functions', section: 'section-4-hash', desc: 'Standard Merkle-Damgård cryptographic hash functions.' },
      { name: 'SHA-3 (Keccak-256)', cat: 'Topic 4: Hash Functions', section: 'section-4-hash', desc: 'FIPS 202 sponge construction with rate and capacity.' },
      { name: 'BLAKE3', cat: 'Topic 4: Hash Functions', section: 'section-4-hash', desc: 'Ultra-fast tree-based SIMD cryptographic hash.' },
      { name: 'Strict Avalanche Criterion (SAC)', cat: 'Topic 4: Avalanche Matrix', section: 'section-4-hash', desc: 'Visual 256-bit heatmap proving 50% bit flip diffusion.' },
      { name: 'Poseidon & Rescue', cat: 'Topic 4: ZK Algebraic Hashes', section: 'section-4-hash', desc: 'Low-degree field hashes minimizing zk-SNARK constraints.' },

      { name: 'Argon2id (Winner of PHC)', cat: 'Topic 5: Key Derivation', section: 'section-5-kdf', desc: 'Memory-hard password hashing standard (RFC 9106).' },
      { name: 'PBKDF2 & bcrypt & scrypt', cat: 'Topic 5: Key Derivation', section: 'section-5-kdf', desc: 'Comparative password hashing benchmarks against GPU clusters.' },
      { name: 'HKDF (RFC 5869)', cat: 'Topic 5: Key Derivation', section: 'section-5-kdf', desc: 'Extract-and-Expand cryptographic key derivation.' },
      { name: 'OPAQUE & SRP PAKE', cat: 'Topic 5: Zero-Knowledge PAKE', section: 'section-5-kdf', desc: 'Password-Authenticated Key Exchange with zero password leaks.' },

      { name: 'RSA (Rivest-Shamir-Adleman)', cat: 'Topic 6: Classical Public-Key', section: 'section-6-publickey', desc: 'Integer factorization trapdoor permutation e*d = 1 mod phi(n).' },
      { name: 'Diffie-Hellman & ECDH', cat: 'Topic 6: Classical Public-Key', section: 'section-6-publickey', desc: 'Forward-secret discrete logarithm key exchange.' },
      { name: 'Elliptic Curve Point Addition', cat: 'Topic 6: Classical Public-Key', section: 'section-6-publickey', desc: 'Interactive canvas geometric chord-tangent visualizer.' },
      { name: 'ECDSA Nonce-Reuse Attack', cat: 'Topic 6: Classical Public-Key', section: 'section-6-publickey', desc: 'Sony PS3 private key recovery from duplicate k.' },
      { name: 'Shor\'s Algorithm Threat', cat: 'Topic 6: Classical Public-Key', section: 'section-6-publickey', desc: 'Quantum period-finding breaking RSA, ECC, and DH in O((log N)^3).' },

      { name: 'ML-KEM (Kyber, FIPS 203)', cat: 'Topic 7: Post-Quantum Crypto', section: 'section-7-pqc', desc: 'Module-Lattice Key Encapsulation Mechanism standard.' },
      { name: 'ML-DSA (Dilithium, FIPS 204)', cat: 'Topic 7: Post-Quantum Crypto', section: 'section-7-pqc', desc: 'Module-Lattice Digital Signature Algorithm standard.' },
      { name: 'SLH-DSA (SPHINCS+, FIPS 205)', cat: 'Topic 7: Post-Quantum Crypto', section: 'section-7-pqc', desc: 'Stateless hash-based signature standard.' },
      { name: 'FN-DSA (Falcon, FIPS 206)', cat: 'Topic 7: Post-Quantum Crypto', section: 'section-7-pqc', desc: 'Fast-Fourier lattice signature standard.' },
      { name: 'HQC (Hamming Quasi-Cyclic)', cat: 'Topic 7: Post-Quantum Crypto', section: 'section-7-pqc', desc: 'NIST selected backup code-based KEM (2025).' },
      { name: 'SIKE & Rainbow Breaks', cat: 'Topic 7: Post-Quantum Crypto', section: 'section-7-pqc', desc: 'Post-mortem of broken isogeny and multivariate candidates.' },
      { name: 'Hybrid TLS (X25519 + ML-KEM)', cat: 'Topic 7: Post-Quantum Crypto', section: 'section-7-pqc', desc: 'Defense-in-depth post-quantum hybrid combiner.' },

      { name: 'BB84 QKD Protocol', cat: 'Topic 8: Quantum Cryptography', section: 'section-8-quantum', desc: 'Photon polarization basis simulation with Eve detection.' },
      { name: 'E91 Bell Entanglement', cat: 'Topic 8: Quantum Cryptography', section: 'section-8-quantum', desc: 'CHSH inequality violation proving zero eavesdropping.' },
      { name: 'Wiesner Quantum Money', cat: 'Topic 8: Quantum Cryptography', section: 'section-8-quantum', desc: 'Uncloneable banknotes via No-Cloning Theorem.' },

      { name: 'Schnorr Zero-Knowledge Proof', cat: 'Topic 9: Advanced & PETs', section: 'section-9-advanced', desc: 'Interactive Peggy and Victor sigma-protocol of discrete log.' },
      { name: 'Shamir Secret Sharing (k, n)', cat: 'Topic 9: Advanced & PETs', section: 'section-9-advanced', desc: 'Polynomial threshold secret splitting and Lagrange interpolation.' },
      { name: 'Paillier Homomorphic Encryption', cat: 'Topic 9: Advanced & PETs', section: 'section-9-advanced', desc: 'Additive homomorphism on encrypted ciphertexts.' },
      { name: 'zk-SNARKs & zk-STARKs', cat: 'Topic 9: Advanced & PETs', section: 'section-9-advanced', desc: 'Groth16, PLONK, Halo2, and FRI polynomial commitments.' },

      { name: 'TLS 1.3 Handshake', cat: 'Topic 10: Protocols & Systems', section: 'section-10-protocols', desc: '1-RTT post-quantum hybrid handshake packet inspector.' },
      { name: 'Signal Double Ratchet', cat: 'Topic 10: Protocols & Systems', section: 'section-10-protocols', desc: 'KDF chain and DH ratchet forward secrecy and self-healing.' },
      { name: 'Merkle Tree Proofs', cat: 'Topic 10: Protocols & Systems', section: 'section-10-protocols', desc: 'Cryptographic transaction inclusion audit path generator.' },

      { name: 'Ascon-128 (NIST SP 800-232)', cat: 'Topic 11: Lightweight Crypto', section: 'section-11-lightweight', desc: '320-bit permutation sponge for IoT and smart devices.' },
      { name: 'PRESENT, SIMON & SPECK', cat: 'Topic 11: Lightweight Crypto', section: 'section-11-lightweight', desc: 'Ultra-low Gate Equivalent (GE) embedded block ciphers.' },

      { name: 'Y2Q Mosca Quantum Risk Calculator', cat: 'Topic 12: Newest Developments', section: 'section-12-frontier', desc: 'Mosca theorem calculator for Harvest Now, Decrypt Later.' },
      { name: 'Cryptographic Algorithm Mortality Table', cat: 'Topic 12: Newest Developments', section: 'section-12-frontier', desc: 'Status database of broken vs resilient algorithms.' },
      { name: 'Crypto-Agile Nginx Configuration', cat: 'Topic 12: Newest Developments', section: 'section-12-frontier', desc: 'Ready-to-deploy OpenSSL 3.4+ hybrid TLS configuration.' }
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
    ];

    const renderResults = (query) => {
      if (!searchResults) return;
      const q = query.trim().toLowerCase();
      if (!q) {
<<<<<<< HEAD
        searchResults.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 2rem 0; font-family: var(--font-mono); font-size: 0.85rem;">Type to search over 100+ cryptographic algorithms, standards, and laboratories...</div>`;
=======
        searchResults.innerHTML = `<div style="text-align: center; color: var(--text-dim); padding: 2rem 0; font-family: var(--font-mono); font-size: 0.85rem;">Type to search over 100+ cryptographic algorithms, ciphers, standards, and labs...</div>`;
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
        return;
      }

      const matches = searchDatabase.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.cat.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q)
      );

      if (matches.length === 0) {
        searchResults.innerHTML = `<div style="text-align: center; color: var(--accent-amber); padding: 2rem 0; font-family: var(--font-mono); font-size: 0.85rem;">No cryptographic algorithms found matching "${query}".</div>`;
        return;
      }

      let html = '';
      matches.forEach(item => {
        html += `
<<<<<<< HEAD
          <div class="search-result-item" data-section="${item.section}" style="padding: 10px 14px; border-radius: 6px; background: var(--bg-card); border: 1px solid var(--border-subtle); margin-bottom: 8px; cursor: pointer; transition: var(--transition-fast);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <strong style="color: var(--text-main); font-family: var(--font-display); font-size: 0.95rem;">${item.name}</strong>
=======
          <div class="search-result-item" data-section="${item.section}" style="padding: 10px 14px; border-radius: 8px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); margin-bottom: 8px; cursor: pointer; transition: var(--transition-smooth);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <strong style="color: #fff; font-family: var(--font-display); font-size: 0.95rem;">${item.name}</strong>
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
              <span class="standard-badge" style="font-size: 0.68rem;">${item.cat}</span>
            </div>
            <p style="color: var(--text-muted); font-size: 0.8rem; margin: 0;">${item.desc}</p>
          </div>
        `;
      });
      searchResults.innerHTML = html;

<<<<<<< HEAD
=======
      // Click to jump
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
      searchResults.querySelectorAll('.search-result-item').forEach(el => {
        el.addEventListener('click', () => {
          const secId = el.dataset.section;
          closeSearch();
          const target = document.getElementById(secId);
<<<<<<< HEAD
          if (target) target.scrollIntoView({ behavior: 'smooth' });
=======
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
        });
      });
    };

    searchInput?.addEventListener('input', (e) => renderResults(e.target.value));
    renderResults('');
  },

<<<<<<< HEAD
=======
  // GitHub Pages Deployment Guide Modal
  initDeployModal() {
    const modal = document.getElementById('deploy-modal');
    const openBtn = document.getElementById('btn-open-deploy');
    const closeBtn = document.getElementById('btn-close-deploy');

    openBtn?.addEventListener('click', () => {
      modal?.classList.add('active');
      this.playClickTone();
    });

    closeBtn?.addEventListener('click', () => {
      modal?.classList.remove('active');
    });

    modal?.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  },

  // Initialize all 12 specialized laboratories
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
  initAllLabs() {
    if (window.HistoricalLab) window.HistoricalLab.init();
    if (window.SymmetricLab) window.SymmetricLab.init();
    if (window.AeadLab) window.AeadLab.init();
    if (window.HashLab) window.HashLab.init();
    if (window.KdfLab) window.KdfLab.init();
    if (window.PublicKeyLab) window.PublicKeyLab.init();
    if (window.PqcLab) window.PqcLab.init();
    if (window.QuantumLab) window.QuantumLab.init();
    if (window.ZkpLab) window.ZkpLab.init();
    if (window.ProtocolLab) window.ProtocolLab.init();
    if (window.LightweightLab) window.LightweightLab.init();
    if (window.FrontierLab) window.FrontierLab.init();
  },

<<<<<<< HEAD
  initKaTeX() {
=======
  // Trigger KaTeX automatic formula rendering
  initMathJaxOrKaTeX() {
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
    if (window.renderMathInElement) {
      window.renderMathInElement(document.body, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true }
        ],
        throwOnError: false
      });
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.App.init();
});
