import "./Board.scss";
import Square from "../Square/Square";
import reducer, { initialStates } from "../../reducers";
import React from "react";
import redBullet from "../../assets/images/red-bullet.png";
import blueBullet from "../../assets/images/blue-bullet.png";
import classNames from "classnames";
import Confetti from "react-confetti";
import data from "../../assets/data.json";
import { createRandomNumber } from "../../helper/util";
import Die from "../Die/Die";

const foundSnake = (playerPos) => {
  const snakes = data.snakes;

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
  const ladders = data.ladders;

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
    {
      die,
      gameOver,
      turn,
      player1Pos,
      player2Pos,
      p1StartPermission,
      p2StartPermission,
      snake,
      ladder,
    },
    dispatch,
  ] = React.useReducer(reducer, initialStates);

  if (!gameOver && (player1Pos === 100 || player2Pos === 100)) {
    dispatch({ type: "gameOver" });
  }

  const applySnakeOrLadder = React.useCallback((currentPlayerPos) => {
    if (foundSnake(currentPlayerPos) !== undefined) {
      dispatch({ type: "snake", payload: true });
      currentPlayerPos = foundSnake(currentPlayerPos).dest;
    } else if (foundLadder(currentPlayerPos) !== undefined) {
      dispatch({ type: "ladder", payload: true });
      currentPlayerPos = foundLadder(currentPlayerPos).dest;
    }

    return currentPlayerPos;
  }, []);

  const resetSnakeAndLadderStates = () => {
    if (snake) dispatch({ type: "snake", payload: false });
    if (ladder) dispatch({ type: "ladder", payload: false });
  };

  const rollClick = () => {
    let randomNum = createRandomNumber();
    dispatch({ type: "updateDie", payload: randomNum });
    resetSnakeAndLadderStates();

    let newPlayerPos = 0;
    const setPlayerNewPos = (playerStartPermission, playerPos) => {
      if (playerStartPermission) {
        newPlayerPos = applySnakeOrLadder(playerPos + randomNum);
        dispatch({ type: "roll", payload: newPlayerPos });
      } else {
        if (randomNum === 6) {
          dispatch({ type: "givePermission" });
        }
      }
    };

    if (turn === 1) {
      setPlayerNewPos(p1StartPermission, player1Pos);
    } else if (turn === 2) {
      setPlayerNewPos(p2StartPermission, player2Pos);
    }

    dispatch({ type: "changeTurn", payload: newPlayerPos });
  };

  const playAgain = () => {
    dispatch({ type: "initiate" });
  };

  // This function will create the appropriate classname for the bullets next to each player's name.
  const bulletClassName = (turnNum) => {
    return classNames({
      bullet: true,
      visible: turn === turnNum,
      hidden: turn !== turnNum,
    });
  };

  const playerInfoClassName = (turnNum) => {
    return classNames({
      playerInfo: true,
      bold: turn === turnNum,
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
    <div className='container'>
      {gameOver && (
        <Confetti height={window.innerHeight} width={window.innerWidth} />
      )}

      <p className='game-name'>Snakes & Ladders</p>

      <p className={gameOver ? "winning-message" : "hidden"}>
        Player{turn} you won! Congrats for such a big achievement!😁
      </p>

      <div className='main-content'>
        <div className='left-content'>
          <div className='players-container'>
            <div className={playerInfoClassName(1)}>
              <img
                className={bulletClassName(1)}
                src={redBullet}
                alt='red bullet'
              />

              <span>Player1: </span>
              <span>{player1Pos === 0 ? "has not entered" : player1Pos}</span>
            </div>
            <div className={playerInfoClassName(2)}>
              <img
                className={bulletClassName(2)}
                src={blueBullet}
                alt='blue bullet'
              />
              <span>Player2: </span>
              <span>{player2Pos === 0 ? "has not entered" : player2Pos}</span>
            </div>
          </div>

          {!p1StartPermission && turn === 1 && (
            <p className='permission'>
              ⚠️ Player1: You have to roll a 6 to start the game!
            </p>
          )}
          {!p2StartPermission && turn === 2 && (
            <p className='permission'>
              ⚠️ Player2: You have to roll a 6 to start the game!
            </p>
          )}
        </div>

        <div className='mid-content'>
          <div className='square-container'>{squaresArray}</div>
        </div>

        <div className='right-content'>
          <button
            className='roll-play'
            onClick={!gameOver ? rollClick : playAgain}
          >
            {!gameOver ? "Roll" : "Play Again"}
          </button>

          <Die die={die} />

          {snake && (
            <p className='snake-ladder-message'>Ooh! That was a snake!🐍</p>
          )}
          {ladder && (
            <p className='snake-ladder-message'>Great! That was a ladder!🪜</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Board;
