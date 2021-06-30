const MIN_HEADER_LENGTH = 30;
const MAX_HEADER_LENGTH = 100;
const MAX_PRICE_NIGHT = 1000000;

const MIN_PRICE_OF_TYPE = {
  bungalow : 0,
  flat : 1000,
  hotel : 3000,
  house : 5000,
  palace : 10000,
};

const noticeBlock = document.querySelector('.notice');
const headerInput = noticeBlock.querySelector('#title');

const onHeaderInput = function (){
  const valueLength = headerInput.value.length;
  if (valueLength<MIN_HEADER_LENGTH){
    headerInput.setCustomValidity(`Поле должно состоять минимум из 30 символов. Добавьте eщё ${  MIN_HEADER_LENGTH - valueLength } симв.`);
  } else if (valueLength>MAX_HEADER_LENGTH){
    headerInput.setCustomValidity(`Удалите лишние ${  valueLength - MAX_HEADER_LENGTH } симв.`);
  } else {
    headerInput.setCustomValidity('');
  }
  headerInput.reportValidity();
};

const rooms = noticeBlock.querySelector('#room_number');
const capacity = noticeBlock.querySelector('#capacity');
const capacityList = capacity.querySelectorAll('option');

const onRoomsChange = function(){
  for ( let i=0 ; i < capacityList.length; i++ ){
    if (Number(rooms.value)===100) {
      if (i===3){
        capacityList[i].selected=true;
        capacityList[i].classList.remove('hidden');
      } else {
        capacityList[i].classList.add('hidden');
      }
    } else {
      capacityList[3-Number(rooms.value)].selected=true;
      if (i>=(3-Number(rooms.value)) && i<=2){
        capacityList[i].classList.remove('hidden');
      } else {
        capacityList[i].classList.add('hidden');
      }
    }
  }
};

const typeHousing = noticeBlock.querySelector('#type');
const priceNight = noticeBlock.querySelector('#price');
let minPriceNight = 1000;

const checkTypeHousing = function(){
  minPriceNight= MIN_PRICE_OF_TYPE[typeHousing.value];
  priceNight.placeholder=minPriceNight;
  priceNight.min=minPriceNight;
};

const checkPriceNight = function(){
  if (priceNight.value>MAX_PRICE_NIGHT){
    priceNight.setCustomValidity('Максимально возможная цена за ночь - 1 000 000 руб.');
  } else {
    if (priceNight.value<minPriceNight){
      priceNight.setCustomValidity(`Минимально возможная цена за ночь - ${minPriceNight} руб.`);
    } else {
      priceNight.setCustomValidity('');
    }
  }
  priceNight.reportValidity();
};

const onTypeHousingChange = function(){
  checkTypeHousing();
  checkPriceNight();
};

const onPriceNightInput = function(){
  checkPriceNight();
};

const timeIn = noticeBlock.querySelector('#timein');
const timeOut = noticeBlock.querySelector('#timeout');

const onTimeInChange = function(){
  timeOut.value=timeIn.value;
//не пойму, надо ли блокировать выбор другого значения в timeOut?
};


headerInput.addEventListener('input', onHeaderInput);
priceNight.addEventListener('input', onPriceNightInput);

rooms.addEventListener('change', onRoomsChange);
typeHousing.addEventListener('change', onTypeHousingChange);

timeIn.addEventListener('change',onTimeInChange);
