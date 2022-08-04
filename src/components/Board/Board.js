import "./Board.scss";
import data from "../../assets/data.json";
import Square from "../Square/Square";
import reducer, { initialStates } from "../../reducers";
import React from "react";
import redBullet from "../../assets/images/red-bullet.png";
import blueBullet from "../../assets/images/blue-bullet.png";
import classNames from "classnames";

const snakes = data.snakes;
const ladders = data.ladders;

const foundSnake = (squareNummber) => {
  let result = undefined;
  for (let i = 0; i < snakes.length; i++) {
    if (snakes[i].source === squareNummber) {
      result = snakes[i];
    }
  }
  return result;
};

const foundLadder = (squareNummber) => {
  let result = undefined;
  for (let i = 0; i < ladders.length; i++) {
    if (ladders[i].source === squareNummber) {
      result = ladders[i];
    }
  }
  return result;
};

const Board = () => {
  const [{ dice, winner, gameOver, turn, player1Pos, player2Pos }, dispatch] =
    React.useReducer(reducer, initialStates);

  const squaresArray = [];
  for (let i = 1; i <= 100; i++) {
    squaresArray.push(
      <Square
        key={i}
        squareNumber={i}
        foundSnake={foundSnake(i)}
        foundLadder={foundLadder(i)}
        player1Pos={player1Pos}
        player2Pos={player2Pos}
        turn={turn}
      ></Square>
    );
  }

  const updatePlayer = () => {
    dispatch({ type: "updatePlayer" });
  };
  const rollClick = (myCallback) => {
    dispatch({ type: "roll" });
    myCallback();
  };

  const bulletClassName = (turnNum) => {
    return classNames({
      bullet: true,
      visible: turn === turnNum,
      hidden: turn !== turnNum,
    });
  };

  return (
    <div className='main-container'>
      <div className='players-container'>
        <div className={turn === 1 ? "bold" : ""}>
          <img
            className={bulletClassName(1)}
            src={redBullet}
            alt='red bullet'
          />

          <span>Player1: </span>
          <span>{player1Pos === 0 ? "has not entered" : player1Pos}</span>
        </div>
        <div className={turn === 2 ? "bold" : ""}>
          <img
            className={bulletClassName(2)}
            src={blueBullet}
            alt='blue bullet'
          />
          <span>Player2: </span>
          <span>{player2Pos === 0 ? "has not entered" : player2Pos}</span>
        </div>
      </div>
      <div className='square-container'>{squaresArray}</div>
      <button className='roll' onClick={() => rollClick(updatePlayer)}>
        Roll
      </button>
      <span>Dice number: {dice}</span>
    </div>
  );
};

export default Board;
