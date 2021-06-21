import {createAdvertisement} from './data.js';

const advertisementListElement = document.querySelector('#map-canvas');
const advertisementTemplate = document.querySelector('#card').content.querySelector('.popup');
const advertisementElement = advertisementTemplate.cloneNode(true);
const fragment = document.createDocumentFragment();
const newAdvertisement = createAdvertisement();

//console.log(newAdvertisement,newAdvertisement.length);

//for (let i=0; i<newAdvertisement[Object.keys(newAdvertisement).length]];i++){
// console.log(newAdvertisement[Object.keys(newAdvertisement).length]);
//console.log(Object.keys(newAdvertisement).length);
//};
//функция для скрытия блока в случае отстуствия данных. Пока не доработана
const addClass = function(element1,element2){
  if (element1===''){
    element2.classList.add('hidden');
  }
};
addClass(newAdvertisement.offer.title,advertisementElement.querySelector('.popup__title'));

//advertisementElement.querySelector('.popup__title').textContent = newAdvertisement.offer.title;
advertisementElement.querySelector('.popup__text--address').textContent =newAdvertisement.offer.address;
advertisementElement.querySelector('.popup__text--price').textContent =`${newAdvertisement.offer.price} ₽/ночь`;
advertisementElement.querySelector('.popup__type').textContent = newAdvertisement.offer.type;
advertisementElement.querySelector('.popup__text--capacity').textContent = `${newAdvertisement.offer.rooms} комнаты для ${newAdvertisement.offer.guests} гостей`;
advertisementElement.querySelector('.popup__text--time').textContent = `Заезд после ${newAdvertisement.offer.checkin}, выезд до ${newAdvertisement.offer.checkin}`;
advertisementElement.querySelector('.popup__features').textContent = newAdvertisement.offer.features;
advertisementElement.querySelector('.popup__description').textContent = newAdvertisement.offer.description;

const popupPhotos = advertisementElement.querySelector('.popup__photos');
newAdvertisement.offer.photos.forEach((value,index)=> {
  let photoNew = '';
  index>0 ? photoNew = document.createElement('img') : photoNew = advertisementElement.querySelector('.popup__photo');
  photoNew.src=value;
  photoNew.classList.add('popup__photo');
  //photoNew.classList.add('hidden');
  photoNew.style.width=`${45}px`;
  photoNew.style.height=`${40}px`;
  popupPhotos.appendChild(photoNew);
});

advertisementElement.querySelector('.popup__avatar').src = newAdvertisement.author.avatar;
fragment.appendChild(advertisementElement);
advertisementListElement.appendChild(fragment);
