import images from "../../assets/images";
import React from "react";
import "./Die.scss";

const { Die1, Die2, Die3, Die4, Die5, Die6 } = images;

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
  const getDiceStyle = React.useMemo(() => {
    const baseDieStyle = {
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    };

    switch (die) {
      case 1:
        return Object.assign(baseDieStyle, {
          backgroundImage: "url(" + Die1 + ")",
        });
      case 2:
        return Object.assign(baseDieStyle, {
          backgroundImage: "url(" + Die2 + ")",
        });
      case 3:
        return Object.assign(baseDieStyle, {
          backgroundImage: "url(" + Die3 + ")",
        });
      case 4:
        return Object.assign(baseDieStyle, {
          backgroundImage: "url(" + Die4 + ")",
        });
      case 5:
        return Object.assign(baseDieStyle, {
          backgroundImage: "url(" + Die5 + ")",
        });
      case 6:
        return Object.assign(baseDieStyle, {
          backgroundImage: "url(" + Die6 + ")",
        });
      default:
        return Object.assign(baseDieStyle, {
          backgroundImage: "url(" + Die1 + ")",
        });
      // OR
      //return {
      //   ...baseDieStyle,
      //   backgroundImage: "url(" + die1 + ")",
      // }
    }
  }, [die]);

  //******************************************* QUESTION ********************************************
  // I do not understand how the suggested code will shorten the result, because I believe that I was doing almost the same thing.
  //I'd appreciate if you can elaborate a bit.

  //------------------------------- My codes ---------------------

  // const dieImg = React.useMemo(() => {
  //   switch (die) {
  //     case 1:
  //       return Die1;

  //     case 2:
  //       return Die2;

  //     case 3:
  //       return Die3;

  //     case 4:
  //       return Die4;

  //     case 5:
  //       return Die5;

  //     case 6:
  //       return Die6;

  //     default:
  //       return;
  //   }
  // }, [die]);

  // const style = {
  //   backgroundImage: "url(" + dieImg + ")",
  //   backgroundPosition: "center",
  //   backgroundSize: "cover",
  //   backgroundRepeat: "no-repeat",
  // };

  return <div className='die-face' style={getDiceStyle}></div>;
};

export default Die;
