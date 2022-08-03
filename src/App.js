import "./App.css";
import data from "./assets/data.json";
import Square from "./components/Square";
//import { createObjArray } from "./helper/utils";

//const squareArray = createObjArray(data);

const squareArray = data.squares.map((item) => (
  <Square
    key={item.squareNumber}
    squareNumber={item.squareNumber}
    snakeStatus={item.snakeStatus}
    ladderStatus={item.ladderStatus}
    dest={item.dest}
  />
));

function App() {
  return <div className='App'>{squareArray}</div>;
}

export default App;
