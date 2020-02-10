import React from 'react';

  function Square(props) {
    let textColor = (props.highlightSquare)? 'green': 'black';
    return (
      <button className="square" style={{color:textColor}} onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

  export default Square;