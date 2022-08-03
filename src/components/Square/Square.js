import snake from "../../images/snake.png";
import ladder from "../../images/ladder.png";
import "./square.scss";

const Square = ({ squareNumber, foundSnake, foundLadder }) => {
  // function backgroundColor() {
  //   let backgroundColor;
  //   if (foundSnake !== undefined) backgroundColor = "red";
  //   else if (foundLadder !== undefined) backgroundColor = "green";
  //   else backgroundColor = "wheat";

  //   return backgroundColor;
  // }

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
      <h1>{squareNumber}</h1>
    </div>
  );
};

export default Square;
