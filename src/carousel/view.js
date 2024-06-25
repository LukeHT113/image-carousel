/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */
/* eslint-disable no-console */
const carousels = document.querySelectorAll('.wp-block-lht-carousel');

for (let index = 0; index < carousels.length; index++) {

const carousel = carousels[index];
const slides = carousel.querySelectorAll('.wp-block-lht-slide');

let currentIndex = 0;
let slidesToShow = +carousel.dataset.slidestoshow;
const slideSpeed = +carousel.dataset.speed;
const gap = +carousel.dataset.gap;
const dots = carousel.dataset.dots === 'true' ? true : false;
const reverse = carousel.dataset.reverse === 'true' ? true : false;
const arrows = carousel.dataset.arrows === 'true' ? true : false;
const autoplay = carousel.dataset.autoplay === 'true' ? true : false;
const responsiveWidth = carousel.dataset.responsivewidth;
const responsiveSlidesToShow = carousel.dataset.responsiveslidestoshow;
const autoplaySpeed = +carousel.dataset.autoplayspeed;
const slidesCount = slides.length;

for (let i = 0; i < slides.length; i++) {
  const slide = slides[i];
  slide.style.transitionDuration = `${slideSpeed / 1000}s`
}

if (autoplay) {
  autoplayInterval = setInterval(incrementSlide, autoplaySpeed);
}

if (dots) {
  createDots();
}

if (arrows) {
  const prevArrow = carousel.querySelector('.lht-carousel-arrow-prev');
  const nextArrow = carousel.querySelector('.lht-carousel-arrow-next');
  prevArrow.addEventListener('click', () => {
    decrementSlide();
    clearInterval(autoplayInterval);
  });
  nextArrow.addEventListener('click', () => {
    incrementSlide();
    clearInterval(autoplayInterval);
  });
}

if (slidesToShow !== responsiveSlidesToShow && window.innerWidth <= responsiveWidth) {
  carousel.classList.remove(`lht-shows-${slidesToShow}-slides`);
  carousel.classList.add(`lht-shows-${responsiveSlidesToShow}-slides`);
  slidesToShow = responsiveSlidesToShow;
  createDots();
}
if (slidesToShow !== responsiveSlidesToShow) {
  window.addEventListener('resize', () => {
    if (window.innerWidth <= responsiveWidth) {
      if (slidesToShow === responsiveSlidesToShow) {
        return
      }
      carousel.classList.remove(`lht-shows-${slidesToShow}-slides`);
      carousel.classList.add(`lht-shows-${responsiveSlidesToShow}-slides`);
      slidesToShow = responsiveSlidesToShow;
      createDots();
      if (currentIndex > slidesCount - slidesToShow) {
        setToIndex(slidesCount - slidesToShow);
      } else {
        setToIndex(currentIndex);
      }
    } else {
      if (slidesToShow != +carousel.dataset.slidestoshow) {
        slidesToShow = +carousel.dataset.slidestoshow;
        carousel.classList.remove(`lht-shows-${responsiveSlidesToShow}-slides`);
        carousel.classList.add(`lht-shows-${slidesToShow}-slides`);
        createDots();
        if (currentIndex > slidesCount - slidesToShow) {
          setToIndex(slidesCount - slidesToShow);
        }  else {
          setToIndex(currentIndex);
        }
      }
    }
  })
}

function incrementSlide() {
  currentIndex++;
  if (currentIndex > slidesCount - slidesToShow) {
    currentIndex = 0;
  }
  if (dots) {
    const allDots = carousel.querySelectorAll('.lht-dot');
    for (let i = 0; i < allDots.length; i++) {
      const dot = allDots[i];
      if (i == currentIndex) {
        dot.classList.add('active-dot');
      } else {
        dot.classList.remove('active-dot');
      }
    }
  }
  updateSlide();
}

function decrementSlide() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = slidesCount-slidesToShow;
  }
  if (dots) {
    const allDots = carousel.querySelectorAll('.lht-dot');
    for (let i = 0; i < allDots.length; i++) {
      const dot = allDots[i];
      if (i == currentIndex) {
        dot.classList.add('active-dot');
      } else {
        dot.classList.remove('active-dot');
      }
    }
  }
  updateSlide();
}

function setToIndex(index) {
  currentIndex = index;
  if (dots) {
    const allDots = carousel.querySelectorAll('.lht-dot');
    for (let i = 0; i < allDots.length; i++) {
      const dot = allDots[i];
      if (i == currentIndex) {
        dot.classList.add('active-dot');
      } else {
        dot.classList.remove('active-dot');
      }
    }
  }
  updateSlide();
}

function updateSlide() {
  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    slide.style.transform = `translateX(calc(${reverse ? '' : '-'}${currentIndex * 100}% - ${currentIndex*gap}px))`;
  }
}

function createDots() {
  const dotContainer = carousel.querySelector('.lht-carousel-dots');
  dotContainer.innerHTML = '';
  if (slides.length - slidesToShow < 0) {
    const li = document.createElement("li");
    const dot = document.createElement("button");
    dot.classList.add('lht-dot');
    dot.classList.add('active-dot')
    dot.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="dot-svg" viewBox="0 0 48 48"><path stroke-width="4" d="M24 33a9 9 0 1 0 0-18a9 9 0 0 0 0 18Z"/></svg>';
    dot.addEventListener('click', () => {
      setToIndex(0);
      clearInterval(autoplayInterval);
    })
    li.appendChild(dot);
    dotContainer.appendChild(li);
  } else {
    for (let i = 0; i <= slides.length - slidesToShow; i++) {
      const li = document.createElement("li");
      const dot = document.createElement("button");
      dot.classList.add('lht-dot');
      if (i == 0) {
        dot.classList.add('active-dot')
      }
      dot.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="dot-svg" viewBox="0 0 48 48"><path stroke-width="4" d="M24 33a9 9 0 1 0 0-18a9 9 0 0 0 0 18Z"/></svg>';
      dot.addEventListener('click', () => {
        setToIndex(i);
        clearInterval(autoplayInterval);
      })
      li.appendChild(dot);
      dotContainer.appendChild(li);
    }
  }
}

}