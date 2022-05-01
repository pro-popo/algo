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
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   맵을 왼쪽->오른쪽, 위->아래 방향으로 순회한다.
 *   만약 해당 위치에 블록이 존재하는 경우, 제거할 수 있는 블록 모양과 일치하는지 검사한다.
 *   이때 제거할 수 있는 블록이라면, 맵에서 해당 블록을 제거한다.
 *   위와 같은 순회 과정에서 제거한 블록이 존재한다면, 제거된 블록이 존재하지 않을 때까지 위의 과정을 반복한다.
 *
 *   제거된 블록이 존재하지 않을 때까지 반복하는 이유는, 다음과 같은 경우 때문이다.
 *   1020
 *   1222
 *   1100
 *   이때, 2번 블록을 제거하면 1번 블록 또한 제거할 수 있다.
 *   그러나, 처음 순회 과정에서는 1번 블록부터 검색하기 때문에, 제거된 블록이 존재한다면 재탐색이 필요하다.
 *
 *   제거할 수 있는 블록 모양인지 검사하는 과정은 다음과 같다.
 *   1. 제거할 수 있는 블록 중 하나의 블록의 모양과 동일해야 한다.
 *   2. 블록을 제거하기 위해 검은 블록이 떨어져야 하는 column에 다른 블록이 존재하지 않아야 한다.
 *
 *   제거할 수 있는 블록 모양에 대한 정보는,
 *   현재 위치에서 이동해야 하는 방향에 대한 정보를 저장한다.
 *   예로 L모양의 경우, 현재 위치를 기준으로 [아래 1칸 이동, 아래 2칸 이동, 아래 2칸 이동 및 오른쪽 1칸 이동]와 같이 움직일 때
 *   전부 동일한 번호일 경우 블록이 L모양임을 알 수 있다.
 *
 *   블록을 제거하기 위해 검은 블록이 떨어져야 하는 column에 대한 정보 또한 각 블록에 대해 별도로 저장한다.
 *   이때 해당 column이 비어있는지에 대한 비교는, 블록의 최대 row 이전까지 비교해야 한다.
 *
 * - 맵의 제한 범위가 최대 50이하였기 때문에
 *   하나씩 블록을 비교 및 제거해도 충분히 풀 수 있는 문제였다!
 *
 * - 다른 풀이 방식으로,
 *   순서대로 검은 블록으로 채워 나가 삭제될 블록을 찾을 수 있다.
 *   현재 블록이 빈칸이라면, 검은 블록을 채울 수 있는지 검사한다.
 *   즉, 현재 칸의 위쪽에 삭제되지 않은 블록이 존재하는지 확인한다.
 *
 *   그리고, 현재 칸에 삭제할 수 있는 블록이 존재하는지 확인한다.
 *   블록을 삭제할 수 있는지 판단은 검은 블록 두개와 같은 색 블록 4개가
 *   2x3 혹은 3x2의 직사각형 안에 들어있는지 확인한다.
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
        for (let row = 0; row < this.BOARD_LENGTH; row++) {
            for (let column = 0; column < this.BOARD_LENGTH; column++) {
                const point = new Point([row, column]);

                if (this.isBlank(point)) continue;

                const block = this.findRemovableBlock(point);
                if (!block || !this.isDropableBlackBlock(block)) continue;

                this.removeBlock(block);
                this.removeAllBlock();
            }
        }
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
        return blockPoints.every(
            point =>
                !this.isOutOfRange(point) && number === this.getNumber(point),
        );
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
        return this.board
            .slice(0, Point.maxRow(block.points))
            .every(line => this.isEmptyColumns(line, block.fillColumn));
    }

    isEmptyColumns(line, columns) {
        return columns.every(column => line[column] === 0);
    }

    removeBlock(block) {
        block.points.forEach(
            point => (this.board[point.row][point.column] = 0),
        );
        this.numberOfRemovedBlock++;
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
