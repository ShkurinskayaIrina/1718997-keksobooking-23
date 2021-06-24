const MIN_HEADER_LENGTH = 30;
const MAX_HEADER_LENGTH = 100;
const MAX_PRICE_NIGHT = 1000000;


const noticeBlock = document.querySelector('.notice');

const headerInput = noticeBlock.querySelector('#title');
headerInput.addEventListener('input',()=>{
  const valueLength = headerInput.value.length;
  if (valueLength<MIN_HEADER_LENGTH){
    headerInput.setCustomValidity(`Поле должно состоять минимум из 30 символов. Добавьте eщё ${  MIN_HEADER_LENGTH - valueLength } симв.`);
  } else if (valueLength>MAX_HEADER_LENGTH){
    headerInput.setCustomValidity(`Удалите лишние ${  valueLength - MAX_HEADER_LENGTH } симв.`);
  } else {
    headerInput.setCustomValidity('');
  }
  headerInput.reportValidity();
});

const priceInput = noticeBlock.querySelector('#price');
priceInput.addEventListener('input',()=>{
  if (priceInput.value>MAX_PRICE_NIGHT){
    priceInput.setCustomValidity('Максимально возможная цена за ночь - 1 000 000 руб.');
  } else {
    priceInput.setCustomValidity('');
  }
  priceInput.reportValidity();
});

const rooms = noticeBlock.querySelector('#room_number');
const capacity = noticeBlock.querySelector('#capacity');
const capacityList = capacity.querySelectorAll('option');

rooms.addEventListener('change',()=>{
  for ( let ii=0 ; ii < capacityList.length; ii++ ){
    if (Number(rooms.value)===100) {
      if (ii===3){
        capacityList[ii].selected=true;
        capacityList[ii].classList.remove('hidden');
      } else {
        capacityList[ii].classList.add('hidden');
      }
    } else {
      capacityList[3-Number(rooms.value)].selected=true;
      if (ii>=(3-Number(rooms.value)) && ii<=2){
        capacityList[ii].classList.remove('hidden');
      } else {
        capacityList[ii].classList.add('hidden');
      }
    }
  }
});

const typeHousing = noticeBlock.querySelector('#type');
const priceNight = noticeBlock.querySelector('#price');
let minPriceNight = 1000;

const checkTypeHousing = function(){
  if (typeHousing.value==='bungalow'){
    minPriceNight = 0;
  } else if (typeHousing.value==='flat'){
    minPriceNight=1000;
  } else if(typeHousing.value==='hotel'){
    minPriceNight=3000;
  } else if(typeHousing.value==='house'){
    minPriceNight=5000;
  } else if(typeHousing.value==='palace'){
    minPriceNight=10000;
  }
  priceNight.placeholder=minPriceNight;
  priceNight.min=minPriceNight;
};

const checkPriceNight = function(){
  if (priceNight.value<minPriceNight){
    priceNight.setCustomValidity(`Минимально возможная цена за ночь - ${minPriceNight} руб.`);
  } else {
    priceNight.setCustomValidity('');
  }
  priceNight.reportValidity();
};


typeHousing.addEventListener('change',()=>{
  checkTypeHousing();

  checkPriceNight();
});

priceNight.addEventListener('input',()=>{
  checkPriceNight();
});

const timeIn = noticeBlock.querySelector('#timein');
const timeOut = noticeBlock.querySelector('#timeout');
timeIn.addEventListener('change',()=>{
  timeOut.value=timeIn.value;
//не пойму, надо ли блокировать выбор другого значения в timeOut?
});
