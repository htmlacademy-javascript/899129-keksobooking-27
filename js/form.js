const adForm = document.querySelector('.ad-form');
const adFormItems = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersItems = mapFilters.children;

const titleForm = adForm.querySelector('#title');
const priceForm = adForm.querySelector('#price');
const roomForm = adForm.querySelector('#room_number');
const capacityForm = adForm.querySelector('#capacity');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'text-help',
});

const disableAdForm = () => {
  adForm.classList.add('ad-form--disabled');
  for (const element of adFormItems) {
    element.setAttribute('disabled', 'disabled');
  }
};

const disableMapFilters = () => {
  mapFilters.classList.add('map__filters--disabled');
  for (const element of mapFiltersItems) {
    element.setAttribute('disabled', 'disabled');
  }
};

const enableAdForm = () => {
  adForm.classList.remove('ad-form--disabled');
  for (const element of adFormItems) {
    element.removeAttribute('disabled');
  }
};

const enableMapFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  for (const element of mapFiltersItems) {
    element.removeAttribute('disabled');
  }
};

// Валидация заголовка
const validateTitle = (value) => value.length >= 30 && value.length <= 100;
const wrongTitleMessage = 'Необходимо ввести от 30 до 100 символов';
pristine.addValidator(titleForm, validateTitle, wrongTitleMessage);

//Валидация цены
const validatePrice = (value) => value <= 100000;
const wrongPriceMessage = 'Максимальная стоимость составляет 100000';
pristine.addValidator(priceForm, validatePrice, wrongPriceMessage);

//Валидация количества комнат и количества мест
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

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

export {
  disableAdForm,
  disableMapFilters,
  enableAdForm,
  enableMapFilters,
};
