const getRandomIntNumber = function(minNumber,maxNumber){
  if (minNumber>maxNumber){
    const buff = minNumber;
    minNumber=maxNumber;
    maxNumber=buff;
  }
  const rendomNumber=Math.floor(Math.random()*(maxNumber-minNumber+1)+minNumber);
  return rendomNumber;
};
getRandomIntNumber(1,30);

const getRandomFractionNumber = function(minNumber,maxNumber,numberOfDecimals){
  if (minNumber>maxNumber){
    const buff = minNumber;
    minNumber=maxNumber;
    maxNumber=buff;
  }
  const rendomNumber=Math.random()*(maxNumber-minNumber)+minNumber;
  const roundRendomNumber=Number(rendomNumber.toFixed(numberOfDecimals));
  return roundRendomNumber;
};
getRandomFractionNumber(0,1,3);
