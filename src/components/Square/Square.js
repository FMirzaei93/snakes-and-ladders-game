import React from "react";
import images from "../../assets/images";
import "./Square.scss";
const { Star, Snake, Ladder, RedPiece, BluePiece } = images;
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
  //Done :)
  const getBackgroundImage = React.useMemo(() => {
    if (squareNumber === 100) return `url("${Star}")`;
    if (foundSnake !== undefined) return `url("${Snake}")`;
    if (foundLadder !== undefined) return `url("${Ladder}")`;
  }, [squareNumber, foundSnake, foundLadder]);

  // These can be also extracted so it will return you the pure style (memoisation is also an option) LOOK ABOVE 2.
  //Done
  //******************************************* QUESTION ********************************************
  //Do you think that'd be a good idea to pass "squareNumber, foundSnake, foundLadder" as the arguments to both functions?(as you've mentioned above)
  // I think it might be useless and just make the functions crowded. Please let me know if you think the opposite.

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
      {/* I would still use ternary operator here 
      //Done:) 
      */}
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
