export const createRandomNumber = () => {
  return Math.floor(Math.random() * 6) + 1;
};

export const changeTurn = (currentTurn, playersNum) => {
  if (currentTurn !== playersNum) return currentTurn + 1;
  //e.g. if there are 3 players:
  // 1,2 ->3
  else return 1;
  //1,2,3 ->1
};

export const createSpiralArray = () => {
  const flatten = new Array(10).fill(null).flatMap((_, i) => {
    const subArr = new Array(10).fill(null).map((_, j) => {
      return i * 10 + j + 1;
    });
    return i % 2 === 0 ? subArr.reverse() : subArr;
  });

  return flatten.reverse();
};
