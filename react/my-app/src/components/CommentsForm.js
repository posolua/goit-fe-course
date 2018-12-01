/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

const INITIAL_STATE = {
  rating: '',
  text: '',
};

export default class CommentsForm extends Component {
  state = { ...INITIAL_STATE };

  handleChange = e => {
    // console.log('e.target.name: ', e.target.name);
    // console.log('e.target.value: ', e.target.value);

    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.rating, this.state.text);

    this.setState({ ...INITIAL_STATE });
  };

  render() {
    // console.log('comform state', this.state);
    const { text, rating } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <textarea
          rows="5"
          cols="45"
          name="text"
          value={text}
          onChange={this.handleChange}
          placeholder="Add your comment"
        />

        <label>
          Rate the dish
          <select name="rating" value={rating} onChange={this.handleChange}>
            <option value="" disabled>
              ...
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </label>
        <button type="submit">Add comment</button>
      </form>
    );
  }
}
