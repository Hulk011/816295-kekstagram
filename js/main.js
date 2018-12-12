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

var IMAGE_SRC_TEMPLATE = 'img/avatar-{{i}}.svg';
var IMAGE_ALT = 'Аватар комментатора фотографии';
var IMAGE_WIDTH = '35';
var IMAGE_HEIGHT = '35';

var KEYCODE_ESC = 27;
var KEYCODE_ENTER = 13;

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
  var textElement = document.createElement('p');

  itemElement.classList.add('social__comment');
  imageElement.classList.add('social__picture');
  textElement.classList.add('social__text');
  textElement.textContent = pictures;

  imageElement.src = IMAGE_SRC_TEMPLATE.replace('{{i}}', createRandomNumber(AVATAR_NUM_MIN, AVATAR_NUM_MAX));
  imageElement.alt = IMAGE_ALT;
  imageElement.width = IMAGE_WIDTH;
  imageElement.height = IMAGE_HEIGHT;

  itemElement.appendChild(imageElement);
  itemElement.appendChild(textElement);

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

var closeBigPicture = function () {
  bigPictureElement.classList.add('hidden');
};

var onBigPictureCloseEscKeydown = function (evt) {
  if (evt.keyCode === KEYCODE_ESC) {
    closeBigPicture();
  }
};

var closeImgUpload = function () {
  var focused = document.activeElement;

  if (focused !== textDescriptionElement && focused !== textHashtagsElement) {
    imgUploadElement.classList.add('hidden');
    fileUploadElement.reset();
  }
};

var onImgUploadCloseEscKeydown = function (evt) {
  if (evt.keyCode === KEYCODE_ESC) {
    closeImgUpload();
  }
};

var resetEffectLevel = function () {
  effectLevelDepthElement.setAttribute('style', 'width:100%');
  effectLevelPinElement.setAttribute('style', 'left:100%');
  effectLevelValueElement.setAttribute('value', '100');
};

var openImgUpload = function () {
  imgUploadElement.classList.remove('hidden');
  effectLevelElement.classList.add('hidden');
  resetEffectLevel();
  scaleControlValueElement.setAttribute('value', '100%');
};

var addEffects = function () {
  if (effectNoneElement.checked) {
    imgPreview.className = '';
    effectLevelElement.classList.add('hidden');
  } else if (effectChromeElement.checked) {
    imgPreview.className = '';
    resetEffectLevel();
    effectLevelElement.classList.remove('hidden');
    imgPreview.classList.add('effects__preview--chrome');
  } else if (effectSepiaElement.checked) {
    imgPreview.className = '';
    resetEffectLevel();
    effectLevelElement.classList.remove('hidden');
    imgPreview.classList.add('effects__preview--sepia');
  } else if (effectMarvinElement.checked) {
    imgPreview.className = '';
    resetEffectLevel();
    effectLevelElement.classList.remove('hidden');
    imgPreview.classList.add('effects__preview--marvin');
  } else if (effectPhobosElement.checked) {
    imgPreview.className = '';
    resetEffectLevel();
    effectLevelElement.classList.remove('hidden');
    imgPreview.classList.add('effects__preview--phobos');
  } else if (effectHeatElement.checked) {
    imgPreview.className = '';
    resetEffectLevel();
    effectLevelElement.classList.remove('hidden');
    imgPreview.classList.add('effects__preview--heat');
  }
};

var movePin = function () {
  var level = parseInt(effectLevelPinElement.getAttribute('left'), 10);
  effectLevelValueElement.setAttribute('value', level);
  var filterValue = level / 100;

  if (effectChromeElement.checked) {
    imgPreview.setAttribute('style', 'filter:grayscale(' + filterValue + ')');
  } else if (effectSepiaElement.checked) {
    imgPreview.setAttribute('style', 'filter:sepia(' + filterValue + ')');
  } else if (effectMarvinElement.checked) {
    imgPreview.setAttribute('style', 'filter:invert(' + level + '%)');
  } else if (effectPhobosElement.checked) {
    filterValue = level * 5 / 100;
    imgPreview.setAttribute('style', 'filter:blur(' + filterValue + 'px)');
  } else if (effectHeatElement.checked) {
    filterValue = level * 3 / 100;
    imgPreview.setAttribute('style', 'filter:brightness(' + filterValue + ')');
  }
};

var scaleSmaller = function () {
  var value = parseInt(scaleControlValueElement.value, 10);

  if (value > 25) {
    value -= 25;
    imgPreview.setAttribute('style', 'transform:scale(0.' + value + ')');
    scaleControlValueElement.value = value + '%';
  } else if (value <= 25) {
    imgPreview.setAttribute('style', 'transform:scale(0.25)');
    scaleControlValueElement.value = value + '%';
  }
};

