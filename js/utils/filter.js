const HOUSING_PRICE_MIN = 10000;
const HOUSING_PRICE_MAX = 50000;

const filterValue = {
  housingType : 'any',
  housingPrice : 'any',
  housingRooms : 'any',
  housingGuests :'any',
  housingFeatures :[],
};

const isHousingType = function (advertisement) {
  if (filterValue.housingType === advertisement.offer.type || filterValue.housingType === 'any'){
    return advertisement;
  }
};

const isHousingPrice = function (advertisement) {
  if (filterValue.housingPrice === 'any'){
    return advertisement;
  } else if ((filterValue.housingPrice === 'middle' && advertisement.offer.price >=HOUSING_PRICE_MIN  && advertisement.offer.price <=50000) ||
   (filterValue.housingPrice === 'low' && advertisement.offer.price < HOUSING_PRICE_MIN)  ||
  (filterValue.housingPrice === 'high' && advertisement.offer.price > HOUSING_PRICE_MAX)){
    return advertisement;
  }
};

const isHousingRooms = function (advertisement){
  if (filterValue.housingRooms === 'any'){
    return advertisement;
  }
  if (Number(advertisement.offer.rooms) === Number(filterValue.housingRooms)){
    return advertisement;
  }
};

const isHousingGuests = function (advertisement) {
  if (filterValue.housingGuests === 'any'){
    return advertisement;
  }
  if (Number(advertisement.offer.guests) === Number(filterValue.housingGuests)){
    return advertisement;
  }
};

const isHousingFeatures = function (advertisement){
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
};

export {filterValue, isHousingType, isHousingPrice, isHousingRooms, isHousingGuests, isHousingFeatures};
