// Функция для получения случайного целого числа в заданном диапазоне [a, b]
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция для получения случайного элемента переданного в аргумент массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Возвращает число на 1 больше каждый вызов, использует замыкание.
const createCounter = () => {
  let i = 0;

  return () => i++;
};

export { getRandomArrayElement, getRandomInteger, createCounter };
