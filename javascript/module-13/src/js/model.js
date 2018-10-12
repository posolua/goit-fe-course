export default class Model {
    constructor(items = []) {
      this._items = items;
    }
  
    getUrl(inputLinkValue) {
      const apiKey = '5ba0af33f2af89d0737b612698e2451865b0a0af180af';
      const url = `https://api.linkpreview.net/?key=${apiKey}&q=${inputLinkValue}`;
      return url;
    }
  
    getLinkData(inputLinkValue) {
      return (
        fetch(this.getUrl(inputLinkValue))
          .then(response => {
            if (response.ok) {
              return response.json();
            }
  
            throw new Error(`Error while fetching: ${response.statusText}`);
          })
          .catch(error => console.log(error))
      );
    }
  
    addData(inputLinkValue) {
      return this.getLinkData(inputLinkValue).then(data => {
        const linksItem = {
          link: inputLinkValue,
          id: Date.now(),
          img: data.image,
          title: data.title,
        };
        this._items.unshift(linksItem);
        return linksItem;
      });
    }
  
    setLocalStorage() {
      localStorage.setItem('links', JSON.stringify(this._items));
    }
  
    getLocalStorage() {
      const linksFromLs = JSON.parse(localStorage.getItem('links'));
      if (linksFromLs !== null) {
        this._items = linksFromLs;
      }
    }
  }