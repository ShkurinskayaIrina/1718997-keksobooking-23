const MIN_HEADER_LENGTH = 30;
const MAX_HEADER_LENGTH = 100;
const MAX_PRICE_NIGHT = 1000000;


const headerInput = document.querySelector('#title');
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

const priceInput = document.querySelector('#price');
priceInput.addEventListener('input',()=>{
  if (priceInput.value>MAX_PRICE_NIGHT){
    priceInput.setCustomValidity('Максимально возможная цена за ночь - 1 000 000 руб.');
  } else {
    priceInput.setCustomValidity('');
  }
  priceInput.reportValidity();
});

const rooms = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
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

// capacity количество гостей
// 1 комната — «для 1 гостя»;
// 2 комнаты — «для 2 гостей» или «для 1 гостя»;
// 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
// 100 комнат — «не для гостей».
