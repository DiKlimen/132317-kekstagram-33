// Проверяет, не превышает ли длина строки заданное максимальное значение.
const isWithinMaxLength = (str, maxLength) => str.length <= maxLength;

// Проверяет, является ли строка палиндромом, игнорируя пробелы и регистр символов.
const isPalindrome = (str) => {
  const normalizedString = str.replaceAll(' ', '').toLowerCase();

  let reversedString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }

  if (normalizedString === reversedString) {
    return true;
  }

  return false;
};

// Проверяет можно ли преобразовать строку в число.
const canConvertToNumber = (str) => !isNaN(Number(str));

// Извлекает число из цифр в троке, возвращает NaN если в строке нет цифр.
const getNumberFromString = (str) => {
  const normalizedString = str.toString().replaceAll(' ', '');

  // Создание массива из нормализированной строки.
  const arrFromString = [...normalizedString];

  // Фильтрация массива на числа, соединение в строку и преобразование в число с помощью +.
  const result = +arrFromString
    .filter((element) => canConvertToNumber(element))
    .join('');

  // Проверка на пустой результат, возвращает NaN елсли в троке цифры не встречались.
  return result !== 0 ? result : NaN;
};

isWithinMaxLength('строка', 8);
isPalindrome ('Лёша на полке клопа нашёл ');
getNumberFromString ('1 кефир, 0.5 батона');
