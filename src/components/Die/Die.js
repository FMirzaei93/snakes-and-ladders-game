import images from "../../assets/images";
import React from "react";
import "./Die.scss";

const { Die1, Die2, Die3, Die4, Die5, Die6 } = images;

const Die = ({ die }) => {
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

  return <div className='die-face' style={getDiceStyle}></div>;
};

export default Die;
