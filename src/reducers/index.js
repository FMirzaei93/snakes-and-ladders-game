import {
  createRandomNumber,
  changeTurn,
  applySnakeOrLadder,
  checkForStartPermission,
} from "../helper/rollFunctions";

export const initialStates = {
  die: 0,
  winner: 0,
  gameOver: false,
  turn: 1,
  player1Pos: 0,
  player2Pos: 0,
  playersNum: 2,
  p1StartPermission: false,
  p2StartPermission: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "updateDie":
      return {
        ...state,
        die: action.payload,
      };

    case "changeStartPermission":
      return {
        ...state,
        p1StartPermission: state.turn === 1 ? true : state.p1StartPermission,
        p2StartPermission: state.turn === 2 ? true : state.p2StartPermission,
      };

    case "roll":
      //payload: randomNumber
      return {
        ...state,
        player1Pos:
          state.turn === 1
            ? applySnakeOrLadder(state.player1Pos + action.payload)
            : state.player1Pos,
        player2Pos:
          state.turn === 2
            ? applySnakeOrLadder(state.player2Pos + action.payload)
            : state.player2Pos,
      };

    case "changeTurn":
      return {
        ...state,
        turn: changeTurn(state.turn, state.playersNum),
      };

    default:
      return state;
  }
};

export default reducer;
