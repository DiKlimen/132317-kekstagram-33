import { getRandomArrayElement, getRandomInteger } from './util.js';

// Константа, определяющая количество фотографий
const PHOTOS_COUNT = 25;
// Константы, определяющие минимальное и максимальное количество комментариев
const MIN_COMMENT = 0;
const MAX_COMMENT = 30;
// Константы, определяющие минимальное и максимальное количество лайков
const MIN_LIKES = 15;
const MAX_LIKES = 200;
// Константы, определяющие минимальное и максимальное значение номера аватара
const MIN_AVATAR_NUMBER = 1;
const MAX_AVATAR_NUMBER = 6;
// Константы, сколько предложений будет в сообщении комментария
const MIN_SENTENCES_PER_COMMENT = 1;
const MAX_SENTENCES_PER_COMMENT = 2;

// Массив имён, используемых для подписания авторов комментариев
const names = [
  'Dmytro',
  'Alex',
  'Anna',
  'Oleg',
  'Natalia',
  'Elena',
  'Olga',
];

// Массив возможных комментариев
const comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// Массив описаний картинок
const imageDescriptions = [
  'Красное яблоко на деревянном столе',
  'Маленькая птичка, сидящая на ветке',
  'Голубая машина, едущая по тихой улице',
  'Жёлтый цветок, распускающийся в саду',
  'Кот, дремлющий под тёплыми лучами солнца',
  'Парусная лодка, плывущая по спокойному озеру'
];

// Функция для формирования текста сообщения из 1 или 2 случайных комментариев.
// Если выбирается 2 комментария, то они гарантированно будут разными.
const createTextMessage = (arrSentences) => {
  // Определяем, сколько комментариев будет в сообщении: 1 или 2
  const commentsPerMessage = getRandomInteger(MIN_SENTENCES_PER_COMMENT, MAX_SENTENCES_PER_COMMENT);
  // Если только один комментарий, возвращаем его
  if (commentsPerMessage === 1) {
    return getRandomArrayElement(arrSentences);
  }
  // Если два комментария, нужно выбрать уникальные. Второй в последствии может менятся, поэтому let
  const firstComment = getRandomArrayElement(arrSentences);
  let secondComment = getRandomArrayElement(arrSentences);
  // Повторяем генерацию второго индекса, пока он не будет отличаться от первого
  // !Будет бесконечныный цикл если в массиве строк комментариев будет только одно значение
  while (secondComment === firstComment) {
    secondComment = getRandomArrayElement(arrSentences);
  }
  // Возвращаем склеенные два уникальных комментария
  return `${firstComment} ${secondComment}`;
};

// Генерация массива комментариев
const createComments = () => {
  // Массив для комментариев к данной фотографии
  const messages = [];
  // Определяем случайное число комментариев для этой фотографии
  const messagesCount = getRandomInteger(MIN_COMMENT, MAX_COMMENT);

  // Генерируем каждый комментарий
  for (let i = 0; i < messagesCount; i++) {
    messages.push({
      id: i,
      avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER)}.svg`,
      message: createTextMessage(comments),
      name: getRandomArrayElement(names),
    });
  }
  return messages;
};

// Основная функция для генерации описаний фотографий
const makePhotoDescriptions = () => {
  const result = [];

  // Генерируем описания для каждой фотографии
  for (let i = 1; i <= PHOTOS_COUNT; i++) {

    // Запись в переменную пула комментариев
    const masseges = createComments();

    // Добавляем объект с данными о фотографии в итоговый результат
    result.push({
      id: i,
      url: `photos/${i}.jpg`,
      description: getRandomArrayElement(imageDescriptions),
      likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
      comments: masseges,
    });
  }

  return result;
};

export {makePhotoDescriptions};
