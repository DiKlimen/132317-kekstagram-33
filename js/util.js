// Функция для получения случайного целого числа в заданном диапазоне [a, b]
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция для получения случайного элемента переданного в аргумент массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Создание массива уникальных значений из переданного массива arr, возвращает массив случайной длины между minCount и maxCount
const getRandomUniqueElementsCount = (arr, minCount, maxCount) => {
  // Скромная проверка, но этого недостаточно :)
  if (arr.length < maxCount) {
    return 'В массиве с недостаточно элементов';
  }
  // Получение случайного числа
  const randomElementCount = getRandomInteger(minCount, maxCount);
  // Накопительный массив уникальных элементов.
  const arrUniqueElements = [];
  // Добавляй в накопительный массив элементоы пока он не стане длины randomElementCount
  while (arrUniqueElements.length < randomElementCount) {
    const randomElement = getRandomArrayElement(arr);
    // Если в массиве со строками нет элемента то добавь, это реализация уникальности элементов между собой
    if (!arrUniqueElements.includes(randomElement)) {
      arrUniqueElements.push(randomElement);
    }
  }
  return arrUniqueElements;
};

// Возвращает число на 1 больше каждый вызов, использует замыкание.
const createCounter = () => {
  let i = 0;

  return () => i++;
};

export { getRandomArrayElement, getRandomInteger, getRandomUniqueElementsCount, createCounter };
