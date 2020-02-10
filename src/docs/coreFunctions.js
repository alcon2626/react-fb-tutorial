export function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    let winnerSquares=[];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            winnerSquares[0] = lines[i];
            return winnerSquares;
        }
    }
    return null;
  }

  export function getLocation(i){
    let col =  (i % 3) + 1;
    let row = (i < 3)? 1: (i < 6)? 2: 3
    return "(" + col + "," + row +")";
  }

  export default calculateWinner;