import React from 'react';
import Board from './Board';
import ToggleButton from 'react-toggle-button'
import {calculateWinner, getLocation} from './coreFunctions';

class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            history: [{squares: Array(9).fill(null)}], //array of 9 null places
            xIsNext: true,
            stepNumber: 0,
            stepButtons: Array(10).fill(null),
            isReverse: false,
        }
    }
    handleClick(i){
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      const stepButtons = this.state.stepButtons.slice();
      if(calculateWinner(squares) || squares[i]){
          return;
      }
      squares[i] = this.state.xIsNext ? "X":"O";
      stepButtons[history.length] = i;
      this.setState({
        history: history.concat([{
          squares: squares, 
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
        stepButtons: stepButtons,
      })
    }
    jumpToMove(step){
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      })
    }
    resetGame(){
      const history = this.state.history;
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      history.length = 0;
      squares.length = 0;
      this.setState({
        history: history.concat([{
          squares: squares, 
        }]),
        stepNumber: 0,
        xIsNext: true,
      })
    }

    render() {      
      const history = this.state.history;
      const stepNumber = this.state.stepNumber;
      const current = history[stepNumber];
      const winningSquares = calculateWinner(current.squares);
      const isReverse = this.state.isReverse;
      //map step to move
      let moves = history.map((step, move) => {
          const location = getLocation(this.state.stepButtons[move]);
          const desc = move? "Go to move #" + move +" "+location: "Go to game Start";
          let fontbold = (move === this.state.stepNumber )?'bold':'normal';
          return(
            <li key={move}>
              <button style={{fontWeight:fontbold}} onClick={() => this.jumpToMove(move)}>{desc}</button>
            </li>
          )
      })
      let status;
      if(winningSquares !== null){
          status = "Winner => "+ (this.state.xIsNext ? "O" : "X");
      }else{
        status = (stepNumber===9)? "No Winner => Draw!" : "Next player: " + (this.state.xIsNext ? "X" : "O");
      }
      if(this.state.isReverse){
        moves = moves.sort(function(a,b){return b.key - a.key});//moves.reverse();
      }
      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              winningSquares={winningSquares}
              onClick={(i) => this.handleClick(i)}/>
            <div><button onClick={() => this.resetGame()}>Reset Game</button></div>
          </div>          
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
            <div><ToggleButton value={ this.state.value || false } onToggle={(value) => {
                    this.setState({
                      value: !value,
                      isReverse: !isReverse,
                    })
                  }} /></div>
          </div>
        </div>
      );
    }
  }

  export default Game;
  