import { changeTurn } from "../helper/util";

export const initialStates = {
  die: 1,
  gameOver: false,
  turn: 1,
  player1Pos: 0,
  player2Pos: 0,
  p1StartPermission: false,
  p2StartPermission: false,
  snake: null,
  ladder: null,
  buttonAbility: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    //payload: randomNumber
    case "roll":
      return {
        ...state,
        die: action.payload,
        snake: null,
        ladder: null,
        buttonAbility: !state.buttonAbility,
      };

    case "givePermission":
      return {
        ...state,
        p1StartPermission: state.turn === 1 ? true : state.p1StartPermission,
        p2StartPermission: state.turn === 2 ? true : state.p2StartPermission,
        player1Pos: state.turn === 1 ? 1 : state.player1Pos,
        player2Pos: state.turn === 2 ? 1 : state.player2Pos,
      };

    case "setNewPos":
      //payload: newPlayerPosition after applying snake or ladder
      return {
        ...state,
        player1Pos: state.turn === 1 ? action.payload : state.player1Pos,
        player2Pos: state.turn === 2 ? action.payload : state.player2Pos,
      };

    case "increment":
      return {
        ...state,
        player1Pos: state.turn === 1 ? state.player1Pos + 1 : state.player1Pos,
        player2Pos: state.turn === 2 ? state.player2Pos + 1 : state.player2Pos,
      };

    case "changeTurn":
      //payload: newPlayerPosition
      return {
        ...state,
        turn: action.payload !== 100 ? changeTurn(state.turn, 2) : state.turn,
        buttonAbility: !state.buttonAbility,
      };

    case "gameOver":
      return {
        ...state,
        gameOver: true,
      };
    case "snake":
      //payload: foundSnake
      return {
        ...state,
        snake: action.payload,
      };
    case "ladder":
      //payload: foundLadder
      return {
        ...state,
        ladder: action.payload,
      };

    case "initiate":
      return initialStates;

    // case "switchButtonAbility":
    //   return {
    //     ...state,
    //     buttonAbility: !state.buttonAbility,
    //   };

    default:
      return state;
  }
};

export default reducer;
