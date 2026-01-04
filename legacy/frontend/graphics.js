class Graphics {
	constructor() {
		this.widthRatio = 1;
		this.heigthRatio = 1;
		this.aspectRatio = this.widthRatio / this.heigthRatio;
		this.gridSizeRatio = 0.9;
        this.cursor = { x: 0, y: 0 };
	}

	drawBoard(cellXY) {
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

		let sizecellXY;
		if (height > width) {
			sizecellXY = width * this.gridSizeRatio;
		} else {
			sizecellXY = height * this.gridSizeRatio;
		}
		const cellSize = sizecellXY / (cellXY - 1); // 線間隔

		// 中央に配置するための原点
		const originX = (width - sizecellXY) / 2;
		const originY = (height - sizecellXY) / 2;

		// 縦線
		for (let i = 0; i < cellXY; i++) {
			let x = originX + i * cellSize;
			line(x, originY, x, originY + sizecellXY);
		}

		// 横線
		for (let i = 0; i < cellXY; i++) {
			let y = originY + i * cellSize;
			line(originX, y, originX + sizecellXY, y);
		}
	}



	drawStones(cellXY, board) {
		let size;
		if (height > width) {
			size = width * this.gridSizeRatio;
		} else {
			size = height * this.gridSizeRatio;
		}
		const cellSize = size / (cellXY - 1); // 線間隔
		let originX = (width - size) / 2;
		let originY = (height - size) / 2;

		textAlign(CENTER, CENTER);
		textSize(cellSize * 0.25);
		noStroke();

		for (let y = 0; y < cellXY; y++) {
			for (let x = 0; x < cellXY; x++) {
				const cell = board[y][x];
				if (cell != null) {
					// 座標を計算
					let cx = originX + x * cellSize;
					let cy = originY + y * cellSize;

					// 色の設定（グレースケール）
					let gray = 255 - (cell / 100) * 255;
					fill(gray);
					ellipse(cx, cy, cellSize * 0.9);
                    if(cell != 0 && cell != 100) {
                        // テキスト（"90-10"など）
					    fill(cell > 50 ? 255 : 0); // 背景が暗ければ白文字、明るければ黒文字
					    text(`${cell}-${100 - cell}`, cx, cy);
                    }
				}
			}
		}
	}

	drawCursor(cellXY) {
		let size = min(width, height) * this.gridSizeRatio;
		const cellSize = size / (cellXY - 1);
		const originX = (width - size) / 2;
		const originY = (height - size) / 2;


		const x = originX + this.cursor.x * cellSize;
		const y = originY + this.cursor.y * cellSize;
		noFill();
		strokeWeight(4);
		stroke(0);
		rect(x - cellSize / 2 + 1, y - cellSize / 2 + 1, cellSize - 2, cellSize - 2);
		strokeWeight(1);
	}
}