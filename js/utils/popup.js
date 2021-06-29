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
  if (!elements){
    return block.classList.add('hidden');
  }
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

  const type = advertisement.offer.type;
  const popupType = advertisementElement.querySelector('.popup__type');

  const capacity = `${advertisement.offer.rooms} комнаты для ${advertisement.offer.guests} гостей`;
  const popupTextCapacity = advertisementElement.querySelector('.popup__text--capacity');

  const textTime = `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkin}`;
  const popupTextTime = advertisementElement.querySelector('.popup__text--time');

  const description = advertisement.offer.description;
  const popupDescription = advertisementElement.querySelector('.popup__description');

  const popupFeatureList = advertisementElement.querySelectorAll('.popup__feature');
  const  modifiersFeatures = advertisement.offer.features.map((feature) => `popup__feature--${feature}`);

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

  setFeatures(modifiersFeatures,popupFeatureList);
  setPhoto(photos, popupPhotos, popupPhoto);

  return advertisementElement;
};

export {createPopup};
