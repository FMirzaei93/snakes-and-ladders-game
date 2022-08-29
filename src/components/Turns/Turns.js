import classNames from "classnames";
import redBullet from "../../assets/images/red-bullet.png";
import blueBullet from "../../assets/images/blue-bullet.png";
import "./Turns.scss";

const Turns = ({ turn, player1Pos, player2Pos }) => {
  // This function will create the appropriate classnames for the bullets sitting next to each player's name.
  const bulletClassName = (turnNum) => {
    return classNames({
      bullet: true,
      visible: turn === turnNum,
      hidden: turn !== turnNum,
    });
  };

  // This function will create the appropriate classnames for the player's information div.
  const playerInfoClassName = (turnNum) => {
    return classNames({
      playerInfo: true,
      bold: turn === turnNum,
    });
  };

  return (
    <div className='players-container'>
      <div className={playerInfoClassName(1)}>
        <img className={bulletClassName(1)} src={redBullet} alt='red bullet' />

        <span>Player1: </span>
        <span>
          {player1Pos === 0 ? "has not entered the game" : player1Pos}
        </span>
      </div>
      <div className={playerInfoClassName(2)}>
        <img
          className={bulletClassName(2)}
          src={blueBullet}
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
