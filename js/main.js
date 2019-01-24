//import EventHandler from './EventHandler';
import GameLoop from 'GameLoop';


GameLoop.start();
//
// const canvas = document.querySelector('#canvas');
// canvas.height = window.innerHeight - 50;
// canvas.width = 640;
//
// const context = canvas.getContext('2d');
//
// context.scale(20,20);
//
// const piece = [
//   [1,1,1],
//   [1,1,1],
//   [1,1,1],
// ];
//
// const player = {
//   matrix : piece,
//   position : { x : 15 , y : 0 }
// };
//
//
// let stage = null;
// let deltaTime = 0;
// let lastTime = 0;
// let dropCounter = 0;
// let dropInterval = 1000;
//
// function createStage(width, height) {
//   const stage = []
//     while(height--){
//       stage.push(new Array(width).fill(0));
//     }
//     console.log(stage)
//     return stage;
// }
//
// /** Create stage */
// stage = createStage(20,20);
//
// /** Player move (left/right) */
// function playerMove(direction) {
//   player.position.x += direction;
//   //TODO: check collision
// }
//
// /** Player drop piece */
// function playerDrop(){
//     player.position.y++;
//     dropCounter = 0;
// }
//
// function drawPiece(matrix, position){
//   matrix.forEach((row,y) => {
//     row.forEach((data,x) => {
//       if (data !== 0){
//         context.fillStyle = 'blue';
//         context.fillRect(
//           x + position.x,
//           y + position.y, 1, 1);
//       }
//     });
//   });
// }
//
// /** Refresh background */
// function refresh() {
//   context.fillStyle = 'black';
//   context.fillRect(0,0,canvas.width,canvas.height);
// }
//
// /** Functions to display game */
// function draw() {
//   refresh();
//   drawPiece(player.matrix, player.position);
// }
//
// /** Update method */
// function update(time = 0) {
//   deltaTime = time - lastTime;
//   lastTime = time;
//   dropCounter += deltaTime;
//   if (dropCounter >= dropInterval){
//     player.position.y++;
//     dropCounter = 0;
//   }
//
//   draw();
//   requestAnimationFrame(update);
// }
//
// /** Init GameLoop */
// update();
