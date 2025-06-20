// グローバル変数 - p5.js
const widthRatio = 16;
const heightRatio = 9;
const aspectRatio = widthRatio / heightRatio;

// グローバル変数 - ゲームロジック
const masu = 15;
let board = [];

// p5.js セットアップ
function setup() {
  const [w, h] = getMaxSize();
  createCanvas(w, h);

}

function draw() {
  background(180, 255, 160);
  drawBoard();
  drawStones();
}

function windowResized() {
  const [w, h] = getMaxSize();
  resizeCanvas(w, h);
}

// ウィンドウサイズから最大サイズのキャンバスを取得（アスペクト比を維持）
function getMaxSize() {
  let w = windowWidth;
  let h = windowHeight;
  if (w / h > aspectRatio) {
    w = h * aspectRatio;
  } else {
    h = w / aspectRatio;
  }
  return [w, h];
}

// 盤面の描画
function drawBoard() {
  // 木の色の背景（正方形）
  fill(240, 210, 160);
  noStroke();
  let size = min(width, height); // 正方形のサイズ
  let x = (width - size) / 2;
  let y = (height - size) / 2;
  rect(x, y, size, size);

  // グリッド線
  stroke(0);
  strokeWeight(2);

  let sizeMasu;
  if (height > width) {
    sizeMasu= width * 0.85;
  } else {
    sizeMasu= height * 0.85;
  }
  const cellSize = sizeMasu / (masu - 1); // 線間隔

  // 中央に配置するための原点
  const originX = (width - sizeMasu) / 2;
  const originY = (height - sizeMasu) / 2;

  // 縦線
  for (let i = 0; i < masu; i++) {
    let x = originX + i * cellSize;
    line(x, originY, x, originY + sizeMasu);
  }

  // 横線
  for (let i = 0; i < masu; i++) {
    let y = originY + i * cellSize;
    line(originX, y, originX + sizeMasu, y);
  }
  
  fill(0);  
  // 横 (上部) に A, B, C, ...
  for (let i = 0; i < masu; i++) {
    let label = String.fromCharCode(65 + i); // ASCII A〜
    let x = originX + i * cellSize - 3 //3は位置補正
    let y = originY - cellSize * 0.5; //0.5は位置補正
    text(label, x, y);
  }

  // 縦 (左側) に 1, 2, 3, ...
  for (let i = 0; i < masu; i++) {
    let label = (i + 1).toString();
    let x = originX - cellSize * 0.75; //0.75位置は補正
    let y = originY + i * cellSize + 3; //0.3は位置補正
    text(label, x, y);
  }
}

// 石の描画（例として中央に1つ）
function drawStone() {
  fill(0);
  ellipse(width / 2, height / 2, width / 5);
}

function drawStones() {
    let size;
  if (height > width) {
    size= width * 0.85;
  } else {
    size= height * 0.85;
  }
  const cellSize = size / (masu - 1); // 線間隔
  let originX = (width - size) / 2;
  let originY = (height - size) / 2;

  textAlign(CENTER, CENTER);
  textSize(cellSize * 0.25);
  noStroke();

  for (let y = 0; y < masu; y++) {
    for (let x = 0; x < masu; x++) {
      let prob = board[y][x];
      if (prob > 0) {
        // 座標を計算
        let cx = originX + x * cellSize;
        let cy = originY + y * cellSize;

        // 色の設定（グレースケール）
        let gray = 255 - (prob / 100) * 255;
        fill(gray);
        ellipse(cx, cy, cellSize * 0.9);

        // テキスト（"90-10"など）
        fill(prob > 50 ? 255 : 0); // 背景が暗ければ白文字、明るければ黒文字
        text(`${prob}-${100 - prob}`, cx, cy);
      }
    }
  }
}

// ゲームロジック
for(let i = 0; i < masu; i++) board.push(Array(masu));
board[0][0] = 90;
board[14][14] = 30;
board[12][14] = 30;
board[13][14] = 30;
board[8][5] =  60;