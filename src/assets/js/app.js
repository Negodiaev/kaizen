import $ from 'jquery';
import whatInput from 'what-input';

window.$ = $;

import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';

import 'tablesaw/dist/tablesaw.jquery';
import libs from './lib/dependancies';
window.libs = libs;

import Swiper from 'swiper/dist/js/swiper.js';
import './vendor/wa-mediabox';

$(document).foundation();

libs.AOS.init();

// SVG Injector
// Elements to inject
var mySVGsToInject = document.querySelectorAll('img.inject-me');

// Options
var injectorOptions = {
  evalScripts: 'once',
  pngFallback: 'assets/png'
};

var afterAllInjectionsFinishedCallback = function(totalSVGsInjected) {
  // Callback after all SVGs are injected
  console.log('We injected ' + totalSVGsInjected + ' SVG(s)!');
};

var perInjectionCallback = function(svg) {
  // Callback after each SVG is injected
  console.log('SVG injected: ' + svg);
};

// create injector configured by options
var injector = new libs.svgInjector(injectorOptions);

// Trigger the injection
injector.inject(mySVGsToInject, afterAllInjectionsFinishedCallback, perInjectionCallback);

// slick carousel
$('.content-carousel').slick({
  // normal options...
  speed: 5000,
  autoplay: true,
  autoplaySpeed: 0,
  cssEase: 'linear',
  slidesToShow: 5,
  slidesToScroll: 1,
  infinite: true,
  swipeToSlide: true,
  centerMode: true,
  focusOnSelect: true,
  // the magic
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        infinite: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        dots: true
      }
    },
    {
      breakpoint: 300,
      settings: 'unslick' // destroys slick
    }
  ]
});

// tablesaw table plugin
$(function() {
  $(document)
    .foundation()
    .trigger('enhance.tablesaw');
});

var TablesawConfig = {
  swipeHorizontalThreshold: 15
};

document.addEventListener('DOMContentLoaded', function(event) {
  // feedback slider
  var heroSwiper = new Swiper('#feedback-slider', {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    lazy: {
      loadPrevNext: true
    },
    // effect: 'fade',
    fadeEffect: {
      // crossFade: true
    },
    breakpoints: {
      1023: {
        slidesPerView: 2
      },
      639: {
        slidesPerView: 1,
        autoHeight: true
      }
    }
  });

  // Partners slider
  var partnersSwiper = new Swiper('#partners-slider', {
    slidesPerView: 6,
    loop: true,
    loopedSlides: 6,
    spaceBetween: 20,
    lazy: {
      loadPrevNext: true
    },
    navigation: {
      nextEl: '#partners-slider-next',
      prevEl: '#partners-slider-prev'
    },
    breakpoints: {
      543: {
        // when window width is <= 543px
        slidesPerView: 2
      },
      763: {
        slidesPerView: 3
      },
      1023: {
        slidesPerView: 4
      }
    }
  });

  // counter
  var increments = document.querySelectorAll('.counter-button.plus'),
    decrements = document.querySelectorAll('.counter-button.minus'),
    i;

  for (i = 0; i < increments.length; i++) {
    increments[i].addEventListener('click', function(e) {
      e.preventDefault();

      var counterInput = this.parentElement.firstElementChild.nextElementSibling;

      console.log(counterInput);

      if (counterInput.classList.contains('counter-input') && counterInput.value < 1001) {
        counterInput.value++;
      }
    });
  }

  for (i = 0; i < decrements.length; i++) {
    decrements[i].addEventListener('click', function(e) {
      e.preventDefault();

      var counterInput = this.parentElement.firstElementChild.nextElementSibling;

      if (counterInput.classList.contains('counter-input') && counterInput.value > 1) {
        counterInput.value--;
      }
    });
  }

  // lightbox
  //Translate - set before any binding
  WAMediaBox.lang = {
    prev: 'Назад',
    next: 'Вперёд',
    close: 'Закрыть',
    openInNew: 'Открыть в новом окне'
  };
});
