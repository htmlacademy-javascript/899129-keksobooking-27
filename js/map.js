import {renderCard} from './card.js';
import {
  addressFormElement,
} from './form.js';
import {getData} from './data.js';
import {showAlert, debounce} from './util.js';
import {
  enableMapFilters,
  disableAdForm,
  disableMapFilters,
} from './change-activity.js';
import {
  renderFilteredAds,
  addFilter,
} from './filter.js';


const ERROR_MESSAGE = 'Не удалось соединиться с сервером. Попробуйте снова.';
const TIMEOUT_DELAY = 500;

const TokyoCoordinate = {
  LAT: 35.65283,
  LNG: 139.83947
};

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize:[52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

disableAdForm();
disableMapFilters();

const map = L.map('map-canvas');

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinMarker = L.marker(
  {
    lat: TokyoCoordinate.LAT,
    lng: TokyoCoordinate.LNG,
  },
  {
    icon: mainPinIcon,
    draggable: true,
  },
).addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  addressFormElement.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
});

const markerGroup = L.layerGroup().addTo(map);
const clearMarkers = () => markerGroup.clearLayers();

const addMarkers = (offers) => {
  offers.forEach((offer) => {
    const marker = L.marker({
      lat: offer.location.lat,
      lng: offer.location.lng
    },
    {
      icon: pinIcon
    });
    marker
      .addTo(markerGroup)
      .bindPopup(renderCard(offer));
  });
};

getData((ads) => {
  enableMapFilters();
  renderFilteredAds(ads);
  addFilter(debounce(() => renderFilteredAds(ads), TIMEOUT_DELAY));
}, () => showAlert(ERROR_MESSAGE));

export {map, mainPinMarker, TokyoCoordinate, addMarkers, clearMarkers};
