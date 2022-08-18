import snake from "../../assets/images/snake.png";
import ladder from "../../assets/images/ladder.png";
import star from "../../assets/images/star.png";
import "./Square.scss";
import redPiece from "../../assets/images/red-piece.png";
import bluePiece from "../../assets/images/blue-piece.png";

const Square = ({
  squareNumber,
  foundSnake,
  foundLadder,
  player1Pos,
  player2Pos,
}) => {
  // This function determines what the background-image of each square should be; snake, ladder or neither.
  const backgroundImage = () => {
    let backgroundImage;
    if (squareNumber === 100) backgroundImage = `url("${star}")`;
    if (foundSnake !== undefined) backgroundImage = `url("${snake}")`;
    else if (foundLadder !== undefined) backgroundImage = `url("${ladder}")`;
    return backgroundImage;
  };

  const squareStyle = {
    backgroundImage: backgroundImage(),
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundColor: squareNumber % 2 !== 0 && "rgb(255, 216, 144)",
  };

  return (
    <div className='square' style={squareStyle}>
      <p className='square-number'>{squareNumber}</p>
      {squareNumber === player1Pos && (
        <img src={redPiece} className='player redPiece' alt='player1' />
      )}

      {squareNumber === player2Pos && (
        <img src={bluePiece} className='player bluePiece' alt='player2' />
      )}
    </div>
  );
};

export default Square;
