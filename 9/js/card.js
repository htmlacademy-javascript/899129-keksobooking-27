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
  card.querySelector('.popup__avatar').src = dataForAd.author.avatar || '';
  card.querySelector('.popup__title').textContent = dataForAd.offer.title || '';
  card.querySelector('.popup__text--address').textContent = dataForAd.offer.address || '';
  card.querySelector('.popup__text--price').textContent = `${dataForAd.offer.price} ₽/ночь` || '';
  card.querySelector('.popup__type').textContent = TYPES_OF_HOUSING[dataForAd.offer.type] || '';
  card.querySelector('.popup__text--capacity').textContent = `${dataForAd.offer.rooms} комнаты для ${dataForAd.offer.guests} гостей` || '';
  card.querySelector('.popup__text--time').textContent = `Заезд после ${dataForAd.offer.checkin}, выезд до ${dataForAd.offer.checkout}` || '';
  card.querySelector('.popup__description').textContent = dataForAd.offer.description || '';

  const cardFeatures = card.querySelector('.popup__features');
  cardFeatures.innerHTML = '';
  const features = dataForAd.offer.features;
  if (features) {
    const newFeatureElements = createFeatures(features);
    cardFeatures.append(newFeatureElements);
  } else {
    cardFeatures.remove();
  }

  const cardPhotos = card.querySelector('.popup__photos');
  cardPhotos.innerHTML = '';
  const photos = dataForAd.offer.photos;
  if (photos) {
    const newPhotoElements = createPhotos(photos);
    cardPhotos.append(newPhotoElements);
  } else {
    cardPhotos.remove();
  }

  return card;

};

export {renderCard};
