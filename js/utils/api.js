const getData = (onSuccess,onFail) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response;
      }
      onFail();
    })
    .then((response) => response.json())
    .then((advertisements) => onSuccess(advertisements))
    .catch(() => onFail());
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
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};
export {getData , sendData};
