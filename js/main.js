const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');

context.scale(10,10);

const piece = [
  [1,1,1],
  [1,1,1],
  [1,1,1],
];

const player = {
  matrix : piece,
  position : { x : 1 , y : 1 }
};

let deltaTime = 0;
let lastTime = 0;
let dropCounter = 0;
let dropInterval = 1000;

document.addEventListener('keydown', event => {
  if (event.keyCode == 37){
    player.position.x--;
  }else if (event.keyCode == 39) {
    player.position.x++;
  }else if (event.keyCode == 40){
    player.position.y++;
    dropCounter = 0;
  }
});

function drawPiece(matrix, position){
  matrix.forEach((row,y) => {
    row.forEach((data,x) => {
      if (data !== 0){
        context.fillStyle = 'blue';
        context.fillRect(
          x + position.x,
          y + position.y, 1, 1);
      }
    });
  });
}

function refresh() {
  context.fillStyle = 'black';
  context.fillRect(0,0,canvas.width,canvas.height);
}

function draw() {
  refresh();
  drawPiece(player.matrix, player.position);
}

function update(time = 0) {
  deltaTime = time - lastTime;
  lastTime = time;
  dropCounter += deltaTime;
  if (dropCounter >= dropInterval){
    player.position.y++;
    dropCounter = 0;
  }

  console.log(deltaTime)
  draw();
  requestAnimationFrame(update);
}

update();
