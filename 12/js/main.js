import './card.js';
import './picture.js';
import './slider.js';
import {addressForm} from './form.js';
import {enableAdForm} from './change-activity.js';
import {map, TokyoCoordinate} from './map.js';
import './filter.js';

map.on('load', () => {
  enableAdForm();
  addressForm.value = `${TokyoCoordinate.LAT}, ${TokyoCoordinate.LNG}`;
})
  .setView({
    lat: TokyoCoordinate.LAT,
    lng: TokyoCoordinate.LNG
  }, 10);


