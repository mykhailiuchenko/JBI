const catalog = document.querySelector('.catalog');
const headTabs = document.querySelector('.head__tabs');
if (headTabs && catalog) {
  // Табы категорий
  let tabItems = headTabs.querySelectorAll('.head__tabs-item');

  tabItems.forEach((tabItem) => {
    // Высота картинок от ширины
    let tabItemImg = tabItem.querySelector('.head__item-img');
    tabItemImg.style.height = `${tabItemImg.clientWidth * 0.5}px`;

    // Поведение при нажатии на item
    tabItem.addEventListener('click', (e) => {
      changeTabCategory(tabItem);
    });
  });

  // Инициализация при загрузке
  changeTabCategory(tabItems[0]);
  tabItems[0].classList.add('active');

  let catalogList = catalog.querySelector('.catalog__list');
  async function changeTabCategory(tabItem) {
    let id = Number(tabItem.dataset.categoryId);
    clean();
    tabItem.classList.add('active');

    // Получаем подкатегории
    let category = await getCategory(id);

    // Отрисовка карточек категорий
    let cardCategory = `
      <div class="catalog__item">
        <h1 class="catalog__title">Каталог продукции</h1>
      </div>
    `;
    catalogList.innerHTML = cardCategory;

    for (let i = 0; i < category.length; i++) {
      let catalogItem = document.createElement('div');
      catalogItem.classList.add('catalog__item');
      catalogItem.addEventListener('click', (e) => {
        alert('work bro');
      });

      let catalogImg = document.createElement('div');
      catalogImg.classList.add('catalog__img');

      let img = document.createElement('img');
      img.src = category[i].img;

      catalogImg.append(img);

      let catalogContent = document.createElement('div');
      catalogContent.classList.add('catalog__content');

      let catalogNumber = document.createElement('span');
      catalogNumber.classList.add('catalog__number');
      let catalogNumberCount = i + 1;
      if (i < 10) {
        catalogNumberCount = `0${i + 1}`;
      }
      catalogNumber.textContent = catalogNumberCount;

      let catalogItemTitle = document.createElement('h2');
      catalogItemTitle.classList.add('catalog__item-title');
      catalogItemTitle.textContent = category[i].title;

      catalogContent.append(catalogNumber);
      catalogContent.append(catalogItemTitle);

      let catalogBlur = document.createElement('span');
      catalogBlur.classList.add('catalog__blur');

      let catalogAngleTopleft = document.createElement('div');
      catalogAngleTopleft.classList.add('catalog__angle', 'topleft');

      let catalogAngleTopRight = document.createElement('div');
      catalogAngleTopRight.classList.add('catalog__angle', 'topright');

      let catalogAngleBottomLeft = document.createElement('div');
      catalogAngleBottomLeft.classList.add('catalog__angle', 'bottomleft');

      let catalogAngleBottomRight = document.createElement('div');
      catalogAngleBottomRight.classList.add('catalog__angle', 'bottomright');

      catalogItem.append(catalogImg);
      catalogItem.append(catalogContent);
      catalogItem.append(catalogBlur);
      catalogItem.append(catalogAngleTopleft);
      catalogItem.append(catalogAngleTopRight);
      catalogItem.append(catalogAngleBottomLeft);
      catalogItem.append(catalogAngleBottomRight);

      catalogList.append(catalogItem);
    }
  }

  function clean() {
    tabItems.forEach((tabItem) => {
      tabItem.classList.remove('active');
    });
  }

  async function getCategory(id) {
    return [
      {
        title: 'Плиты перекрытия пустотные',
        img: './img/category1.png',
      },
      {
        title: 'Блоки фундаментные стеновые (ФБС)',
        img: './img/category2.png',
      },
      {
        title: 'Лотки теплотрасс',
        img: './img/category3.png',
      },
      {
        title: 'Бордюр дорожный',
        img: './img/category4.png',
      },
      {
        title: 'Балки',
        img: './img/category5.png',
      },
      {
        title: 'Перемычки',
        img: './img/category6.png',
      },
      {
        title: 'Кольца',
        img: './img/category7.png',
      },
      {
        title: 'Плиты перекрытия пустотные',
        img: './img/category8.png',
      },
    ];
  }
}

// Услуги и доставка
const services = document.querySelector('.services');

if (services) {
  const servicesSlider = new Swiper('.services__slider', {
    direction: 'horizontal',
    slidesPerView: 1.2,
    effect: 'coverflow',
    speed: 800,
    coverflowEffect: {
      rotate: 40,
      stretch: 50,
      slideShadows: false,
    },
    navigation: {
      nextEl: '.services__slider-next',
      prevEl: '.services__slider-prev',
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
      },

      850: {
        slidesPerView: 1.2,
      },
    },
  });

  let servicesItems = services.querySelectorAll('.services__item');
  servicesItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      cleanList();
      changeTabInfo(item);
    });
  });

  function cleanList() {
    servicesItems.forEach((item) => {
      item.classList.remove('active');
    });
  }

  function changeTabInfo(item) {
    item.classList.add('active');
    let slides = servicesSlider.slides;
    let indexSlide = 0;
    for (let i = 0; i < slides.length; i++) {
      if (slides[i].dataset.slide === item.dataset.services) {
        indexSlide = i;
      }
    }

    servicesSlider.slideTo(indexSlide, 800);
  }

  servicesSlider.on('slideChangeTransitionEnd', function () {
    let slideData = services.querySelector('.swiper-slide-active').dataset.slide;
    cleanList();
    services.querySelector(`[data-services="${slideData}"]`).classList.add('active');
  });
}

