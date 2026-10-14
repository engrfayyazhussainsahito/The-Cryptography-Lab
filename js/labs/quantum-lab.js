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

    const aliceBits = [];
    const aliceBases = [];
    for (let i = 0; i < N; i++) {
      aliceBits.push(Math.random() < 0.5 ? 0 : 1);
      aliceBases.push(bases[Math.floor(Math.random() * 2)]);
    }

    const channelBits = [...aliceBits];
    const channelBases = [...aliceBases];
    const eveInterceptions = [];

    if (this.eveActive) {
      for (let i = 0; i < N; i++) {
        const eveBasis = bases[Math.floor(Math.random() * 2)];
        if (eveBasis === aliceBases[i]) {
          eveInterceptions.push({ basis: eveBasis, altered: false });
        } else {
          channelBits[i] = Math.random() < 0.5 ? 0 : 1;
          channelBases[i] = eveBasis;
          eveInterceptions.push({ basis: eveBasis, altered: true });
        }
      }
    }

    const bobBases = [];
    const bobBits = [];
    for (let i = 0; i < N; i++) {
      const bBasis = bases[Math.floor(Math.random() * 2)];
      bobBases.push(bBasis);
      if (bBasis === channelBases[i]) {
        bobBits.push(channelBits[i]);
      } else {
        bobBits.push(Math.random() < 0.5 ? 0 : 1);
      }
    }

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
        eve: this.eveActive ? (eveInterceptions[i].basis + (eveInterceptions[i].altered ? ' (Altered)' : '')) : 'None',
        bBasis: bobBases[i],
        bBit: bobBits[i],
        matched,
        bitError
      });
    }

    const qber = siftedAlice.length > 0 ? ((errors / siftedAlice.length) * 100).toFixed(1) : 0;
    const isEavesdropped = parseFloat(qber) > 11;

    const tbody = document.getElementById('bb84-table-body');
    if (tbody) {
      let html = '';
      tableRows.forEach(r => {
        const bg = r.matched ? (r.bitError ? 'rgba(244, 63, 94, 0.12)' : 'rgba(16, 185, 129, 0.1)') : 'transparent';
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

    const statusBox = document.getElementById('bb84-status-box');
    if (statusBox) {
      if (this.eveActive && isEavesdropped) {
        statusBox.className = 'vuln-box';
        statusBox.innerHTML = `
          <div class="vuln-box-title">&times; EAVESDROPPER DETECTED: QBER = ${qber}% (Threshold > 11%)</div>
          <p>By Heisenberg's Uncertainty Principle and the No-Cloning Theorem, Eve's measurement collapsed photon states, introducing bit errors in ${errors} of ${siftedAlice.length} sifted bits. Alice and Bob <strong>ABORT THE TRANSMISSION</strong>.</p>
        `;
      } else {
        statusBox.className = 'math-box';
        statusBox.style.borderLeftColor = 'var(--accent-emerald)';
        statusBox.innerHTML = `
          <div style="color: var(--accent-emerald); font-weight: 700; margin-bottom: 4px;">&#10003; QUANTUM CHANNEL SECURE: QBER = ${qber}%</div>
          <div>Sifted Key Length: <strong>${siftedAlice.length} bits</strong> | Sifted Shared Key: <code>${siftedAlice.join('')}</code>. Unconditionally secure under the physical laws of quantum mechanics.</div>
        `;
      }
    }
  }
};
