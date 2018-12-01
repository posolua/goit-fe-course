import React from 'react';

const CommentsList = ({ notes }) => (
  <ul>
    {notes.map(({ id, text, rating }) => (
      <li key={id}>
        <span>{text}</span>
        <span> Dish rating: {rating}</span>
      </li>
    ))}
  </ul>
);

export default CommentsList;
