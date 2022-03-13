/**
 * N*N개의 수가 채워진 표에서,
 * (x1, y1)부터 (x2, y2)까지 합을 구하는 프로그램을 작성하자.
 *
 * @param {*} ([numbers, ranges]) [수들의 2차원 배열, 구간(x, y)]
 * @returns x번째 수부터 y번째 수까지의 합
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
    const cumulativeSum = Array.from(Array(N + 1), () => Array(N + 1).fill(0));

    for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= N; j++) {
            cumulativeSum[i][j] = cumulativeSum[i][j - 1] + map[i - 1][j - 1];
        }
    }

    for (let j = 1; j <= N; j++) {
        for (let i = 1; i <= N; i++) {
            cumulativeSum[i][j] += cumulativeSum[i - 1][j];
        }
    }
    return cumulativeSum;
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
1 1 4 4`;

const TEST2 = `2 4
1 2
3 4
1 1 1 1
1 2 1 2
2 1 2 1
2 2 2 2`;
console.log(solution(input(TEST1)));
console.log(solution(input(TEST2)));
