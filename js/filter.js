import {
  addMarkers,
  clearMarkers
} from './map.js';

const DEFAULT_FILTER = 'any';
const AMOUNT_ADS = 10;
const LOW_PRICE = 10000;
const HIGH_PRISE = 50000;

const mapFilterElement = document.querySelector('.map__filters');
const typeFilterElement = mapFilterElement.querySelector('#housing-type');
const priceFilterElement = mapFilterElement.querySelector('#housing-price');
const roomsFilterElement = mapFilterElement.querySelector('#housing-rooms');
const guestsFilterElement = mapFilterElement.querySelector('#housing-guests');
const featuresFilterElement = mapFilterElement.querySelector('#housing-features');

const isMatchType = (ad) => typeFilterElement.value === ad.offer.type || typeFilterElement.value === DEFAULT_FILTER;
const isMatchRooms = (ad) => +roomsFilterElement.value === ad.offer.rooms || roomsFilterElement.value === DEFAULT_FILTER;
const isMatchGuests = (ad) => +guestsFilterElement.value === ad.offer.guests || guestsFilterElement.value === DEFAULT_FILTER;

const isMatchPrice = (ad) => {
  let priceRange;
  if (ad.offer.price >= LOW_PRICE && ad.offer.price < HIGH_PRISE) {
    priceRange = 'middle';
  } else if (ad.offer.price < LOW_PRICE) {
    priceRange = 'low';
  } else if (ad.offer.price >= HIGH_PRISE) {
    priceRange = 'high';
  }
  return priceFilterElement.value === priceRange || priceFilterElement.value === 'any';
};

const isMatchFeatures = (ad, checkedFeatures) => {
  if (!ad.offer.features) {
    return false;
  }
  return checkedFeatures.every((checkedFeature) => ad.offer.features.includes(checkedFeature));
};

const renderFilteredAds = (ads) => {
  const chosenFeatures = Array
    .from(featuresFilterElement.querySelectorAll('input[type="checkbox"]:checked'), (feature) => feature.value);
  const filteredAds = [];
  for (let i = 0; i < ads.length; i++) {
    const ad = ads[i];
    if (isMatchType(ad) && isMatchRooms(ad) && isMatchGuests(ad) && isMatchPrice(ad) && isMatchFeatures(ad, chosenFeatures)) {
      filteredAds.push(ad);
    }
    if (filteredAds.length === AMOUNT_ADS) {
      break;
    }
  }
  clearMarkers();
  addMarkers(filteredAds);
};

const addFilter = (cb) => {
  mapFilterElement.addEventListener('change', () => {
    cb();
  });

  mapFilterElement.addEventListener('reset', () => {
    cb();
  });
};

export {
  renderFilteredAds,
  addFilter,
  mapFilterElement,
};
