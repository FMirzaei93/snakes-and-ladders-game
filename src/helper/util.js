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
