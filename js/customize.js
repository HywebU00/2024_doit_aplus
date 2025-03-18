// -----  基本功能開關   ---------------------------------------------------
window.addEventListener('load', () => {
  navSticky(); // 捲動時固定主選單
  //xSlider('.language button', '.language ul'); //語系
  //fontSize(); // 全站字體
  fatFooter(); // fatFooter是否要展開
  scrollTables('.tableWrapper'); // table捲動功能

  webSearch();

  // tab功能
  tabFunction({
    target: '.tabSet',
    openFirst: false, // 預設先展開所有內容，鍵盤的自動開合功能無效
    openSwitch: true, // 是否可開合/切換
    autoClose: true, // 自動關閉其他開啟內容
    modeSwitch: true, // 預設模式自動切換，尺寸以上tab功能，尺寸以下手風琴功能
    width: 767, // 尺寸以上tab功能，尺寸以下手風琴功能
    index: 0, // 預設開啟第幾個
  });

  tableAddDataAttributes({
    elemClass: '.tableList', // 目標table
    dataName: 'title', // tableList樣式 加上 data-title
  });

  // 手風琴功能
  accordionFunction({
    target: '.questionAccordion .accordion',
    openFirst: false, // 預設先展開所有內容，鍵盤的自動開合功能無效
    autoClose: true, // 點擊時自動關閉已展開的項目，若需要此功能需要關閉openFirst
    openSwitch: true, // 是否可開合
    index: 0, // 預設開啟第幾個
    info: {
      open: '展開', // 收合時顯示
      close: '收合', // 展開時顯示
    },
  });
});
// -----  基本功能開關   ---------------------------------------------------

