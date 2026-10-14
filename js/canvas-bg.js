/**
 * CRYPTIX // Subtle Architectural Coordinate Grid & Cryptographic Lattice Canvas
 * Calm, professional, and mathematically disciplined backdrop.
 */

(function() {
  const canvas = document.getElementById('lattice-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const points = [];
  const spacing = 80; // Grid distance

  function initGrid() {
    points.length = 0;
    const cols = Math.ceil(width / spacing) + 1;
    const rows = Math.ceil(height / spacing) + 1;

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        points.push({
          x: c * spacing,
          y: r * spacing,
          baseX: c * spacing,
          baseY: r * spacing,
          offset: Math.random() * Math.PI * 2,
          radius: (c % 2 === 0 && r % 2 === 0) ? 1.5 : 1.0
        });
      }
    }
  }

  initGrid();

  let time = 0;
  let animId;

  function draw() {
    ctx.clearRect(0, 0, width, height);

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const pointColor = isLight ? 'rgba(15, 23, 42, 0.12)' : 'rgba(255, 255, 255, 0.12)';
    const gridColor = isLight ? 'rgba(15, 23, 42, 0.035)' : 'rgba(255, 255, 255, 0.035)';
    const accentNodeColor = isLight ? 'rgba(2, 132, 199, 0.25)' : 'rgba(56, 189, 248, 0.25)';

    // Subtle coordinate grid lines
    ctx.beginPath();
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;

    for (let x = 0; x < width; x += spacing) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y < height; y += spacing) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();

    // Render calm lattice nodes with faint harmonic breathing
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const subtleBreath = Math.sin(time + p.offset) * 0.4;
      const r = p.radius + subtleBreath;

      ctx.beginPath();
      ctx.arc(p.baseX, p.baseY, Math.max(0.5, r), 0, Math.PI * 2);
      ctx.fillStyle = (i % 7 === 0) ? accentNodeColor : pointColor;
      ctx.fill();
    }

    time += 0.015;
    animId = requestAnimationFrame(draw);
  }

  draw();

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initGrid();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(animId);
    else draw();
  });
})();
