import React, { useState } from "react";
import "./chat.css";
import ReactDOM from "react-dom";
// import { bootstrap } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../Pictures/MAV_edited_adobe_express.svg";
import Button from "react-bootstrap/Button";
// Navbar component
function Navbar() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("BFS");

  // Function to handle dropdown menu selection
  function handleChange(event) {
    setSelectedAlgorithm(event.target.value);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-black">
      <a href="#" className="navbar-brand mb-0 ">
        <img
          class="d-inline-block align-top"
          src={logo}
          width="170"
          height="50"
        />
      </a>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <select
              className="form-control"
              value={selectedAlgorithm}
              onChange={handleChange}
            >
              <option value="BFS">BFS</option>
              <option value="Dijkstra's">Dijkstra's</option>
              <option value="A*">A*</option>
            </select>
          </li>
        </ul>
      </div>
      <Button variant="secondary">Visualize</Button>
    </nav>
  );
}

// Grid component
function Grid() {
  const numRows = 20;
  const numCols = 20;
  const nodeSize = 25;

  // Create rows of nodes
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    const cols = [];
    for (let j = 0; j < numCols; j++) {
      cols.push(<div className="node"></div>);
    }
    rows.push(<div className="row">{cols}</div>);
  }

  return (
    <div className="grid" style={{ width: numCols * nodeSize }}>
      {rows}
    </div>
  );
}

// Root component
export default function App() {
  return (
    <div>
      <Navbar />
      <Grid />
    </div>
  );
}
