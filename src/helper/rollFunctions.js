import data from "../assets/data.json";

export const createRandomNumber = () => {
  return Math.floor(Math.random() * 6) + 1;
};

export const changeTurn = (currentTurn, playersNum) => {
  if (currentTurn !== playersNum) return currentTurn + 1;
  //e.g. if there are 3 players:
  // 1,2 ->3
  else return 1;
  //1,2,3 ->1
};

export const foundSnake = (playerPos) => {
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

export const foundLadder = (playerPos) => {
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

export const applySnakeOrLadder = (currentPlayerPos) => {
  if (foundSnake(currentPlayerPos) !== undefined) {
    currentPlayerPos = foundSnake(currentPlayerPos).dest;
  } else if (foundLadder(currentPlayerPos) !== undefined) {
    currentPlayerPos = foundLadder(currentPlayerPos).dest;
  }

  return currentPlayerPos;
};