const delivery = document.querySelector('.delivery');
if (delivery) {
  // Переключение табов
  const btns = delivery.querySelectorAll('.delivery__btn');
  const deliveryInfo = delivery.querySelector('.delivery__info');

  btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      cleanTab();
      let btnData = btn.dataset.target;
      let tab = deliveryInfo.querySelector(`[data-path="${btnData}"]`);
      tab.classList.add('active');
      btn.classList.add('active');
    });
  });

  function cleanTab() {
    delivery.querySelectorAll('.delivery__tab').forEach((tab) => {
      tab.classList.remove('active');
    });
    btns.forEach((btn) => btn.classList.remove('active'));
  }
}

// Секция примеров работ

const work = document.querySelector('.work');
if (work) {
  // Слайдер
  const workSlider = document.querySelector('.work__slider');
  const workSliderPrev = work.querySelector('.work__slider-prev');
  const workSliderNext = work.querySelector('.work__slider-next');
  const workSliderSlides = workSlider.querySelector('.work__slider-slides');

  let slides = workSliderSlides.querySelectorAll('.work__slider-slide');
  slides[0].classList.add('active-slide');
  workSliderSlides.style.minHeight = `${slides[0].offsetHeight}px`;

  // Вычисление количество слайдов для показа, в зависимости от размера экрана
  const mathSlides = function () {
    if (window.innerWidth >= 850) {
      return 2.5;
    } else {
      return 1.5;
    }
  };

  // Количество видимых слайдов
  let perView = mathSlides();
  let betweenSlide = 50;
  let coefficientSlide = 1.1;

  // Ширина ленты
  let widthRibbon = workSliderSlides.offsetWidth;
  // Сумма ширин отступов между слайдами
  let sumBetween = Math.floor(perView) * betweenSlide;
  // Ширина ленты с вычетом ширин отступов
  let widthSlideBetween = widthRibbon - sumBetween;
  // Вычисление ширины слайда в обычном состоянии
  let widthSlide = Math.floor(widthSlideBetween / perView);
  // Вычисление ширины активного слайда
  let widthActiveSlide = coefficientSlide * widthSlide;
  // Вычисление ширин слайдов за исключением активного
  let widthSlideCommon = (widthSlideBetween - widthActiveSlide) / (perView - 1);

  console.log(widthSlideCommon);
  for (let i = 0; i < slides.length; i++) {
    slides[i].dataset.indexSlide = i;
    if (i < slides.length - 1) {
      slides[i].style.marginRight = `${betweenSlide}px`;
    }

    slides[i].style.width = `${widthSlideCommon}px`;
    if (slides[i].classList.contains('active-slide')) {
      slides[i].style.width = `${widthActiveSlide}px`;
    }
  }

  workSliderNext.addEventListener('click', (e) => {
    changeSlideNext();
  });

  workSliderPrev.addEventListener('click', (e) => {
    changeSlidePrev();
  });

  let position = 0;

  function changeSlideNext() {
    let currentActiveIndex = +workSliderSlides.querySelector('.active-slide').dataset.indexSlide;

    if (currentActiveIndex < slides.length - 1) {
      slides[currentActiveIndex].classList.remove('active-slide');
      slides[currentActiveIndex].style.width = `${widthSlideCommon}px`;

      slides[currentActiveIndex + 1].classList.add('active-slide');
      slides[currentActiveIndex + 1].style.width = `${widthActiveSlide}px`;

      position += -(widthSlideCommon + betweenSlide);
      workSliderSlides.style.transform = `translateX(${position}px)`;
    }
  }

  function changeSlidePrev() {
    let currentActiveIndex = +workSliderSlides.querySelector('.active-slide').dataset.indexSlide;

    if (currentActiveIndex > 0) {
      slides[currentActiveIndex].classList.remove('active-slide');
      slides[currentActiveIndex].style.width = `${widthSlideCommon}px`;

      slides[currentActiveIndex - 1].classList.add('active-slide');
      slides[currentActiveIndex - 1].style.width = `${widthActiveSlide}px`;

      position += widthSlideCommon + betweenSlide;
      workSliderSlides.style.transform = `translateX(${position}px)`;
    }
  }
}

// Секция карты

let map = document.querySelector('.map');
if (map) {
  let center = [51.787335099779646, 107.57907910819873];
  function init() {
    let map = new ymaps.Map('map', {
      center: center,
      zoom: 15,
    });

    let placemark = new ymaps.Placemark(
      [51.787017172697446, 107.57276585872991],
      {},
      {
        iconLayout: 'default#image',
        iconImageHref: './img/icons/mapmarker.svg',
        iconImageSize: [50, 50],
      },
    );

    map.geoObjects.add(placemark);

    map.controls.remove('geolocationControl'); // удаляем геолокацию
    map.controls.remove('searchControl'); // удаляем поиск
    map.controls.remove('trafficControl'); // удаляем контроль трафика
    map.controls.remove('typeSelector'); // удаляем тип
    map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    map.controls.remove('zoomControl'); // удаляем контрол зуммирования
    map.controls.remove('rulerControl'); // удаляем контрол правил
  }

  ymaps.ready(init);
}

// Мобильное меню

const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('.header__menu');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});
