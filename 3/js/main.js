const SIMILAR_ADVERTISEMENT_COUNT = 10;

const USER_COUNT = {
  MIN: 1,
  MAX: 10,
};

const LATITUDE = {
  MIN: 35.65000,
  MAX: 35.70000,
};

const LONGITUDE = {
  MIN: 139.70000,
  MAX: 139.80000,
};

const TITLES = [
  'Квартира с видом на горы',
  'Квартира с видом на море',
  'В 5 минутах от центра',
  'Удобные апартаменты со всей необходимой мебелью и техникой',
  'Квартира в торговом районе',
  'Отель в центре города',
  'Отель на 1 линии',
  'Дружелюбный хостел',
  'Квартира с тихими соседями',
  'Квартира с садовым участком и бассейном',
  'Дом в пригороде',
];

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const PRICE = {
  MIN: 500,
  MAX: 30000,
};

const ROOM_COUNT = {
  MIN: 1,
  MAX: 5,
};

const GUEST_COUNT = {
  MIN: 1,
  MAX: 10,
};

const TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const DESCRIPTION = [
  'Уютно',
  'Рядом с метро',
  'Рядом с парком',
  'Для настоящего отдыха',
  'Завтрки включены',
  'Залога нет',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getRandomPositiveInteger = (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number' || a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = (a, b, digits = 1) => {
  if (typeof a !== 'number' || typeof b !== 'number' || typeof digits !== 'number' || a < 0 || b < 0 || digits < 0) {
    return NaN;
  }
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getRandomLatitude = () => getRandomPositiveFloat(LATITUDE.MIN, LATITUDE.MAX, 5);
const getRandomLongitude = () => getRandomPositiveFloat(LONGITUDE.MIN, LONGITUDE.MAX, 5);

const createAuthor = () => ({
  avatar: `img/avatars/user${getRandomPositiveInteger(USER_COUNT.MIN, USER_COUNT.MAX).toString().padStart(2, '0')}.png`,
});

const createOffer = () => ({
  title: getRandomArrayElement(TITLES),
  address: `${getRandomLatitude()}, ${getRandomLongitude()}`,
  price: getRandomPositiveInteger(PRICE.MIN, PRICE.MAX),
  type: getRandomArrayElement(TYPE),
  rooms: getRandomPositiveInteger(ROOM_COUNT.MIN, ROOM_COUNT.MAX),
  guests: getRandomPositiveInteger(GUEST_COUNT.MIN, GUEST_COUNT.MAX),
  checkin: getRandomArrayElement(TIME),
  checkout: getRandomArrayElement(TIME),
  features: FEATURES.slice(0, getRandomPositiveInteger(0, FEATURES.length - 1)),
  description: getRandomArrayElement(DESCRIPTION),
  photos: Array.from({length: getRandomPositiveInteger(0, 3)}, () => getRandomArrayElement(PHOTOS)),
});

const createLocation = () => ({
  lat: getRandomLatitude(),
  lng: getRandomLongitude(),
});

const createAdvertisement = () => ({
  author: createAuthor(),
  offer: createOffer(),
  location: createLocation(),
});

const similarAdvertisements = Array.from({length: SIMILAR_ADVERTISEMENT_COUNT}, createAdvertisement);
similarAdvertisements();
