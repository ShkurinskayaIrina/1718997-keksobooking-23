const formAd = document.querySelector('.ad-form');
const fieldsetAdd = formAd.querySelectorAll('fieldset');

const mapFilter = document.querySelector('.map__filters');
const selectFilter = mapFilter.querySelectorAll('select');
const fieldsetFilter = mapFilter.querySelector('fieldset');

const addFormDisabled = function (){

  formAd.classList.add('ad-form--disabled');
  fieldsetAdd.forEach((element)=>element.disabled=true);
  mapFilter.classList.add('ad-form--disabled');
  selectFilter.forEach((element)=>element.disabled=true);
  fieldsetFilter.disabled=true;

};
const removeFormDisabled = function(){
  formAd.classList.remove('ad-form--disabled');
  fieldsetAdd.forEach((element)=>element.disabled=false);
  mapFilter.classList.remove('ad-form--disabled');
  selectFilter.forEach((element)=>element.disabled=false);
  fieldsetFilter.disabled=false;
}

addFormDisabled();
removeFormDisabled();
