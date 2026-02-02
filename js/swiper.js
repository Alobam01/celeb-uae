//swiper
var swiper = new Swiper(".heroSwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    effect: "fade",
    autoplay: {
      delay: 8000,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
  
  var Swiper2 = new Swiper(".staySwiper", {
    slidesPerView: "auto",
    spaceBetween: 16,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 28,
      },
      1100: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        spaceBetween: 40,
      },
    },
      autoplay: {
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
      },
  });
  
  var Swiper3 = new Swiper(".serviceSwiper", {
    spaceBetween: 30,
    autoplay: {
      delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  var swiper4 = new Swiper(".searchSwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  var swiper5 = new Swiper(".infoSwiper", {
    slidesPerView: "auto",
    spaceBetween: 16,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  var Swiper6 = new Swiper(".videoSwiper", {
    spaceBetween: 16,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      },
      autoplay: {
      delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
  },
  });

var swiper7 = new Swiper(".moreSwiper", {
    slidesPerView: "auto",
    spaceBetween: 16,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

var swiper10 = new Swiper(".partnerSwiper", {
    slidesPerView: 1,
    spaceBetween: 16,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 28,
        },
        1100: {
            slidesPerView: 4,
            spaceBetween: 35,
        },
    },
});  