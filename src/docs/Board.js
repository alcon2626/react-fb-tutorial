import React from 'react';
import Square from './Square';

class Board extends React.Component {
    renderSquare(i, highlightSquare) {
        return <Square  value={this.props.squares[i]} //pass value to square
                        onClick={() => this.props.onClick(i)}
                        highlightSquare={highlightSquare}/>; //pass function to square
    }
    render() {  
        let winningSquares = this.props.winningSquares;
        let boardSquares = [];
        for(let row = 0; row < 3; row++){
            let boardRow = [];
            let highlightSquare = false;
            for(let col = 0; col < 3; col++){  
                if(winningSquares !== null){
                    for(let x = 0; x < 3; x++ ){
                        if((row * 3) + col === winningSquares[0][x]){highlightSquare = true;};
                    }
                }   
                boardRow.push(<span key={(row * 3) + col}>{this.renderSquare((row * 3) + col, highlightSquare)}</span>);
                highlightSquare = false;
            }
            boardSquares.push(<div className="board-row" key={row}>{boardRow}</div>);
        }
        return (
            <div>{boardSquares}
            </div>
        );
    }    
  }

  

  export default Board;