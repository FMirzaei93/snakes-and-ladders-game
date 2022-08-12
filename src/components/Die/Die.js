import die1 from "../../assets/images/die1.png";
import die2 from "../../assets/images/die2.png";
import die3 from "../../assets/images/die3.png";
import die4 from "../../assets/images/die4.png";
import die5 from "../../assets/images/die5.png";
import die6 from "../../assets/images/die6.png";
import React from "react";
import "./Die.scss";

const Die = ({ die }) => {
  const dieImg = React.useMemo(() => {
    switch (die) {
      case 1:
        return die1;

      case 2:
        return die2;

      case 3:
        return die3;

      case 4:
        return die4;

      case 5:
        return die5;

      case 6:
        return die6;

      default:
        return;
    }
  }, [die]);

  const style = {
    backgroundImage: "url(" + dieImg + ")",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return <div className='die-face' style={style}></div>;
};

export default Die;
