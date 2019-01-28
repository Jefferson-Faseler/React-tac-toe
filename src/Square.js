import React from 'react';

function Square(props) {
  return (
    <button onClick={ props.onClick } value={ props.value } className={ props.place }>{ props.symbol }</button>
  )
}

export default Square;
