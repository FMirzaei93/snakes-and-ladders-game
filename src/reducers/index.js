import {
  createRandomNumber,
  changeTurn,
  checkIsSnakeORLadder,
} from "../helper/utils";

export const initialStates = {
  die: 0,
  winner: 0,
  gameOver: false,
  turn: 1,
  player1Pos: 0,
  player2Pos: 0,
  playersNum: 2,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "roll":
      let randomNum = createRandomNumber();
      return {
        ...state,
        die: randomNum,
        player1Pos:
          state.turn === 1
            ? checkIsSnakeORLadder(state.player1Pos + randomNum)
            : state.player1Pos,
        player2Pos:
          state.turn === 2
            ? checkIsSnakeORLadder(state.player2Pos + randomNum)
            : state.player2Pos,
        turn: changeTurn(state.turn, state.playersNum),
      };

    default:
      return state;
  }
};

export default reducer;
