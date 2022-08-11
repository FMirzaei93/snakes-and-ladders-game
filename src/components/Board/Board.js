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

// This function searches through the snakes list to check if it contains a specific square number, if so, it returns the information of that snake.
const foundSnake = (squareNumber) => {
  const snakes = data.snakes;

  let result = undefined;
  for (let i = 0; i < snakes.length; i++) {
    if (snakes[i].source === squareNumber) {
      result = snakes[i];
      break;
    }
  }
  return result;
};

// This function searches through the ladders list to check if it contains a specific square number, if so, it returns the information of that ladder.
const foundLadder = (squareNumber) => {
  const ladders = data.ladders;

  let result = undefined;
  for (let i = 0; i < ladders.length; i++) {
    if (ladders[i].source === squareNumber) {
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

  // Checking if any of the players reaches 100, to announce the game finished.
  if (!gameOver && (player1Pos === 100 || player2Pos === 100)) {
    dispatch({ type: "gameOver" });
  }

  // This function checks if the current player's position is considered a snake/ladder, if so, the position will be updated with the defined destination of that snake/ladder,
  //Then, the snake/ladder state gets updated.
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

  // This function simply reset the state of snake and ladder to false after each roll.
  const resetSnakeAndLadderStates = () => {
    if (snake) dispatch({ type: "snake", payload: false });
    if (ladder) dispatch({ type: "ladder", payload: false });
  };

  // What this function does:
  //1. It will generate a random number as the die number and updates the die state.
  //2. Reset the state of snake and ladder.
  //3. Check if the player is allowed to start the game(if it has thrown a 6?).
  //4. If so, calls the 'applySnakeOrLadder' function to return the new player's position(check if it encounters a snake, ladder of neither)
  //5. If the new player's position =<100 (the position must not exceed 100), it updates the player's state with the new returned value from 'applySnakeOrLadder'.
  //6. If the player is not allowed, it checks if it just got a 6, and then update the player's permission.
  //7. And eventually, it changes the turn.
  const rollClick = () => {
    let randomNum = createRandomNumber();
    dispatch({ type: "updateDie", payload: randomNum });
    resetSnakeAndLadderStates();

    let newPlayerPos = 0;
    // Inner function to prevent repeating the codes for each player separately.
    const setPlayerNewPos = (playerStartPermission, playerPos) => {
      if (playerStartPermission) {
        newPlayerPos = applySnakeOrLadder(playerPos + randomNum);
        if (newPlayerPos <= 100)
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

  // This function initiates the game by resetting all the states.
  const playAgain = () => {
    dispatch({ type: "initiate" });
  };

  // This function will create the appropriate classnames for the bullets sitting next to each player's name.
  const bulletClassName = (turnNum) => {
    return classNames({
      bullet: true,
      visible: turn === turnNum,
      hidden: turn !== turnNum,
    });
  };

  // This function will create the appropriate classnames for the player's information div.
  const playerInfoClassName = (turnNum) => {
    return classNames({
      playerInfo: true,
      bold: turn === turnNum,
    });
  };

  // An array of 100 squares that specifies if each square is a snake or ladder, and if any player is located there.
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
