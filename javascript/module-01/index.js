'use strict';
 
const ADMIN_LOGIN = 'admin';
const ADMIN_PASSWORD = 'm4ngo1zh4ackz0r';
const inputLogin = prompt('Введите Ваш login');
let inputPassword;
const inputCancel = 'Отменено пользователем!';
const accessIsDenied = 'Доступ запрещен!';
const welcome = 'Добро пожаловать!';

if (inputLogin === null) {
    alert(inputCancel);
} else if (inputLogin !== ADMIN_LOGIN) {
    alert(accessIsDenied);
} else if (inputLogin === ADMIN_LOGIN) {
    inputPassword = prompt('Введите Ваш пароль');
    if (inputPassword === null) {
        alert(inputCancel);
    } else if (inputPassword !== ADMIN_PASSWORD) {
        alert(accessIsDenied);
    } else if (inputPassword === ADMIN_PASSWORD) {
        alert(welcome);
    }
}