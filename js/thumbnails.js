import { generationPhotoDescriptions } from './data.js';
import { showFullPicture } from './full-picture.js';

// Поиск контейнера в который будем вставлять изображения пользователя
const picturesContainer = document.querySelector('.pictures');

// Поиск шаблона изображения пользователя
const userPictureTamplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

// Записываю сгенерированный массив описаний изображений в переменную
const userPictures = generationPhotoDescriptions();

// Создаю фрамент-контейнер
const userPicturesFragment = document.createDocumentFragment();

// Функция создания одной картинки
const createPictureElement = (userPicture) => {
  // Деструктеризация переданного объекта с описание картинки
  const {url, description, likes, comments} = userPicture;
  // Создаю клон шаблона.
  const userPictureElement = userPictureTamplate.cloneNode(true);
  const tagImg = userPictureElement.querySelector('.picture__img');
  // Наполняю клон шаблона информацией из переданного в функцию объекта
  tagImg.src = url;
  tagImg.alt = description;
  userPictureElement.querySelector('.picture__likes').textContent = likes;
  userPictureElement.querySelector('.picture__comments').textContent = comments.length;

  // Функция обработчика событий открытия большой картинки по клику
  const onPictureElementClick = (evt) => {
    evt.preventDefault();
    showFullPicture(userPicture);
  };

  // Добавление обработчика событий на открытие большой картинки по клику
  userPictureElement.addEventListener('click', onPictureElementClick);

  return userPictureElement;
};

// Создание пула картинок
const renderUserPictures = () => {
  userPictures.forEach((userPicture) => {
    const userPictureElement = createPictureElement(userPicture);
    userPicturesFragment.appendChild(userPictureElement); // Добавляю во фрагмент наполненный данными шаблон.
  });

  // Добавляем фрагмент в DOM
  picturesContainer.appendChild(userPicturesFragment);
};

// Вызов функции для рендеринга картинок
renderUserPictures();
