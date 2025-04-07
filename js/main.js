const canvas = document.querySelector('#canvas');
canvas.height = 400;
canvas.width = 300;

const context = canvas.getContext('2d');
context.scale(20, 20);

const nextCanvas = document.getElementById('next');
const nextCtx = nextCanvas.getContext('2d');
nextCtx.scale(20, 20);

const pieces = [
  [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0],
  ],
  [
    [1, 1],
    [1, 1],
  ],
  [
    [0, 1, 1],
    [1, 1, 0],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
  [
    [1, 0, 0],
    [1, 1, 1],
  ],
  [
    [0, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 1, 1, 1],
  ]
];

const player = {
  matrix: pieces[Math.floor(Math.random() * pieces.length)],
  position: { x: 5, y: 0 }
};

let stage = createStage(15, 20);
let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
let score = 0;
let lines = 0;

let nextPiece = pieces[Math.floor(Math.random() * pieces.length)];

function createStage(width, height) {
    const stage = []
    while(height--){
      stage.push(new Array(width).fill(0));
    }
    return stage;
}

function collide(stage, player) {
  const [pieceMatrix, piecePosition] = [player.matrix, player.position];

  for (let y = 0; y < pieceMatrix.length; y++) {
    for (let x = 0; x < pieceMatrix[y].length; x++) {
      const pieceValue = pieceMatrix[y][x];
      
      if (pieceValue !== 0) {
        const stageY = y + piecePosition.y;
        const stageX = x + piecePosition.x;

        if (
          stageY >= stage.length ||                 
          stageX < 0 || stageX >= stage[0].length ||
          stage[stageY][stageX] !== 0               
        ) {
          return true; 
        }
      }
    }
  }

  return false; 
}

function merge(stage, player) {
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        stage[y + player.position.y][x + player.position.x] = value;
      }
    });
  });
}

function playerMove(direction) {
  player.position.x += direction;
  if (collide(stage, player)) {
    player.position.x -= direction;
  }
}

function playerDrop() {
  player.position.y++;
  if (collide(stage, player)) {
    player.position.y--;
    merge(stage, player);
    playerReset();
    removeRows();
  }
  dropCounter = 0;
}

function playerReset() {
  player.matrix = nextPiece;
  player.position.y = 0;
  player.position.x = Math.floor(stage[0].length / 2) - 1;

  nextPiece = pieces[Math.floor(Math.random() * pieces.length)];

  if (collide(stage, player)) {
    stage = createStage(10, 20);
    score = 0;
    lines = 0;
  }
}

function rotate(matrix) {
  const rotated = [];

  const numRows = matrix.length;
  const numCols = matrix[0].length;

  for (let col = 0; col < numCols; col++) {
    const newRow = [];

    for (let row = numRows - 1; row >= 0; row--) {
      newRow.push(matrix[row][col]);
    }

    rotated.push(newRow);
  }

  return rotated;
}

function playerRotate() {
  const prevMatrix = player.matrix;
  player.matrix = rotate(player.matrix);
  if (collide(stage, player)) {
    player.matrix = prevMatrix;
  }
}

function removeRows() {
  let rowsRemoved = 0;

  for (let y = stage.length - 1; y >= 0; y--) {
    if (stage[y].every(cell => cell !== 0)) {
      stage.splice(y, 1);
      stage.unshift(new Array(stage[0].length).fill(0));
      rowsRemoved++;
      y++;
    }
  }

  if (rowsRemoved > 0) {
    lines += rowsRemoved;
    score += rowsRemoved * 100;
  }
}

function drawPiece(matrix, position) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = 'blue';
        context.fillRect(x + position.x, y + position.y, 1, 1);
      }
    });
  });
}

function scoreUI() {
  context.fillStyle = 'white';
  context.font = '1px Arial';
  context.fillText(`Score: ${score}`, 0.2, 1);
  context.fillText(`Lines: ${lines}`, 0.2, 2);
}

function drawStage() {
  stage.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = 'gray';
        context.fillRect(x, y, 1, 1);
      }
    });
  });
}

function drawNextPieceHTML() {
  nextCtx.clearRect(0, 0, nextCanvas.width, nextCanvas.height);
  
  nextPiece.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        nextCtx.fillStyle = 'red';
        nextCtx.fillRect(x, y, 1, 1);
      }
    });
  });
}


function refresh() {
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  refresh();
  drawStage();
  drawPiece(player.matrix, player.position);
  drawNextPieceHTML();
  scoreUI(); 
}


function update(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;
  dropCounter += deltaTime;
  if (dropCounter >= dropInterval) {
    playerDrop();
  }
  draw();
  requestAnimationFrame(update);
}

document.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') playerMove(-1);
  if (event.key === 'ArrowRight') playerMove(1);
  if (event.key === 'ArrowDown') playerDrop();
  if (event.key === 'ArrowUp') playerRotate();
});

update();