// 自行加入的JS請寫在這裡
(function () {
  //cp輪播
  const cpSwiper = new Swiper('.cpSlider .swiper', {
    slidesPerView: 4,
    spaceBetween: 20,
    loop: false,
    // 切換點
    pagination: {
      el: '.cpSlider .swiperDots',
      bulletElement: 'button',
      clickable: true,
    },
    // 切換箭頭
    navigation: {
      nextEl: '.cpSlider .nextSlider', //自行設定樣式
      prevEl: '.cpSlider .prevSlider', //自行設定樣式
      disabledClass: 'swiperArrow-disabled', //不可點選樣式
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    breakpoints: {
      100: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 4,
      },
    },
  });

  //大圖輪播
  let mainSliderItem = document.querySelectorAll('.mainSlider .swiper-slide');
  let mainSliderPagination = [];
  mainSliderItem.forEach((item, index) => {
    mainSliderPagination.push(item.dataset.title);
  });
  const mainSlider = new Swiper('.mainSlider .swiper', {
    slidesPerView: 1,
    loop: false,
    autoplay: {
      delay: 5000,
    },
    // 切換點
    pagination: {
      el: '.mainSlider .swiperDots',
      bulletElement: 'button',
      clickable: true,
      renderBullet: function (index, className) {
        return `<button class="${className} noFonts" aria-label="${mainSliderPagination[index]}">${mainSliderPagination[index]}</button>`;
      },
    },
    // 切換箭頭
    navigation: {
      nextEl: '.mainSlider .nextSlider', //自行設定樣式
      prevEl: '.mainSlider .prevSlider', //自行設定樣式
      disabledClass: 'swiperArrow-disabled', //不可點選樣式
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
  });

  const mpSwiperLength = document.querySelectorAll('.mainSlider .swiper-slide').length;

  if (mpSwiperLength > 1) {
    const controlBox = document.querySelector('.mainSlider .controlBox');
    const mpControlPlay = document.querySelector('.mainSlider .controlBox .play');
    const mpControlPause = document.querySelector('.mainSlider .controlBox .stop');
    controlBox.classList.add('active');
    mpControlPlay.setAttribute('aria-pressed', 'true');

    mpControlPlay?.addEventListener('click', () => {
      mainSlider.autoplay.start();
      mpControlPlay.classList.add('active');
      mpControlPause.classList.remove('active');

      mpControlPlay.setAttribute('aria-pressed', 'true');
      mpControlPause.setAttribute('aria-pressed', 'false');
    });
    mpControlPause?.addEventListener('click', () => {
      mainSlider.autoplay.stop();
      mpControlPause.classList.add('active');
      mpControlPlay.classList.remove('active');

      mpControlPlay.setAttribute('aria-pressed', 'false');
      mpControlPause.setAttribute('aria-pressed', 'true');
    });
  }

  const eventSlider = new Swiper('.eventSlider .swiper', {
    slidesPerView: 1,
    loop: false,
    effect: 'fade',
    fadeEffect: {
      crossFade: true, //上一張淡出，false上一張不淡出，下一張疊在上方
    },
    // 切換點
    pagination: {
      el: '.eventSlider .swiperDots',
      bulletElement: 'button',
      clickable: true,
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
  });

  // mpSwiper
  const mpSwiper = new Swiper('.mpSlider .swiper', {
    slidesPerView: 3,
    spaceBetween: 0,
    loop: false,
    // 切換點
    pagination: {
      el: '.mpSlider .swiperDots',
      bulletElement: 'button',
      clickable: true,
    },
    // 切換箭頭
    navigation: {
      nextEl: '.mpSlider .nextSlider', //自行設定樣式
      prevEl: '.mpSlider .prevSlider', //自行設定樣式
      disabledClass: '.mpSlider swiperArrow-disabled', //不可點選樣式
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    breakpoints: {
      100: {
        slidesPerView: 1,
      },
      640: {
        slidesPerView: 1,
      },
      940: {
        slidesPerView: 2,
      },
      1000: {
        slidesPerView: 3,
      },
    },
  });

  //adSwiper
  const adSwiper = new Swiper('.adSlider .swiper', {
    slidesPerView: 4,
    spaceBetween: 0,
    loop: false,
    // 切換點
    pagination: {
      el: '.adSlider .swiperDots',
      bulletElement: 'button',
      clickable: true,
    },
    // 切換箭頭
    navigation: {
      nextEl: '.adSlider .nextSlider', //自行設定樣式
      prevEl: '.adSlider .prevSlider', //自行設定樣式
      disabledClass: '.adSlider swiperArrow-disabled', //不可點選樣式
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    breakpoints: {
      100: {
        slidesPerView: 1,
      },
      767: {
        slidesPerView: 2,
      },
      940: {
        slidesPerView: 3,
      },
      1000: {
        slidesPerView: 4,
      },
    },
  });

  //跑馬燈
  const marqueeSwiper = new Swiper('.marquee .swiper', {
    direction: 'vertical',
    // 切換點
    // 切換箭頭
    navigation: {
      nextEl: '.marquee .nextSlider', //自行設定樣式
      prevEl: '.marquee .prevSlider', //自行設定樣式
      disabledClass: '.marquee marquee-arrow-disabled', //不可點選樣式
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
  });

  //cp_photo
  const navSlider = new Swiper('.navSlider .swiper', {
    lazy: true, // lazy load
    preloadImages: false, // 多筆設定lazy時須設定
    centeredSlides: false, // 多筆設定lazy時須設定
    slidesPerView: 4,
    // watchSlidesProgress: true,
    navigation: {
      nextEl: '.navSlider .nextSlider', //下一張class，無障礙設定關係需要增加.nextSlider
      prevEl: '.navSlider .prevSlider', //前一張class，無障礙設定關係需要增加.prevSlider
      disabledClass: 'swiperArrow-disabled', //不可點選樣式
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    breakpoints: {
      100: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 3,
      },
      1000: {
        slidesPerView: 4,
      },
    },
  });

  const sliderFor = new Swiper('.sliderFor .swiper', {
    slidesPerView: 1, //顯示張數
    effect: 'fade', //淡入
    fadeEffect: {
      crossFade: true, //上一張淡出，false上一張不淡出，下一張疊在上方
    },
    pagination: {
      el: '.sliderFor .pagination',
      type: 'fraction', //顯示分頁
    },
    navigation: {
      nextEl: '.sliderFor .nextSlider', //下一張class，無障礙設定關係需要增加.nextSlider
      prevEl: '.sliderFor .prevSlider', //前一張class，無障礙設定關係需要增加.prevSlider
      disabledClass: 'swiperArrow-disabled', //不可點選樣式
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    lazy: true,
    thumbs: {
      swiper: navSlider, //設定指向到哪個swiper，使用另一個設定的參數
    },
  });
})();
