import {
  createIdGenerator,
  createRandomIdFromRangeGenerator,
  getRandomArrayElement,
  getRandomInteger,
} from './utils.js';
/* eslint-disable no-console */
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
    id,
    url: `photos/${id}.jpg`,
    description:
      'Vestibulum porttitor massa ac nunc consequat condimentum. Interdum et malesuada fames ac ante donec',
    likes: likesCount,
    comments: Array.from({ length: commentsCount }, createComment),
  };
};

export const generatePicturesData = () =>
  Array.from({ length: 25 }, createPicture);
