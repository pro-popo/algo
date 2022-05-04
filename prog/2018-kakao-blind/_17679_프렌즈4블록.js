/**
 * 프렌즈4블록 게임은,
 * 같은 모양의 블록이 2x2 형태로 4개가 붙어있을 경우 사라지면서 점수를 얻는 게임이다.
 * 이때, 지워지는 조건에 만족하는 2x2 모양이 여러 개 있다면, 한꺼번에 지워진다.
 * 블록이 지워진 후에 위에 있는 블록이 아래로 떨어져 빈 공간을 채우게 된다.
 * 위 과정을 반복하여 지울 수 있는 모든 블록을 제거한다.
 * 이때, 지워지는 블록은 총 몇 개인지 판단하는 프로그램으 제작하자.
 *
 * @param {*} m 판의 높이 (2~30)
 * @param {*} n 판의 폭
 * @param {*} board 판의 배치 정보
 * @returns 제거된 블록의 총 개수
 */

function solution(m, n, board) {
    const program = new Program(board);

    program.startRemoveBlocks();
    return program.removedBlocks;
}

class Program {
    static EMPTY = '';

    constructor(board) {
        this.board = board.map(str => str.split(''));
    }

    get R() {
        return this.board.length;
    }

    get C() {
        return this.board[0].length;
    }

    startRemoveBlocks() {
        const removableBlocks = this.findRemovableBlocks();

        if (removableBlocks.length) {
            this.removeBlocks(removableBlocks);
            this.dropBlocks();
            this.startRemoveBlocks();
        }
    }

    findRemovableBlocks() {
        const removableBlocks = [];
        for (let r = 0; r < this.R - 1; r++) {
            for (let c = 0; c < this.C - 1; c++) {
                const standardShape = this.board[r][c];
                if (standardShape === Program.EMPTY) continue;

                const points = Direction.getSquarePoints([r, c]);
                if (this.isAllSameShape(points, standardShape)) {
                    removableBlocks.push(...points);
                }
            }
        }

        return removableBlocks;
    }

    isAllSameShape(points, standardShape) {
        return points
            .map(([r, c]) => this.board[r][c])
            .every(shape => shape === standardShape);
    }

    removeBlocks(points) {
        points.forEach(([r, c]) => (this.board[r][c] = Program.EMPTY));
    }

    dropBlocks() {
        const newBoard = Array.from(Array(this.R), () =>
            Array(this.C).fill(Program.EMPTY),
        );

        for (let c = 0; c < this.C; c++) {
            let currentR = this.R - 1;
            for (let r = this.R - 1; r >= 0; r--) {
                if (this.board[r][c] === Program.EMPTY) continue;
                newBoard[currentR--][c] = this.board[r][c];
            }
        }

        this.board = newBoard;
    }

    get removedBlocks() {
        return this.board.reduce(
            (emptyBlocks, row) =>
                emptyBlocks +
                row.filter(block => block === Program.EMPTY).length,
            0,
        );
    }
}

class Direction {
    static get currunt() {
        return [0, 0];
    }

    static get right() {
        return [0, 1];
    }

    static get bottom() {
        return [1, 0];
    }

    static get square() {
        return [
            Direction.currunt,
            Direction.right,
            Direction.bottom,
            Direction.join(Direction.right, Direction.bottom),
        ];
    }

    static join(...direction) {
        return direction.reduce(Direction.movePoint, Direction.currunt);
    }

    static getSquarePoints(point) {
        return Direction.square.map(move => Direction.movePoint(point, move));
    }

    static movePoint(point, move) {
        return [point[0] + move[0], point[1] + move[1]];
    }
}

/****** TEST CASE *******/

console.log(solution(4, 5, ['CCBDE', 'AAADE', 'AAABF', 'CCBBF']));

console.log(
    solution(6, 6, [
        'TTTANT',
        'RRFACC',
        'RRRFCC',
        'TRRRAA',
        'TTMMMF',
        'TMMTTJ',
    ]),
);
