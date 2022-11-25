const adFormElement = document.querySelector('.ad-form');
const adFormElements = adFormElement.querySelectorAll('fieldset');
const mapFiltersElement = document.querySelector('.map__filters');
const mapFiltersElements = mapFiltersElement.children;

const disableAdForm = () => {
  adFormElement.classList.add('ad-form--disabled');
  for (const element of adFormElements) {
    element.setAttribute('disabled', 'disabled');
  }
};

const disableMapFilters = () => {
  mapFiltersElement.classList.add('map__filters--disabled');
  for (const element of mapFiltersElements) {
    element.setAttribute('disabled', 'disabled');
  }
};

const enableAdForm = () => {
  adFormElement.classList.remove('ad-form--disabled');
  for (const element of adFormElements) {
    element.removeAttribute('disabled');
  }
};

const enableMapFilters = () => {
  mapFiltersElement.classList.remove('map__filters--disabled');
  for (const element of mapFiltersElements) {
    element.removeAttribute('disabled');
  }
};

export {
  disableAdForm,
  disableMapFilters,
  enableAdForm,
  enableMapFilters,
};
