import card from '../templates/cards.hbs';

export default class View {
  constructor() {
    this.refs = {};

    this.refs.form = document.querySelector('.js-form');
    this.refs.inputLink = document.querySelector('input[name=link]');
    this.refs.addBtn = document.querySelector('.form button');
    this.refs.container = document.querySelector('#root');
    this.refs.delBtn = document.querySelector('#root');
  }

  createTemplate(dataArr) {
    const markup = card(dataArr);
    this.refs.container.insertAdjacentHTML('afterbegin', markup);
  }

  createTemplateFromLs(arr) {
    const markup = arr.reduce((acc, item) => acc + card(item), '');

    this.refs.container.insertAdjacentHTML('afterbegin', markup);
  }
}