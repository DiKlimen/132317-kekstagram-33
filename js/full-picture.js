import {isEscapeKey, isEnterKey} from './util.js';
import {renderPictureComments} from './comments.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = document.querySelector('.big-picture__img > img');
const likesCount = document.querySelector('.likes-count');
const socialCaption = document.querySelector('.social__caption');
const commentTotalCount = document.querySelector('.social__comment-total-count');
const bigPictureCloselElement = document.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
  }
};

// Логика при зактытии большой картинки
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  // Закрыть каритнку при фокусе крестика и нажатии кнопки Enter
  bigPictureCloselElement.addEventListener('keydown', (evt) => {
    if (isEnterKey(evt)) {
      evt.preventDefault();
      bigPicture.classList.add('hidden');
    }
  });

  // Удаление обработчика, который закрывает картинку при нажатии кнопки Escape
  document.removeEventListener('keydown', onDocumentKeydown);
};

// Показ большого изображения при клике на миниатюру.
const showFullPicture = ({url, likes, description, comments}) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // Закрытие большой картинки при нажатии кнопки Escape
  document.addEventListener('keydown', onDocumentKeydown);

  bigPictureImage.src = url;
  likesCount.textContent = likes;
  socialCaption.textContent = description;
  commentTotalCount.textContent = comments.length;

  renderPictureComments(comments);
};

// Навешивание логики при закритии большой картинки при клике на крестик
bigPictureCloselElement.addEventListener('click', () => {
  closeBigPicture();
});

export {showFullPicture};
