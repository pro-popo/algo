/**
 * [게임 규칙]
 * - 3종류의 블록을 회전해서 총 12가지 모양의 블록을 만들 수 있다.
 * - N x N 크기의 보드 위에 블록들이 배치된 채로 게임이 시작된다.
 * - 플레이어는 1 x 1 크기의 검은 블록을 떨어뜨려 쌓을 수 있다.
 *   이때, 검정 블록과 기존에 놓인 블록을 합하여 직사각형을 만들 수 있다면, 그 블록을 없앨 수 있다.
 *
 * 검은 블록을 떨어뜨려 없앨 수 있는 블록 개수의 최댓값을 구하라.
 *
 * @param {*} board 보드 위에 놓인 블록의 상태
 * @returns 검은 블록을 떨어뜨려 없앨 수 있는 블록 개수의 최댓값
 */

function solution(board) {
    const blockGame = new BlockGame(board);
    blockGame.removeAllBlock();
    return blockGame.numberOfRemovedBlock;
}

class BlockGame {
    numberOfRemovedBlock = 0;

    constructor(board) {
        this.board = board;
    }

    get BOARD_LENGTH() {
        return this.board.length;
    }

    removeAllBlock() {
        let isExistRemovedBlock = false;
        for (let row = 0; row < this.BOARD_LENGTH; row++) {
            for (let column = 0; column < this.BOARD_LENGTH; column++) {
                const point = new Point([row, column]);

                if (this.isBlank(point)) continue;

                const block = this.findRemovableBlock(point);

                if (!block) continue;
                if (this.isDropableBlackBlock(block)) {
                    this.removeBlock(block);
                    this.numberOfRemovedBlock++;
                    isExistRemovedBlock = true;
                }
            }
        }

        if (isExistRemovedBlock) this.removeAllBlock();
    }

    isBlank(point) {
        return this.getNumber(point) === 0;
    }

    getNumber(point) {
        return this.board[point.row][point.column];
    }

    findRemovableBlock(point) {
        const blockIndex = RemovableBlock.getBlocksPoints(point).findIndex(
            blockPoints =>
                this.isPossibleBlock(blockPoints, this.getNumber(point)),
        );

        if (blockIndex === -1) return null;
        return new RemovableBlock(blockIndex, point);
    }

    isPossibleBlock(blockPoints, number) {
        return blockPoints.every(point => {
            if (this.isOutOfRange(point)) return false;
            return number === this.getNumber(point);
        });
    }

    isOutOfRange(point) {
        return (
            point.row < 0 ||
            point.column < 0 ||
            point.row === this.BOARD_LENGTH ||
            point.column === this.BOARD_LENGTH
        );
    }

    isDropableBlackBlock(block) {
        const maxRow = Point.maxRow(block.points);

        return this.board
            .slice(0, maxRow)
            .every(line => this.isEmptyColumns(line, block.fillColumn));
    }

    isEmptyColumns(line, columns) {
        return columns.every(column => line[column] === 0);
    }

    removeBlock(block) {
        block.points.forEach(
            point => (this.board[point.row][point.column] = 0),
        );
    }
}

class RemovableBlock {
    static blocks = [
        [
            [0, 0],
            [1, 0],
            [1, 1],
            [1, 2],
        ],
        [
            [0, 0],
            [1, 0],
            [2, 0],
            [2, -1],
        ],
        [
            [0, 0],
            [1, 0],
            [2, 0],
            [2, 1],
        ],
        [
            [0, 0],
            [1, 0],
            [1, -1],
            [1, -2],
        ],
        [
            [0, 0],
            [1, 0],
            [1, -1],
            [1, 1],
        ],
    ];

    static fillColumns = [[1, 2], [-1], [1], [-1, -2], [-1, 1]];

    static getBlocksPoints(point) {
        return RemovableBlock.blocks.map(block =>
            RemovableBlock.getBlockPoints(block, point),
        );
    }

    static getBlockPoints(block, point) {
        return block.map(move => point.movePoint(move));
    }

    static getFillColumn(blockIndex, point) {
        return RemovableBlock.fillColumns[blockIndex].map(
            move => move + point.column,
        );
    }

    constructor(blockIndex, point) {
        this.points = RemovableBlock.getBlocksPoints(point)[blockIndex];
        this.fillColumn = RemovableBlock.getFillColumn(blockIndex, point);
    }
}

class Point {
    constructor(point) {
        this.point = point;
    }

    get row() {
        return this.point[0];
    }

    get column() {
        return this.point[1];
    }

    movePoint(move) {
        return new Point([this.row + move[0], this.column + move[1]]);
    }

    static maxRow(points) {
        return Math.max(...points.map(point => point.row));
    }
}

/****** TEST CASE *******/

console.log(
    solution([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 4, 0, 0, 0],
        [0, 0, 0, 0, 0, 4, 4, 0, 0, 0],
        [0, 0, 0, 0, 3, 0, 4, 0, 0, 0],
        [0, 0, 0, 2, 3, 0, 0, 0, 5, 5],
        [1, 2, 2, 2, 3, 3, 0, 0, 0, 5],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 5],
    ]),
);

console.log(
    solution([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 9, 9, 9, 0, 0, 0, 0, 0, 0],
        [0, 9, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 7, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 7, 4, 0, 0, 0],
        [0, 0, 6, 0, 7, 7, 4, 4, 0, 0],
        [0, 6, 6, 6, 3, 0, 4, 0, 0, 0],
        [0, 0, 0, 2, 3, 8, 8, 0, 5, 5],
        [1, 2, 2, 2, 3, 3, 8, 0, 0, 5],
        [1, 1, 1, 0, 0, 0, 8, 0, 0, 5],
    ]),
);
