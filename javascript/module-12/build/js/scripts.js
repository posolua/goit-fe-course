'use strict';

var form = document.querySelector('.js-form');
var inputLink = document.querySelector('input[name=link]');
var addBtn = document.querySelector('.form button');
var container = document.querySelector('#root');
var sourse = document.querySelector('#card').innerHTML.trim();
var delBtn = document.querySelector('#root');

addBtn.addEventListener('click', onClickAdd);
delBtn.addEventListener('click', onClickDel);

var constants = {
  links: []
};

createTemplateFromLs();

function onClickDel(evt) {

  var target = evt.target;
  var nodeName = target.nodeName;
  var action = target.dataset.action;

  if (nodeName !== 'BUTTON' || action !== 'delete') return;

  var parent = evt.target.closest('.link-card');

  var id = Number(evt.target.parentNode.dataset.id);
  var updatedLinksList = constants.links.filter(function (val) {
    return val.id !== id;
  });
  constants.links = updatedLinksList;
  setLocalStorage();
  parent.remove();
  console.log('constants.links', constants.links);
}

function onClickAdd(evt) {
  var target = evt.target;
  var action = target.dataset.action;
  if (target.nodeName !== 'BUTTON' || action !== 'add') return;
  evt.preventDefault();

  if (!isEnteredUrlValid()) {
    form.reset();
    return;
  };

  getLinkData().then(function (data) {
    console.log('data', data);

    var linksItem = {
      link: inputLink.value.trim(),
      id: Date.now(),
      img: data.image,
      title: data.title
    };

    constants.links.unshift(linksItem);
    createTemplate();
    console.log('constants.links:', constants.links);

    setLocalStorage();
    form.reset();
  });
}

function isEnteredUrlValid() {
  var enteredUrl = inputLink.value.trim();
  var isUrlValid = /^((https?|ftp)\:\/\/)/.test(enteredUrl);
  var isValid = function isValid(val) {
    return val.link === inputLink.value.trim();
  };
  var isLinkValid = constants.links.some(isValid);

  if (!isUrlValid) {
    alert('Your URL is not valid');
    return false;
  };
  if (isLinkValid) {
    alert('Such a bookmark already exists');
    return false;
  }

  return true;
}

function createTemplate() {
  var template = Handlebars.compile(sourse);
  var markup = template(constants.links[0]);
  container.insertAdjacentHTML('afterbegin', markup);
}

function createTemplateFromLs() {
  var linksFromLs = JSON.parse(localStorage.getItem('links'));
  if (linksFromLs !== null) {
    constants.links = linksFromLs;
    var template = Handlebars.compile(sourse);
    console.log('templete from ls', template);
    var markup = constants.links.reduce(function (acc, item) {
      return acc + template(item);
    }, '');
    container.insertAdjacentHTML('afterbegin', markup);
  };
}

function getLinkData() {
  var apiKey = '5ba0af33f2af89d0737b612698e2451865b0a0af180af';
  var getLink = inputLink.value.trim();
  var url = 'https://api.linkpreview.net/?key=' + apiKey + '&q=' + getLink;

  return fetch(url).then(function (response) {
    console.log('response.json()', response.json);
    if (response.ok) {
      return response.json();
    };

    throw new Error('Error while fetching: ' + response.statusText);
  }).catch(function (error) {
    return console.log(error);
  });
}

function setLocalStorage() {
  localStorage.setItem('links', JSON.stringify(constants.links));
}