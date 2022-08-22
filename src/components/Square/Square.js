import { BluePiece, Snake, Ladder, Star, RedPiece } from "../../assets/images";
import "./Square.scss";

// 1.
/* 
  const getBackgroundImage = ({ squareNumber, foundSnake, foundLadder }) => {
    // Your code comes here...
    // Try to simplify it by using return statement and by not using else :)
  }
*/

// 2.
/*
  const getSquareStyle = (args) => {
    const backgroundImage = getBackgroundImage(args)

    return // Your style follows
  }
*/

const Square = ({
  squareNumber,
  foundSnake,
  foundLadder,
  player1Pos,
  player2Pos,
}) => {
  // These can be also extracted and the if statement can be simplified a tiny bit. LOOK ABOVE 1.
  // This function determines what the background-image of each square should be; snake, ladder or neither.
  const backgroundImage = () => {
    let backgroundImage;
    if (squareNumber === 100) backgroundImage = `url("${Star}")`;
    if (foundSnake !== undefined) backgroundImage = `url("${Snake}")`;
    else if (foundLadder !== undefined) backgroundImage = `url("${Ladder}")`;
    return backgroundImage;
  };

  // These can be also extracted so it will return you the pure style (memoisation is also an option) LOOK ABOVE 2.
  const squareStyle = {
    backgroundImage: backgroundImage(),
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundColor: squareNumber % 2 !== 0 && "rgb(255, 216, 144)",
  };

  return (
    <div className="square" style={squareStyle}>
      <p className="square-number">{squareNumber}</p>
      {/* I would still use ternary operator here */}
      {/* (I used it even before I read the article just because I ran into some issues) */}
      {/* https://kentcdodds.com/blog/use-ternaries-rather-than-and-and-in-jsx */}
      {squareNumber === player1Pos && (
        <img src={RedPiece} className="player redPiece" alt="player1" />
      )}

      {squareNumber === player2Pos && (
        <img src={BluePiece} className="player bluePiece" alt="player2" />
      )}
    </div>
  );
};

export default Square;
