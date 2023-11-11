const chessBoard = document.querySelector(".chess-board");

const KnightFactory = (start, end) => {
  const startPoint = start;
  const endPoint = end;
  const visited = [];
  const moves = [
    [1, 2],
    [2, 1],
    [1, -2],
    [2, -1],
    [-1, -2],
    [-2, -1],
    [-1, 2],
    [-2, 1],
  ];

  const addToVisited = (coord) => {
    visited.push(coord);
  };

  return { visited, addToVisited, moves };
};

const gameBoardFactory = () => {
  const gameBoard = [];
  for (let i = 7; i >= 0; i--) {
    for (let j = 0; j < 8; j++) {
      gameBoard.push([i, j]);
    }
  }
  return gameBoard;
};

createBoard();

const knightTravails = function (start = [0, 0], end = [3, 3]) {
  const gameBoard = gameBoardFactory();
  const knight = KnightFactory(start, end);
  const queue = [start];
  const parentsMap = new Map();

  const tracePath = (key) => {
    const path = [key];
    let moveCount = 1;
    let parent = parentsMap.get(key.toString());
    while (parent[0] !== start[0] && parent[1] !== start[1]) {
      path.unshift(parent);
      parent = parentsMap.get(parent.toString());
      moveCount += 1;
    }
    path.unshift(parent);
    console.log(`Path Found in ${moveCount} moves:`);
    path.forEach((coord, i) =>
      console.log(i === 0 ? `Start:` : `Move ${i}`, coord)
    );
    return path;
  };

  console.log(gameBoard);
  console.log(knight);
  let i = 0;
  while (queue.length > 0) {
    console.log(i);
    const currentSquare = queue.shift();
    console.log({ currentSquare });
    // if current square is the end coord destination trace the path back and return the path
    if (currentSquare[0] === end[0] && currentSquare[1] === end[1]) {
      console.log(`END SQUARE REACHED`);
      console.log(parentsMap.get(currentSquare.toString()));
      const path = tracePath(currentSquare);
      // console.log({ path });
      console.log({ path });

      drawPath(path);
      return path;
    }
    for (const move of knight.moves) {
      const squareAfterMove = [
        currentSquare[0] + move[0],
        currentSquare[1] + move[1],
      ];
      if (
        squareAfterMove[0] < 0 ||
        squareAfterMove[0] > 7 ||
        squareAfterMove[1] < 0 ||
        squareAfterMove[1] > 7
      )
        continue;
      if (!knight.visited.includes(squareAfterMove.toString())) {
        knight.addToVisited(squareAfterMove.toString());
        parentsMap.set(squareAfterMove.toString(), currentSquare);
        queue.push(squareAfterMove);
      }
    }
    i++;
    console.log(knight.visited);
    console.log({ parentsMap });
  }
  // if return statement is reached then no path was found
  console.log(`NO PATH FOUND`);
  return "NO PATH FOUND";
};

function createBoard() {
  for (let i = 7; i >= 0; i--) {
    for (let j = 0; j < 8; j++) {
      const square = document.createElement("div");
      square.classList.add((i + j) % 2 === 0 ? "square-black" : "square-white");
      square.id = `${i},${j}`;
      chessBoard.appendChild(square);
    }
  }
}

function drawPath(path) {
  path.forEach((coord, i) => {
    const curSquare = document.getElementById(`${coord[0]},${coord[1]}`);

    setTimeout(() => {
      curSquare.classList.add("marked");
    }, i * 500);

    if (i !== 0) {
      const prevSquare = document.getElementById(
        `${path[i - 1][0]},${path[i - 1][1]}`
      );
      setTimeout(() => {
        prevSquare.classList.remove("marked");
      }, i * 500);
    }
  });
}

knightTravails([0, 0], [7, 1]);

// console.log(knightMoves([0, 0], [1, 2])); // should output [[0,0],[1,2]]
// console.log(knightMoves([0, 0], [3, 3])); // should output [[0,0],[1,2],[3,3]]
// console.log(knightMoves([3, 3], [0, 0])); // should output [[3,3],[1,2],[0,0]]
// console.log(knightMoves([3, 3], [4, 3])); // should output [[3,3],[4,5],[2,4],[4,3]]
