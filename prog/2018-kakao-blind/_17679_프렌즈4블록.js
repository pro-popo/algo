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
    const program = new Program(m, n, board);

    program.startGame();
    return program.removedBlocks;
}

class Program {
    static EMPTY = '';
    direction = [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1],
    ];

    constructor(m, n, board) {
        this.R = m;
        this.C = n;
        this.board = board.map(str => str.split(''));
    }

    startGame() {
        const removeBlockPoints = [];
        for (let r = 0; r < this.R - 1; r++) {
            for (let c = 0; c < this.C - 1; c++) {
                const points = this.getSquarePoints([r, c]);
                const standardShape = this.board[r][c];
                if (!standardShape) continue;
                if (this.isAllSameShape(points, standardShape)) {
                    removeBlockPoints.push(...points);
                }
            }
        }

        if (removeBlockPoints.length) {
            this.removeBlocks(removeBlockPoints);
            this.dropBlocks();
            this.startGame();
        }
    }

    getSquarePoints([r, c]) {
        return this.direction.map(move => [r + move[0], c + move[1]]);
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
        for (let r = this.board.length - 1; r >= 0; r--) {
            for (let c = 0; c < this.board.length; c++) {
                if (this.board[r][c] !== Program.EMPTY) continue;

                for (let nextR = r - 1; nextR >= 0; nextR--) {
                    if (this.board[nextR][c]) {
                        this.board[r][c] = this.board[nextR][c];
                        this.board[nextR][c] = Program.EMPTY;
                        break;
                    }
                }
            }
        }
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
