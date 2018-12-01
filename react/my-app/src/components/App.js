/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import AppHeader from './AppHeader';
import orderJson from '../json/order-history.json';
import menuJson from '../json/menu.json';
import OrderHistory from './OrderHistory';
import DishMenu from './DishMenu';
import MenuFilter from './MenuFilter';
import CommentsList from './CommentsList';
import CommentsForm from './CommentsForm';

const filterMenuDishes = (filter, dishes) =>
  dishes.filter(dish => dish.name.toLowerCase().includes(filter.toLowerCase()));

export default class App extends Component {
  state = {
    filter: '',
    notes: [],
  };

  handleAddNote = (rating, text) => {
    this.setState(prevState => ({
      notes: [{ id: Date.now(), rating, text }, ...prevState.notes],
    }));
  };

  handleFilterChange = e => {
    // console.log(e.target.value);
    this.setState({
      filter: e.target.value,
    });
  };

  render() {
    // console.log('App state', this.state);

    const { filter } = this.state;
    // console.log('filter', filter);

    const filteredDishes = filterMenuDishes(filter, menuJson);

    return (
      <div>
        <AppHeader />
        <OrderHistory items={orderJson} />

        <MenuFilter filter={filter} onFilterChange={this.handleFilterChange} />

        <DishMenu items={filteredDishes} />
        <CommentsForm onSubmit={this.handleAddNote} />
        <CommentsList notes={this.state.notes} />
      </div>
    );
  }
}
