import "./Board.scss";
import data from "../../assets/data.json";
import Square from "../Square/Square";
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
  return (
    <div className='main-container'>
      <div className='square-container'>{squaresArray}</div>
    </div>
  );
};

export default Board;
