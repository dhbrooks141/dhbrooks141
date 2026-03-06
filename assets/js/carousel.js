window.addEventListener('load', () => {
  console.log('[carousel] loaded');

  document.querySelectorAll('.carousel').forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    if (!track) {
      console.warn('[carousel] missing .carousel-track', carousel);
      return;
    }

    const slides = Array.from(track.querySelectorAll('img'));
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    const dotsWrap = carousel.querySelector('.carousel-dots');

    if (slides.length === 0 || !prevBtn || !nextBtn) {
      console.warn('[carousel] missing slides/buttons', { slides: slides.length, prevBtn, nextBtn });
      return;
    }

    let index = 0;

    // timing rules
    const AUTO_MS = 5000;  // auto switch every 5s
    const HOLD_MS = 8000;  // after a click, pause for 8s

    let autoTimer = null;
    let resumeTimer = null;

    // Build dots (optional)
    let dots = [];
    if (dotsWrap) {
      dotsWrap.innerHTML = '';
      dots = slides.map((_, i) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', `Go to image ${i + 1}`);
        b.addEventListener('click', () => {
          goTo(i);
          holdAuto();
        });
        dotsWrap.appendChild(b);
        return b;
      });
    }

    function update() {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      update();
    }

    function startAuto() {
      stopAuto();
      autoTimer = setInterval(() => goTo(index + 1), AUTO_MS);
    }

    function stopAuto() {
      if (autoTimer) clearInterval(autoTimer);
      autoTimer = null;
    }

    // Pause auto after interaction, then resume after HOLD_MS
    function holdAuto() {
      stopAuto();
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(startAuto, HOLD_MS);
    }

    prevBtn.addEventListener('click', () => {
      goTo(index - 1);
      holdAuto();
    });

    nextBtn.addEventListener('click', () => {
      goTo(index + 1);
      holdAuto();
    });

    update();
    startAuto();
  });
});
