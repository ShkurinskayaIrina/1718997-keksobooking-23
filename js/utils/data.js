import {getRandomPositive, getRandomArrayElement} from './util.js';

const SIMILAR_ADVERTISEMENT_COUNT = 10;

// const TYPE_OFFER = [
//   'palace',
//   'flat',
//   'house',
//   'bungalow',
//   'hotel',
// ];
const TYPE_OFFER = {
  palace : 'Дворец',
  flat : 'Квартира',
  house : 'Дом',
  bungalow :'Бунгало',
  hotel : 'Отель',
};

const CHECK = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const AVATARS = [];


const createAdvertisement =function(){
  const locationLat = getRandomPositive(35.65000,35.70000,5);
  const locationLng = getRandomPositive(139.70000,139.80000,5);

  let numberAvatar = getRandomPositive(1,11);
  while (AVATARS.includes(numberAvatar)){
    numberAvatar = getRandomPositive(1,11);
  }
  AVATARS.push(numberAvatar);
  const avatar =  numberAvatar <10 ? `img/avatars/user0${numberAvatar}.png` :`img/avatars/user${numberAvatar}.png` ;

  const photosAdvertisement = new Array(getRandomPositive(1,4)).fill(null).map(()=>getRandomArrayElement(PHOTOS));

  const filteredPhotosAdvertisement = photosAdvertisement.filter((item, index) => photosAdvertisement.indexOf(item) === index);

  return {
    author : {
      avatar: avatar,
    },
    offer : {
      title : 'Уютная квартира для семейного отдыха',
      address : (`${locationLat},${locationLng}`),
      price : getRandomPositive(1,10000),
      type : TYPE_OFFER[Object.keys(TYPE_OFFER)[getRandomPositive(0,4)]],
      rooms : getRandomPositive(1,10),
      guests : getRandomPositive(1,20),
      checkin : getRandomArrayElement(CHECK),
      checkout : getRandomArrayElement(CHECK),
      features : new Array(getRandomPositive(1,6)).fill(null).map(()=>getRandomArrayElement(FEATURES)),
      description :'Самое лучше жилье',
      photos : filteredPhotosAdvertisement,
    },
    location : {
      lat : locationLat,
      lng : locationLng,
    },
  };
};

//console.log(CHECK,CHECK.length);
//console.log('CHECK '+CHECK+' '+ getRandomArrayElement(CHECK));
export {SIMILAR_ADVERTISEMENT_COUNT};
//export {TYPE_OFFER,CHECK,FEATURES,PHOTOS};
export {createAdvertisement};
