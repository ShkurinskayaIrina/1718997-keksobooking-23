import {isEscEvent} from './util.js';

const formAd = document.querySelector('.ad-form');

const fieldsetAdd = formAd.querySelectorAll('fieldset');
const bodyBlock = document.querySelector('body');

const mapFilter = document.querySelector('.map__filters');
// const HousingTypeFilter = mapFilter.querySelector('[name="housing-type"]');
// const checkboxFilters = mapFilter.querySelectorAll('[type="checkbox"]');

const selectFilter = mapFilter.querySelectorAll('select');
const fieldsetFilter = mapFilter.querySelector('fieldset');

const onBlockEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    removeMessageBlock();
  }
};

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
};

addFormDisabled();

const removeMessageBlock = function() {
  let blockClose = document.querySelector('.success');
  if (!blockClose) {
    blockClose = document.querySelector('.error');
  }
  bodyBlock.removeChild(blockClose);
  document.removeEventListener('keydown', onBlockEscKeydown);
  document.removeEventListener('click', onBlockClick);
};

const onBlockClick = (evt) =>{
  evt.preventDefault();
  removeMessageBlock();
};

const showSuccessMessage = function () {
  //добавление сообщения об удачной отправке
  const successTemplate = bodyBlock.querySelector('#success').content.querySelector('.success');
  const successMessage = successTemplate.cloneNode(true);
  bodyBlock.appendChild(successMessage);
  document.addEventListener('click',onBlockClick);
  document.addEventListener('keydown',onBlockEscKeydown);
};

const showErrorMessage = function (){
  //добавление сообщения об ошибке
  const errorTemplate = bodyBlock.querySelector('#error').content.querySelector('.error');
  const buttonError = errorTemplate.querySelector('.error__button');
  const errorMessage = errorTemplate.cloneNode(true);

  bodyBlock.appendChild(errorMessage);
  document.addEventListener('click',onBlockClick);
  document.addEventListener('keydown',onBlockEscKeydown);
  buttonError.addEventListener('click',onBlockClick);
};

export {removeFormDisabled, formAd, showSuccessMessage, showErrorMessage};
