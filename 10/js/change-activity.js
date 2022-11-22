const adForm = document.querySelector('.ad-form');
const adFormItems = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersItems = mapFilters.children;

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

export {
  disableAdForm,
  disableMapFilters,
  enableAdForm,
  enableMapFilters,
};
