

function setup() {
  graphics = new Graphics();
  game = new Game();
  createCanvas(480, 480);

}

function draw() {
  graphics.drawBoard(game.cellXY);
  graphics.drawStones(game.cellXY, game.board);
  graphics.drawCursor(game.cellXY);
}


function keyPressed() {
  // Player1 - WASD
  if (key === 'a') graphics.cursor.x = max(0, graphics.cursor.x - 1);
  if (key === 'd') graphics.cursor.x = min(game.cellXY - 1, graphics.cursor.x + 1);
  if (key === 'w') graphics.cursor.y = max(0, graphics.cursor.y - 1);
  if (key === 's') graphics.cursor.y = min(game.cellXY- 1, graphics.cursor.y + 1);

}