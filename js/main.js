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

var generateDataPictures = function () {
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

var showBigPictureComments = function (comments) {
  var fragment = document.createDocumentFragment();

  comments.forEach(function (comment) {
    fragment.appendChild(createCommentElement(comment));
  });

  bigPictureCommenstsListElement.innerHTML = '';
  bigPictureCommenstsListElement.appendChild(fragment);
};


var showBigPicture = function (picture) {
  bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
  bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
  bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = picture.description;

  showBigPictureComments(picture.comments);
};


var hideBigPicture = function() {
  bigPictureElement.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPictureElement.querySelector('.comments-loader').classList.add('visually-hidden');

  bigPictureElement.classList.add('hidden');
  /// remove listener

  document.removeEventListener('keydown', onDocumentBigPictureKeydown);
  bigPictureCloseElement.removeEventListener('click', onBigPictureCancelClick);
}

var showBigPicture = function(picture) {
  // showBigPicture
  bigPictureElement.classList.remove('hidden');
  // change css and styles
  // add event listener for document keydown -> closeBigPicture // onDocumentBigPictureKeydown
  // add event listener for cross element click -> closeBigPicture //
  document.addEventListener('keydown', onDocumentBigPictureKeydown);
  bigPictureCloseElement.addEventListener('click', onBigPictureCancelClick);
}

var createPictures = function(pictures) {
  var fragment = document.createDocumentFragment();

  pictures.forEach(function (picture) {
    var element = createPictureElement(picture);
    // @TODO: click showBigPicture
     element.addEventListener('click', function() {
      showBigPicture(picture)
     });
    fragment.appendChild(element);
  });

  picturesListElement.appendChild(fragment)
}

var closeForm = function() {
  // remove listenrs
  // remove event listener for document keydown
  // remove event listener for cross element click
  document.removeEventListener('keydown', onDocumentFormKeydown);
  formUploadCloseElement.removeEventListener('click', onFormCloseClick);

  // change styles and css classes
  formUploadOverlayElement.classList.add('hidden');
}

var openForm = function() {
  /* open/show form popup */

  // form selector - change css class
  formUploadOverlayElement.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentFormKeydown);
  formUploadCloseElement.addEventListener('click', onFormCloseClick);
};

var onFormCloseClick = function() {
  closeForm()
}
var onDocumentFormKeydown = function (evt) {
  if (evt.keyCode === KEYCODE_ENTER) {
    closeForm()
  }
}

var onBigPictureCancelClick = function(e) {
  /* close/hide form popup */
  hideBigPicture();
}

var onDocumentBigPictureKeydown = function(evt) {
  if (evt.keyCode === KEYCODE_ESC) {
    hideBigPicture();
  }
}

var onFieldUploadChange = function(evt) {
  openForm();
}

////

var picturesListElement = document.querySelector('.pictures');
var pictureTemplateElement = document.querySelector('#picture').content;
var bigPictureElement = document.querySelector('.big-picture');
var bigPictureCloseElement = document.querySelector('#picture-cancel');
var bigPictureCommenstsListElement = bigPictureElement.querySelector('.social__comments');

/// form
var formUploadOverlayElement = document.querySelector('.img-upload__overlay');
/// formClose
var formUploadCloseElement = formUploadOverlayElement.querySelector('.img-upload__cancel');
// var efffect...Element = select

// defaultEffectValue = efffect...Element.value
// defaultEffectName = efffect...Element.value

var formEffectLevelPinElement = document.querySelector('.effect-level__pin ');
var fieldUploadElement = document.querySelector('#upload-file');

var pictures = generateDataPictures();

createPictures(pictures)

fieldUploadElement.addEventListener('change', onFieldUploadChange)
