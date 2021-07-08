import React from 'react';
import './error.css';

const Error = () => {
   return (
      <>
         <img src={process.env.PUBLIC_URL + '/img/error.jpg'} alt='error'></img>
         <span>Something goes wrong</span>
      </>
   )
}

export default Error