const COMMENTS_BATCH_SIZE = 5;

let currentIndex = 0;
let comments = [];

// Поиск контейнера в который потом буду добавлять комментарии
const socialCommentsContainer = document.querySelector('.social__comments');
// Поиск шаблона изображения пользователя
const socialCommentTemplate = document.querySelector('#social-comment')
  .content
  .querySelector('.social__comment');

const commentsLoader = document.querySelector('.comments-loader');
const commentShownCount = document.querySelector('.social__comment-shown-count');

// Создание одного комментария и наполнение его контентом
const createPictureComment = (comment) => {
  const {avatar, message, name} = comment;
  const socialCommentElement = socialCommentTemplate.cloneNode(true);

  socialCommentElement.querySelector('.social__picture').src = avatar;
  socialCommentElement.querySelector('.social__picture').alt = name;
  socialCommentElement.querySelector('.social__text').textContent = message;

  return socialCommentElement;
};

// Рендерит комментарии и добавляет их в дом.
const renderComments = () => {
  socialCommentsContainer.innerHTML = '';

  const commentsBatch = comments.slice(0, currentIndex + COMMENTS_BATCH_SIZE);

  commentsBatch.forEach((comment) => {
    const pictureComment = createPictureComment(comment);
    socialCommentsContainer.appendChild(pictureComment);
  });

  if (currentIndex + COMMENTS_BATCH_SIZE >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentShownCount.textContent = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
    commentShownCount.textContent = currentIndex + COMMENTS_BATCH_SIZE;
  }
};

// При клике на миниатюру вызываетя эта функция (файл full-picture), в нее передается массив комментариев.
const renderPictureComments = (data) => {
  currentIndex = 0;
  comments = data.slice();
  renderComments(comments);
};

const onLoadMoreCommentsClick = () => {
  currentIndex += COMMENTS_BATCH_SIZE;
  renderComments();
};

// навешиваем логику на клик кнопки "Загрузить еще"
commentsLoader.addEventListener('click', onLoadMoreCommentsClick);

export { renderPictureComments };
