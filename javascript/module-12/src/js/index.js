'use strict';
const form = document.querySelector('.js-form');
const inputLink = document.querySelector('input[name=link]');
const addBtn = document.querySelector('.form button');
const container = document.querySelector('#root');
const sourse = document.querySelector('#card').innerHTML.trim();
const delBtn = document.querySelector('#root');

addBtn.addEventListener('click', onClickAdd);
delBtn.addEventListener('click', onClickDel);

const constants = {
  links: [],
};

createTemplateFromLs();

function onClickDel(evt) {

  const target = evt.target;
  const nodeName = target.nodeName;
  const action = target.dataset.action;

  if (nodeName !== 'BUTTON' || action !== 'delete') return;

  const parent = evt.target.closest('.link-card');

  const id = Number(evt.target.parentNode.dataset.id);
  const updatedLinksList = constants.links.filter(val=>val.id!==id);
  constants.links = updatedLinksList;
  setLocalStorage();
  parent.remove();
  console.log('constants.links',constants.links);
}

function onClickAdd(evt) {
  const target = evt.target;
  const action = target.dataset.action;
  if (target.nodeName !== 'BUTTON'||action !== 'add') return;
  evt.preventDefault();

  if (!isEnteredUrlValid()) {
    form.reset();
    return
  };
  
  getLinkData().then(data =>{
    console.log('data',data);

    const linksItem = {
    link: inputLink.value.trim(),
    id: Date.now(),
    img: data.image,
    title: data.title,
    };

    constants.links.unshift(linksItem);
    createTemplate();
    console.log('constants.links:', constants.links);

    setLocalStorage();
    form.reset();
  });

}

function isEnteredUrlValid() {
  const enteredUrl = inputLink.value.trim();
  const isUrlValid = /^((https?|ftp)\:\/\/)/.test(enteredUrl);
  const isValid = val => val.link === inputLink.value.trim();
  const isLinkValid = constants.links.some(isValid);

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
  const template = Handlebars.compile(sourse);
  const markup = template(constants.links[0]);
  container.insertAdjacentHTML('afterbegin', markup);
}

function createTemplateFromLs() {
  const linksFromLs = JSON.parse(localStorage.getItem('links'));
  if(linksFromLs !== null){
    constants.links = linksFromLs;
    const template = Handlebars.compile(sourse);
    console.log('templete from ls',template);
    const markup = constants.links.reduce((acc,item)=>acc + template(item),'');
    container.insertAdjacentHTML('afterbegin', markup);
  };
}

function getLinkData() {
  const apiKey = '5ba0af33f2af89d0737b612698e2451865b0a0af180af';
  const getLink = inputLink.value.trim();
  const url = `https://api.linkpreview.net/?key=${apiKey}&q=${getLink}`;
   
  return fetch(url)
  .then(response =>{
    console.log('response.json()', response.json);
    if(response.ok) {return response.json()};

    throw new Error(`Error while fetching: ${response.statusText}`);
  })
  .catch(error => console.log(error));
}

function setLocalStorage() {
  localStorage.setItem('links',JSON.stringify(constants.links));
}