class Game {
    constructor() {
        this.cellXY = 15;
        this.board = [];
        
        for(let y = 0; y < this.cellXY; y++) {
            let ary = [];
            for(let x = 0; x < this.cellXY; x++) {
                ary.push(null);
            }
            this.board.push(ary);
        }
    }
}