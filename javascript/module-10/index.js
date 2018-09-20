"use strict";

/*
  Написать приложение для работы с REST сервисом, 
  все функции делают запрос и возвращают Promise 
  с которым потом можно работать. 
  
  Реализовать следующий функционал:
  - функция getAllUsers() - должна вернуть текущий список всех пользователей в БД.
  
  - функция getUserById(id) - должна вернуть пользователя с переданным id.
  
  - функция addUser(name, age) - должна записывать в БД юзера с полями name и age.
  
  - функция removeUser(id) - должна удалять из БД юзера по указанному id.
  
  - функция updateUser(id, user) - должна обновлять данные пользователя по id. 
    user это объект с новыми полями name и age.
  Документацию по бэкенду и пример использования прочитайте 
  в документации https://github.com/trostinsky/users-api#users-api.
  Сделать минимальный графический интерфейс в виде панели с полями и кнопками. 
  А так же панелью для вывода результатов операций с бэкендом.
*/

const refs = {
  url: "https://test-users-api.herokuapp.com/users",
  formAllUsers: document.querySelector(".js-all-users"),
  btnAllUsers: document.querySelector(".js-btn-all-users"),
  tBody: document.querySelector(".result-all-users"),
  formUserById: document.querySelector(".js-user-by-id"),
  inputUserById: document.querySelector(".user-by-id"),
  btnUserById: document.querySelector(".js-btn-user-by-id"),
  resultUserById: document.querySelector(".result-user-by-id"),
  formAddUser: document.querySelector(".js-add-user"),
  inputNewName: document.querySelector(".new-name"),
  inputNewAge: document.querySelector(".new-age"),
  resultNewUser: document.querySelector(".result-new-user"),
  formRemoveUser: document.querySelector(".js-remove-user"),
  inputRemoveUser: document.querySelector(".id-remove"),
  resultRemoveUser: document.querySelector('.result-remove-user'),
  formUpdate: document.querySelector('.js-update-user'),
  inputUpdateId: document.querySelector('.input-update-id'),
  inputUpdateName: document.querySelector('.input-update-name'),
  inputUpdateAge: document.querySelector('.input-update-age'),
  resultUpdate: document.querySelector('.result-update'),
};
//все пользователи в БД.

refs.formAllUsers.addEventListener("submit", handleGetAllUsers);

function handleGetAllUsers(e) {
  e.preventDefault();
  fetchUsers().then(updateView);
}

function updateView (users) {
  const arr = users.data;
  const htmlString = arr.reduce((acc, user) => acc + createTableRow(user), "");
  refs.tBody.innerHTML = htmlString;
}

function createTableRow({
  id,
  name,
  age
}) {
  return `
    <tr>
    <td>${id}</td>
    <td>${name}</td>
    <td>${age}</td>
    </tr>
    `;
}

function fetchUsers() {
  return fetch (refs.url)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error ("Error fetching data");
    })
    .catch(error => {
      console.error("Error: ", error);
    });
}

//- функция возврата пользователя по переданному id.

refs.formUserById.addEventListener ("submit", handleGetUserById);

function handleGetUserById(e) {
  e.preventDefault();
  fetchUsers().then(findUserById);
}

function findUserById (info) {
  const array = info.data;
  const user = array.find (el => el.id === refs.inputUserById.value);
  if (user === undefined) {
    refs.resultUserById.textContent = `Такого пользователя нет!`;
  } else
    refs.resultUserById.innerHTML = `<ul>
               <li>ID: ${user.id}</li>
               <li>Name: ${user.name}</li>
              <li>Age: ${user.age}</li>;
             </ul>`;
}

// - функция создания в БД юзера с полями name и age.

refs.formAddUser.addEventListener ("submit", handleAddNewUser);

function handleAddNewUser(e) {
  e.preventDefault();
  fetchNewUser();
  updateData();
}

function updateData() {
  refs.resultNewUser.textContent = `New user ${refs.inputNewName.value} successfully added`;
}

function fetchNewUser() {
  fetch (refs.url, {
      method: 'POST',
      body: JSON.stringify({
        name: `${refs.inputNewName.value}`,
        age: `${refs.inputNewAge.value}`
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then (response => response.json())
    .catch(error => console.log ('ERROR' + error));
}

//- функция удаления из БД юзера по указанному id.

refs.formRemoveUser.addEventListener("submit", handleRemoveUser);

function handleRemoveUser(e) {
  e.preventDefault();
  fetchUsers().then (findUserForRemove);
}

function findUserForRemove(info) {
  const arr = info.data;
  const user = arr.find(el => el.id === refs.inputRemoveUser.value);

  if (user === undefined) {
    refs.resultRemoveUser.textContent = `User ${refs.inputRemoveUser.value} isn't found`;
  } else {
    fetchRemoveUser();
    updateAfterRemoving();
  }
}

function updateAfterRemoving() {
  refs.resultRemoveUser.textContent = `User ${refs.inputRemoveUser.value} successfully deleted`;
}

function fetchRemoveUser() {
  fetch(`https://test-users-api.herokuapp.com/users/${refs.inputRemoveUser.value}`, {
      method: "DELETE"
    })
    .then(response => response.json())
    .catch(error => console.log('ERROR' + error));
}

//  - функция обновления данных пользователя по id. 

refs.formUpdate.addEventListener ("submit", handleUpdate);

function handleUpdate(e) {
  e.preventDefault();
  fetchUsers().then(findUserForUpdate);
}

function findUserForUpdate (info) {
  const arr = info.data;
  const user = arr.find(el => el.id === refs.inputUpdateId.value);

  if (user === undefined) {
    refs.resultUpdate.textContent = `User ${refs.inputUpdateId.value} isn't found`;
  } else {
    fetchUpdate();
    updateUser();
  }
}

function updateUser() {
  refs.resultUpdate.textContent = `New user ${refs.inputUpdateId.value} successfully updated`;
}

function fetchUpdate() {
  fetch(`https://test-users-api.herokuapp.com/users/${refs.inputUpdateId.value}`, {
      method: "PUT",
      body: JSON.stringify({
        name: `${refs.inputUpdateName.value}`,
        age: `${refs.inputUpdateAge.value}`
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .catch(error => console.log('ERROR' + error));
}