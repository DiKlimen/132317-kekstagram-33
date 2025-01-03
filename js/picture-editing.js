const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleImputValue = document.querySelector('.scale__control--value');
const imgElement = document.querySelector('.img-upload__preview img');

const effectLevelValue = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');
const effectCrome = document.querySelector('#effect-chrome');
const effectSepia = document.querySelector('#effect-sepia');
const effectMarvin = document.querySelector('#effect-marvin');
const effectPhobos = document.querySelector('#effect-phobos');
const effectHeat = document.querySelector('#effect-heat');
const effectNone = document.querySelector('#effect-none');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');

const MIN_SCALE_PICTURE = 25;
const MAX_SCALE_PICTURE = 100;
const STEP_SCALE_PICTURE = 25;

const SLIDER_SETTINGS = {
  grayscale: {
    range: {
      min: 0,
      max: 1,
    },
    start: 0,
    step: 0.1,
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 0,
    step: 0.1,
  },
  invert: {
    range: {
      min: 0,
      max: 100,
    },
    start: 0,
    step: 1,
  },
  blur: {
    range: {
      min: 0,
      max: 3,
    },
    start: 0,
    step: 0.1,
  },
  brightness: {
    range: {
      min: 1,
      max: 3,
    },
    start: 0,
    step: 0.1,
  }
};

let scaleValue = 100;

// Устанавливает стили для изменения размера изображения
const updateImageScale = () => {
  imgElement.style.transform = `scale(${scaleValue / 100})`;
  scaleImputValue.value = `${scaleValue}%`;
};

scaleControlSmaller.addEventListener('click', () => {
  if(scaleValue <= MIN_SCALE_PICTURE) {
    scaleValue = MIN_SCALE_PICTURE;
    return;
  }
  scaleValue -= STEP_SCALE_PICTURE;
  console.log(scaleValue);
  updateImageScale();
});

scaleControlBigger.addEventListener('click', () => {
  if(scaleValue >= MAX_SCALE_PICTURE) {
    scaleValue = MAX_SCALE_PICTURE;
    return;
  }
  scaleValue += STEP_SCALE_PICTURE;
  console.log(scaleValue);
  updateImageScale();
});

effectLevelValue.value = 100;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

let effect = '';

sliderElement.noUiSlider.on('update', () => {
  const sliderValue = sliderElement.noUiSlider.get();
  effectLevelValue.value = sliderValue;
  if (effect === 'invert') {
    imgElement.style.filter = `${effect}(${sliderValue}%)`; // Преобразуем в проценты.
  } else if (effect === 'blur') {
    imgElement.style.filter = `${effect}(${sliderValue}px)`; // Преобразуем в пиксели.
  } else {
    imgElement.style.filter = `${effect}(${sliderValue})`; // Оставляем как есть.
  }

  effectLevelValue.value = sliderValue;
  console.log(sliderValue);
});

effectCrome.addEventListener('change', (evt) => {
  if (imgUploadEffectLevel.classList.contains('visually-hidden')) {
    imgUploadEffectLevel.classList.remove('visually-hidden');
  }
  if (evt.target.checked) {
    console.log('выбрали эффект хром');
    effect = 'grayscale';
    sliderElement.noUiSlider.updateOptions(SLIDER_SETTINGS.grayscale);
  }
});

effectSepia.addEventListener('change', (evt) => {
  if (imgUploadEffectLevel.classList.contains('visually-hidden')) {
    imgUploadEffectLevel.classList.remove('visually-hidden');
  }
  if (evt.target.checked) {
    console.log('выбрали эффект sepia');
    effect = 'sepia';
    sliderElement.noUiSlider.updateOptions(SLIDER_SETTINGS.sepia);
  }
});

effectMarvin.addEventListener('change', (evt) => {
  if (imgUploadEffectLevel.classList.contains('visually-hidden')) {
    imgUploadEffectLevel.classList.remove('visually-hidden');
  }
  if (evt.target.checked) {
    console.log('выбрали эффект Marvin');
    effect = 'invert';
    sliderElement.noUiSlider.updateOptions(SLIDER_SETTINGS.invert);
  }
});

effectPhobos.addEventListener('change', (evt) => {
  if (imgUploadEffectLevel.classList.contains('visually-hidden')) {
    imgUploadEffectLevel.classList.remove('visually-hidden');
  }
  if (evt.target.checked) {
    console.log('выбрали эффект Фобос');
    effect = 'blur';
    sliderElement.noUiSlider.updateOptions(SLIDER_SETTINGS.blur);
  }
});

effectHeat.addEventListener('change', (evt) => {
  if (imgUploadEffectLevel.classList.contains('visually-hidden')) {
    imgUploadEffectLevel.classList.remove('visually-hidden');
  }
  if (evt.target.checked) {
    console.log('выбрали эффект Зной');
    effect = 'brightness';
    sliderElement.noUiSlider.updateOptions(SLIDER_SETTINGS.brightness);
  }
});

effectNone.addEventListener('change', () => {
  imgUploadEffectLevel.classList.add('visually-hidden');
});

