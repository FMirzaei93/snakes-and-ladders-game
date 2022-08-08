import snake from "../../assets/images/snake.png";
import ladder from "../../assets/images/ladder.png";
import "./Square.scss";
import redBullet from "../../assets/images/red-bullet.png";
import blueBullet from "../../assets/images/blue-bullet.png";
//red: #B70000
//blue: #002897

const Square = ({
  squareNumber,
  foundSnake,
  foundLadder,
  player1Pos,
  player2Pos,
}) => {
  const backgroundImage = () => {
    let backgroundImage;
    if (foundSnake !== undefined) backgroundImage = `url("${snake}")`;
    else if (foundLadder !== undefined) backgroundImage = `url("${ladder}")`;
    return backgroundImage;
  };

  const squareStyle = {
    backgroundImage: backgroundImage(),
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className='square' style={squareStyle}>
      <p className='square-number'>{squareNumber}</p>
      {squareNumber === player1Pos && (
        <img src={redBullet} className='player redBullet' />
      )}

      {squareNumber === player2Pos && (
        <img src={blueBullet} className='player blueBullet' />
      )}
    </div>
  );
};

export default Square;
