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
    removableBlocks = [
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
    fillColumns = [[1, 2], [-1], [1], [-1, -2], [-1, 1]];

    constructor(board) {
        this.board = board;
        this.BOARD_LENGTH = board.length;
    }

    removeAllBlock() {
        let isExistRemovedBlock = false;
        for (let row = 0; row < this.BOARD_LENGTH; row++) {
            for (let column = 0; column < this.BOARD_LENGTH; column++) {
                const point = [row, column];

                if (this.getNumber(point) === 0) continue;

                const blockIndex = this.removableBlocks.findIndex(
                    removableBlock =>
                        this.isRemovableBlock(removableBlock, point),
                );

                if (blockIndex === -1) continue;

                if (this.isDropableBlackBlock(blockIndex, point)) {
                    console.log('remove: ', blockIndex, this.getNumber(point));
                    this.removeBlock(blockIndex, point);
                    isExistRemovedBlock = true;
                    this.numberOfRemovedBlock++;
                }
            }
        }

        if (isExistRemovedBlock) this.removeAllBlock();
    }

    getNumber([row, column]) {
        return this.board[row][column];
    }

    isRemovableBlock(removableBlock, point) {
        const number = this.getNumber(point);

        return removableBlock.every(move => {
            const next = [point[0] + move[0], point[1] + move[1]];
            if (
                this.isOutOfRange(next) ||
                (number !== 0 && number !== this.getNumber(next))
            )
                return false;

            return true;
        });
    }

    isOutOfRange(point) {
        return (
            point[0] < 0 ||
            point[1] < 0 ||
            point[0] === this.BOARD_LENGTH ||
            point[1] === this.BOARD_LENGTH
        );
    }

    isDropableBlackBlock(blockIndex, point) {
        const maxRow = Math.max(
            ...this.removableBlocks[blockIndex].map(move => point[0] + move[0]),
        );
        const columns = this.fillColumns[blockIndex].map(
            move => point[1] + move,
        );

        return this.board
            .slice(0, maxRow)
            .every(line => this.isEmptyColumns(line, columns));
    }

    isEmptyColumns(line, columns) {
        return columns.every(column => line[column] === 0);
    }

    removeBlock(blockIndex, point) {
        this.removableBlocks[blockIndex].forEach(move => {
            const next = [point[0] + move[0], point[1] + move[1]];
            this.board[next[0]][next[1]] = 0;
        });
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
