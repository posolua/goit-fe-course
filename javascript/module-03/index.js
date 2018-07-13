'use strict'

const logins = ["Mango", "robotGoogles", "Poly", "Aj4x1sBozz", "qwerty123"];
let login= prompt('Введите Ваш login')

const checkLoginValidity = function(login) {
 
  if(login.length >=4 && login.length<=16){
    return true;
  }
  return false;
}
const validLogin=checkLoginValidity(login);
console.log(validLogin);

const checkIfLoginExists = function(logins, login) {
  if(logins.includes(login)) {
    return true;
  }
  return false;
}
const existLogin = checkIfLoginExists(logins, login);
console.log(existLogin);

const addLogin = function(logins, login) {
  console.log(login);
   checkLoginValidity(login);
  console.log(validLogin);
  
     if(!validLogin){
      return alert('Ошибка! Логин должен быть от 4 до 16 символов');
     } else {
     checkIfLoginExists(logins, login);
     }
       if(existLogin) {
          alert('Такой логин уже используется!');
       } else{
         logins.push(login);
         alert('Логин успешно добавлен!');
       }  
}

addLogin(logins, login);
console.log(logins);