/**
 * 1와 0로 채워진 표가 있다.
 * 이때 1로 이루어진 가장 큰 정사각형의 넓이를 구하고자 한다.
 *
 * @param {number[]} board - 표 (1~1_000)
 * @returns {number} 가장 큰 정사각형의 넓이
 */

function solution(board) {
    const [ROW, COLUMN] = [board.length, board[0].length];

    let [min, max] = [0, ROW];
    let answer = 1;

    while (min <= max) {
        const mid = Math.floor((min + max) / 2);
        if (isExistSquare(mid)) {
            answer = mid * mid;
            min = mid + 1;
            continue;
        }
        max = mid - 1;
    }
    return answer;

    function isExistSquare(width) {
        for (let r = 0; r < ROW; r++) {
            for (let c = 0; c < COLUMN; c++) {
                if (board[r][c] === 0) continue;
                if (isSquare([r, c], width)) return true;
            }
        }
    }

    function isSquare(point, width) {
        if (point[0] + width > ROW || point[1] + width > COLUMN) return false;

        for (let r = point[0]; r < point[0] + width; r++) {
            for (let c = point[1]; c < point[1] + width; c++) {
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

console.log(solution([[1]]));