var scaleBigger = function () {
  var value = parseInt(scaleControlValueElement.value, 10);

  if (value < 75) {
    value += 25;
    imgPreview.setAttribute('style', 'transform:scale(0.' + value + ')');
    scaleControlValueElement.value = value + '%';
  } else if (value >= 75 && value < 100) {
    value += 25;
    imgPreview.removeAttribute('style');
    scaleControlValueElement.value = value + '%';
  }
};

var validateHasgtags = function () {
  var userHashtagsElement = document.querySelector('.text__hashtags').value;
  var splitHashtags = userHashtagsElement.split(' ');

  if (splitHashtags.length > 5) {
    textHashtagsElement.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
  }

  for (var i = 0; i < splitHashtags.length; i++) {
    var currentHashtag = splitHashtags[i].toLowerCase();
    var sameHashtags = searchDuplicate(currentHashtag, splitHashtags);

    if (sameHashtags > 1) {
      textHashtagsElement.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
    }
    if (currentHashtag[0] !== '#') {
      textHashtagsElement.setCustomValidity('Хэш-тег должен начинаться с символа #');
    }
    if (currentHashtag.length < 2) {
      textHashtagsElement.setCustomValidity('Хэш-тег не может состоять только из одного символа');
    }
    if (currentHashtag.length > 20) {
      textHashtagsElement.setCustomValidity('Максимальная длина одного хэш-тега — 20 символов, включая решётку');
    }
  }
};

var picturesListElement = document.querySelector('.pictures');
var pictureTemplateElement = document.querySelector('#picture').content;
var bigPictureElement = document.querySelector('.big-picture');
var bigPictureCloseElement = document.querySelector('#picture-cancel');
var fileUploadElement = document.querySelector('#upload-file');
var imgUploadElement = document.querySelector('.img-upload__overlay');
var uploadCancelElement = document.querySelector('#upload-cancel');
var effectLevelElement = document.querySelector('.effect-level');
var effectLevelPinElement = document.querySelector('.effect-level__pin');
var effectLevelDepthElement = document.querySelector('.effect-level__depth');
var effectLevelValueElement = document.querySelector('.effect-level__value');
var imgUploadPreviewElement = document.querySelector('.img-upload__preview');
var imgPreview = imgUploadPreviewElement.querySelector('img');
var effectsListElement = document.querySelector('.effects__list');
var effectNoneElement = document. querySelector('#effect-none');
var effectChromeElement = document. querySelector('#effect-chrome');
var effectSepiaElement = document. querySelector('#effect-sepia');
var effectMarvinElement = document. querySelector('#effect-marvin');
var effectPhobosElement = document. querySelector('#effect-phobos');
var effectHeatElement = document. querySelector('#effect-heat');
var scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
var scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
var scaleControlValueElement = document.querySelector('.scale__control--value');
var textDescriptionElement = document.querySelector('.text__description');
var textHashtagsElement = document.querySelector('.text__hashtags');
var uploadSubmitElement = document.querySelector('#upload-submit');

bigPictureCloseElement.addEventListener('click', function () {
  closeBigPicture();
});

bigPictureCloseElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEYCODE_ENTER) {
    closeBigPicture();
  }
});

fileUploadElement.addEventListener('change', function () {
  openImgUpload();
});

uploadCancelElement.addEventListener('click', function () {
  closeImgUpload();
});

uploadCancelElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEYCODE_ENTER) {
    closeImgUpload();
  }
});

effectsListElement.addEventListener('click', function () {
  addEffects();
});

scaleControlSmallerElement.addEventListener('click', function () {
  scaleSmaller();
});

scaleControlBiggerElement.addEventListener('click', function () {
  scaleBigger();
});

uploadSubmitElement.addEventListener('click', function () {
  validateHasgtags();
});

textHashtagsElement.addEventListener('input', function () {
  textHashtagsElement.setCustomValidity('');
});

effectLevelPinElement.addEventListener('mouseup', function () {
  movePin();
});

document.addEventListener('keydown', onBigPictureCloseEscKeydown);
document.addEventListener('keydown', onImgUploadCloseEscKeydown);

var bigPictureCommenstsListElement = bigPictureElement.querySelector('.social__comments');
bigPictureElement.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPictureElement.querySelector('.comments-loader').classList.add('visually-hidden');

var pictures = generatePictures();

picturesListElement.appendChild(createPicturesFragment(pictures));
bigPictureElement.classList.remove('hidden');

renderBigPicture(pictures[0]);

