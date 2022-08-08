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
  // checkDone: false,
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
        //checkDone: false,
      };

    // case "updatePlayer":
    //   return {
    //     ...state,
    //     player1Pos:
    //       state.turn === 1 ? state.player1Pos + state.die : state.player1Pos,
    //     player2Pos:
    //       state.turn === 2 ? state.player2Pos + state.die : state.player2Pos,
    //   };
    // case "checkDone":
    //   return {
    //     ...state,
    //     checkDone: true,
    //   };

    // case "applySnakeOrLadder":
    //   return {
    //     ...state,
    //     player1Pos: state.turn === 1 && action.payload,
    //     player2Pos: state.turn === 2 && action.payload,
    //     checkDone: true,
    //   };

    // case "changeTurn":
    //   return {
    //     ...state,
    //     turn: changeTurn(state.turn, state.playersNum),
    //   };

    default:
      return state;
  }
};

export default reducer;
