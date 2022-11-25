import {priceFormElement, sliderElement, typeFormElement, TypePriceMap} from './form.js';

const MAX_SLIDER_RANGE = 100000;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: MAX_SLIDER_RANGE,
  },
  start: TypePriceMap[typeFormElement.value],
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(),
    from: (value) => +value
  }
});

sliderElement.noUiSlider.on('update', () => {
  priceFormElement.value = sliderElement.noUiSlider.get();
});

priceFormElement.addEventListener('change', () => {
  sliderElement.noUiSlider.set(priceFormElement.value);
});
