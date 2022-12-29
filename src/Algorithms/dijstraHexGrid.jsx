// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function dijkstra(grid, startNode, finishNode) {
  console.log("something");
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  let count = 0;
  const unvisitedNodes = getAllNodes(grid);
  console.log(unvisitedNodes);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    console.log(count++);
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getHexUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

//   function getUnvisitedNeighbors(node, grid) {
//     const neighbors = [];
//     const { col, row } = node;
//     if (row > 0) neighbors.push(grid[row - 1][col]);
//     if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
//     if (col > 0) neighbors.push(grid[row][col - 1]);
//     if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
//     return neighbors.filter((neighbor) => !neighbor.isVisited);
//   }

//-------------------------------------functions to draw hex neighbors--------------------

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

function getHexUnvisitedNeighbors(h) {
  const neighbors = [];
  for (let i = 0; i <= 5; i++) {
    const { q, r, s } = GetCubeNeighbor(Hex(h.q, h.r, h.s), i);
    neighbors.push(Hex(q, r, s));
    //   DrawHex(context, Point(x, y), "red", 2);
  }
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}
//------------------------------------------------------------------------------------//
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

//------------------------------------------------------------------------------------//

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
