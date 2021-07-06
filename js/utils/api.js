import {showAlert} from './util.js';

const getData = (onSuccess) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response;
      }
       showAlert('Не удалось загрузить данные. Перезагрузите страницу');
    })
    .then((response) => response.json())
    .then((advertisements) => onSuccess(advertisements))
    .catch(() => showAlert('Не удалось загрузить данные. Перезагрузите страницу'));
};

  const sendData = function(onSuccess, onFail, body){
  fetch('https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response)=> {
      if (response.ok){
        onSuccess();
        // при успешной отправке формы или при очищении формы
        // все поля должны вернуться в изначальное состояние,
        //фильтрация сбрасывается,
        // метка адреса возвращается в исходное положение
        // значение поля соответствует метке
        // просто при удачной отправке формы п.2.6
      } else {
        onFail();
        // при НЕудачной отправке формы п.2.7 и заполенные данные НЕ обнуляются
      // onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail();
    // onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};
export {getData , sendData};
