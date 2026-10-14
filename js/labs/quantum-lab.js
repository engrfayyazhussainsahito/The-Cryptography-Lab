/**
 * CRYPTIX // Quantum Cryptography Proper Lab
 * Implements interactive BB84 QKD protocol simulation with Eve interception toggle,
 * Quantum Bit Error Rate (QBER) calculation, and E91 Bell CHSH entanglement test.
 */

window.QuantumLab = {
  numPhotons: 12,
  eveActive: false,

  init() {
    this.bindEvents();
    this.runBB84();
  },

  bindEvents() {
    document.getElementById('btn-run-bb84')?.addEventListener('click', () => this.runBB84());
    document.getElementById('eve-toggle')?.addEventListener('change', (e) => {
      this.eveActive = e.target.checked;
      this.runBB84();
    });
  },

  runBB84() {
    const N = this.numPhotons;
    const bases = ['+', 'x'];

<<<<<<< HEAD
=======
    // 1. Alice generates random bits and random bases
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
    const aliceBits = [];
    const aliceBases = [];
    for (let i = 0; i < N; i++) {
      aliceBits.push(Math.random() < 0.5 ? 0 : 1);
      aliceBases.push(bases[Math.floor(Math.random() * 2)]);
    }

<<<<<<< HEAD
=======
    // 2. Quantum Channel (with optional Eve interception)
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
    const channelBits = [...aliceBits];
    const channelBases = [...aliceBases];
    const eveInterceptions = [];

    if (this.eveActive) {
      for (let i = 0; i < N; i++) {
        const eveBasis = bases[Math.floor(Math.random() * 2)];
        if (eveBasis === aliceBases[i]) {
<<<<<<< HEAD
          eveInterceptions.push({ basis: eveBasis, altered: false });
        } else {
=======
          // Eve measured in correct basis: unchanged
          eveInterceptions.push({ basis: eveBasis, altered: false });
        } else {
          // Eve measured in wrong basis: photon state collapses randomly!
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
          channelBits[i] = Math.random() < 0.5 ? 0 : 1;
          channelBases[i] = eveBasis;
          eveInterceptions.push({ basis: eveBasis, altered: true });
        }
      }
    }

<<<<<<< HEAD
=======
    // 3. Bob chooses random measurement bases
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
    const bobBases = [];
    const bobBits = [];
    for (let i = 0; i < N; i++) {
      const bBasis = bases[Math.floor(Math.random() * 2)];
      bobBases.push(bBasis);
      if (bBasis === channelBases[i]) {
        bobBits.push(channelBits[i]);
      } else {
<<<<<<< HEAD
=======
        // Mismatched measurement: 50% chance of 0 or 1
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
        bobBits.push(Math.random() < 0.5 ? 0 : 1);
      }
    }

<<<<<<< HEAD
=======
    // 4. Sifting: keep only matching bases between Alice and Bob
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
    const siftedAlice = [];
    const siftedBob = [];
    let errors = 0;
    const tableRows = [];

    for (let i = 0; i < N; i++) {
      const matched = aliceBases[i] === bobBases[i];
      let bitError = false;

      if (matched) {
        siftedAlice.push(aliceBits[i]);
        siftedBob.push(bobBits[i]);
        if (aliceBits[i] !== bobBits[i]) {
          errors++;
          bitError = true;
        }
      }

      tableRows.push({
        idx: i + 1,
        aBit: aliceBits[i],
        aBasis: aliceBases[i],
<<<<<<< HEAD
        eve: this.eveActive ? (eveInterceptions[i].basis + (eveInterceptions[i].altered ? ' (Altered)' : '')) : 'None',
=======
        eve: this.eveActive ? (eveInterceptions[i].basis + (eveInterceptions[i].altered ? ' (Collapses!)' : '')) : 'None',
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
        bBasis: bobBases[i],
        bBit: bobBits[i],
        matched,
        bitError
      });
    }

    const qber = siftedAlice.length > 0 ? ((errors / siftedAlice.length) * 100).toFixed(1) : 0;
<<<<<<< HEAD
    const isEavesdropped = parseFloat(qber) > 11;

=======
    const isEavesdropped = parseFloat(qber) > 11; // 11% is the theoretical Shor-Preskill threshold for QKD abort

    // Render Table
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
    const tbody = document.getElementById('bb84-table-body');
    if (tbody) {
      let html = '';
      tableRows.forEach(r => {
<<<<<<< HEAD
        const bg = r.matched ? (r.bitError ? 'rgba(244, 63, 94, 0.12)' : 'rgba(16, 185, 129, 0.1)') : 'transparent';
=======
        const bg = r.matched ? (r.bitError ? 'rgba(244, 63, 94, 0.2)' : 'rgba(16, 185, 129, 0.15)') : 'transparent';
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
        html += `
          <tr style="background: ${bg}; border-bottom: 1px solid var(--border-subtle); text-align: center; font-size: 0.75rem;">
            <td style="padding: 4px;">#${r.idx}</td>
            <td style="padding: 4px; font-weight: 700; color: var(--accent-cyan);">${r.aBit} [${r.aBasis}]</td>
            ${this.eveActive ? `<td style="padding: 4px; color: var(--accent-crimson);">${r.eve}</td>` : ''}
            <td style="padding: 4px; color: var(--accent-violet);">${r.bBasis}</td>
            <td style="padding: 4px; font-weight: 700;">${r.bBit}</td>
            <td style="padding: 4px; color: ${r.matched ? 'var(--accent-emerald)' : 'var(--text-muted)'};">${r.matched ? 'KEEP' : 'DISCARD'}</td>
          </tr>
        `;
      });
      tbody.innerHTML = html;
    }

<<<<<<< HEAD
=======
    // Render Stats
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
    const statusBox = document.getElementById('bb84-status-box');
    if (statusBox) {
      if (this.eveActive && isEavesdropped) {
        statusBox.className = 'vuln-box';
        statusBox.innerHTML = `
<<<<<<< HEAD
          <div class="vuln-box-title">&times; EAVESDROPPER DETECTED: QBER = ${qber}% (Threshold > 11%)</div>
          <p>By Heisenberg's Uncertainty Principle and the No-Cloning Theorem, Eve's measurement collapsed photon states, introducing bit errors in ${errors} of ${siftedAlice.length} sifted bits. Alice and Bob <strong>ABORT THE TRANSMISSION</strong>.</p>
=======
          <div class="vuln-box-title">&times; EAVESDROPPER DETECTED! QBER = ${qber}% (Threshold > 11%)</div>
          <p>By Heisenberg's Uncertainty Principle and the No-Cloning Theorem, Eve's measurement collapsed photon superpositions, introducing bit errors in ${errors} of ${siftedAlice.length} sifted bits. Alice and Bob <strong>ABORT THE TRANSMISSION</strong>. Zero key material is leaked.</p>
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
        `;
      } else {
        statusBox.className = 'math-box';
        statusBox.style.borderLeftColor = 'var(--accent-emerald)';
        statusBox.innerHTML = `
<<<<<<< HEAD
          <div style="color: var(--accent-emerald); font-weight: 700; margin-bottom: 4px;">&#10003; QUANTUM CHANNEL SECURE: QBER = ${qber}%</div>
          <div>Sifted Key Length: <strong>${siftedAlice.length} bits</strong> | Sifted Shared Key: <code>${siftedAlice.join('')}</code>. Unconditionally secure under the physical laws of quantum mechanics.</div>
=======
          <div style="color: var(--accent-emerald); font-weight: 700; margin-bottom: 4px;">&#10003; QUANTUM CHANNEL SECURE! QBER = ${qber}%</div>
          <div>Sifted Key Length: <strong>${siftedAlice.length} bits</strong> | Sifted Shared Key: <code>${siftedAlice.join('')}</code>. Unconditionally secure against computational and quantum adversaries under physical laws of quantum mechanics.</div>
>>>>>>> 6404ca6f42488e9c1a7ad3269408722ce1c43c61
        `;
      }
    }
  }
};
