let timeoutId;
const waitNextPress = (func, delay) => {
  return (...agrs) => {
    //you return function that can contain alot of function becuase ...agrs and you can call it in any time
    //it sepred all agrument
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, agrs); //it make like this (agr1,agr2,arg3....) and add it to func
    }, delay);
  };
};
