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

    case "change-turn":
      return { ...state, turn: changeTurn(state.turn, state.playersNum) };

    default:
      return state;
  }
};

export default reducer;
