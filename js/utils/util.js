import { filterValue } from './form.js';
const ALERT_SHOW_TIME = 5000;
const HOUSING_PRICE_MIN = 10000;
const HOUSING_PRICE_MAX = 50000;

const showAlert = function() {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = 'Не удалось загрузить данные. Перезагрузите страницу';
  document.body.append(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

function isHousingType(advertisement) {
  if (filterValue.housingType === advertisement.offer.type || filterValue.housingType === 'any'){
    return advertisement;
  }
}

function isHousingPrice(advertisement){
  if (filterValue.housingPrice === 'any'){
    return advertisement;
  } else if ((filterValue.housingPrice === 'middle' && advertisement.offer.price >=HOUSING_PRICE_MIN  && advertisement.offer.price <=50000) ||
   (filterValue.housingPrice === 'low' && advertisement.offer.price < HOUSING_PRICE_MIN)  ||
  (filterValue.housingPrice === 'high' && advertisement.offer.price > HOUSING_PRICE_MAX)){
    return advertisement;
  }
}

function isHousingRooms(advertisement){
  if (filterValue.housingRooms === 'any'){
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
  if (filterValue.housingFeatures.length===0){
    return advertisement;
  }
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

export {isEscEvent, showAlert};
export {isHousingType, isHousingPrice, isHousingRooms, isHousingGuests, isHousingFeatures};
