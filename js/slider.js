import { SLIDER_DEFAULT_CONFIG } from './const';


const sliderElement = document.querySelector('.effect-level__slider');

noUiSlider.create(sliderElement, SLIDER_DEFAULT_CONFIG);

export const updateSliderConfig = (visual) => {
  const config = {
    range: {
      min: visual.min,
      max: visual.max,
    },
    start: visual.max,
    step: visual.step,
  };
  sliderElement.noUiSlider.updateOptions(config);
};

export const slider = sliderElement.noUiSlider;
