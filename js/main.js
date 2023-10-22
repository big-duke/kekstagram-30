/* eslint-disable no-console */
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= max - min + 1) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const createIdGenerator = () => {
  let last = 0;
  return () => {
    last += 1;
    return last;
  };
};

const sentences = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const commentAuthors = ['Юлия', 'Надежда', 'Иван', 'Павел', 'Дмитрий', 'Ольга'];

const pictureIdGenerator = createIdGenerator();
const commentIdGenerator = createIdGenerator();

const generateMessage = () => {
  const sentenceIdGenerator = createRandomIdFromRangeGenerator(
    0,
    sentences.length - 1
  );

  const sentenceCount = getRandomInteger(1, 2);
  const sentenceRandomIds = Array.from(
    { length: sentenceCount },
    sentenceIdGenerator
  );
  return sentenceRandomIds.map((index) => sentences[index]).join();
};

const createComment = () => ({
  id: commentIdGenerator(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: generateMessage(),
  name: getRandomArrayElement(commentAuthors),
});

const createPicture = () => {
  const id = pictureIdGenerator();
  const commentsCount = getRandomInteger(0, 30);
  const likesCount = getRandomInteger(15, 200);
  return {
    id: pictureIdGenerator(),
    url: `photos/${id}.jpg`,
    description:
      'Vestibulum porttitor massa ac nunc consequat condimentum. Interdum et malesuada fames ac ante donec',
    likes: likesCount,
    comments: Array.from({ length: commentsCount }, createComment),
  };
};

const generatePictures = (picturesCount) =>
  Array.from({ length: picturesCount }, createPicture);

console.log(generatePictures(25));

/*

В этой задаче вам нужно проанализировать данные — вычислить повторы каждого слова.

Создайте функцию getRepeats с одним параметром. В этот параметр будет приходить массив данных.

Функция должна возвращать объект, в котором указано сколько раз каждое слово встречается в массиве.
https://up.htmlacademy.ru/javascript/30/module/4/item/20/1

*/
const getRepeats = (inputArray) =>
  inputArray.reduce((acc, cur) => {
    if (cur in acc) {
      acc[cur] += 1;
    } else {
      acc[cur] = 1;
    }
    return acc;
  }, {});

/*

Создайте функцию getZippedArrays.

У функции должно быть два параметра. Первый — массив с названиями ключей. Второй — массив со значениями этих ключей.

Функция должна собирать из этих двух массивов объект и возвращать его. Каждому элементу из массива ключей соответствует элемент из массива значений.

*/
const getZippedArrays = (arrKeys, arrValues) =>
  arrKeys.reduce((acc, key, index) => {
    acc[key] = arrValues[index];
    return acc;
  }, {});

const lastNumber = 5;
let multiplicationResult = 1;

/* Техническое задание

Напишите универсальную программу, которая находит произведение всех чётных чисел из последовательности от 1 до n.

Число, до которого идёт последовательность (включительно), записано в переменную lastNumber

Найдите произведение всех чисел и сохраните результат в переменную multiplicationResult.

*/
for (let i = 2; i <= lastNumber; i += 2) {
  multiplicationResult = multiplicationResult * i;
}
