'use strict';

var AVATAR_NUM_MIN = 1;
var AVATAR_NUM_MAX = 6;

var PICTURE_URL_TEMPLATE = 'photos/{{i}}.jpg';
var PICTURES_QUANTITY = 25;
var PICTURES_LIKES_MIN = 15;
var PICTURES_LIKES_MAX = 200;
var PICTURES_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var PICTURE_AUTHORS = [
  'Артём',
  'Вася',
  'Катя',
  'Женя',
  'Боря'
];

var createRandomNumber = function (min, max) {
  return Math.floor(min + (Math.random() * (max + 1 - min)));
};

var getRandomItem = function (arr) {
  return arr[createRandomNumber(0, arr.length - 1)];
};

var createRandomComments = function () {
  var result = [];
  var copy = PICTURES_COMMENTS.slice();
  var randomLimit = createRandomNumber(0, copy.length);
  var randomIndex;
  var randomItem;
  for (var i = 0; i < randomLimit; i++) {
    randomIndex = createRandomNumber(0, copy.length - 1);
    randomItem = copy[randomIndex];
    result.push(randomItem);
    copy.splice(randomIndex, 1);
  }

  return result;
};

var generatePicture = function (index) {
  return {
    url: PICTURE_URL_TEMPLATE.replace('{{i}}', index),
    likes: createRandomNumber(PICTURES_LIKES_MIN, PICTURES_LIKES_MAX),
    comments: createRandomComments(),
    author: getRandomItem(PICTURE_AUTHORS)
  };
};

var generatePictures = function () {
  var pictures = [];

  for (var i = 1; i <= PICTURES_QUANTITY; i++) {
    pictures.push(generatePicture(i));
  }

  return pictures;
};

var createPictureElement = function (picture) {
  var pictureElement = pictureTemplateElement.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;
};

var createPicturesFragment = function (pictures) {
  var fragment = document.createDocumentFragment();

  pictures.forEach(function (picture) {
    fragment.appendChild(createPictureElement(picture));
  });

  return fragment;
};

var createCommentElement = function (pictures) {
  var itemElement = document.createElement('li');
  var imageElement = document.createElement('img');
  var commentTextElement = document.createElement('p');

  itemElement.classList.add('social-comment');
  imageElement.classList.add('social-picture');
  commentTextElement.classList.add('social-text');
  commentTextElement.textContent = pictures;

  imageElement.src = 'img/avatar-' + createRandomNumber(AVATAR_NUM_MIN, AVATAR_NUM_MAX) + '.svg';
  imageElement.alt = 'Аватар комментатора фотографии';
  imageElement.width = '35';
  imageElement.height = '35';

  itemElement.appendChild(imageElement);
  itemElement.appendChild(commentTextElement);

  return itemElement;
};

var renderBigPictureComments = function (comments) {
  var fragment = document.createDocumentFragment();

  comments.forEach(function (comment) {
    fragment.appendChild(createCommentElement(comment));
  });

  bigPictureCommenstsListElement.appendChild(fragment);
};


var renderBigPicture = function (picture) {
  bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
  bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
  bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = picture.description;

  renderBigPictureComments(picture.comments);
};

var picturesListElement = document.querySelector('.pictures');
var pictureTemplateElement = document.querySelector('#picture').content;
var bigPictureElement = document.querySelector('.big-picture');

var bigPictureCommenstsListElement = bigPictureElement.querySelector('.social__comments');
var bigPictureCommentCountElement = bigPictureElement.querySelector('.social__comment-count')
    .classList.add('visually-hidden');
var bigPictureCommentsLoaderElement = bigPictureElement.querySelector('.comments-loader')
    .classList.add('visually-hidden');

var pictures = generatePictures();

picturesListElement.appendChild(createPicturesFragment(pictures));
bigPictureElement.classList.remove('hidden');

renderBigPicture(pictures[0]);
