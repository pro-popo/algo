/**
 * 1와 0로 채워진 표가 있다.
 * 이때 1로 이루어진 가장 큰 정사각형의 넓이를 구하고자 한다.
 *
 * @param {number[]} board - 표 (1~1_000)
 * @returns {number} 가장 큰 정사각형의 넓이
 */

function solution(board) {
    const [ROW, COLUMN] = [board.length, board[0].length];

    let maxWidth = 0;
    for (let r = 0; r < ROW; r++) {
        for (let c = 0; c < COLUMN; c++) {
            if (board[r][c] === 0) continue;

            let width = getWidth([r, c]);
            if (width <= maxWidth) continue;
            if (isSquare([r, c], width)) maxWidth = Math.max(maxWidth, width);
        }
    }
    return maxWidth * maxWidth;

    function getWidth(point) {
        let [r, c] = point;
        for (; r < ROW; r++) {
            if (board[r][c] === 0) break;
        }
        return r - point[0];
    }

    function isSquare(point, width) {
        for (let r = point[0]; r < point[0] + width; r++) {
            for (let c = point[1]; c < point[1] + width; c++) {
                if (r >= ROW || c >= COLUMN) return false;
                if (board[r][c] === 0) return false;
            }
        }
        return true;
    }
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
