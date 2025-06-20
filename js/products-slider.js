// Modular Products Slider Logic

document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.products-slider-track');
  const cards = Array.from(document.querySelectorAll('.products-slider-track .product-card'));
  const leftArrow = document.querySelector('.products-arrow.left-arrow');
  const rightArrow = document.querySelector('.products-arrow.right-arrow');
  let currentIndex = 0;
  const visibleCards = 3;

  function updateSlider() {
    const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight) + parseInt(getComputedStyle(cards[0]).marginLeft);
    slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  function slide(direction) {
    const track = document.querySelector('.products-slider-track');
    const cards = document.querySelectorAll('.product-card');
    const cardWidth = cards[0].offsetWidth;
    const currentTransform = new WebKitCSSMatrix(getComputedStyle(track).transform).m41;
    let newTransform;

    if (direction === 'left') {
      newTransform = currentTransform + cardWidth;
      if (newTransform > 0) {
        newTransform = -(cardWidth * (cards.length - 1));
      }
    } else {
      newTransform = currentTransform - cardWidth;
      if (newTransform < -(cardWidth * (cards.length - 1))) {
        newTransform = 0;
      }
    }

    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateX(${newTransform}px)`;
  }

  function slideLeft() {
    slide('left');
  }

  function slideRight() {
    slide('right');
  }

  leftArrow.addEventListener('click', slideLeft);
  rightArrow.addEventListener('click', slideRight);

  window.addEventListener('resize', updateSlider);
  updateSlider();
}); 