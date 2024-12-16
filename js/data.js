import { getRandomArrayElement, getRandomInteger, getRandomUniqueElementsCount, createCounter } from './util.js';

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

// Создание текста комментария для картинки из уникальных значений массива comments.
const createTextMessage = () => {
  const arrSentences = getRandomUniqueElementsCount(comments, MIN_SENTENCES_PER_COMMENT, MAX_SENTENCES_PER_COMMENT);
  // Склеивание уникальных строк в один текст комментария изображения
  const result = arrSentences.join(' ');

  return result;
};

// Создание экземпляра функции createCounter, она возвращает число на 1 больше каждый вызов
const createCommentsId = createCounter();

// Создает объект одного комментария для фотографии.
const createComments = () => ({
  id: createCommentsId(),
  avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER)}.svg`,
  message: createTextMessage(),
  name: getRandomArrayElement(names),
});

// Создает массив объектов комментариев для фотографии
const generatingComments = () => {
  const commentsCount = getRandomInteger(MIN_COMMENT, MAX_COMMENT);
  const commentArray = Array.from({length: commentsCount}, createComments);
  return commentArray;
};

// Создание уникальных счетчиков.
const createDescriptionId = createCounter();
const createPhotoNumber = createCounter();

// Создает объект одного описания фотографии.
const createpPotoDescription = () => ({
  id: createDescriptionId(),
  url: `photos/${createPhotoNumber}.jpg`,
  description: getRandomArrayElement(imageDescriptions),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: generatingComments(),
});

// Основная функция, создает массив объектов описаний фотографий
const generationProtoDescriptions = () => {
  const protoDescriptionsArray = Array.from({length: PHOTOS_COUNT}, createpPotoDescription);
  return protoDescriptionsArray;
};

export { generationProtoDescriptions };
