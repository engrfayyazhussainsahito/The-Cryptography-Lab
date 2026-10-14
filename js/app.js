/**
 * CRYPTIX // Main Application Controller
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
      });
    }
  },

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

    pills.forEach(p => {
      p.addEventListener('click', (e) => {
        this.playClickTone();
      });
    });
  },

  // Global Search Modal
  initSearch() {
    const searchModal = document.getElementById('search-modal');
    const searchInput = document.getElementById('global-search-input');
    const searchResults = document.getElementById('search-results-list');
    const openBtns = [document.getElementById('btn-open-search'), document.querySelector('.search-trigger')];
    const closeBtn = document.getElementById('btn-close-search');

    const openSearch = () => {
      searchModal?.classList.add('active');
      searchInput?.focus();
      this.playClickTone();
    };

    const closeSearch = () => {
      searchModal?.classList.remove('active');
    };

    openBtns.forEach(b => b?.addEventListener('click', openSearch));
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
    ];

    const renderResults = (query) => {
      if (!searchResults) return;
      const q = query.trim().toLowerCase();
      if (!q) {
        searchResults.innerHTML = `<div style="text-align: center; color: var(--text-dim); padding: 2rem 0; font-family: var(--font-mono); font-size: 0.85rem;">Type to search over 100+ cryptographic algorithms, ciphers, standards, and labs...</div>`;
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
          <div class="search-result-item" data-section="${item.section}" style="padding: 10px 14px; border-radius: 8px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); margin-bottom: 8px; cursor: pointer; transition: var(--transition-smooth);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <strong style="color: #fff; font-family: var(--font-display); font-size: 0.95rem;">${item.name}</strong>
              <span class="standard-badge" style="font-size: 0.68rem;">${item.cat}</span>
            </div>
            <p style="color: var(--text-muted); font-size: 0.8rem; margin: 0;">${item.desc}</p>
          </div>
        `;
      });
      searchResults.innerHTML = html;

      // Click to jump
      searchResults.querySelectorAll('.search-result-item').forEach(el => {
        el.addEventListener('click', () => {
          const secId = el.dataset.section;
          closeSearch();
          const target = document.getElementById(secId);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    };

    searchInput?.addEventListener('input', (e) => renderResults(e.target.value));
    renderResults('');
  },

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

  // Trigger KaTeX automatic formula rendering
  initMathJaxOrKaTeX() {
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
