import snake from "../../assets/images/snake.png";
import ladder from "../../assets/images/ladder.png";
import "./Square.scss";

const Square = ({ squareNumber, foundSnake, foundLadder }) => {
  function backgroundImage() {
    let backgroundImage;
    if (foundSnake !== undefined) backgroundImage = `url("${snake}")`;
    else if (foundLadder !== undefined) backgroundImage = `url("${ladder}")`;

    return backgroundImage;
  }

  const squareStyle = {
    backgroundImage: backgroundImage(),
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className='square' style={squareStyle}>
      <p className='square-number'>{squareNumber}</p>
    </div>
  );
};

export default Square;
