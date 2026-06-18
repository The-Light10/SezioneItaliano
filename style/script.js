// Copyright (c) 2026 Noah Laveder. All rights reserved.

document.addEventListener('DOMContentLoaded', () => {

  // Sfondo con le stelle (Canvas)
  const canvas = document.getElementById('stars');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let stars = [];
    let W, H;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function createStars(count) {
      stars = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.5 + 0.3,
          a: Math.random(),
          da: (Math.random() - 0.5) * 0.008,
        });
      }
    }
    createStars(350);

    function drawStars() {
      ctx.clearRect(0, 0, W, H);
      stars.forEach(s => {
        s.a += s.da;
        if (s.a < 0.15 || s.a > 0.9) s.da = -s.da;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.a})`;
        ctx.fill();
      });
      requestAnimationFrame(drawStars);
    }
    drawStars();
  }

  // Logica Mappa Mentale (Sole e rami)
  const sun = document.getElementById('sun');
  if (sun) {
    const branches = document.querySelectorAll('.branch');
    const hint = document.getElementById('hint');
    let expanded = false;

    sun.addEventListener('click', () => {
      expanded = !expanded;
      
      // Attiva/disattiva lo stato grafico del sole
      sun.classList.toggle('expanded', expanded);

      // Mostra o nasconde i rami con un leggero delay a cascata
      branches.forEach((branch, i) => {
        if (expanded) {
          branch.style.transitionDelay = (i * 60) + 'ms';
          branch.classList.add('visible');
        } else {
          branch.style.transitionDelay = '0ms';
          branch.classList.remove('visible');
        }
      });

      // Aggiorna l'hint testuale
      if (hint) {
        hint.textContent = expanded 
          ? 'CLICCA UN PIANETA PER APRIRE' 
          : 'CLICCA IL SOLE PER ESPLORARE';
      }
    });
  }
});