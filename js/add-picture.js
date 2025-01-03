import { isEscapeKey, isEnterKey } from './util.js';

const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCloseElement = imgUploadOverlay.querySelector('.img-upload__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    imgUploadOverlay.classList.add('hidden');
    imgUploadInput.value = ''; // Сбрасываем поле выбора файла
  }
};

// Логика при зактытии большой картинки
const closeBigPicture = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  // Удаление обработчика, который закрывает картинку при нажатии кнопки Escape
  document.removeEventListener('keydown', onDocumentKeydown);

  imgUploadInput.value = ''; // Сбрасываем поле выбора файла
};

// Логика при загрузке своей картинки, открывается окно загрузки своей картинки
imgUploadInput.addEventListener('change', () => {

  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.remove('modal-open');

  // Закрытие окна загрузки при нажатии кнопки Escape
  document.addEventListener('keydown', onDocumentKeydown);

  // Навешивание логики при закритии большой картинки при клике на крестик
  imgUploadCloseElement.addEventListener('click', () => {
    closeBigPicture();
  });

  // Закрыть каритнку при фокусе крестика и нажатии кнопки Enter
  imgUploadCloseElement.addEventListener('keydown', (evt) => {
    if (isEnterKey(evt)) {
      evt.preventDefault();
      imgUploadOverlay.classList.add('hidden');
      imgUploadInput.value = ''; // Сбрасываем поле выбора файла
    }
  });
});


