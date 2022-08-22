import die1 from "../../assets/images/die1.png";
import die2 from "../../assets/images/die2.png";
import die3 from "../../assets/images/die3.png";
import die4 from "../../assets/images/die4.png";
import die5 from "../../assets/images/die5.png";
import die6 from "../../assets/images/die6.png";
import React from "react";
import "./Die.scss";

// 1.
/*
  const getDiceStyle = (die: number) => {
    // Arbitrary values for the die style so we won't repeat it
    const baseDieStyle = {
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    }

    switch (die) {
      case 1:
        return {
          ...baseDieStyle,
          backgroundImage: "url(" + die1 + ")",
        }
        // or
        // return Object.assign(baseDieStyle, { backgroundImage: "url(" + die1 + ")" })
    }
  }
  */

const Die = ({ die }) => {
  // You could extract these code bits and have a function which returns the style. LOOK ABOVE 1.
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

  return <div className="die-face" style={style}></div>;
};

export default Die;
