import { createRandomNumber, changeTurn } from "../helper/utils";

export const initialStates = {
  dice: 0,
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
      return {
        ...state,
        dice: createRandomNumber(),
      };

    case "updatePlayer":
      return {
        ...state,
        player1Pos:
          state.turn === 1 ? state.player1Pos + state.dice : state.player1Pos,
        player2Pos:
          state.turn === 2 ? state.player2Pos + state.dice : state.player2Pos,
        turn: changeTurn(state.turn, state.playersNum),
      };

    default:
      return state;
  }
};

export default reducer;
