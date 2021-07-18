import { showAlert } from './utils/util.js';
import {formAdSubmit, addAdvertisement}  from './utils/map.js';
import { setFiltersClick} from './utils/map.js';
import {getData} from './utils/api.js';
import './utils/advertisement-form.js';

let cloneAdvertisements;

getData((advertisements) => {
  setFiltersClick(advertisements);
  cloneAdvertisements=advertisements.slice(0);
},
() => showAlert());

formAdSubmit(addAdvertisement);

export {cloneAdvertisements};
