import {createAdvertisements} from './data.js';

const TYPES_OF_HOUSING = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

const createFeatures = (features) => {
  const featuresFragment = document.createDocumentFragment();
  features.forEach((element) => {
    const feature = document.createElement('li');
    feature.classList.add('popup__feature', `popup__feature--${element}`);
    featuresFragment.append(feature);
  });
  return featuresFragment;
};

const createPhotos = (photos) => {
  const photosFragment = document.createDocumentFragment();
  photos.forEach((photoSrc) => {
    const photo = document.createElement('img');
    photo.src = photoSrc;
    photo.classList.add('popup__photo');
    photo.setAttribute('width', '45');
    photo.setAttribute('height', '40');
    photo.alt = 'Фотография жилья';
    photosFragment.append(photo);
  });
  return photosFragment;
};

const similarListElement = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const similarCard = createAdvertisements();

const similarListFragment = document.createDocumentFragment();

similarCard.forEach(({author, offer}) => {
  const card = cardTemplate.cloneNode(true);
  const cardAvatar = card.querySelector('.popup__avatar');
  const cardTitle = card.querySelector('.popup__title');
  const cardAdress = card.querySelector('.popup__text--address');
  const cardPrice = card.querySelector('.popup__text--price');
  const cardType = card.querySelector('.popup__type');
  const cardCapacity = card.querySelector('.popup__text--capacity');
  const cardTime = card.querySelector('.popup__text--time');
  const cardDescription = card.querySelector('.popup__description');

  const {avatar} = author;
  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = offer;

  if (avatar) {
    cardAvatar.src = avatar;
  } else {
    cardAvatar.remove();
  }

  if (title) {
    cardTitle.textContent = title;
  } else {
    cardTitle.remove();
  }

  if (address) {
    cardAdress.textContent = address;
  } else {
    cardAdress.remove();
  }

  if (price) {
    cardPrice.textContent = `${price} ₽/ночь`;
  } else {
    cardPrice.remove();
  }

  if (type) {
    cardType.textContent = TYPES_OF_HOUSING[type];
  } else {
    cardType.remove();
  }

  if (rooms && guests) {
    cardCapacity.textContent = `${rooms} комнаты для ${guests} гостей`;
  } else {
    cardCapacity.remove();
  }

  if (checkin && checkout) {
    cardTime.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  } else {
    cardTime.remove();
  }

  if (description) {
    cardDescription.textContent = description;
  } else {
    cardDescription.remove();
  }

  const cardFeatures = card.querySelector('.popup__features');
  cardFeatures.innerHTML = '';
  if (features) {
    const newFeatureElements = createFeatures(features);
    cardFeatures.append(newFeatureElements);
  } else {
    cardFeatures.remove();
  }

  const cardPhotos = card.querySelector('.popup__photos');
  cardPhotos.innerHTML = '';
  if (photos) {
    const newPhotoElements = createPhotos(photos);
    cardPhotos.append(newPhotoElements);
  } else {
    cardPhotos.remove();
  }

  similarListFragment.append(card);
});

similarListElement.append(similarListFragment);
