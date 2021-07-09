import './utils/popup.js';
import './utils/advertisement-form.js';
import {createMarker,formAdSubmit, addAdvertisement}  from './utils/map.js';
import {setHousingTypeClick, setHousingPriceClick, SetHousingRoomsClick, SetHousingGuestsClick,SetHousingFeaturesClick} from './utils/map.js';
import {getData} from './utils/api.js';
import {debounce} from './debounce.js';
const RERENDER_DELAY = 500;

getData((advertisements) => {
  createMarker(advertisements);
  setHousingTypeClick(() => createMarker(advertisements));
  setHousingPriceClick(() => createMarker(advertisements));
  SetHousingRoomsClick(() => createMarker(advertisements));
  SetHousingGuestsClick(() => createMarker(advertisements));
  SetHousingFeaturesClick(debounce(() => createMarker(advertisements),RERENDER_DELAY));
});

formAdSubmit(addAdvertisement);

