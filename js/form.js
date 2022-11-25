import {sendData} from './data.js';
import {
  showSuccessMessage,
  showErrorMessage
} from './popup.js';
import {map, mainPinMarker, TokyoCoordinate} from './map.js';
import {mapFilterElement} from './filter.js';
import {clearPictures} from './picture.js';

const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;
const MAX_PRICE = 100000;

const adFormElement = document.querySelector('.ad-form');
const titleFormElement = adFormElement.querySelector('#title');
const priceFormElement = adFormElement.querySelector('#price');
const roomFormElement = adFormElement.querySelector('#room_number');
const capacityFormElement = adFormElement.querySelector('#capacity');
const typeFormElement = adFormElement.querySelector('#type');
const timeinFormElement = adFormElement.querySelector('#timein');
const timeoutFormElement = adFormElement.querySelector('#timeout');
const addressFormElement = adFormElement.querySelector('#address');
const sliderElement = adFormElement.querySelector('.ad-form__slider');
const resetButtonElement = adFormElement.querySelector('.ad-form__reset');

const pristine = new Pristine(adFormElement, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'text-help',
});

// Валидация заголовка
const validateTitle = (value) => value.length >= MIN_LENGTH_TITLE && value.length <= MAX_LENGTH_TITLE;
const wrongTitleMessage = 'Необходимо ввести от 30 до 100 символов';
pristine.addValidator(titleFormElement, validateTitle, wrongTitleMessage);

// Валидация типа жилья и цены
const TypePriceMap = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};
const validatePrice = (value) => value >= TypePriceMap[typeFormElement.value] && value <= MAX_PRICE;
const getWrongPriceMessage = (value) => {
  if (value < TypePriceMap[typeFormElement.value]) {
    return `Минимальная стоимость составляет ${TypePriceMap[typeFormElement.value]}`;
  }
  return 'Максимальная стоимость составляет 100000';
};
pristine.addValidator(priceFormElement, validatePrice, getWrongPriceMessage);

const onTypeOfLivingChange = () => {
  priceFormElement.placeholder = TypePriceMap[typeFormElement.value];
};

typeFormElement.addEventListener('change', onTypeOfLivingChange);

// Валидация количества комнат и количества мест
const validateCapacity = () => {
  const roomValue = parseInt(roomFormElement.value, 10);
  const capacityValue = parseInt(capacityFormElement.value, 10);
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
pristine.addValidator(capacityFormElement, validateCapacity, wrongCapacityMessage);

capacityFormElement.addEventListener('change', () => {
  pristine.validate(capacityFormElement);
});

// Время заезда и выезда
timeinFormElement.addEventListener('change', () => {
  timeoutFormElement.value = timeinFormElement.value;
});

timeoutFormElement.addEventListener('change', () => {
  timeinFormElement.value = timeoutFormElement.value;
});

// Reset
const setCoordinates = (coordinates) => {
  addressFormElement.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
};

const resetForm = () => {
  adFormElement.reset();
  mainPinMarker.setLatLng({
    lat: TokyoCoordinate.LAT,
    lng: TokyoCoordinate.LNG
  });
  map.setView({
    lat: TokyoCoordinate.LAT,
    lng: TokyoCoordinate.LNG
  }, 10);
  map.closePopup();
  mapFilterElement.reset();
  sliderElement.noUiSlider.reset();
  clearPictures();
  setCoordinates(mainPinMarker.getLatLng());
};

const onResetButtonClick = (evt) => {
  evt.preventDefault();
  resetForm();
};
resetButtonElement.addEventListener('click', onResetButtonClick);

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

adFormElement.addEventListener('submit', onFormSubmit);

export {
  addressFormElement,
  priceFormElement,
  sliderElement,
  typeFormElement,
  TypePriceMap,
  resetButtonElement,
  resetForm
};
