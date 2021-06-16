import {SIMILAR_ADVERTISEMENT_COUNT} from './utils/data.js';
import {createAdvertisement} from './utils/util.js';

const similarAdvertisement = new Array(SIMILAR_ADVERTISEMENT_COUNT).fill(null).map(()=>createAdvertisement());
similarAdvertisement;
