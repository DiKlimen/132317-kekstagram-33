// Количество комментариев в порции
const COMMENTS_BATCH_SIZE = 5;

// Поиск контейнера в который потом буду добавлять комментарии
const socialCommentsContainer = document.querySelector('.social__comments');
// Поиск шаблона изображения пользователя
const socialCommentTemplate = document.querySelector('#social-comment')
  .content
  .querySelector('.social__comment');

const commentsLoader = document.querySelector('.comments-loader');

// Создание одного комментария и наполнение его контентом
const createPictureComment = (comment) => {
  const {avatar, message, name} = comment;
  const socialCommentElement = socialCommentTemplate.cloneNode(true);

  socialCommentElement.querySelector('.social__picture').src = avatar;
  socialCommentElement.querySelector('.social__picture').alt = name;
  socialCommentElement.querySelector('.social__text').textContent = message;

  return socialCommentElement;
};

// Рендеринг комментариев
const renderPictureComment = (comments) => {
  // Очищаем контейнер комментариев
  socialCommentsContainer.innerHTML = '';

  // Текущий индекс, с которого начнется выборка комментариев
  let currentIndex = 0;

  // Функция для загрузки следующей порции комментариев по клику "Загрузить еще"
  const loadMoreComments = () => {
    // Вычисляем следующую порцию комментариев
    const commentsBatch = comments.slice(currentIndex, currentIndex + COMMENTS_BATCH_SIZE);

    // Создаем и добавляем комментарии в контейнер
    commentsBatch.forEach((comment) => {
      const pictureComment = createPictureComment(comment);
      socialCommentsContainer.appendChild(pictureComment);
    });

    // Смещаем индекс для следующей порции
    currentIndex += COMMENTS_BATCH_SIZE;

    // Если больше нет комментариев для загрузки, скрываем кнопку
    if (currentIndex >= comments.length) {
      commentsLoader.classList.add('hidden');
    }
  };

  // Рендерим первую порцию сразу
  loadMoreComments();

  // Добавляю обработчик загрузки порции комметариев на клик по кнопку "Загрузить еще"
  commentsLoader.addEventListener('click', loadMoreComments);
};

export { renderPictureComment };
