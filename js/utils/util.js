//модуль с вспомогательными функциями
//import {TYPE_OFFER,CHECK,FEATURES,PHOTOS} from './data.js';

const getRandomPositive = function(count1,count2,countOfDecimals=0){
  const lower = Math.ceil(Math.min(Math.abs(count1), Math.abs(count2)));
  const upper = Math.floor(Math.max(Math.abs(count1), Math.abs(count2)));
  let result=0;
  if (countOfDecimals!==0){
    result = Math.random() * (upper - lower) + lower;
    return result.toFixed(countOfDecimals);
  }
  result = Math.random() * (upper - lower+1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositive(0, elements.length - 1)];

export {getRandomPositive, getRandomArrayElement};

