import {
  addMarkers,
  clearMarkers
} from './map.js';

const mapFilter = document.querySelector('.map__filters');
const typeFilter = mapFilter.querySelector('#housing-type');
const priceFilter = mapFilter.querySelector('#housing-price');
const roomsFilter = mapFilter.querySelector('#housing-rooms');
const guestsFilter = mapFilter.querySelector('#housing-guests');
const featuresFilter = mapFilter.querySelector('#housing-features');

const DEFAULT_FILTER = 'any';
const AMOUNT_ADS = 10;
const LOW_PRICE = 10000;
const HIGH_PRISE = 50000;

const isMatchType = (ad) => typeFilter.value === ad.offer.type || typeFilter.value === DEFAULT_FILTER;
const isMatchRooms = (ad) => +roomsFilter.value === ad.offer.rooms || roomsFilter.value === DEFAULT_FILTER;
const isMatchGuests = (ad) => +guestsFilter.value === ad.offer.guests || guestsFilter.value === DEFAULT_FILTER;

const isMatchPrice = (ad) => {
  let priceRange;
  if (ad.offer.price >= LOW_PRICE && ad.offer.price < HIGH_PRISE) {
    priceRange = 'middle';
  } else if (ad.offer.price < LOW_PRICE) {
    priceRange = 'low';
  } else if (ad.offer.price >= HIGH_PRISE) {
    priceRange = 'high';
  }
  return priceFilter.value === priceRange || priceFilter.value === 'any';
};

const isMatchFeatures = (ad, checkedFeatures) => {
  if (!ad.offer.features) {
    return false;
  }
  return checkedFeatures.every((checkedFeature) => ad.offer.features.includes(checkedFeature));
};

const renderFilteredAds = (ads) => {
  const chosenFeatures = Array
    .from(featuresFilter.querySelectorAll('input[type="checkbox"]:checked'), (feature) => feature.value);
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
  mapFilter.addEventListener('change', () => {
    cb();
  });
};

export {
  renderFilteredAds,
  addFilter,
  mapFilter,
};
