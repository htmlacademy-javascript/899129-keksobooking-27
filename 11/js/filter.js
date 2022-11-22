import {
  addMarkers
} from './map.js';
import { debounce } from './util.js';

const mapFilter = document.querySelector('.map__filters');
const typeFilter = mapFilter.querySelector('#housing-type');
const priceFilter = mapFilter.querySelector('#housing-price');
const roomsFilter = mapFilter.querySelector('#housing-rooms');
const guestsFilter = mapFilter.querySelector('#housing-guests');
const featuresFilter = mapFilter.querySelector('#housing-features');
const wifi = mapFilter.querySelector('#filter-wifi');
const dishwasher = mapFilter.querySelector('#filter-dishwasher');
const parking = mapFilter.querySelector('#filter-parking');
const washer = mapFilter.querySelector('#filter-washer');
const elevator = mapFilter.querySelector('#filter-elevator');
const conditioner = mapFilter.querySelector('#filter-conditioner');

const priceRangeFilter = {
  low: {
    from: 0,
    to: 10000,
  },
  middle: {
    from: 10000,
    to: 50000,
  },
  high: {
    from: 50000,
    to: 100000,
  },
};

const DEFAULT_FILTER = 'any';
const AMOUNT_ADS = 10;

const isMatchType = (ad) => typeFilter.value === ad.offer.type || typeFilter.value === DEFAULT_FILTER;
const isMatchRooms = (ad) => roomsFilter.value === ad.offer.rooms || roomsFilter.value === DEFAULT_FILTER;
const isMatchGuests = (ad) => guestsFilter.value === ad.offer.capicity || guestsFilter.value === DEFAULT_FILTER;

const isWifiChecked = (ad) => wifi.checked === true && ad.offer.features.include('wifi');
const isDishwasherChecked = (ad) => dishwasher.checked === true && ad.offer.features.include('dishwasher');
const isParkingChecked = (ad) => parking.checked === true && ad.offer.features.include('parking');
const isWasherChecked = (ad) => washer.checked === true && ad.offer.features.include('washer');
const isElevatorChecked = (ad) => elevator.checked === true && ad.offer.features.include('elevator');
const isConditionerChecked = (ad) => conditioner.checked === true && ad.offer.features.include('conditioner');

const onAddFilteredAds = (data) => {
  const filteredAds = [];
  for (let i = 0; i < data.length; i++) {
    const ad = data[i];
    if (isMatchType(ad) && isMatchRooms(ad) && isMatchGuests(ad) && isWifiChecked(ad) && isDishwasherChecked(ad) && isParkingChecked(ad) && isWasherChecked(ad) && isElevatorChecked(ad) && isConditionerChecked(ad)) {
      filteredAds.push(ad);

    }
    if (filteredAds.length === AMOUNT_ADS) {
      break;
    }
  }
  addMarkers(filteredAds);
};


mapFilter.addEventListener('change', onAddFilteredAds);

export {onAddFilteredAds};
