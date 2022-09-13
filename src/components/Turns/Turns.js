import classNames from "classnames";
import "./Turns.scss";
import images from "../../assets/images";

const { RedBullet, BlueBullet } = images;

// You could make these util functions pure functions
// and move these functions outside of the component
// or into a util

// This function will create the appropriate classnames for the bullets sitting next to each player's name.
const bulletClassName = (turn, turnNum) => {
  return classNames({
    bullet: true,
    visible: turn === turnNum,
    hidden: turn !== turnNum,
  });
};

// This function will create the appropriate classnames for the player's information div.
const playerInfoClassName = (turn, turnNum) => {
  return classNames({
    playerInfo: true,
    bold: turn === turnNum,
  });
};

// You could also compose them into 1 function
// which will return you a tuple of classes:
//
// const getClasses = (turn, turnNum) => {
//   const bulletClass = bulletClassName(turn, turnNum);
//   const playerClass = playerInfoClassName(turn, turnNum);

//   return [bulletClass, playerClass];
// };

const Turns = ({ turn, player1Pos, player2Pos }) => {
  return (
    <div className='players-container'>
      <div className={playerInfoClassName(1)}>
        <img className={bulletClassName(1)} src={RedBullet} alt='red bullet' />

        <span>Player1: </span>
        <span>
          {player1Pos === 0 ? "has not entered the game" : player1Pos}
        </span>
      </div>
      <div className={playerInfoClassName(2)}>
        <img
          className={bulletClassName(2)}
          src={BlueBullet}
          alt='blue bullet'
        />
        <span>Player2: </span>
        <span>
          {player2Pos === 0 ? "has not entered the game" : player2Pos}
        </span>
      </div>
    </div>
  );
};

export default Turns;
