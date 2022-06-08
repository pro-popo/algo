/**
 * 땅따먹기 게임의 땅은 총 N행 4열로 이루어져 있다.
 * 또한 모든 칸에는 점수가 쓰여져 있다.
 *
 * 1행부터 땅을 밟으며 한 행씩 내려올 때,
 * 각 행의 4칸 중 한 칸만 밟으면서 내려와야 한다.
 * 단, 땅따먹기 게임에는 한 행씩 내려올 때, 같은 열을 연속적으로 밟을 수 없다.
 *
 * 마지막 행까지 모두 내려왔을 때, 얻을 수 있는 점수의 최댓값을 반환하자.
 *
 * @param {number[][]} land - 맵
 *                   행의 개수: 1~100_000, 열의 개수: 4
 * @returns - 마지막 행까지 내려왔을 때 얻을 수 있는 점수의 최댓값
 */

function solution(land) {
    const [ROW, COLUMN] = [land.length, land[0].length];

    const scores = Array.from(Array(ROW), () => Array(COLUMN).fill(0));
    const queue = [];
    land[0].forEach((number, column) => {
        scores[0][column] = number;
        queue.push({ row: 0, column });
    });

    while (queue.length) {
        const { row, column } = queue.shift();

        const nextRow = row + 1;
        if (nextRow === ROW) break;

        land[nextRow].forEach((nextNumber, nextColumn) => {
            if (column == nextColumn) return;

            const score = scores[row][column] + nextNumber;
            if (score <= scores[nextRow][nextColumn]) return;
            scores[nextRow][nextColumn] = score;
            queue.push({ row: nextRow, column: nextColumn });
        });
    }

    return Math.max(...scores[ROW - 1]);
}

/****** TEST CASE *******/

console.log(
    solution([
        [1, 2, 3, 5],
        [5, 6, 7, 8],
        [4, 3, 2, 1],
    ]),
);
