import {sendData} from './data.js';
import {
  showSuccessMessage,
  showErrorMessage
} from './popup.js';
import {map, mainPinMarker, TokyoCoordinate} from './map.js';
import {mapFilter} from './filter.js';

const adForm = document.querySelector('.ad-form');
const titleForm = adForm.querySelector('#title');
const priceForm = adForm.querySelector('#price');
const roomForm = adForm.querySelector('#room_number');
const capacityForm = adForm.querySelector('#capacity');
const typeForm = adForm.querySelector('#type');
const timeinForm = adForm.querySelector('#timein');
const timeoutForm = adForm.querySelector('#timeout');
const addressForm = adForm.querySelector('#address');
const slider = adForm.querySelector('.ad-form__slider');
const resetButton = adForm.querySelector('.ad-form__reset');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'text-help',
});

// Валидация заголовка
const validateTitle = (value) => value.length >= 30 && value.length <= 100;
const wrongTitleMessage = 'Необходимо ввести от 30 до 100 символов';
pristine.addValidator(titleForm, validateTitle, wrongTitleMessage);

// Валидация типа жилья и цены
const TypePriceMap = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};
const validatePrice = (value) => value >= TypePriceMap[typeForm.value] && value <= 100000;
const getWrongPriceMessage = (value) => {
  if (value < TypePriceMap[typeForm.value]) {
    return `Минимальная стоимость составляет ${TypePriceMap[typeForm.value]}`;
  }
  return 'Максимальная стоимость составляет 100000';
};
pristine.addValidator(priceForm, validatePrice, getWrongPriceMessage);

const onTypeOfLivingChange = () => {
  priceForm.placeholder = TypePriceMap[typeForm.value];
};

typeForm.addEventListener('change', onTypeOfLivingChange);

// Валидация количества комнат и количества мест
const validateCapacity = () => {
  const roomValue = parseInt(roomForm.value, 10);
  const capacityValue = parseInt(capacityForm.value, 10);
  const roomsValidCapacitiesMap = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0],
  };
  const currentRoomValue = roomsValidCapacitiesMap[roomValue];
  return currentRoomValue.includes(capacityValue);
};
const wrongCapacityMessage = 'Данное количество гостей недоступно';
pristine.addValidator(capacityForm, validateCapacity, wrongCapacityMessage);

capacityForm.addEventListener('change', () => {
  pristine.validate(capacityForm);
});

// Время заезда и выезда
timeinForm.addEventListener('change', () => {
  timeoutForm.value = timeinForm.value;
});

timeoutForm.addEventListener('change', () => {
  timeinForm.value = timeoutForm.value;
});

// Reset
const setCoordinates = (coordinates) => {
  addressForm.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
};

const resetForm = () => {
  adForm.reset();
  mainPinMarker.setLatLng({
    lat: TokyoCoordinate.LAT,
    lng: TokyoCoordinate.LNG
  });
  map.setView({
    lat: TokyoCoordinate.LAT,
    lng: TokyoCoordinate.LNG
  }, 10);
  map.closePopup();
  mapFilter.reset();
  slider.noUiSlider.reset();
  setCoordinates(mainPinMarker.getLatLng());
};

// Отправка формы
const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    sendData(
      () => {
        showSuccessMessage();
        resetForm();
      },
      () => {
        showErrorMessage();
      },
      new FormData(evt.target),
    );
  }
};

adForm.addEventListener('submit', onFormSubmit);

export {
  addressForm,
  priceForm,
  slider,
  typeForm,
  TypePriceMap,
  resetButton,
  resetForm
};
