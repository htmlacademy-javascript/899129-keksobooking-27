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
const getWrongTitleMessage = () => 'Необходимо ввести от 30 до 100 символов';
pristine.addValidator(titleForm, validateTitle, getWrongTitleMessage);

//Валидация цены
const validatePrice = (value) => value >= 100000;
const getWrongPriceMessage = () => 'Максимальная стоимость: 100000 руб.';
pristine.addValidator(priceForm, validatePrice, getWrongPriceMessage);

//Валидация количества комнат и количества мест
const validateCapacity = (value) => {
  if (roomForm.value === '1' && value !== '1') {
    return false;
  } else if (roomForm.value === '2' && value !== '1' && value !== '2') {
    return false;
  } else if (roomForm.value === '3' && value === '0') {
    return false;
  } else if (roomForm.value === '100' && value !== '0') {
    return false;
  } else {
    return true;
  }
};
const getWrongCapacityMessage = 'Данное количество гостей недоступно для выбранного количества комнат';
pristine.addValidator(capacityForm, validateCapacity, getWrongCapacityMessage, true);

capacityForm.addEventListener('change', () => {
  pristine.validate(capacityForm);
});

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export {
  disableAdForm,
  disableMapFilters,
  enableAdForm,
  enableMapFilters,
};
