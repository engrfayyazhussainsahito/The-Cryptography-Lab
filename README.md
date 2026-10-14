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
