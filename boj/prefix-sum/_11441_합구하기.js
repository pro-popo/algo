/**
 * i번째 수부터 j번째 수까지의 합을 구하는 프로그램을 작성하자.
 * 이때, N개의 숫자들, M개의 구간들이 입력으로 주어진다.
 *
 * @param {*} ([numbers, ranges]) [수들의 배열, 구간(i, j)]
 * @returns i번째 수부터 j번째 수까지의 합
 */
function solution([numbers, ranges]) {
    prefixSum(numbers);

    return ranges
        .map(([start, end]) => numbers[end] - numbers[start - 1])
        .join('\n');
}

function prefixSum(numbers) {
    for (let i = 1; i < numbers.length; i++) {
        numbers[i] += numbers[i - 1];
    }
}

function input(test) {
    const fs = require('fs');
    const stdin = (
        process.platform === 'linux'
            ? fs.readFileSync('/dev/stdin').toString().trim()
            : test
    ).split('\n');

    let [N, numbers, M, ...ranges] = stdin;
    numbers = numbers.split(' ').map(Number);
    ranges = ranges.map((range) => range.split(' ').map(Number));

    return [[0, ...numbers], ranges];
}

const TEST1 = `5
10 20 30 40 50
5
1 3
2 4
3 5
1 5
4 4`;

const TEST2 = `3
1 0 -1
6
1 1
2 2
3 3
1 2
2 3
1 3`;

console.log(solution(input()));
