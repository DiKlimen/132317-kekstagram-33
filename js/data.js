import { getRandomArrayElement, getRandomInteger, createCounter } from './util.js';

// Константа, определяющая количество фотографий
const PHOTOS_COUNT = 5;
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

const createTextMessage = () => {
// Проверка длинны массива со строками для комментариев, чтобы небыло бесконечного цикла
  if (comments.length < MAX_SENTENCES_PER_COMMENT) {
    return 'В массиве с предложениями недостаточно строк для формирования комментария';
  }
  // Получение количества строк для текста комментария
  const commentsPerMessage = getRandomInteger(MIN_SENTENCES_PER_COMMENT, MAX_SENTENCES_PER_COMMENT);
  // Накопительный массив из строк, в будущем станет текстом комментария
  const arrSentences = [];
  // Наполение массива из строк уникальными строками
  while (arrSentences.length < commentsPerMessage) {
    const randomElement = getRandomArrayElement(comments);
    // Если в массиве со строками нет элемента то добавь, это реализация уникальности строк между собой
    if (!arrSentences.includes(randomElement)) {
      arrSentences.push(randomElement);
    }
  }
  // Склеивание уникальных строк в один текст комментария изображения
  const result = arrSentences.join(' ');

  return result;
};

// Создание экземпляра функции createCounter, она возвращает число на 1 больше каждый вызов
// Нужна дя генерации уникальных id комментариев в рамках всех изображений
const createCommentsId = createCounter();

// Генерация массива комментариев
const createComments = () => {
  // Массив для комментариев к данной фотографии
  const messages = [];
  // Определяем случайное число комментариев для этой фотографии
  const messagesCount = getRandomInteger(MIN_COMMENT, MAX_COMMENT);

  // Генерируем каждый комментарий
  for (let i = 0; i < messagesCount; i++) {
    messages.push({
      id: createCommentsId(),
      avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER)}.svg`,
      message: createTextMessage(),
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
