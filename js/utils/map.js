import {removeFormDisabled , formAd, showErrorMessage, showSuccessMessage} from './form.js';
import {createPopup} from './popup.js';
import {sendData} from './api.js';

const LAT_MAIN = 35.6895;
const LNG_MAIN = 139.692;
const SIMILAR_ADVERTISEMENT_COUNT = 10;

const buttonReset = document.querySelector('.ad-form__reset');

const mapFilter = document.querySelector('.map__filters');
const housingTypeFilter = mapFilter.querySelector('#housing-type');
const housingPriceFilter = mapFilter.querySelector('#housing-price');
const housingRoomsFilter = mapFilter.querySelector('#housing-rooms');
const housingGuestsFilter = mapFilter.querySelector('#housing-guests');
const housingFeaturesFilter = mapFilter.querySelectorAll('[name="features"]');

const filterValue = {
  housingType : 'any',
  housingPrice : 'any',
  housingRooms : 'any',
  housingGuests :'any',
  housingFeatures :[],
};

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
  iconSize: [52, 52],
  iconAnchor: [26, 52],
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

const setHousingTypeClick = (cb) => {
  housingTypeFilter.addEventListener('click',(evt)=>{
    filterValue.housingType = evt.target.value;
    cb();
  });
};

const setHousingPriceClick = (cb) => {
  housingPriceFilter.addEventListener('click',(evt)=>{
    filterValue.housingPrice = evt.target.value;
    cb();
  });
};

const SetHousingRoomsClick = (cb) => {
  housingRoomsFilter.addEventListener('click',(evt)=>{
    filterValue.housingRooms = evt.target.value;
    cb();
  });
};

const SetHousingGuestsClick = (cb) => {
  housingGuestsFilter.addEventListener('click',(evt)=>{
    filterValue.housingGuests = evt.target.value;
    cb();
  });
};

const SetHousingFeaturesClick = (cb) => {
  housingFeaturesFilter.forEach((element) => {
    element.addEventListener('click',(evt)=>{
      if (evt.target.checked){
        filterValue.housingFeatures.push(evt.target.value);
      }
      if (!evt.target.checked){
        const index = filterValue.housingFeatures.indexOf(evt.target.value);
        if (index > -1) {
          filterValue.housingFeatures.splice(index, 1);
        }
      }
      cb();
    });
  });
};


function isHousingType(advertisement) {
  if (filterValue.housingType === advertisement.offer.type || filterValue.housingType === 'any'){
    return advertisement;
  }
}

function isHousingPrice(advertisement){
  if (filterValue.housingPrice === 'any'){
    return advertisement;
  } else if ((filterValue.housingPrice === 'middle' && advertisement.offer.price >=10000  && advertisement.offer.price <=50000) ||
   (filterValue.housingPrice === 'low' && advertisement.offer.price < 10000)  ||
  (filterValue.housingPrice === 'high' && advertisement.offer.price > 50000)){
    return advertisement;
  }
}

function isHousingRooms(advertisement){
  if (filterValue.housingRooms === 'any' && advertisement.offer.rooms>3){
    return advertisement;
  }
  if (Number(advertisement.offer.rooms) === Number(filterValue.housingRooms)){
    return advertisement;
  }
}

function isHousingGuests(advertisement){
  if (filterValue.housingGuests === 'any'){
    return advertisement;
  }
  if (Number(advertisement.offer.guests) === Number(filterValue.housingGuests)){
    return advertisement;
  }
}

function isHousingFeatures(advertisement){
  let countFeatures=0;
  if (advertisement.offer.features && filterValue.housingFeatures){
    for (let i=0; i<filterValue.housingFeatures.length;i++){
      if (advertisement.offer.features.includes(filterValue.housingFeatures[i])){
        countFeatures++;
      }
    }
    if (countFeatures===filterValue.housingFeatures.length){
      return advertisement;
    }
  }
}

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
        iconSize: [40, 40],
        iconAnchor: [20, 40],
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
  // при успешной отправке формы или при очищении формы
  resetAdvertisement();
  showSuccessMessage();
};


buttonReset.addEventListener('click', (evt) => {
  //клик по кнопке очистить
  evt.preventDefault();
  resetAdvertisement();
});

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

export {createMarker, formAdSubmit, addAdvertisement};
export {setHousingTypeClick, setHousingPriceClick,SetHousingRoomsClick,SetHousingGuestsClick,SetHousingFeaturesClick};
