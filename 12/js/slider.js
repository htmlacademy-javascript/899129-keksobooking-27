import {priceForm, slider, typeForm, TypePriceMap} from './form.js';

const MAX_SLIDER_RANGE = 100000;

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: MAX_SLIDER_RANGE,
  },
  start: TypePriceMap[typeForm.value],
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(),
    from: (value) => +value
  }
});

slider.noUiSlider.on('update', () => {
  priceForm.value = slider.noUiSlider.get();
});

priceForm.addEventListener('change', () => {
  slider.noUiSlider.set(priceForm.value);
});
