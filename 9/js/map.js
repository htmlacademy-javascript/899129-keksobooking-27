import {renderCard} from './card.js';
import {enableAdForm, enableMapFilters, addressForm} from './form.js';

const OFFERS_COUNT = 10;

const TokyoCoordinate = {
  LAT: 35.65283,
  LNG: 139.83947
};

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const map = L.map('map-canvas').on('load', () => {
  enableAdForm();
  enableMapFilters();
})
  .setView({
    lat: TokyoCoordinate.LAT,
    lng: TokyoCoordinate.LNG,
  }, 10);

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
  addressForm.value = `lat: ${lat.toFixed(5)},  lng: ${lng.toFixed(5)}`;
});

const markerGroup = L.layerGroup().addTo(map);

const addPinIconToMap = (offers) => {
  offers.forEach((offer) => {
    const marker = L.marker({
      lat: offer.location.lat,
      lng: offer.location.lng
    },
    {
      icon: pinIcon
    })
      .addTo(markerGroup)
      .bindPopup(renderCard(offer));
  });
};


