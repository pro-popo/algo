/**
 * 1와 0로 채워진 표가 있다.
 * 이때 1로 이루어진 가장 큰 정사각형의 넓이를 구하고자 한다.
 *
 * @param {number[]} board - 표 (1~1_000)
 * @returns {number} 가장 큰 정사각형의 넓이
 */

function solution(board) {
    const [ROW, COLUMN] = [board.length, board[0].length];

    let width = board[0][0];
    for (let r = 1; r < ROW; r++) {
        for (let c = 1; c < COLUMN; c++) {
            if (board[r][c] === 0) continue;
            board[r][c] =
                Math.min(
                    board[r][c - 1],
                    board[r - 1][c],
                    board[r - 1][c - 1],
                ) + 1;
            width = Math.max(width, board[r][c]);
        }
    }
    return width * width;
}

/****** TEST CASE *******/

console.log(
    solution([
        [0, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [0, 0, 1, 0],
    ]),
);

console.log(solution([[1]]));
