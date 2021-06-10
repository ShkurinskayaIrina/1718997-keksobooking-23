const getRandomPositive = function(count1,count2,countOfDecimals=0){
  const lower = Math.ceil(Math.min(Math.abs(count1), Math.abs(count2)));
  const upper = Math.floor(Math.max(Math.abs(count1), Math.abs(count2)));
  let result=0;
  if (countOfDecimals!==0){
    result = Math.random() * (upper - lower) + lower;
    return result.toFixed(countOfDecimals);
  }
  result = Math.random() * (upper - lower+1) + lower;
  return Math.floor(result);
};

const TYPE_OFFER = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

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

const SIMILAR_ADVERTISEMENT_COUNT = 10;

const getRandomArrayElement = (elements) => elements[getRandomPositive(0, elements.length - 1)];

const createAdvertisement =()=>{
  const locationLat = getRandomPositive(35.65000,35.70000,5);
  const locationLng = getRandomPositive(139.70000,139.80000,5);
  return {
    author : {
      avatar:`//img/avatars/user0${getRandomPositive(1,8)}.png`,
    },
    offer : {
      title:'Заголовок объявления',
      address:(`${locationLat},${locationLng}`),
      price:getRandomPositive(1,1000000),
      type:getRandomArrayElement(TYPE_OFFER),
      rooms:getRandomPositive(1,10),
      guests:getRandomPositive(1,20),
      checkin:getRandomArrayElement(CHECK),
      checkout:getRandomArrayElement(CHECK),
      features: new Array(getRandomPositive(1,6)).fill(null).map(()=>getRandomArrayElement(FEATURES)),
      description:'Самое лучше жилье',
      photos: new Array(getRandomPositive(1,3)).fill(null).map(()=>getRandomArrayElement(PHOTOS)),
    },
    location : {
      lat: locationLat,
      lng: locationLng,
    },
  };
};

const similarAdvertisement = new Array(SIMILAR_ADVERTISEMENT_COUNT).fill(null).map(()=>createAdvertisement());
similarAdvertisement;
