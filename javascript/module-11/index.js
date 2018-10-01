'use strict';
const laptops = [
  {
    size: 13,
    color: 'white',
    price: 28000,
    release_date: 2015,
    name: 'Macbook Air White 13"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 13,
    color: 'grey',
    price: 32000,
    release_date: 2016,
    name: 'Macbook Air Gray 13"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 13,
    color: 'black',
    price: 35000,
    release_date: 2017,
    name: 'Macbook Air Black 13"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 15,
    color: 'white',
    price: 45000,
    release_date: 2015,
    name: 'Macbook Air White 15"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 15,
    color: 'grey',
    price: 55000,
    release_date: 2016,
    name: 'Macbook Pro Gray 15"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 15,
    color: 'black',
    price: 45000,
    release_date: 2017,
    name: 'Macbook Pro Black 15"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 17,
    color: 'white',
    price: 65000,
    release_date: 2015,
    name: 'Macbook Air White 17"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 17,
    color: 'grey',
    price: 75000,
    release_date: 2016,
    name: 'Macbook Pro Gray 17"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 17,
    color: 'black',
    price: 80000,
    release_date: 2017,
    name: 'Macbook Pro Black 17"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
];

const itemsList = document.querySelector('.js-items-list');
const source = document.querySelector('#item__template').innerHTML.trim();
const template = Handlebars.compile(source);

generateMarkup(laptops);
const filterBtn = document.querySelector('.filter-btn');
filterBtn.addEventListener('click', onFilter);
const clearBtn = document.querySelector('.clear-btn');
clearBtn.addEventListener('click', onClear);
let filter = { size: [], color: [], release_date: [] };

function onFilter(event) {
  event.preventDefault();
  const parentNode = event.currentTarget.parentNode;
  const checkBoxes = Array.from(parentNode.querySelectorAll('input[type=checkbox]'),).filter(checBox => checBox.checked);
  if (checkBoxes.length !== 0) {
    const selectedValues = checkBoxes.map(checkBox => checkBox.parentNode);
    selectedValues.forEach(selectedValue => {
      const filteredValue = selectedValue.control.attributes.value.nodeValue;
      const filteredKey = selectedValue.control.attributes.name.nodeValue;
      filter[filteredKey].push(filteredValue);
    });
    const filteredEntities = laptops.filter(laptop => {
      if (applyFilter(filter, laptop)) return laptop;
    });
    filter = { size: [], color: [], release_date: [] };
    generateMarkup(filteredEntities);
  }
}

function applyFilter(filter, laptop) {
  const sizeFilter = filter.size;
  if (
    sizeFilter.length !== 0 &&
    !sizeFilter.some(element => Number(element) === laptop.size)
  )
    return false;

  const colorFilter = filter.color;
  if (
    colorFilter.length !== 0 &&
    !colorFilter.some(element => element === laptop.color)
  )
    return false;

  const releaseDateFilter = filter.release_date;
  if (
    releaseDateFilter.length !== 0 &&
    !releaseDateFilter.some(
      element => Number(element) === laptop.release_date,
    )
  )
    return false;

  return true;
}

function generateMarkup(laptopsList) {
  const markup = laptopsList.reduce((acc, item) => acc + template(item), '');
  Array.from(itemsList.children).forEach(child => child.remove());
  itemsList.insertAdjacentHTML('afterbegin', markup);
}

function onClear() {
  generateMarkup(laptops);
}