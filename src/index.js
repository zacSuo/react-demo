import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}

function calculateWinner(squares){
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
    for (let i=0;i<lines.length;i++){
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a] == squares[b] && squares[a] == squares[c])
        {
            return squares[a];
        }
    }
    return null;
}

function getStrByNext(flag){
    return flag?'X':'O';
  }

class Board extends React.Component {

  renderSquare(i) {
    return (
        <Square 
            value={this.props.squares[i]}
            onClick = {() => this.props.onClick(i)}
        />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(){
    super();
    this.state = {
        history:[{
            squares:Array(9).fill(null),
        }],
        xIsNext:true,
        currentIdx:0,
    };
  }

  handleClick(i){
    const history = this.state.history;
    const squares = history[this.state.currentIdx].squares.slice();
    const lastSquares = history[history.length - 1].squares;
    if(calculateWinner(lastSquares) || lastSquares[i]){
        return;
    }
    squares[i] = getStrByNext(this.state.xIsNext);
    this.setState({
        history:history.concat([{
                squares:squares
            }]),
        xIsNext: !this.state.xIsNext,
        currentIdx: this.state.currentIdx + 1,
    });
  }

  jumpTo(step){
    this.setState({
        currentIdx:step,
        xIsNext:(step % 2)?false:true,
    })
  }

  render() {
    const history = this.state.history
    const squares = history[this.state.currentIdx].squares;
    const winner = calculateWinner(squares);

    const moves = history.map((step,move) =>{
        const desc = move?'Move #'+move:'Game Start';
        return(
            <li key={move}>
                <a href="#" onClick={() => this.jumpTo(move)} >{desc}</a>
            </li>
        )
    })

    let status;
    if(winner){
        status = 'Winner: ' + winner;
    }else{
        status = 'Next player: ' + getStrByNext(this.state.xIsNext);
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{ status}</div>
          <ol>{ moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
