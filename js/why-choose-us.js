// Why Choose Us Auto Carousel (Circular)
(function() {
  const track = document.querySelector('.why-slider-track');
  if (!track) return;
  const visible = 3;
  let cards = Array.from(track.children);
  // Clone first N cards and append to end
  for (let i = 0; i < visible; i++) {
    const clone = cards[i].cloneNode(true);
    clone.classList.add('cloned');
    track.appendChild(clone);
  }
  cards = Array.from(track.children);
  let index = 0;
  let interval;
  let isTransitioning = false;

  function update(animate = true) {
    const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight) + parseInt(getComputedStyle(cards[0]).marginLeft);
    if (!animate) {
      track.style.transition = 'none';
    } else {
      track.style.transition = 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)';
    }
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  function next() {
    if (isTransitioning) return;
    isTransitioning = true;
    index++;
    update(true);
    // When transition ends, check if at clone
    track.addEventListener('transitionend', handleTransitionEnd);
  }

  function handleTransitionEnd() {
    track.removeEventListener('transitionend', handleTransitionEnd);
    if (index === cards.length - visible) {
      // Instantly jump to real first card
      index = 0;
      update(false);
    }
    isTransitioning = false;
  }

  function start() {
    interval = setInterval(next, 4000);
  }

  function stop() {
    clearInterval(interval);
  }

  track.addEventListener('mouseenter', stop);
  track.addEventListener('mouseleave', start);
  window.addEventListener('resize', () => update(false));
  update(false);
  start();
})(); 