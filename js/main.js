import './utils/popup.js';
import './utils/advertisement-form.js';
import './utils/form.js';
import {createMarker,formAdSubmit, addAdvertisement} from './utils/map.js';
import {getData} from './utils/api.js';


const SIMILAR_ADVERTISEMENT_COUNT = 10;

getData((advertisements) => {
  createMarker(advertisements.slice(0,SIMILAR_ADVERTISEMENT_COUNT));
});

formAdSubmit(addAdvertisement);

