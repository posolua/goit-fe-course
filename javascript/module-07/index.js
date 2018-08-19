'use strict'
/*
  1. Модифицируйте готовую функцию createPostCard() из задания 
    номер 6 (https://codepen.io/goit-fe-adv/pen/MVPaeZ) так, 
    чтобы она принимала объект post с данными для заполнения полей 
    в карточке.
      
  2. Создайте функцию createCards(posts), которая принимает массив
    объектов-карточек, вызывает функцию createPostCard(post) столько
    раз, сколько объектов в массиве, сохраняя общий результат и возвращает 
    массив DOM-элементов всех постов.
    
  3. Повесьте все посты в какой-то уже существующий DOM-узел.
*/

const posts = [
    {
      img: "https://placeimg.com/400/150/arch",
      title: "Post title 1",
      text:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
      link: "link-1.com"
    },
    {
      img: "https://placeimg.com/400/150/nature",
      title: "Post title 2",
      text:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
      link: "link-2.com"
    },
    {
      img: "https://placeimg.com/400/150/arch",
      title: "Post title 3",
      text:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
      link: "link-3.com"
    }
  ];
  const createImage = img => {
    const images = document.createElement("img");
    images.classList.add("post__image");
    images.setAttribute("src", img);
    images.setAttribute("alt", "post image");

    return images;
  };

const createTitle = title => {
    const titles = document.createElement("h2");
    titles.classList.add("post__title");
    titles.textContent = title;

    return titles;
  };
  const createTextParagraph = text => {
    const textes = document.createElement("p");
    textes.classList.add("post__text");
    textes.textContent = text;

    return textes;
  };

  const createButton = link => {
    const button = document.createElement("a");
    button.classList.add("button");
    button.setAttribute("href", link);
    button.textContent = "Read more";

    return button;
  };

  const createPostCard = ({img, title, text, link}) => {
    const postCard = document.createElement('div');
    postCard.classList.add('post');
    
    postCard.append(createImage(img), createTitle(title), createTextParagraph(text), createButton(link))
    return postCard;
  }
  
  const createCards = posts => {
    return posts.map(post => createPostCard(post));
  }
  
  const cards = createCards(posts);
  
  document.querySelector('.cards').append(...cards);