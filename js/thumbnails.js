import { generationPhotoDescriptions } from './data.js';

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

// Перебираю каждый элемент сгенерированного массива
userPictures.forEach((userPicture) => {
  const userPictureElement = userPictureTamplate.cloneNode(true); // Создаю клон шаблона.
  const tagImg = userPictureElement.querySelector('.picture__img');
  tagImg.src = userPicture.url;
  tagImg.alt = userPicture.description;
  userPictureElement.querySelector('.picture__likes').textContent = userPicture.likes;
  userPictureElement.querySelector('.picture__comments').textContent = userPicture.comments.length;
  userPicturesFragment.appendChild(userPictureElement); // Добавляю во фрагмен наполенный данными шаблон.
});

// Добавляю фрагмен в разметку.
picturesContainer.appendChild(userPicturesFragment);
