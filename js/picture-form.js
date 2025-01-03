import { isEscapeKey } from './util.js';
import './picture-editing.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const inputHashtags = document.querySelector('.text__hashtags');
const inputComment = document.querySelector('.text__description');
const hashtagsRuleRegex = document.querySelector('.text__rules-item-regex');
const hashtagsRuleRepeat = document.querySelector('.text__rules-item-repeat');
const hashtagsRuleSize = document.querySelector('.text__rules-item-size');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

// Устанавливает стили на пункты валидации
const setValidationStatus = (ruleItem, alidationFunction) => {
  ruleItem.classList.toggle('text__rules-item--good', alidationFunction); // Добавляет "good" если true, удаляет если false
  ruleItem.classList.toggle('text__rules-item--bad', !alidationFunction); // Добавляет "bed" если false, удаляет если true
};

// Проверка хештегов
const validateHashtags = (value) => {
  const hashtags = value
    .trim() // убрать пробелы по бокам
    .toLowerCase() // Все в нижний регистр
    .split(/\s+/) // Разделяем строку по пробелам, создаем массив
    .filter((tag) => tag !== ''); // Убираем пустые значения

  // Тег начинается с решетки (не состоит только из нее), содержит только допустимые символы и от 2 до 20 размер.
  const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

  // Проверяется каждый элемент массива на регулярку, возвращает true или false
  const areHashtagsValid = hashtags.every((tag) => hashtagRegex.test(tag));
  console.log('Теги проходят регулярку:', areHashtagsValid);

  setValidationStatus(hashtagsRuleRegex, areHashtagsValid);

  // Проверка на уникальность хештегов
  const hasUniqueHashtags = new Set(hashtags).size === hashtags.length;
  console.log('Только уникальные хештеги:', hasUniqueHashtags);

  setValidationStatus(hashtagsRuleRepeat, hasUniqueHashtags);

  // Проверка на количество хештегов
  const withinMaxCount = hashtags.length <= 5;
  console.log('Тегов меньше или ранов 5:', hasUniqueHashtags);

  setValidationStatus(hashtagsRuleSize, withinMaxCount);

  return areHashtagsValid && hasUniqueHashtags && withinMaxCount;
};

// Проверка комментария
const validateComment = (value) => {
  const comment = value.trim();
  const isCommentLengthValid = comment.length <= 140;
  console.log('Коммнтарий меньше 140 симовлов', isCommentLengthValid);
  return isCommentLengthValid;
};

pristine.addValidator(inputHashtags, validateHashtags, 'Неверный формат хэштегов или превышено количество.');
pristine.addValidator(inputComment, validateComment, 'Комментарий может быть не более 140 символов.');

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    console.log('Форма успешно валидирована!');
  } else {
    console.log('Форма не прошла валидацию.');
  }
});

// Обработчики событий для полей комментариев и хештегов, запрет закрытия при фокусе по Escape
const onInputKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

// Добавление обработчиков на поля.
inputComment.addEventListener('keydown', onInputKeydown); // Для комментария
inputHashtags.addEventListener('keydown', onInputKeydown); // Для хэштега
