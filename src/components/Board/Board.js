import "./Board.scss";
import data from "../../assets/data.json";
import Square from "../Square/Square";
import reducer, { initialStates } from "../../reducers";
import React from "react";

const snakes = data.snakes;
const ladders = data.ladders;

function foundSnake(squareNummber) {
  let result = undefined;
  for (let i = 0; i < snakes.length; i++) {
    if (snakes[i].source === squareNummber) {
      result = snakes[i];
    }
  }
  return result;
}

function foundLadder(squareNummber) {
  let result = undefined;
  for (let i = 0; i < ladders.length; i++) {
    if (ladders[i].source === squareNummber) {
      result = ladders[i];
    }
  }
  return result;
}

const squaresArray = [];
for (let i = 1; i <= 100; i++) {
  squaresArray.push(
    <Square
      key={i}
      squareNumber={i}
      foundSnake={foundSnake(i)}
      foundLadder={foundLadder(i)}
    ></Square>
  );
}

const Board = () => {
  const [{ dice, winner, gameOver, turn, player1Pos, player2Pos }, dispatch] =
    React.useReducer(reducer, initialStates);

  function rollClick() {
    dispatch({ type: "roll" });
  }

  React.useEffect(() => {
    dispatch({ type: "updatePlayer" });
  }, [dice]);

  return (
    <div className='main-container'>
      <div className='players-container'>
        <div className={turn === 1 ? "bold" : ""}>
          <span>Player1: </span>
          <span>{player1Pos === 0 ? "has not entered" : player1Pos}</span>
        </div>
        <div className={turn === 2 ? "bold" : ""}>
          <span>Player2: </span>
          <span>{player2Pos === 0 ? "has not entered" : player2Pos}</span>
        </div>
      </div>
      <div className='square-container'>{squaresArray}</div>
      <button className='roll' onClick={rollClick}>
        Roll
      </button>
      <span>Dice number: {dice}</span>
    </div>
  );
};

export default Board;
