const SIMILAR_ADVERTISEMENT_COUNT = 10;

const Latitude = {
  MIN: 35.65000,
  MAX: 35.70000,
};

const Longitude = {
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

const Price = {
  MIN: 500,
  MAX: 30000,
};

const RoomCount = {
  MIN: 1,
  MAX: 5,
};

const GuestCount = {
  MIN: 1,
  MAX: 10,
};

const TIMES = [
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

const getRandomLatitude = () => getRandomPositiveFloat(Latitude.MIN, Latitude.MAX, 5);
const getRandomLongitude = () => getRandomPositiveFloat(Longitude.MIN, Longitude.MAX, 5);

const createOffer = () => ({
  title: getRandomArrayElement(TITLES),
  address: `${getRandomLatitude()}, ${getRandomLongitude()}`,
  price: getRandomPositiveInteger(Price.MIN, Price.MAX),
  type: getRandomArrayElement(TYPE),
  rooms: getRandomPositiveInteger(RoomCount.MIN, RoomCount.MAX),
  guests: getRandomPositiveInteger(GuestCount.MIN, GuestCount.MAX),
  checkin: getRandomArrayElement(TIMES),
  checkout: getRandomArrayElement(TIMES),
  features: FEATURES.slice(0, getRandomPositiveInteger(0, FEATURES.length - 1)),
  description: getRandomArrayElement(DESCRIPTION),
  photos: Array.from({length: getRandomPositiveInteger(0, 3)}, () => getRandomArrayElement(PHOTOS)),
});

const createLocation = () => ({
  lat: getRandomLatitude(),
  lng: getRandomLongitude(),
});

const createAdvertisement = (index) => ({
  author: {
    avatar: `img/avatars/user${String(++index).padStart(2, '0')}.png`,
  },
  offer: createOffer(),
  location: createLocation(),
});

const similarAdvertisements = Array.from({length: SIMILAR_ADVERTISEMENT_COUNT}, (_, advertismentIndex) => createAdvertisement(advertismentIndex));
