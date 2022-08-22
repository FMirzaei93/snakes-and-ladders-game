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

  // I would re-write it in a functional way, using array functions :)
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

  // I would re-write it in a functional way, using array functions :)
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
      isSnake,
      snake,
      isLadder,
      ladder,
      buttonAbility,
    },
    dispatch,
  ] = React.useReducer(reducer, initialStates);

  // I believe this should be in a useEffect since it is actually a side effect :)
  // Checking if any of the players reaches 100, to announce the game finished.
  if (!gameOver && (player1Pos === 100 || player2Pos === 100)) {
    dispatch({ type: "gameOver" });
  }

  // This function checks if the current player's position is considered a snake/ladder, if so, the position will be updated with the defined destination of that snake/ladder,
  //Then, the snake/ladder state gets updated.
  const applySnakeOrLadder = (currentPlayerPos) => {
    // foundSnake(currentPlayerPos) is being called multiple times,
    // It would be worth saving it into a variable and re-use it :)
    if (foundSnake(currentPlayerPos) !== undefined) {
      // I can see that you understand how to use useReducer very well done!! :)
      // I would also add that I think you can simplify most of your dispatch methods,
      // so they only take in the necessary information as a payload :)
      // For instance: "snake" should only take in 1 argument :)
      dispatch({
        type: "snake",
        payload: { isSnake: true, snake: foundSnake(currentPlayerPos) },
      });
      currentPlayerPos = foundSnake(currentPlayerPos).dest;
      // Similar comments to this part of the function :)
    } else if (foundLadder(currentPlayerPos) !== undefined) {
      dispatch({
        type: "ladder",
        payload: { isLadder: true, ladder: foundLadder(currentPlayerPos) },
      });
      currentPlayerPos = foundLadder(currentPlayerPos).dest;
    }

    return currentPlayerPos;
  };

  // This function simply reset the state of snake and ladder to false after each roll.
  // If each roll should reset the snake and ladder,
  // then you should probably include that logic into that action :)
  const resetSnakeAndLadderStates = () => {
    if (snake) dispatch({ type: "snake", payload: { isSnake: false } });
    if (ladder) dispatch({ type: "ladder", payload: { isLadder: false } });
  };

  // What this function does:
  //1. Check if the player is allowed to start the game(if it has thrown a 6?).
  //2. If so, if the player position + random number <=100 (the max number on the board), it sets an Interval to increase the player's position one by one(to demonstrate the player moving on the board).
  //3. It sets a Timeout to terminate this process by clearing the interval, and checking if the new player's position is a snake or ladder. (by calling the 'applySnakeOrLadder' function)
  //4. Then updates the player's position and changes the turn.
  //5. If the player is not allowed so far to start the game, first, it checks if they just got a 6, and then update the player's permission; and then it changes the turn anyway.

  const setPlayerNewPos = (playerStartPermission, playerPos, randomNum) => {
    let newPlayerPos = playerPos + randomNum;

    if (playerStartPermission) {
      if (newPlayerPos <= 100) {
        dispatch({ type: "switchButtonAbility" });

        let timerId = setInterval(() => {
          dispatch({ type: "increment" });
          console.log("each interval");
        }, 500);

        setTimeout(() => {
          // To terminate the process of increasing the player's position state.
          clearInterval(timerId);
          let appliedSnakeOrLadderPos = applySnakeOrLadder(newPlayerPos);

          setTimeout(() => {
            // Set this Timeout to touch the last square before applying snake or ladder on the current position.
            dispatch({ type: "roll", payload: appliedSnakeOrLadderPos });
            dispatch({ type: "changeTurn", payload: newPlayerPos });
            dispatch({ type: "switchButtonAbility" });
          }, 500);
        }, randomNum * 500);
      }
    } else {
      if (randomNum === 6) {
        dispatch({ type: "givePermission" });
      }
      dispatch({ type: "changeTurn", payload: newPlayerPos });
    }
  };

  const rollClick = () => {
    // Hmmm this action could exist without a payload ;)
    let randomNum = createRandomNumber();
    dispatch({ type: "updateDie", payload: randomNum });
    resetSnakeAndLadderStates();

    // Then this bit could probabyl go into a useEffect:
    if (turn === 1) {
      setPlayerNewPos(p1StartPermission, player1Pos, randomNum);
    } else if (turn === 2) {
      setPlayerNewPos(p2StartPermission, player2Pos, randomNum);
    }
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

  // This function will create a spiral array of 100 elements. (Thanks to my friend Bence🐍)
  // This could be extracted as a util function :)
  const createSpiralArray = () => {
    const flatten = new Array(10).fill(null).flatMap((_, i) => {
      const subArr = new Array(10).fill(null).map((_, j) => {
        return i * 10 + j + 1;
      });
      return i % 2 === 0 ? subArr.reverse() : subArr;
    });

    return flatten.reverse();
  };

  // I would use a more functional approach, and since this will be re-created in each render,
  // you might want to consider memoising this value :)
  // An array of 100 squares that determines if each square is a snake or ladder, and if any player is located there.
  const squaresArray = [];
  const spiralArray = createSpiralArray();

  for (let i = 0; i < spiralArray.length; i++) {
    let j = spiralArray[i];
    squaresArray.push(
      <Square
        key={j}
        squareNumber={j}
        foundSnake={foundSnake(j)}
        foundLadder={foundLadder(j)}
        player1Pos={player1Pos}
        player2Pos={player2Pos}
      ></Square>
    );
  }

  // Your code is super nice, clean an easy to read!
  // I would still consider extracting some of these components into their own file :)
  return (
    <div className="container">
      {gameOver && (
        <Confetti height={window.innerHeight} width={window.innerWidth} />
      )}

      <p className="game-name">Snakes & Ladders</p>

      <p className={gameOver ? "winning-message" : "hidden"}>
        Player{turn} you won! Congrats for such a big achievement!😁
      </p>

      <div className="main-content">
        <div className="left-content">
          <div className="players-container">
            <div className={playerInfoClassName(1)}>
              <img
                className={bulletClassName(1)}
                src={redBullet}
                alt="red bullet"
              />

              <span>Player1: </span>
              <span>
                {player1Pos === 0 ? "has not entered the game" : player1Pos}
              </span>
            </div>
            <div className={playerInfoClassName(2)}>
              <img
                className={bulletClassName(2)}
                src={blueBullet}
                alt="blue bullet"
              />
              <span>Player2: </span>
              <span>
                {player2Pos === 0 ? "has not entered the game" : player2Pos}
              </span>
            </div>
          </div>

          {!p1StartPermission && turn === 1 && (
            <p className="permission">
              ⚠️ Player1: You have to roll a 6 to start the game!
            </p>
          )}
          {!p2StartPermission && turn === 2 && (
            <p className="permission">
              ⚠️ Player2: You have to roll a 6 to start the game!
            </p>
          )}
        </div>

        <div className="mid-content">
          <div className="square-container">{squaresArray}</div>
        </div>

        <div className="right-content">
          <button
            className="roll-play"
            onClick={!gameOver ? rollClick : playAgain}
            disabled={buttonAbility ? false : true}
          >
            {!gameOver ? "Roll" : "Play Again"}
          </button>

          {!gameOver && <p className="turn">Player{turn}, Let's go ✌️</p>}

          <Die die={die} />

          {isSnake && (
            <>
              <p className="snake-ladder-message">Oops! That was a snake!🐍</p>
              <p className="snake-ladder-info">
                It took you from {snake.source} to {snake.dest} 😕
              </p>
            </>
          )}
          {isLadder && (
            <>
              <p className="snake-ladder-message">
                Great! That was a ladder!🪜
              </p>
              <p className="snake-ladder-info">
                It took you from {ladder.source} to {ladder.dest} 😛
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Board;
