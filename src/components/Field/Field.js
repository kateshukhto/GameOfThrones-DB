import React from 'react';

const Field = ({ data, field, label }) => {
   return (
      <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{data[field]}</span>
      </li>
   )
}

export default Field

