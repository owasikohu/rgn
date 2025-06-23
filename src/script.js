// グローバル変数 - p5.js
const widthRatio = 16;
const heightRatio = 9;
const aspectRatio = widthRatio / heightRatio;
const boardSize = 0.85;

// グローバル変数 - ゲームロジック
const masu = 15;
let board = [];
let cursor1 = {x: 0, y: 0}; // 青 - Player1
let cursor2 = {x: masu - 1, y: masu - 1}; // 赤 - Player2


function setup() {
	// p5.js
	const [w, h] = getMaxSize();
	createCanvas(w, h);

	// ゲームロジック
	for (let i = 0; i < masu; i++) board.push(Array(masu).fill(0));
}

// メイン描画
function draw() {
	background(180, 255, 160); // 畳っぽい
	drawBoard();
	drawStones();
	drawCursor();
}


// ウィンドウリサイズ対応
function windowResized() {
	const [w, h] = getMaxSize();
	resizeCanvas(w, h);
}

// アスペクト比を維持した最大キャンバスサイズ
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

function drawBoard() {
	let size = min(width, height); // 正方形のサイズ
	let x = (width - size) / 2;
	let y = (height - size) / 2;

	fill(240, 210, 160); // 木っぽい色の背景
	noStroke();

	rect(x, y, size, size);

	let sizeMasu;
	if (height > width) {
		sizeMasu = width * boardSize;
	} else {
		sizeMasu = height * boardSize;
	}
	const cellSize = sizeMasu / (masu - 1); // 線間隔

	// 中央に配置するための原点
	const originX = (width - sizeMasu) / 2;
	const originY = (height - sizeMasu) / 2;


	// グリッド
	stroke(0);
	strokeWeight(2);

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
		let y = originY - cellSize * 0.75; //0.75は位置補正
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


function drawStones() {
	let size;
	if (height > width) {
		size = width * 0.85;
	} else {
		size = height * 0.85;
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


function drawCursor() {
	let size = min(width, height) * 0.85;
	const cellSize = size / (masu - 1);
	const originX = (width - size) / 2;
	const originY = (height - size) / 2;

	// 青カーソル
	{
		const x = originX + cursor1.x * cellSize;
		const y = originY + cursor1.y * cellSize;
		noFill();
		strokeWeight(4);
		stroke('blue');
		rect(x - cellSize / 2 + 1, y - cellSize / 2 + 1, cellSize - 2, cellSize - 2);
	}

	// 赤カーソル
	{
		const x = originX + cursor2.x * cellSize;
		const y = originY + cursor2.y * cellSize;
		noFill();
		strokeWeight(4);
		stroke('red');
		rect(x - cellSize / 2 + 1, y - cellSize / 2 + 1, cellSize - 2, cellSize - 2);
	}

	strokeWeight(1);
}

function keyPressed() {
	// Player1 - WASD
	if (key === 'a') cursor1.x = max(0, cursor1.x - 1);
	if (key === 'd') cursor1.x = min(masu - 1, cursor1.x + 1);
	if (key === 'w') cursor1.y = max(0, cursor1.y - 1);
	if (key === 's') cursor1.y = min(masu - 1, cursor1.y + 1);
	if (key === 'f') placeStone(cursor1.x, cursor1.y, 1); // Player1は90%

	// Player2 - 矢印キー
	if (keyCode === LEFT_ARROW) cursor2.x = max(0, cursor2.x - 1);
	if (keyCode === RIGHT_ARROW) cursor2.x = min(masu - 1, cursor2.x + 1);
	if (keyCode === UP_ARROW) cursor2.y = max(0, cursor2.y - 1);
	if (keyCode === DOWN_ARROW) cursor2.y = min(masu - 1, cursor2.y + 1);
	if (keyCode === ENTER) placeStone(cursor2.x, cursor2.y, 2); // Player2は10%
}


function placeStone(x, y, player) {
	if (board[y][x] === 0) {
		board[y][x] = player === 1 ? 90 : 10;
	}
}