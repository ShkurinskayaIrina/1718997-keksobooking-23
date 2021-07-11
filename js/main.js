import { showAlert } from './utils/util.js';
import {formAdSubmit, addAdvertisement}  from './utils/map.js';
import { setFiltersClick } from './utils/map.js';
import {getData} from './utils/api.js';

getData((advertisements) => setFiltersClick(advertisements),
  () => showAlert());

formAdSubmit(addAdvertisement);

