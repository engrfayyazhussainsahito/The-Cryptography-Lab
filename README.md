# CRYPTIX: The Cryptographic Nexus & Educational Laboratory
### An Interactive, Academic Reference Architecture Covering Classical to Post-Quantum Cryptography

**Author & Lead Researcher:** **Fayyaz H. Sahito** *(Cyber Security Teacher, Researcher & Innovator)*  
**Specification Reference:** NIST FIPS 203/204/205, NIST SP 800-232, RFC 8446 (TLS 1.3), RFC 7539, RFC 9180 (HPKE)  
**Deployment Target:** 100% Client-Side Static Architecture (Zero Build Tools, GitHub Pages Ready)

---

## 🛡️ Project Overview

**CRYPTIX** is an elite, university-grade, interactive cryptographic laboratory and reference compendium. Designed specifically for cybersecurity students, academic researchers, and security engineers, it bridges deep mathematical rigour with real-time, browser-native computational simulations across **12 comprehensive cryptographic domains**:

1. **Classical & Historical Ciphers**  
   *Caesar, Atbash, Vigenère, Playfair (5×5 matrix digraphs), Hill cipher (modular linear algebra & modulo-26 matrix inversions), 3-rotor Enigma Machine (Enigma I/M3 with plugboard Steckerbrett and notch turnover), and One-Time Pad (Shannon's theorem & unicity distance).*
2. **Symmetric Encryption & Block Modes**  
   *DES, 3DES, AES (Rijndael with 4×4 state matrix: SubBytes, ShiftRows, MixColumns, AddRoundKey), Blowfish, Twofish, Serpent, Camellia, ChaCha20/Salsa20 stream ciphers (quarter-round state), Modes (ECB, CBC, CTR, CFB, OFB, XTS), Format-Preserving Encryption (FF1/FF3-1), and Wide-Block Adiantum/HCTR2.*
3. **Authenticated Encryption (AEAD) & MACs**  
   *AES-GCM (Galois Field $GF(2^{128})$ GHASH authentication tag), ChaCha20-Poly1305, AES-OCB, AES-CCM, AEGIS, HMAC (RFC 2104 inner/outer pad construction), CMAC, Poly1305, KMAC, and SipHash. Includes 1-bit cipher tampering verification.*
4. **Cryptographic Hash Functions & XOFs**  
   *Merkle–Damgård construction, SHA-2, SHA-3 (Keccak Sponge function with rate $r$ and capacity $c$), BLAKE2/BLAKE3, SM3, Streebog; Extendable Output Functions (SHAKE128/256); Algebraic Hashes for ZK-SNARKs (Poseidon, Rescue, Anemoi); and real-time 256-bit Strict Avalanche Criterion (SAC) bit-flip matrix analyzer.*
5. **Key Derivation Functions (KDF) & Password Hashing**  
   *PBKDF2 (HMAC iteration stretching), HKDF (RFC 5869 extract-and-expand), bcrypt (Eksblowfish state), scrypt, Argon2id (Winner of the Password Hashing Competition with memory-hard matrix lanes and SIMD resistance), and Password-Authenticated Key Exchange (PAKE: OPAQUE, SRP, SPAKE2).*
6. **Classical Public-Key Cryptography & Discrete Logarithms**  
   *RSA (Euler's totient $\phi(n)$, modular exponentiation, Fermat/Wiener factoring attacks), Diffie–Hellman & ECDH key exchange, Canvas-based real-time Elliptic Curve Weierstrass Point Addition/Doubling ($y^2 \equiv x^3 + ax + b \pmod p$), and the Sony PlayStation 3 ECDSA Nonce-Reuse Private Key Extraction demonstration.*
7. **Post-Quantum Cryptography (NIST FIPS Standards)**  
   *Lattice-based: ML-KEM (Kyber, FIPS 203 Module-LWE), ML-DSA (Dilithium, FIPS 204), FN-DSA (Falcon, FIPS 206); Hash-based: SLH-DSA (SPHINCS+, FIPS 205); Code-based: Classic McEliece & HQC (2025 NIST backup selection); Post-Mortem of broken candidates (SIKE isogeny Castryck-Decru attack, Rainbow MinRank attack); and Hybrid TLS X25519 + ML-KEM-768 key exchange combiners.*
8. **Quantum Cryptography Proper & QKD**  
   *Quantum Key Distribution (QKD) protocols: BB84 (Rectilinear $+$ and Diagonal $\times$ photon polarization bases), B92, E91 entanglement, Twin-field QKD, Quantum Bit Error Rate (QBER) calculation, and active Eve interception detection.*
9. **Advanced & Privacy-Enhancing Technologies (PETs)**  
   *Zero-Knowledge Proofs (interactive Schnorr $\Sigma$-protocol with Fiat–Shamir heuristic and Imposter simulation, zk-SNARKs Groth16/PLONK, zk-STARKs); Homomorphic Encryption (Paillier additive homomorphism $E(m_1) \cdot E(m_2) = E(m_1 + m_2 \pmod n)$); and Shamir's $(k, n)$ Secret Sharing polynomial reconstruction.*
10. **Modern Cryptographic Protocols & Architectures**  
    *TLS 1.3 1-RTT Handshake state machine (ECDHE + HKDF secret schedule), Signal Double Ratchet (DH ratchet + symmetric KDF chains with post-compromise self-healing security), Merkle Tree inclusion proofs, and HPKE (RFC 9180).*
11. **Lightweight Cryptography for IoT & Embedded Systems**  
    *Ascon-128 (NIST SP 800-232, finalized 2025) 320-bit permutation state visualizer ($S_0 \dots S_4$), GIFT, PRESENT, SIMON/SPECK, and hardware efficiency benchmarks (Gate Equivalents, RAM footprint).*
12. **The Cryptographic Frontier & 2026+ Threat Radar**  
    *Mosca's Theorem ($X + Y > Z$) Quantum Migration Risk Calculator, Algorithm Mortality Horizon countdown, and Crypto-Agile Nginx/HAProxy post-quantum hybrid dual-certificate server configurations.*

---

## 🎨 Design Philosophy & Features

- **Scholarly & Executive Visual Language**: Designed with clear high-contrast typography (`Space Grotesk`, `Plus Jakarta Sans`, and `JetBrains Mono`), crisp architectural borders, and an authoritative academic palette.
- **Adaptive Dual Theme**: Fully integrated Light and Dark mode toggle with persistent state saved in `localStorage`.
- **Zero Distractions**: No intrusive sound effects, fake terminal glitches, or sluggish custom cursor followers.
- **Subtle Architectural Background**: A mathematical coordinate grid and cryptographic lattice rendering at 60 FPS on an HTML5 canvas.
- **Global Search Index (`Ctrl + K`)**: Instant search across 100+ ciphers, standards, RFCs, and laboratory tools with keyboard navigation.
- **Pure Native JavaScript & WebCrypto**: Zero external JavaScript frameworks or bloated dependencies. Completely self-contained and auditable.

---

## 🚀 How to Publish to GitHub Pages (3-Step Guide)

Because CRYPTIX is built with 100% vanilla client-side web technologies (HTML5, CSS3, ES6 JavaScript, WebCrypto API), it requires **zero build commands, zero npm installs, and zero server dependencies**.

### Step 1: Initialize Git Repository
In your local project folder:
```bash
git init
git add .
git commit -m "Initial commit: CRYPTIX Cryptographic Compendium by Fayyaz H. Sahito"
```

### Step 2: Push to Your GitHub Account
Create a new public repository on GitHub (e.g., `cryptix` or `cryptography-nexus`), then link and push:
```bash
git branch -M main
git remote add origin https://github.com/<YOUR-GITHUB-USERNAME>/<YOUR-REPO-NAME>.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Open your repository on GitHub and click **Settings** (gear icon).
2. On the left sidebar, click **Pages**.
3. Under **Branch**, select `main` (and root `/`), then click **Save**.
4. In approximately 60 seconds, your site will be live at:
   ```
   https://<YOUR-GITHUB-USERNAME>.github.io/<YOUR-REPO-NAME>/
   ```

---

## 📂 Repository Structure

```
crypto-nexus/
│
├── index.html                  # Master document with 12 domains, labs, and author profile
├── README.md                   # Repository overview and deployment instructions
│
├── styles/
│   ├── main.css                # Dual-theme engine, typography, layout, search modal
│   └── labs.css                # Interactive laboratory component styling
│
└── js/
    ├── app.js                  # Master controller, theme toggle, search, navigation
    ├── canvas-bg.js            # Ambient cryptographic lattice grid canvas
    └── labs/
        ├── historical-lab.js   # Lab 01: Caesar, Atbash, Vigenère, Playfair, Hill, Enigma, OTP
        ├── symmetric-lab.js    # Lab 02: AES 4x4 State, ECB Leak, ChaCha20, FF1 FPE
        ├── aead-lab.js         # Lab 03: AES-GCM, Poly1305, 1-Bit Tamper Tag Verification
        ├── hash-lab.js         # Lab 04: SHA-256, 256-Bit SAC Heatmap, Poseidon ZK
        ├── kdf-lab.js          # Lab 05: Argon2id, PBKDF2, bcrypt RTX 4090 Bench, OPAQUE
        ├── publickey-lab.js    # Lab 06: Toy RSA Keygen, Canvas Elliptic Curve, PS3 Nonce Leak
        ├── pqc-lab.js          # Lab 07: Module-LWE Lattice, ML-KEM, Broken PQC, Hybrid TLS
        ├── quantum-lab.js      # Lab 08: BB84 Polarization Simulation, Eve Intercept, QBER
        ├── zkp-lab.js          # Lab 09: Schnorr ZKP Imposter Test, Shamir Secret, Paillier
        ├── protocol-lab.js     # Lab 10: TLS 1.3 1-RTT Inspector, Signal Double Ratchet, Merkle
        ├── lightweight-lab.js  # Lab 11: Ascon-128 320-Bit State Permutation, IoT Benchmark
        └── frontier-lab.js     # Lab 12: Mosca Y2Q Risk Calculator, Threat Radar, Nginx Config
```

---

## 👨‍🏫 About the Author

**Fayyaz H. Sahito**  
*Cyber Security Teacher, Researcher & Innovator*  

Dedicated to advancing global cybersecurity education and research. Focusing on post-quantum cryptographic migration (NIST FIPS 203/204/205), cryptanalytic resilience, zero-knowledge proofs, and secure distributed protocol architectures. Committed to creating open-source pedagogical software that empowers students and security professionals to master complex cryptosystems.

---

## 📄 License & Attribution

Distributed under the MIT License. Developed for academic and educational purposes.  
&copy; 2026 Fayyaz H. Sahito. All rights reserved.
