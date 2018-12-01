import React from 'react';

const OrderHistory = ({ items }) => (
  <div className="table-wrapper">
    <table className="order-table">
      <tbody>
        <tr className="order-table__head">
          <th>Date</th>
          <th>Price</th>
          <th>Delivery Adress</th>
          <th>Rating</th>
        </tr>
        {items.map(item => (
          <tr className="order-table__row" key={item.id}>
            <td>{item.date}</td>
            <td>{item.price}</td>
            <td>{item.address}</td>
            <td>{item.rating}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default OrderHistory;
