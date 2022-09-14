import React from "react";
import images from "../../assets/images";
import "./Square.scss";
const { Star, Snake, Ladder, RedPiece, BluePiece } = images;

// I would extract these two functions: getBackgroundImage, getSquareStyle
// and I would compose them into a single pure function which would return your styling
//
// const getSquareStyle = (squareNumber, foundSnake, foundLadder) => {
//   const background = getBackgroundImage(squareNumber, foundSnake, foundLadder)
//
//   return {
//     // etc...
//   }
// }

// You can still memoise the value, but you have a slightly cleaner component and code.
// getBackgroundImage is tightly connected to getSquareStyle
// It makes sense to abstract it away into a function so your code is more readable

const Square = ({
  squareNumber,
  foundSnake,
  foundLadder,
  player1Pos,
  player2Pos,
}) => {
  const getBackgroundImage = React.useMemo(() => {
    if (squareNumber === 100) return `url("${Star}")`;
    if (foundSnake !== undefined) return `url("${Snake}")`;
    if (foundLadder !== undefined) return `url("${Ladder}")`;
  }, [squareNumber, foundSnake, foundLadder]);

  const getSquareStyle = React.useMemo(() => {
    return {
      backgroundImage: getBackgroundImage,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundColor: squareNumber % 2 !== 0 && "rgb(255, 216, 144)",
    };
  }, [squareNumber, getBackgroundImage]);

  return (
    <div className='square' style={getSquareStyle}>
      <p className='square-number'>{squareNumber}</p>

      {squareNumber === player1Pos ? (
        <img src={RedPiece} className='player redPiece' alt='player1' />
      ) : null}

      {squareNumber === player2Pos && (
        <img src={BluePiece} className='player bluePiece' alt='player2' />
      )}
    </div>
  );
};

export default Square;
