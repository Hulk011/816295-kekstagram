'use strict';

var QUANTITY_PHOTO = 25;
var PHOTO_LIKES_MAX = 200;
var PHOTO_LIKES_MIN = 15;
var AVATAR_NUM_MIN = 1;
var AVATAR_NUM_MAX = 6;
var MIN_COMMENTS = 0;
var DESCRIPTIONS = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var getRandomNumber = function (min, max) {
  var random =  Math.floor(min + (Math.random() * (max + 1 - min)));
  return random;
}

var getRandomElement = function (arr) {
  return arr [Math.floor(Math.random() * arr.length)];
};

var getRandomComment = function () {
  var randomComment = [];

  for (var i = 0; i < getRandomElement(COMMENTS.length); i++) {
    randomComment.push(COMMENTS[index]);
  }

  return randomComment;
}

var generatePictures = function () {
  var pictures = [];

  for (var i = 2; i <= QUANTITY_PHOTO; i++) {
    pictures.push({
      url: 'photos/' + i + '.jpg',
      likes: getRandomNumber(PHOTO_LIKES_MIN, PHOTO_LIKES_MAX),
      comments: getRandomComment(),
      description: getRandomElement(DESCRIPTIONS)
    });
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

  pictures.forEach(function(picture) {
    fragment.appendChild(createPictureElement(picture));
  });

  return fragment;
};

var createComment = function (pictures) {
  var listItem = document.createElement('li').classList.add('social__comment');

  var image = document.createElement('img').classList.add('social__picture');
  image.src = 'img/avatar-' + getRandomNumber(AVATAR_NUM_MIN, AVATAR_NUM_MAX) + '.svg';
  image.alt = 'Аватар комментатора фотографии';
  image.width = '35';
  image.height = '35';
  listItem.appendChild(image);

  var commentText = document.createElement('p').classList.add('social__text');
  commentText.textContent = pictures;
  listItem.appendChild(commentText);

  return listItem;
};

var renderComments = function (pictures) {
  commentsListElement.innerHTML = '';
  var fragment = document.createDocumentFragment();

  pictures.forEach(function(picture) {
    fragment.appendChild(createComment(picture));
  });

  commentsListElement.appendChild(fragment);
};

var picturesListElement = document.querySelector('.pictures');
var pictureTemplateElement = document.querySelector('#picture').content;
var bigPictureElement = document.querySelector('.big-picture');
var commentsListElement = bigPictureElement.querySelector('.social__comments');
var commentCountElement = bigPictureElement.querySelector('.social__comment-count');
var commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

var renderBigPicture = function (picture) {

  bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
  bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
  bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
  renderComments(picture.comments);
  bigPictureElement.querySelector('.social__caption').textContent = picture.description;
};

var pictures = generatePictures();

createPicturesFragment(pictures);

var showBigPicture = function () {
  renderBigPicture(pictures[0]);
  bigPictureElement.classList.remove('hidden');
  commentCountElement.classList.add('visually-hidden');
  commentsLoaderElement.classList.add('visually-hidden');
};

showBigPicture();
