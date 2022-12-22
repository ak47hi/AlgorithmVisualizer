import { useState } from "react";
import reactLogo from "./assets/react.svg";
import PathFindingHexGrid from "./PathFindingInHexGrid/PathFindingHexGrid";
import Canvas from "./PathfindingVisualizer/Canvas";
import SquareGrid from "./PathfindingVisualizer/chatgpt";
// import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      {/* <PathFindingHexGrid /> */}

      {/* <Canvas /> */}

      <SquareGrid />
    </div>
  );
}

export default App;
