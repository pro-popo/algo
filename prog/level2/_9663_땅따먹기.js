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
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   다음 위치를 이동했을 때의 최댓값을 저장해 나아가면 된다.
 *
 *   이를 위해 queue와 DP를 활용하였다.
 *   현재 위치의 최대 점수를 저장할, land와 동일한 크기의 배열을 생성한다.
 *
 *   0번째 행부터 시작하여 현재 위치(row, column)를 큐에 넣는다.
 *   큐가 빌때까지 다음 과정을 반복한다.
 *   큐에서 하나씩 위치를 꺼내, 다음 위치로 이동했을 경우,
 *   다음 위치의 최대 점수보다 큰 경우에만 이동한다.
 *   이때, 동일한 열인 경우에는 이동하지 않는다.
 *
 *   모든 순회를 마쳤다면,
 *   마지막 행에서 가장 작은 점수를 반환한다.
 *
 * - 다른 풀이 방식으로는,
 *   land를 순회하여 다음 행의 각 열에 올 수 있는 최댓값 구하면 된다.
 *   즉, 다음 행의 각 열에 대한 최댓값은 다음과 같이 구할 수 있다.
 *   [
 *      다음 행[0] + Math.max(이전 행[1], 이전 행[2], 이전 행[3]),
 *      다음 행[1] + Math.max(이전 행[0], 이전 행[2], 이전 행[3]),
 *      ...
 *   ]
 *   이를 위해 Array의 reduce메서드를 활용하면 단순하게 계산할 수 있다.
 */

function solution(land) {
    const [ROW, COLUMN] = [land.length, land[0].length];

    const queue = land[0].map((_, column) => ({ row: 0, column }));
    const scores = Array.from(Array(ROW), () => Array(COLUMN).fill(0));
    scores[0] = land[0];

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
