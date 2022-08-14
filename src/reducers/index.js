import { changeTurn } from "../helper/util";

export const initialStates = {
  die: 1,
  gameOver: false,
  turn: 1,
  player1Pos: 0,
  player2Pos: 0,
  playersNum: 2,
  p1StartPermission: false,
  p2StartPermission: false,
  isSnake: false,
  snake: null,
  isLadder: false,
  ladder: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    //payload: randomNumber
    case "updateDie":
      return {
        ...state,
        die: action.payload,
      };

    case "givePermission":
      return {
        ...state,
        p1StartPermission: state.turn === 1 ? true : state.p1StartPermission,
        p2StartPermission: state.turn === 2 ? true : state.p2StartPermission,
        player1Pos: state.turn === 1 ? 1 : state.player1Pos,
        player2Pos: state.turn === 2 ? 1 : state.player2Pos,
      };

    case "roll":
      //payload: newPlayerPosition
      return {
        ...state,
        player1Pos: state.turn === 1 ? action.payload : state.player1Pos,
        player2Pos: state.turn === 2 ? action.payload : state.player2Pos,
      };

    case "changeTurn":
      //payload: newPlayerPosition
      return {
        ...state,
        turn:
          action.payload !== 100
            ? changeTurn(state.turn, state.playersNum)
            : state.turn,
      };

    case "gameOver":
      return {
        ...state,
        gameOver: true,
      };
    case "snake":
      return {
        ...state,
        isSnake: action.payload.isSnake,
        snake: action.payload.snake,
      };
    case "ladder":
      return {
        ...state,
        isLadder: action.payload.isLadder,
        ladder: action.payload.ladder,
      };

    case "initiate":
      return initialStates;

    default:
      return state;
  }
};

export default reducer;
