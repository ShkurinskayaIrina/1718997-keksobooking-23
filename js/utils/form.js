import {isEscEvent} from './util.js';
import {filterValue} from './filter.js';

const formAd = document.querySelector('.ad-form');
const fieldsetAdd = formAd.querySelectorAll('fieldset');
const bodyBlock = document.querySelector('body');

const mapFilter = document.querySelector('.map__filters');

const selectFilter = mapFilter.querySelectorAll('select');
const fieldsetFilter = mapFilter.querySelector('fieldset');

const housingTypeFilter = mapFilter.querySelector('#housing-type');
const housingPriceFilter = mapFilter.querySelector('#housing-price');
const housingRoomsFilter = mapFilter.querySelector('#housing-rooms');
const housingGuestsFilter = mapFilter.querySelector('#housing-guests');
const housingFeaturesFilter = mapFilter.querySelectorAll('[name="features"]');

const onBlockEscKeydown = function (evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    removeMessageBlock();
  }
};

const addFormDisabled = function () {
  formAd.classList.add('ad-form--disabled');
  fieldsetAdd.forEach((element)=>element.disabled=true);
  mapFilter.classList.add('ad-form--disabled');
  selectFilter.forEach((element)=>element.disabled=true);
  fieldsetFilter.disabled=true;
};

const removeFormDisabled = function () {
  formAd.classList.remove('ad-form--disabled');
  fieldsetAdd.forEach((element)=>element.disabled=false);
  mapFilter.classList.remove('ad-form--disabled');
  selectFilter.forEach((element)=>element.disabled=false);
  fieldsetFilter.disabled=false;
};

addFormDisabled();

const removeMessageBlock = function () {
  let blockClose = document.querySelector('.success');
  if (!blockClose) {
    blockClose = document.querySelector('.error');
  }
  bodyBlock.removeChild(blockClose);
  document.removeEventListener('keydown', onBlockEscKeydown);
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('click', onBlockClick);
};

const onBlockClick = function (evt) {
  evt.preventDefault();
  removeMessageBlock();
};

const showSuccessMessage = function () {
  const successTemplate = bodyBlock.querySelector('#success').content.querySelector('.success');
  const successMessage = successTemplate.cloneNode(true);
  bodyBlock.appendChild(successMessage);
  document.addEventListener('click',onBlockClick);
  document.addEventListener('keydown',onBlockEscKeydown);
};

const showErrorMessage = function () {
  const errorTemplate = bodyBlock.querySelector('#error').content.querySelector('.error');
  const buttonError = errorTemplate.querySelector('.error__button');
  const errorMessage = errorTemplate.cloneNode(true);

  bodyBlock.appendChild(errorMessage);
  document.addEventListener('click',onBlockClick);
  document.addEventListener('keydown',onBlockEscKeydown);
  buttonError.addEventListener('click',onBlockClick);
};

const setHousingTypeClick = function (cb) {
  housingTypeFilter.addEventListener('click',(evt)=>{
    filterValue.housingType = evt.target.value;
    cb();
  });
};

const setHousingPriceClick = function (cb) {
  housingPriceFilter.addEventListener('click',(evt)=>{
    filterValue.housingPrice = evt.target.value;
    cb();
  });
};

const setHousingRoomsClick = function (cb) {
  housingRoomsFilter.addEventListener('click',(evt)=>{
    filterValue.housingRooms = evt.target.value;
    cb();
  });
};

const setHousingGuestsClick = function (cb) {
  housingGuestsFilter.addEventListener('click',(evt)=>{
    filterValue.housingGuests = evt.target.value;
    cb();
  });
};

const setHousingFeaturesClick = function(cb) {
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

export {removeFormDisabled, formAd, showSuccessMessage, showErrorMessage};
export {setHousingTypeClick,setHousingPriceClick,setHousingRoomsClick,setHousingGuestsClick,setHousingFeaturesClick};
