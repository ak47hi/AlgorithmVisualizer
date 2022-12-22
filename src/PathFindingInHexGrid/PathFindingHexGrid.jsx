import { useRef, useEffect, useState } from "react";
// import { create } from "tar";
import "./HexGrid.css";

const START_NODE_ROW = 2;
const START_NODE_COL = -8;
const FINISH_NODE_ROW = 2;
const FINISH_NODE_COL = 17;

export default function Canvas() {
  const canvasRef = useRef(null);
  const canvasCoord = useRef(null);
  const [currentHex, setCurrentHex] = useState({
    q: 0,
    r: 0,
    s: 0,
  });

  const stateObject = {
    hexSize: 20,
    hexOrigin: { x: 300, y: 300 },
  };

  const [canvasState, setCanvasState] = useState({
    canvasSize: { canvasWidth: 1000, canvasHeight: 800 },
    hexParams: GetHexParameters(),
  });

  // CREATING NODE
  const createNode = (q, r) => {
    return {
      q,
      r,
      isStart: r === START_NODE_ROW && q === START_NODE_COL,
      isFinish: r === FINISH_NODE_ROW && q === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };

  // THIS USEEFFECT GETS CALLED TO JUST DRAW THE INITIAL GRID OF HEXAGON ON THE CANVAS
  // AFTER FIRST RENDER - ONLY ONCE

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const context = canvas.getContext("2d");
    DrawHexagons(context);
    if (!context) {
      return;
    }
    console.log("change");
  }, []);

  // THIS USEEFFECT GETS CALLED TO JUST DRAW THE INITIAL

  useEffect(() => {
    const canvasSecondCurrent = canvasCoord.current;
    const ctx = canvasSecondCurrent.getContext("2d");
    const { canvasWidth, canvasHeight } = canvasState.canvasSize;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  }, [currentHex]);

  // TO DRAW A GRID OF HEXAGONS ON THE CANVAS

  function DrawHexagons(context) {
    const grid = [];
    const { canvasWidth, canvasHeight } = canvasState.canvasSize;
    const { hexHeight, hexWidth, vertDist, horizDist } = canvasState.hexParams;
    const hexOrigin = stateObject.hexOrigin;
    let qLeftSide = Math.round(hexOrigin.x / horizDist);
    let qRightSide = Math.round((canvasWidth - hexOrigin.x) / horizDist);
    let rTopSide = Math.round(hexOrigin.y / vertDist);
    let rBottomSide = Math.round((canvasHeight - hexOrigin.y) / vertDist);
    console.log(qLeftSide, qRightSide, rTopSide, rBottomSide);
    var p = 0;
    for (let r = 0; r <= rBottomSide; r++) {
      let row = [];
      if (r % 2 == 0 && r !== 0) {
        p++;
      }

      for (let q = -qLeftSide; q <= qRightSide; q++) {
        const { x, y } = HexToPixel(Hex(q - p, r));
        if (
          x > hexWidth / 2 &&
          x < canvasWidth - hexWidth / 2 &&
          y > hexHeight / 2 &&
          y < canvasHeight - hexHeight / 2
        ) {
          DrawHex(context, Point(x, y));
          DrawHexcoordinates(context, Point(x, y), Hex(q - p, r, -q - r + p));
          row.push(createNode(q - p, r));
        }
      }
      if (row.length != 0) {
        grid.push(row);
      }
    }
    var n = 0;
    for (let r = -1; r >= -rTopSide; r--) {
      let row = [];
      if (r % 2 !== 0) n++;
      for (let q = -qLeftSide; q <= qRightSide; q++) {
        const { x, y } = HexToPixel(Hex(q + n, r));
        if (
          x > hexWidth / 2 &&
          x < canvasWidth - hexWidth / 2 &&
          y > hexHeight / 2 &&
          y < canvasHeight - hexHeight / 2
        ) {
          DrawHex(context, Point(x, y));
          DrawHexcoordinates(context, Point(x, y), Hex(q + n, r, -q - n - r));
          row.push(createNode(q + n, r));
        }
      }
      if (row.length != 0) {
        grid.push(row);
      }
    }
    console.log(grid);
  }

  // TO DRAW OR WRITE THE COORDINATES OF A HEXAGON WITHIN ITSELF ON A GRID OF HEXAGONS

  function DrawHexcoordinates(context, center, hex) {
    const ctx = context;
    ctx.fillText(hex.s, center.x - 6, center.y + 14);
    ctx.fillText(hex.r, center.x + 6, center.y + 4);
    ctx.fillText(hex.q, center.x - 10, center.y - 6);
  }

  function HexToPixel(hex) {
    let hexOrigin = stateObject.hexOrigin;
    let x =
      stateObject.hexSize *
        (Math.sqrt(3) * hex.q + (Math.sqrt(3) / 2) * hex.r) +
      hexOrigin.x;
    let y = stateObject.hexSize * ((3 / 2) * hex.r) + hexOrigin.y;
    return Point(x, y);
  }

  function PixelToHex(p) {
    const origin = stateObject.hexOrigin;
    let q =
      ((Math.sqrt(3) / 3) * (p.x - origin.x) - (1 / 3) * (p.y - origin.y)) /
      stateObject.hexSize;
    let r = ((2 / 3) * (p.y - origin.y)) / stateObject.hexSize;
    return Hex(q, r, -q - r);
  }

  function CubeDirection(direction) {
    const cubeDirections = [
      Hex(+1, 0, -1),
      Hex(+1, -1, 0),
      Hex(0, -1, +1),
      Hex(-1, 0, +1),
      Hex(-1, +1, 0),
      Hex(0, +1, -1),
    ];
    return cubeDirections[direction];
  }

  function CubeAdd(a, b) {
    return Hex(a.q + b.q, a.r + b.r, a.s + b.s);
  }

  function GetCubeNeighbor(h, direction) {
    return CubeAdd(h, CubeDirection(direction));
  }

  function CubeRound(cube) {
    var q = Math.round(cube.q);
    var r = Math.round(cube.r);
    var s = Math.round(cube.s);

    var q_diff = Math.abs(q - cube.q);
    var r_diff = Math.abs(r - cube.r);
    var s_diff = Math.abs(s - cube.s);

    if (q_diff > r_diff && q_diff > s_diff) {
      q = -r - s;
    } else if (r_diff > s_diff) {
      r = -q - s;
    } else {
      s = -q - r;
    }

    return Hex(q, r, s);
  }

  //  FUNCTION TO DRAW A HEXAGON

  function DrawHex(context, center, color, width) {
    for (let i = 0; i <= 5; i++) {
      let start = GetHexCorner(center, i);
      let end = GetHexCorner(center, i + 1);
      DrawLine(
        context,
        { x: start.x, y: start.y },
        { x: end.x, y: end.y },
        color,
        width
      );
    }
  }

  function GetHexParameters() {
    let hexHeight = stateObject.hexSize * 2;
    let hexWidth = (Math.sqrt(3) / 2) * hexHeight;
    let vertDist = (hexHeight * 3) / 4;
    let horizDist = hexWidth;
    return { hexHeight, hexWidth, vertDist, horizDist };
  }

  // DRAWS A STRAIGHT LINE OF HEXAGON WHEN GIVEN THE START AND END OF HEXAGON CORNERS

  function DrawLine(context, start, end, color, width) {
    const ctx = context;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.closePath();
  }

  // GETS THE CORNER OF A HEXAGON WHEN GIVEN THE CENTER OF THE HEXAGON AND THE NUMBER OF THE HEXAGON

  function GetHexCorner(center, i) {
    let angle_deg = 60 * i + 30;
    let angle_rad = (Math.PI / 180) * angle_deg;
    let x = center.x + stateObject.hexSize * Math.cos(angle_rad);
    let y = center.y + stateObject.hexSize * Math.sin(angle_rad);
    return Point(x, y);
  }

  // HELPER FUNCTION TO GET THE ARIAL COORDINATES Q, R, AND S

  function Hex(q, r, s) {
    return {
      q: q,
      r: r,
      s: s,
    };
  }

  // HELPER FUNCTION TO GET THE X, AND Y OF THE HEXAGONAL PLAIN

  function Point(x, y) {
    return {
      x: x,
      y: y,
    };
  }
  function DrawNeighbors(context, h) {
    for (let i = 0; i <= 5; i++) {
      const { q, r, s } = GetCubeNeighbor(Hex(h.q, h.r, h.s), i);
      const { x, y } = HexToPixel(Hex(q, r, s));
      DrawHex(context, Point(x, y), "red", 2);
    }
  }
  // HANDLES THE MOUSE MOVE FUNCTION
  // THIS GETS CALLED EVERY TIME YOU MOVE THE MOUSE ON THE CANVAS
  function HandleMouseMove(event, canvasPosition, canvasID) {
    let context = canvasID.getContext("2d");
    let offsetX = event.pageX - canvasPosition.left;
    let offsetY = event.pageY - canvasPosition.top;
    const { q, r, s } = CubeRound(PixelToHex(Point(offsetX, offsetY)));
    const { x, y } = HexToPixel(Hex(q, r, s));
    DrawNeighbors(context, Hex(q, r, s));
    DrawHex(context, Point(x, y), "lime", 2);
    console.log(`q : ${q}, r : ${r}, s: ${s},  x: ${x}, y: ${y}`);

    if (currentHex.q != q || currentHex.r != r || currentHex.s != s) {
      const handleChangeQRS = () => {
        setCurrentHex({ ...currentHex, q: q, r: r, s: s });
      };
      handleChangeQRS();
    }

    console.log(currentHex);
  }

  return (
    <div>
      <canvas ref={canvasRef} width="1000" height="785"></canvas>
      <canvas
        ref={canvasCoord}
        width="1000"
        height="785"
        onMouseMove={(e) => {
          HandleMouseMove(
            e,
            {
              left: canvasCoord.current.getBoundingClientRect().left,
              right: canvasCoord.current.getBoundingClientRect().right,
              top: canvasCoord.current.getBoundingClientRect().top,
            },
            canvasCoord.current
          );
        }}
      ></canvas>
    </div>
  );
}
