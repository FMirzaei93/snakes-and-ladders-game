import {
  createRandomNumber,
  changeTurn,
  applySnakeOrLadder,
  checkForStartPermission,
} from "../helper/rollFunctions";

export const initialStates = {
  die: 0,
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
    //payload: randomNumber
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
      let newP1Pos = state.player1Pos + action.payload;
      let newP2Pos = state.player2Pos + action.payload;
      return {
        ...state,
        player1Pos:
          state.turn === 1 && newP1Pos <= 100
            ? applySnakeOrLadder(newP1Pos)
            : state.player1Pos,
        player2Pos:
          state.turn === 2 && newP2Pos <= 100
            ? applySnakeOrLadder(newP2Pos)
            : state.player2Pos,
        turn:
          newP1Pos !== 100 && newP2Pos !== 100
            ? changeTurn(state.turn, state.playersNum)
            : state.turn,
      };

    case "changeTurn":
      return {
        ...state,
        turn: changeTurn(state.turn, state.playersNum),
      };

    case "gameOver":
      return {
        ...state,
        gameOver: true,
      };

    case "initiate":
      return initialStates;

    default:
      return state;
  }
};

export default reducer;
