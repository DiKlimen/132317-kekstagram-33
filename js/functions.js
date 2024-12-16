const MINUTES_IN_HOUR = 60;

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

// Принимает строку вида '08:30' и переводит в количество минут числом от 00:00. '08:30' > 510
const timeToMinutes = (time) => {
  // Декомпозиция, в переменные hours и minutes попадут два элемента массива после обрабоки.
  // Строку сперва разделяют на массив строк по символу ':', а после map приводит каждый элемент массива со строки в число.
  const [hours, minutes] = time.split(':').map(Number);
  return hours * MINUTES_IN_HOUR + minutes;
};

// Проверяет может ли состоятся встреча в рабочее время дня.
const isMeetingWithinWorkingHours = (workStart, workEnd, meetingStart, meetingDuration) => {
  const workStartMinutes = timeToMinutes(workStart);
  const workEndMinutes = timeToMinutes(workEnd);
  const meetingStartMinutes = timeToMinutes(meetingStart);

  // Начало встречи в рамках рабочего дня?
  const isMeetingStartInWorkHours = meetingStartMinutes >= workStartMinutes && meetingStartMinutes < workEndMinutes;
  // Хватит ли времени от начала встречи до конца дня?
  const hasEnoughWorkHours = workEndMinutes - meetingStartMinutes >= meetingDuration;

  return isMeetingStartInWorkHours && hasEnoughWorkHours;
};

isWithinMaxLength('строка', 8);
isPalindrome('Лёша на полке клопа нашёл ');
getNumberFromString('1 кефир, 0.5 батона');

isMeetingWithinWorkingHours('08:00', '17:30', '14:00', 90); // true
isMeetingWithinWorkingHours('8:0', '10:0', '8:0', 120); // true
isMeetingWithinWorkingHours('08:00', '14:30', '14:00', 90); // false
isMeetingWithinWorkingHours('14:00', '17:30', '08:0', 90); // false
isMeetingWithinWorkingHours('8:00', '17:30', '08:00', 900); // false
