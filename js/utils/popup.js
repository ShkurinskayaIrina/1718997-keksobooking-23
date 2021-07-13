const TYPE_OFFER = {
  palace : 'Дворец',
  flat : 'Квартира',
  house : 'Дом',
  bungalow :'Бунгало',
  hotel : 'Отель',
};

const setAvailability = function(element , block){
  if (!element){
     return block.classList.add('hidden');
  }
  if (block.textContent){
    return block.textContent = element;
  }

  return block.src = element;
};

const setFeatures = function(elements , block){
  block.forEach((item)=>{
    const modifier = item.classList[1];
    if (!elements.includes(modifier)){item.remove();}
  });
};

const setPhoto = function(elements , block, blockPresent){
  elements.forEach((value , index)=> {
    let photoNew = '';
    index>0 ? photoNew = document.createElement('img') : photoNew = blockPresent;
    photoNew.src=value;
    photoNew.classList.add('popup__photo');
    photoNew.style.width=`${45}px`;
    photoNew.style.height=`${40}px`;
    block.appendChild(photoNew);
  });
};

const createPopup = function(advertisement){
  const advertisementTemplate = document.querySelector('#card').content.querySelector('.popup');
  const advertisementElement = advertisementTemplate.cloneNode(true);
  const avatar = advertisement.author.avatar;
  const popupAvatar = advertisementElement.querySelector('.popup__avatar');

  const title = advertisement.offer.title;
  const popupTitle = advertisementElement.querySelector('.popup__title');

  const address = advertisement.offer.address;
  const popupTextAddress = advertisementElement.querySelector('.popup__text--address');

  const price = `${advertisement.offer.price} ₽/ночь`;
  const popupTextPrice = advertisementElement.querySelector('.popup__text--price');

  const type = TYPE_OFFER[advertisement.offer.type];
  const popupType = advertisementElement.querySelector('.popup__type');

  let capacityText = ' комнат для ';
  if (advertisement.offer.rooms===1){
    capacityText=' комната для ';
  } else if (advertisement.offer.rooms>1 && advertisement.offer.rooms<5){
    capacityText=' комнаты для ';
  }

  const capacity = `${advertisement.offer.rooms} ${capacityText} ${advertisement.offer.guests} гостей`;
  const popupTextCapacity = advertisementElement.querySelector('.popup__text--capacity');

  const textTime = `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}`;
  const popupTextTime = advertisementElement.querySelector('.popup__text--time');

  const description = advertisement.offer.description;
  const popupDescription = advertisementElement.querySelector('.popup__description');

  const popupFeatureBlock = advertisementElement.querySelector('.popup__features');
  const popupFeatureList = advertisementElement.querySelectorAll('.popup__feature');

  const photos = advertisement.offer.photos;
  const popupPhotos = advertisementElement.querySelector('.popup__photos');
  const popupPhoto = advertisementElement.querySelector('.popup__photo');

  setAvailability(avatar,popupAvatar);
  setAvailability(title , popupTitle);
  setAvailability(address , popupTextAddress);
  setAvailability(price , popupTextPrice);
  setAvailability(type , popupType);
  setAvailability(capacity , popupTextCapacity);
  setAvailability(textTime , popupTextTime);
  setAvailability(description , popupDescription);


  let  modifiersFeatures='';
  if (advertisement.offer.features){
    modifiersFeatures = advertisement.offer.features.map((feature) => `popup__feature--${feature}`);
    setFeatures(modifiersFeatures,popupFeatureList);
  } else {popupFeatureBlock.classList.add('hidden');}

  if (photos){
    setPhoto(photos, popupPhotos, popupPhoto);
  } else {popupPhotos.classList.add('hidden');}


  return advertisementElement;
};

export {createPopup};
