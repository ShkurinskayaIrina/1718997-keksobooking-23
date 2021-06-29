import {removeFormDisabled} from './form.js';
import {createAdvertisement, SIMILAR_ADVERTISEMENT_COUNT} from './data.js';
import {createPopup} from './popup.js';
const LAT_MAIN = 35.6895;
const LNG_MAIN = 139.692;

const addAddress = function(lat,lng){
  const addressMainPinMarker = document.querySelector('#address');
  addressMainPinMarker.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

const map = L.map('map-canvas')
  .on('load', (evt) => {
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

const createMarker = (element) => {
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
};

const similarAdvertisement = new Array(SIMILAR_ADVERTISEMENT_COUNT).fill(null).map(()=>createAdvertisement());
//console.log(similarAdvertisement);
similarAdvertisement.forEach((advertisement) => {
  createMarker(advertisement);
 });
 //markerGroup.remove();
