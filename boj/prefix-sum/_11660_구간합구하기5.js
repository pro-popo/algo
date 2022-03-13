/**
 * N*N개의 수가 채워진 표에서,
 * (x1, y1)부터 (x2, y2)까지 합을 구하는 프로그램을 작성하자.
 *
 * @param {*} ([numbers, ranges]) [수들의 2차원 배열, 구간(x, y)]
 *            (1 ≤ N ≤ 1024, 1 ≤ M ≤ 100,000)
 * @returns x번째 수부터 y번째 수까지의 합
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저, 2차원 배열에 대한 누적합을 구한다.
 *   왼쪽에서 오른쪽으로 먼저 더한 다음에,
 *   위쪽에서 아래쪽으로 더하면 된다.
 *   0 0  0  0  0
 *   0 1  3  6  10
 *   0 3  8  15 24
 *   0 6  15 27 42
 *   0 10 24 42 64
 *   이때, 0행 0열은 0으로 채워준다.
 *   => map[x-1][y-1]와 같이 (x, y)에 대한 범위 조건에 대해 신경쓰지 않아도 된다.
 *
 *   그 다음, 위의 배열을 활용하여 범위에 대한 합을 구한다.
 *   만약, (2,2)부터 (3,4)의 합을 구해야 한다면,
 *   0  0  0  0  0
 *   0 🟡  3  6 🟣
 *   0  3  8  15 24
 *   0 🟢 15 27 ⭐
 *   0 10  24 42 64
 *
 *   ⭐-🟢-🟣+🟡을 구하면 된다.
 *   => 42-6-10-1 = 27
 *
 *   민약, (2,1)부터 (4,3)의 합을 구해야 한다면,
 *   0  0  0  0  0
 *  🟡 1  3  🟣 10
 *   0  3  8  15 24
 *   0  6  15 27 42
 *  🟢 10  24 ⭐64
 *   => 42-0-6-0 = 32
 *
 *  이를 식으로 표현하면,
 *  (x2, y2) - (x1-1, y2) - (x2, y1-1) + (x1-1, y1-1)
 *  와 같다.
 *
 * - 다른 풀이에서,
 *   2차원 배열에 대한 누적합을 구할 때,
 *   (x2, y2) - (x1-1, y2) - (x2, y1-1) + (x1-1, y1-1) 방식으로 구할 수 있다.
 *   범위 생각하는 것이 복잡하다고 생각되지 않다면, 한 번에 순회로 구할 수 있으므로 좋은 것 같다!
 */

function solution([map, ranges]) {
    const cumulativeSum = calculateCumulativeSum(map);

    return ranges
        .map(
            ([x1, y1, x2, y2]) =>
                cumulativeSum[x2][y2] -
                cumulativeSum[x1 - 1][y2] -
                cumulativeSum[x2][y1 - 1] +
                cumulativeSum[x1 - 1][y1 - 1],
        )
        .join('\n');
}

function calculateCumulativeSum(map) {
    const N = map.length;
    const cumulativeSum = Array.from(Array(N + 1), (_, index) =>
        index === 0 ? Array(N + 1).fill(0) : [0, ...map[index - 1]],
    );

    sumLeftToRight(cumulativeSum);
    sumTopToBottom(cumulativeSum);

    return cumulativeSum;

    function sumLeftToRight(cumulativeSum) {
        for (let i = 1; i <= N; i++) {
            for (let j = 1; j <= N; j++) {
                cumulativeSum[i][j] += cumulativeSum[i][j - 1];
            }
        }
    }

    function sumTopToBottom(cumulativeSum) {
        for (let j = 1; j <= N; j++) {
            for (let i = 1; i <= N; i++) {
                cumulativeSum[i][j] += cumulativeSum[i - 1][j];
            }
        }
    }
}

function input(test) {
    const fs = require('fs');
    const stdin = (
        process.platform === 'linux'
            ? fs.readFileSync('/dev/stdin').toString().trim()
            : test
    ).split('\n');

    let [size, ...ranges] = stdin;
    const [N, M] = size.split(' ');

    ranges = ranges.map((range) => range.split(' ').map(Number));
    const map = ranges.splice(0, N);

    return [map, ranges];
}

const TEST1 = `4 3
1 2 3 4
2 3 4 5
3 4 5 6
4 5 6 7
2 2 3 4
3 4 3 4
1 1 4 4
2 1 3 4`;

const TEST2 = `2 4
1 2
3 4
1 1 1 1
1 2 1 2
2 1 2 1
2 2 2 2`;
console.log(solution(input(TEST1)));
console.log(solution(input(TEST2)));
