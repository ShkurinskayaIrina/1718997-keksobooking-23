import {formAd, showErrorMessage, showSuccessMessage, setHousingTypeClick} from './form.js';
import {setHousingPriceClick,setHousingRoomsClick,setHousingGuestsClick,setHousingFeaturesClick} from './form.js';
import {isHousingType, isHousingPrice, isHousingRooms, isHousingGuests, isHousingFeatures} from './util.js';
import { removeFormDisabled,filterValue } from './form.js';
import {createPopup} from './popup.js';
import {sendData} from './api.js';
import { debounce } from '../debounce.js';


const RERENDER_DELAY = 500;
const LAT_MAIN = 35.6895;
const LNG_MAIN = 139.692;
const SIMILAR_ADVERTISEMENT_COUNT = 10;
const mainMarkerSize = 52;
const MarkerSize = 40;

const buttonReset = document.querySelector('.ad-form__reset');

const addAddress = function(lat,lng){
  const addressMainPinMarker = document.querySelector('#address');
  addressMainPinMarker.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

const map = L.map('map-canvas')
  .on('load', () => {
    removeFormDisabled();
    addAddress(LAT_MAIN,LNG_MAIN);
  })
  .setView({
    lat: LAT_MAIN,
    lng: LNG_MAIN,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [mainMarkerSize, mainMarkerSize],
  iconAnchor: [mainMarkerSize/2, mainMarkerSize],
});
const mainPinMarker = L.marker(
  {
    lat: LAT_MAIN,
    lng: LNG_MAIN,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);


mainPinMarker.on('moveend', (evt) => {
  const newLat = evt.target.getLatLng().lat;
  const newLng = evt.target.getLatLng().lng;
  addAddress(newLat, newLng);
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (elements) => {
  markerGroup.clearLayers();
  elements
    .filter(isHousingType)
    .filter(isHousingPrice)
    .filter(isHousingRooms)
    .filter(isHousingGuests)
    .filter(isHousingFeatures)
    .slice(0, SIMILAR_ADVERTISEMENT_COUNT).forEach((element) => {
      const {lat, lng} = element.location;
      const icon = L.icon({
        iconUrl: '/img/pin.svg',
        iconSize: [MarkerSize, MarkerSize],
        iconAnchor: [MarkerSize/2, MarkerSize],
      });
      const marker = L.marker(
        {
          lat,
          lng,
        },
        {
          icon,
        },
      );
      marker
        .addTo(markerGroup)
        .bindPopup(
          createPopup(element),
          {
            keepInView: true,
          },
        );
    });
};

const resetMainPinMarker = function(){
  mainPinMarker.setLatLng({
    lat: LAT_MAIN,
    lng: LNG_MAIN,
  });
};

const resetAdvertisement = function(){
  const formMapFilters = document.querySelector('.map__filters');
  formMapFilters.reset();
  formAd.reset();
  resetMainPinMarker();
  addAddress(LAT_MAIN, LNG_MAIN);
};

const addAdvertisement = function(){
  resetAdvertisement();
  showSuccessMessage();
};

const setButtonRezet = (cb) => {
  buttonReset.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetAdvertisement();
    filterValue.housingType = 'any';
    filterValue.housingPrice = 'any';
    filterValue.housingRooms = 'any';
    filterValue.housingGuests = 'any';
    filterValue.housingFeatures =[];
    cb();
  });
};

const setFiltersClick = function(data){
  createMarker(data);
  setHousingTypeClick(() => createMarker(data));
  setHousingPriceClick(() => createMarker(data));
  setHousingRoomsClick(() => createMarker(data));
  setHousingGuestsClick(() => createMarker(data));
  setHousingFeaturesClick(debounce(() => createMarker(data),RERENDER_DELAY));
  setButtonRezet(() => createMarker(data));
};

const formAdSubmit = (onSuccess) =>{
  formAd.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => onSuccess(),
      () => showErrorMessage(),
      new FormData(evt.target),
    );
  });
};

export {formAdSubmit, addAdvertisement,setFiltersClick};
