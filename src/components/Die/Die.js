import React from "react";
import "./Die.scss";

const Die = ({ die }) => {
  const getDiceStyle = React.useMemo(() => {
    const img = require(`../../assets/images/die${die}.png`);
    return {
      backgroundImage: "url(" + img + ")",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    };
  }, [die]);

  return <div className='die-face' style={getDiceStyle}></div>;
};

export default Die;
