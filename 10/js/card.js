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

const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const renderCard = (dataForAd) => {
  const card = cardTemplate.cloneNode(true);

  const {avatar} = dataForAd.author;
  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = dataForAd.offer;

  card.querySelector('.popup__avatar').src = avatar || '';
  card.querySelector('.popup__title').textContent = title || '';
  card.querySelector('.popup__text--address').textContent = address || '';
  card.querySelector('.popup__text--price').textContent = `${price} ₽/ночь` || '';
  card.querySelector('.popup__type').textContent = TYPES_OF_HOUSING[type] || '';
  card.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей` || '';
  card.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}` || '';
  card.querySelector('.popup__description').textContent = description || '';

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

  return card;

};

export {renderCard};
