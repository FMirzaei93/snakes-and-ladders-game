import "./Board.scss";
import Square from "../Square/Square";
import reducer, { initialStates } from "../../reducers";
import React from "react";
import redBullet from "../../assets/images/red-bullet.png";
import blueBullet from "../../assets/images/blue-bullet.png";
import classNames from "classnames";
import {
  foundSnake,
  foundLadder,
  createRandomNumber,
} from "../../helper/rollFunctions";

const Board = () => {
  const [
    {
      die,
      winner,
      gameOver,
      turn,
      player1Pos,
      player2Pos,
      p1StartPermission,
      p2StartPermission,
    },
    dispatch,
  ] = React.useReducer(reducer, initialStates);

  const rollClick = () => {
    let randomNum = createRandomNumber();
    dispatch({ type: "updateDie", payload: randomNum });

    let playerStartPermission;
    if (turn === 1) playerStartPermission = p1StartPermission;
    else playerStartPermission = p2StartPermission;

    console.log(turn + " : " + playerStartPermission);

    if (playerStartPermission) {
      dispatch({ type: "roll", payload: randomNum });
    } else {
      if (randomNum === 6) {
        dispatch({ type: "roll", payload: randomNum });
        dispatch({ type: "changeStartPermission" });
      } else {
        //message;
        console.log("you are not allowed");
      }
    }

    dispatch({ type: "changeTurn" });
  };

  // This function will create the appropriate classname for the bullets next to each player's name.
  const bulletClassName = (turnNum) => {
    return classNames({
      bullet: true,
      visible: turn === turnNum,
      hidden: turn !== turnNum,
    });
  };

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
      ></Square>
    );
  }

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
      <button className='roll' onClick={rollClick}>
        Roll
      </button>
      <span>Die number: {die}</span>
    </div>
  );
};

export default Board;
