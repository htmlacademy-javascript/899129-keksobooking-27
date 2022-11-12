const adForm = document.querySelector('.ad-form');
const adFormItems = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersItems = mapFilters.children;

const disableAdForm = () => {
  adForm.classList.add('ad-form--disabled');
  for (const element of adFormItems) {
    element.classList.add('disabled');
  }
};

const disableMapFilters = () => {
  mapFilters.classList.add('map__filters--disabled');
  for (const element of mapFiltersItems) {
    element.classList.add('disabled');
  }
};

const enableAdForm = () => {
  adForm.classList.remove('ad-form--disabled');
  for (const element of adFormItems) {
    element.classList.remove('disabled');
  }
};

const enableMapFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  for (const element of mapFiltersItems) {
    element.classList.remove('disabled');
  }
};

export {
  disableAdForm,
  disableMapFilters,
  enableAdForm,
  enableMapFilters,
};
