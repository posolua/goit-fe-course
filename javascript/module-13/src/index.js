import Model from './js/model';
import View from './js/view';
import Controller from './js/controller';
import styles from './sass/styles.scss';


const view = new View();

const model = new Model();

new Controller(view, model);
