<<<<<<< HEAD
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
=======
<div align="center">

# 🔐 CRYPTIX: The Cryptography Lab

**An interactive, university-grade reference and simulation lab for classical, modern, and post-quantum cryptography.**

[**🚀 Live Demo**](https://engrfayyazhussainsahito.github.io/The-Cryptography-Lab/) · [Report a Bug](../../issues) · [Request a Feature](../../issues)

![License](https://img.shields.io/badge/license-MIT-blue)
![Build](https://img.shields.io/badge/build-none%20required-brightgreen)
![Client-side](https://img.shields.io/badge/100%25-client--side-orange)
![Tracking](https://img.shields.io/badge/tracking-zero-lightgrey)

</div>

---

## 📖 About

CRYPTIX takes you from the Caesar cipher to ML-KEM-768 in a single page. Each of its 12 domains pairs a rigorous written explanation (math, standards, known attacks) with a hands-on workbench, so you can break, tamper with, and compare algorithms instead of only reading about them.

It's built for students, security engineers, and researchers who want to understand *why* cryptographic systems work and *how* they fail.

## ✨ Features

- **12 domains**: the full hierarchy, from historical ciphers to the 2026+ threat radar
- **100+ primitives and algorithms** covered, with a searchable index (`Ctrl/⌘ + K`)
- **12 interactive labs** with live calculators and visualizers
- **Attack-focused learning**: Hill KPA, two-time pad, ECB leakage, AES-GCM nonce reuse, ECDSA nonce reuse (PS3), SIKE and Rainbow post-mortems
- **Current standards**: NIST FIPS 203/204/205, hybrid `X25519MLKEM768`, and NIST SP 800-232 (Ascon)
- **Zero dependencies**: static HTML/CSS/JS, no Node.js, no build step, no tracking

## 🧭 Curriculum

| # | Domain | Highlights |
|---|--------|------------|
| 01 | **Classical Ciphers** | Caesar, Vigenère, Playfair, Hill, Enigma, One-Time Pad |
| 02 | **Symmetric Encryption** | AES state matrix, ECB vs CBC vs CTR, ChaCha20 ARX, FF1 format-preserving encryption |
| 03 | **AEAD & MACs** | AES-GCM, ChaCha20-Poly1305, XChaCha20, GCM-SIV, HMAC, bit-tampering lab |
| 04 | **Hashes, XOFs & ZK Hashes** | SHA-2, SHA-3/Keccak, BLAKE3, Poseidon, avalanche heatmap |
| 05 | **KDF & PAKE** | PBKDF2, bcrypt, scrypt, Argon2id, HKDF, OPAQUE handshake |
| 06 | **Classical Public-Key** | RSA, Diffie-Hellman, ECC (P-256, Curve25519), Shor's algorithm |
| 07 | **Post-Quantum Cryptography** | ML-KEM, ML-DSA, SLH-DSA, FN-DSA, HQC, hybrid key exchange |
| 08 | **Quantum Cryptography & QKD** | BB84 simulator, E91, QBER detection, no-cloning theorem |
| 09 | **ZKPs, FHE & MPC** | Schnorr ZKP, zk-SNARKs/STARKs, Paillier, Shamir secret sharing |
| 10 | **Security Protocols** | TLS 1.3, QUIC, WireGuard, Signal Double Ratchet, MLS, FIDO2, Merkle proofs |
| 11 | **Lightweight Crypto (IoT)** | Ascon permutation visualizer, PRESENT, SIMON/SPECK, gate-equivalent comparison |
| 12 | **2026+ Threat Radar** | Mosca's theorem calculator, "Harvest Now, Decrypt Later", crypto-agility config |

## 🧪 Interactive Labs

- Historical cipher workbench (encrypt/decrypt/brute-force)
- AES 4×4 state stepper and ECB-vs-CBC pattern leak demo
- AEAD tamper tester (flip a bit, watch authentication fail)
- SHA-256 live hashing with a strict-avalanche difference matrix
- Password-hashing benchmark (Argon2id vs bcrypt vs PBKDF2) and OPAQUE walkthrough
- Toy RSA keygen, ECC point-addition canvas, ECDSA nonce-leak demo
- Module-LWE visualizer and PQC key-size comparison
- BB84 QKD simulator with eavesdropper (Eve) injection
- Schnorr ZKP, Shamir (k, n) sharing, Paillier homomorphism
- TLS 1.3 handshake, Double Ratchet, and Merkle audit-path simulators
- Ascon round-by-round permutation visualizer
- Mosca Y2Q risk calculator

## 🚀 Getting Started

No installation needed. It's a static site.

```bash
git clone https://github.com/engrfayyazhussainsahito/The-Cryptography-Lab.git
cd The-Cryptography-Lab

# Option 1: open directly
open index.html

# Option 2: serve locally
python3 -m http.server 8000
# then visit http://localhost:8000
```

### Deploy your own copy

1. Fork this repository
2. Go to **Settings → Pages**
3. Set **Source** to *Deploy from a branch*, choose `main` and `/ (root)`
4. Your site goes live at `https://<your-username>.github.io/The-Cryptography-Lab/`

## 🗂️ Project Structure

```
The-Cryptography-Lab/
├── index.html      # Entire platform (content, styles, simulators)
├── README.md
└── LICENSE
```

## ⚠️ Disclaimer

This project is **for education only**. The simulators use toy parameters and simplified models (e.g., small RSA primes, emulated SHA-3, illustrative benchmark figures). **Do not use any code here in production.** Use audited libraries such as libsodium, OpenSSL, BoringSSL, or liboqs for real systems.

Standards and timelines change quickly. Check [NIST's PQC project](https://csrc.nist.gov/projects/post-quantum-cryptography) for the authoritative status.

## 🤝 Contributing

Contributions are welcome: corrections, new labs, better explanations, translations.

1. Fork the repo
2. Create a branch: `git checkout -b feature/new-lab`
3. Commit your changes: `git commit -m "Add <feature>"`
4. Push and open a Pull Request

If you spot a technical inaccuracy, please open an issue with a reference.

## 📚 References & Further Reading

- NIST FIPS 203 / 204 / 205: Post-Quantum Standards
- NIST SP 800-232: Ascon Lightweight Cryptography
- RFC 8446 (TLS 1.3), RFC 8439 (ChaCha20-Poly1305), RFC 9106 (Argon2), RFC 9180 (HPKE), RFC 9420 (MLS)
- Shannon, *Communication Theory of Secrecy Systems* (1949)
- Boneh & Shoup, *A Graduate Course in Applied Cryptography*

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.

## 👤 Author

**Engr. Fayyaz Hussain Sahito**
GitHub: [@engrfayyazhussainsahito](https://github.com/engrfayyazhussainsahito)

---

<div align="center">⭐ If this helped you learn, consider starring the repo!</div>
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
