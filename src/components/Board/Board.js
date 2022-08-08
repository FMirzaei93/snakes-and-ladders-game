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

const foundSnake = (playerPos) => {
  let result = undefined;
  for (let i = 0; i < snakes.length; i++) {
    if (snakes[i].source === playerPos) {
      result = snakes[i];
      break;
    }
  }
  return result;
};

const foundLadder = (playerPos) => {
  let result = undefined;
  for (let i = 0; i < ladders.length; i++) {
    if (ladders[i].source === playerPos) {
      result = ladders[i];
      break;
    }
  }
  return result;
};

const Board = () => {
  const [
    { die, winner, gameOver, turn, player1Pos, player2Pos, checkDone },
    dispatch,
  ] = React.useReducer(reducer, initialStates);

  // This function will create a random number for the die and then run the updatePlayer() function as a callback
  async function rollClick() {
    dispatch({ type: "roll" });
  }

  // React.useEffect(() => {
  //   !checkDone && checkIsSnakeORLadder();
  // }, [player1Pos, player2Pos]);

  // React.useEffect(() => {
  //   checkDone && dispatch({ type: "changeTurn" });
  // }, [checkDone]);

  // const checkIsSnakeORLadder = () => {
  //   let currentPlayerPos;
  //   if (turn === 1) currentPlayerPos = player1Pos;
  //   else if (turn === 2) currentPlayerPos = player2Pos;

  //   if (foundSnake(currentPlayerPos) !== undefined) {
  //     console.log("snakeeee");
  //     dispatch({
  //       type: "applySnakeOrLadder",
  //       payload: foundSnake(currentPlayerPos).dest,
  //     });
  //   } else if (foundLadder(currentPlayerPos) !== undefined) {
  //     console.log("ladeeeer");
  //     dispatch({
  //       type: "applySnakeOrLadder",
  //       payload: foundLadder(currentPlayerPos).dest,
  //     });
  //   } else {
  //     dispatch({ type: "checkDone" });
  //   }
  // };

  // React.useEffect(() => {
  //   console.log("turrn in useeffect");
  //   dispatch({ type: "changeTurn" });
  // }, [player1Pos, player2Pos]);

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
