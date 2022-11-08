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
  card.querySelector('.popup__avatar').src = author.avatar;
  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = offer.address;
  card.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  card.querySelector('.popup__type').textContent = TYPES_OF_HOUSING[offer.type];
  card.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests}`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  card.querySelector('.popup__description').textContent = offer.description;

  const cardFeatures = card.querySelector('.popup__features');
  cardFeatures.innerHTML = '';
  const newFeatureElements = createFeatures(offer.features);
  cardFeatures.append(newFeatureElements);

  const cardPhotos = card.querySelector('.popup__photos');
  cardPhotos.innerHTML = '';
  const newPhotoElements = createPhotos(offer.photos);
  cardPhotos.append(newPhotoElements);

  similarListFragment.append(card);
});

similarListElement.append(similarListFragment);
