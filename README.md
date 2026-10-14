<<<<<<< HEAD
# CRYPTIX // The Definitive Modern & Post-Quantum Cryptography Masterwork

An elite, interactive cybersecurity educational platform spanning the complete continuum of cryptography: from ancient classical ciphers and electromechanical rotor machines to modern symmetric systems, AEAD, cryptographic hash trees, password defense, classical public-key, **NIST Post-Quantum Cryptography standards (FIPS 203, 204, 205, 206)**, Quantum Key Distribution (QKD), Zero-Knowledge Proofs, Homomorphic Encryption (FHE), and real-world secure protocols (TLS 1.3, Signal Double Ratchet, WireGuard).

Inspired by the luxury dark, high-precision editorial design aesthetic of [jesperlandberg.com](https://jesperlandberg.com/).

---

## ⚡ Key Highlights & Architecture

- **12 Comprehensive Cryptographic Domains**: Exhaustive, cybersecurity-expert grade mathematical explanations, vulnerability dissections, and standard references (NIST FIPS, SP 800, RFCs).
- **12 Interactive Laboratories**: Live, browser-native workbenches allowing hands-on execution and attack simulations for each topic.
- **Zero Build Tools or Dependencies**: 100% static, client-side HTML5, CSS3, ES6 JavaScript, and Canvas. Runs directly in any modern web browser.
- **GitHub Pages Ready**: Optimized for instant one-click deployment to GitHub Pages without any compilation steps.
- **Ultra-Polished Design**: Dynamic cryptographic lattice background particle mesh, custom smooth cursor follower, synthesized Web Audio UI sound effects, KaTeX math typesetting, and responsive layout.

---

## 📚 Curriculum & Laboratories

1. **Classical / Historical Ciphers**
   - *Theory*: Caesar, Atbash, Vigenère (Kasiski & Friedman tests), Playfair 5x5 matrix, Hill 2x2 matrix, Enigma 3-rotor machine & Turing Bombe, Lorenz SZ42, and Claude Shannon's One-Time Pad perfect secrecy.
   - *Interactive Lab*: Multi-cipher workbench with real Enigma rotor stepping, plugboard wiring, and Two-Time Pad ($C_1 \oplus C_2$) key-reuse cryptanalysis.

2. **Symmetric Encryption: Block, Stream & Modes**
   - *Theory*: DES, 3DES, Sweet32 birthday attack, AES-128/192/256 (Rijndael SPN), Twofish, Serpent, Camellia, IDEA, SM4, Kuznyechik; RC4 flaws, Salsa20, ChaCha20 ARX; Modes: ECB, CBC, CTR, CFB, OFB, XTS; Format-Preserving (FF1/FF3-1), Adiantum.
   - *Interactive Lab*: AES 4x4 State Matrix interactive transformer (SubBytes, ShiftRows, MixColumns, AddRoundKey), the "ECB Penguin" structural pattern leakage visualizer, ChaCha20 quarter-round step runner, and FF1 credit card format-preserving mask.

3. **Authenticated Encryption (AEAD) & MACs**
   - *Theory*: Moxie Marlinspike's Cryptographic Doom Principle, Encrypt-then-MAC vs MAC-then-Encrypt (padding oracles); AES-GCM (GHASH, Joux forbidden attack on nonce reuse), ChaCha20-Poly1305, XChaCha20-Poly1305 (192-bit nonce), AES-OCB, Deoxys-II; HMAC, CMAC, Poly1305, KMAC, SipHash.
   - *Interactive Lab*: Live AEAD generator with an active 1-bit Tamper Injector demonstrating immediate tag mismatch and API decryption refusal.

4. **Cryptographic Hash Functions, XOFs & Algebraic Hashes**
   - *Theory*: Merkle–Damgård vs Sponge Construction (SHA-3 / Keccak-256); MD5 and SHA-1 collision breaks (SHAttered); SHA-2 length extension vulnerabilities; BLAKE3 tree SIMD hashing; XOFs (SHAKE128/256); Algebraic Hashes for zk-SNARKs (Poseidon, Rescue, Reinforced Concrete, Anemoi).
   - *Interactive Lab*: Native WebCrypto SHA-256 and Keccak hasher, 256-Bit Strict Avalanche Criterion (SAC) Heatmap (demonstrating ~50% bit flip diffusion on 1-bit input changes), and Poseidon $x^5 \pmod p$ arithmetic preview.

5. **Key Derivation & Password Hashing (KDF & PAKE)**
   - *Theory*: Password entropy realities; PBKDF2 (ASIC parallelization weaknesses), bcrypt (4 KB cache limits), scrypt, Argon2id (winner of Password Hashing Competition, memory-hard functions), Balloon hashing; HKDF (RFC 5869 Extract-then-Expand); PAKE (SRP, SPAKE2, OPAQUE, CPace).
   - *Interactive Lab*: Argon2id vs PBKDF2 vs bcrypt benchmark against an 8x NVIDIA RTX 4090 GPU cluster with brute-force time estimates, and step-by-step OPAQUE zero-knowledge password exchange handshake.

6. **Classical Public-Key Cryptography & The Quantum Threat**
   - *Theory*: Integer factorization (RSA, OAEP, PSS), Discrete Logarithm Problem (Diffie-Hellman), Elliptic Curve Cryptography (ECDLP, NIST P-256, secp256k1, Curve25519, pairing-friendly BLS12-381); ECDSA nonce reuse disaster (Sony PS3 hack); Shor's Quantum Algorithm ($O((\log N)^3)$ polynomial factoring and discrete logs).
   - *Interactive Lab*: Toy RSA key generation ($p, q \to n, e, d$) step-by-step math, interactive Canvas continuous Elliptic Curve point addition and doubling ($P + Q = R$ and $2P$), and ECDSA nonce-reuse private key extraction.

7. **Post-Quantum Cryptography (PQC - NIST Standards)**
   - *Theory*: Official NIST Standards (FIPS 203 ML-KEM / Kyber, FIPS 204 ML-DSA / Dilithium, FIPS 205 SLH-DSA / SPHINCS+, FIPS 206 FN-DSA / Falcon, HQC backup KEM); Lattice families (LWE, Ring-LWE, Module-LWE); Code-based (Classic McEliece); Post-mortem of broken candidates (SIKE isogeny attack and Rainbow MinRank attack); Hybrid deployments (X25519 + ML-KEM-768).
   - *Interactive Lab*: Module-LWE noisy lattice vector simulator, key size explosion benchmark, broken PQC analysis, and Hybrid TLS key combiner.

8. **Quantum Cryptography Proper (Physics & QKD)**
   - *Theory*: Quantum physics foundations (Heisenberg Uncertainty Principle, No-Cloning Theorem, Quantum Entanglement); Prepare-and-measure QKD (BB84, B92, SARG04); Entanglement-based (E91 Bell CHSH inequality); CV-QKD, MDI-QKD, Twin-Field QKD; Satellite QKD (Micius); Quantum money (Wiesner) and QRNG certified randomness.
   - *Interactive Lab*: Interactive BB84 photon polarization simulator with Alice/Bob bases, active Eve eavesdropping toggle, basis sifting, and Quantum Bit Error Rate (QBER) detection.

9. **Advanced & Privacy-Enhancing Cryptography (PETs)**
   - *Theory*: Zero-Knowledge Proofs (Completeness, Soundness, Zero-Knowledge; zk-SNARKs Groth16, PLONK, Halo2; zk-STARKs; Folding schemes Nova/HyperNova; Binius binary tower fields); Fully Homomorphic Encryption (FHE: Paillier, BGV, BFV, CKKS, TFHE); Multi-Party Computation (Yao's garbled circuits, SPDZ, FROST threshold signatures); Shamir Secret Sharing; ORAM and PIR.
   - *Interactive Lab*: Interactive Schnorr ZKP "Peggy & Victor" challenge-response protocol with imposter detection, Shamir $(k, n)$ secret sharing polynomial plotter, and Paillier additive homomorphic arithmetic on encrypted ciphertexts.

10. **Protocols & Systems Built on Primitives**
    - *Theory*: Network security (TLS 1.3 1-RTT, Encrypted Client Hello ECH, QUIC HTTP/3, WireGuard Noise IK); End-to-end messaging (Signal Double Ratchet, PQXDH, MLS TreeKEM); Identity (FIDO2, WebAuthn, Passkeys, Kerberos, HPKE); Blockchain cryptographic primitives (Merkle trees, Taproot, BLS signature aggregation).
    - *Interactive Lab*: TLS 1.3 1-RTT handshake packet inspector, Signal Double Ratchet state machine with Forward Secrecy and Post-Compromise Security healing, and Merkle tree inclusion audit path generator.

11. **Lightweight Cryptography (IoT & Embedded)**
    - *Theory*: Resource constraints (Gate Equivalents, RAM, power dissipation in RFID, CAN buses, medical implants); NIST SP 800-232 (Ascon family finalized 2025); PRESENT, GIFT, SKINNY, SIMON & SPECK, TinyJAMBU, Xoodyak.
    - *Interactive Lab*: Ascon-128 320-bit state permutation visualizer ($p_C \to p_S \to p_L$ round transformations) and hardware Gate Equivalent comparison.

12. **The Newest Developments & Cryptographic Threat Radar**
    - *Theory*: 2024–2035 migration timeline; NIST FIPS 203/204/205 release and HQC selection; CNSA 2.0 US mandate (2030); Mosca's Theorem ($S + M > Q$); "Harvest Now, Decrypt Later" (HNDL) cyber threat; Crypto-Agility frameworks and composite certificates.
    - *Interactive Lab*: Interactive Mosca Y2Q Quantum Risk Assessment calculator, searchable Algorithm Mortality database, and production-ready Crypto-Agile Nginx/OpenSSL 3.4+ configuration generator.

---

## 🚀 How to Publish to GitHub Pages

Publishing this project takes **less than 60 seconds** because there are no compilation steps or complex build pipelines:

### 1. Initialize Git in the project directory
```bash
cd crypto-nexus
git init
git add .
git commit -m "Initial commit of Cryptix cryptography platform"
```

### 2. Push to your GitHub repository
Create a new empty repository at [github.com/new](https://github.com/new) (e.g., `cryptography-platform`), then push:
```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cryptography-platform.git
git push -u origin main
```

### 3. Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click **Settings** &rarr; **Pages** (in the left navigation).
3. Under **Build and deployment &rarr; Source**, select **Deploy from a branch**.
4. Set **Branch** to `main` and folder to `/ (root)`. Click **Save**.
5. Within 30–60 seconds, your website will be live worldwide at:
   ```
   https://YOUR_USERNAME.github.io/cryptography-platform/
   ```

---

## 💻 Local Preview

You can open the project locally anytime:
- Simply double-click `index.html` in your file explorer, OR
- Run a simple local web server:
  ```bash
  # Python 3
  python -m http.server 8000

  # Node.js
  npx serve
  ```
  Then visit `http://localhost:8000`.

---

## 🛡️ License & Educational Disclaimer

This project is open-source educational software designed for cybersecurity students, researchers, and cryptographic software engineers. Toy key generators and educational simulators in the laboratories are intended strictly for educational and conceptual demonstration purposes. Production applications must utilize audited, constant-time cryptographic implementations (e.g. OpenSSL 3.4+, BoringSSL, libsodium, or liboqs).
=======
# The-Cryptography-Lab
Learn cryptography by understanding, building, and breaking.
>>>>>>> d632fa313644510c944b006792d0e4887ff93bdb
