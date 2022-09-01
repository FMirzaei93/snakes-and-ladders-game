import "./Board.scss";
import Square from "../Square/Square";
import Turns from "../Turns/Turns";
import reducer, { initialStates } from "../../reducers";
import React from "react";
import Confetti from "react-confetti";
import data from "../../assets/data.json";
import { createRandomNumber, createSpiralArray } from "../../helper/util";
import Die from "../Die/Die";

// This function searches through the snakes list to check if it contains a specific square number, if so, it returns the information of that snake.
const foundSnake = (squareNumber) => {
  const snakes = data.snakes;
  const result = snakes.find((snake) => snake.source === squareNumber);
  return result;
};

// This function searches through the ladders list to check if it contains a specific square number, if so, it returns the information of that ladder.
const foundLadder = (squareNumber) => {
  const ladders = data.ladders;
  const result = ladders.find((ladder) => ladder.source === squareNumber);
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
      buttonAbility,
    },
    dispatch,
  ] = React.useReducer(reducer, initialStates);

  // Checking if any of the players reaches 100, to announce the game finished.
  React.useEffect(() => {
    if (!gameOver && (player1Pos === 100 || player2Pos === 100)) {
      dispatch({ type: "gameOver" });
    }
  }, [player1Pos, player2Pos, gameOver]);

  //This function checks if the current player's position is considered a snake/ladder, if so, the position will be updated with the defined destination of that snake/ladder,
  //also the snake/ladder state gets updated.
  const applySnakeOrLadder = (currentPlayerPos) => {
    const foundSnakeItem = foundSnake(currentPlayerPos);
    const foundLadderItem = foundLadder(currentPlayerPos);
    if (foundSnakeItem !== undefined) {
      dispatch({ type: "snake", payload: foundSnakeItem });
      return foundSnakeItem.dest;
    }
    if (foundLadderItem !== undefined) {
      dispatch({ type: "ladder", payload: foundLadderItem });
      return foundLadderItem.dest;
    }
    return currentPlayerPos;
  };

  // What this function does:
  //1. Check if the player is allowed to start the game(if it has thrown a 6?).
  //2. If so, if the player position + random number <=100 (the max number on the board), it sets an Interval to increase the player's position one by one(to demonstrate the player moving on the board).
  //3. It sets a Timeout to terminate this process by clearing the interval, and checking if the new player's position is a snake or ladder. (by calling the 'applySnakeOrLadder' function)
  //4. Then updates the player's position and changes the turn.
  //5. If the player is not allowed so far to start the game, first, it checks if they just got a 6, and then update the player's permission; and then it changes the turn anyway.

  const rollClick = () => {
    // Hmmm this action could exist without a payload ;)
    //******************************************* QUESTION ********************************************
    //I'm using the same random number as an argument for the setPlayerNewPos() method. So I cannot generate the random number in the reducer file.

    let randomNum = createRandomNumber();
    dispatch({ type: "roll", payload: randomNum });

    // Then this bit could probabyl go into a useEffect:
    if (turn === 1) {
      setPlayerNewPos(p1StartPermission, player1Pos, randomNum);
    } else if (turn === 2) {
      setPlayerNewPos(p2StartPermission, player2Pos, randomNum);
    }
  };

  const setPlayerNewPos = (playerStartPermission, playerPos, randomNum) => {
    let newPlayerPos = playerPos + randomNum;

    if (playerStartPermission) {
      if (newPlayerPos <= 100) {
        let timerId = setInterval(() => {
          dispatch({ type: "increment" });
        }, 400);

        setTimeout(() => {
          // To terminate the process of increasing the player's position state.
          clearInterval(timerId);
          let appliedSnakeOrLadderPos = applySnakeOrLadder(newPlayerPos);

          //******************************************* QUESTION ********************************************
          //I have set this second Timeout inside the first one to make the player stop for a little while in the cell that's causing snake or ladder effect(before applying snake or ladder),
          //to avoid moving quickly from that cell to the destination of the snake or ladder. Actualy I want the person who's playing, see the cell that caused the snake or ladder and then move on to the destination.
          //But this approach makes a little lag in moving to the last cell. Do you have any better idea?

          //setTimeout(() => {
          dispatch({ type: "setNewPos", payload: appliedSnakeOrLadderPos });
          dispatch({ type: "changeTurn", payload: newPlayerPos });
          //}, 400);
        }, randomNum * 400);
      } else dispatch({ type: "changeTurn", payload: -1 });
    } else {
      if (randomNum === 6) {
        dispatch({ type: "givePermission" });
      }
      dispatch({ type: "changeTurn", payload: -1 });
    }
  };

  // This function initiates the game by resetting all the states.
  const playAgain = () => {
    dispatch({ type: "initiate" });
  };

  // This function will create a spiral array of 100 elements. (Thanks to my friend Bence🐍)
  // This could be extracted as a util function :)
  // Done :)

  // I would use a more functional approach, and since this will be re-created in each render,
  // you might want to consider memoising this value :)
  //Done :)

  // An array of 100 squares that determines if each square is a snake or ladder, and if any player is located there.
  const createSquareArray = React.useCallback(() => {
    const spiralArray = createSpiralArray();

    const squaresArray = spiralArray.map((item, i) => {
      return (
        <Square
          key={i}
          squareNumber={item}
          foundSnake={foundSnake(item)}
          foundLadder={foundLadder(item)}
          player1Pos={player1Pos}
          player2Pos={player2Pos}
        ></Square>
      );
    });

    return squaresArray;
  }, [player1Pos, player2Pos]);

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
        {/* -------------------------- Left Content ---------------------- */}
        <div className='left-content'>
          <Turns turn={turn} player1Pos={player1Pos} player2Pos={player2Pos} />

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
        {/* -------------------------- Mid Content ---------------------- */}

        <div className='mid-content'>
          <div className='square-container'>{createSquareArray()}</div>
        </div>

        {/* -------------------------- Right Content ---------------------- */}

        <div className='right-content'>
          <button
            className='roll-play'
            onClick={!gameOver ? rollClick : playAgain}
            disabled={buttonAbility ? false : true}
          >
            {!gameOver ? "Roll" : "Play Again"}
          </button>

          {!gameOver && <p className='turn'>Player{turn}, Let's go ✌️</p>}

          <Die die={die} />

          {snake && (
            <>
              <p className='snake-ladder-message'>Oops! That was a snake!🐍</p>
              <p className='snake-ladder-info'>
                It took you from {snake.source} to {snake.dest} 😕
              </p>
            </>
          )}
          {ladder && (
            <>
              <p className='snake-ladder-message'>
                Great! That was a ladder!🪜
              </p>
              <p className='snake-ladder-info'>
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
