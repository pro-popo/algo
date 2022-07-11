/**
 * 자연수 N과 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하자.
 * N개의 자연수는 모두 다른 수이다.
 * - N개의 자연수 중에서 M개를 고른 수열
 *
 * 문제의 조건을 만족하는 수열을 한 줄씩 출력한다.
 * 이때 중복되는 수열을 여러 번 출력하면 안되며, 각 수열은 공백으로 구분해서 출력한다.
 *
 * @param {*} N (1~8)
 * @param {*} M (1~8)
 *
 */

function solution(N, M, numbers) {
    const answer = [];
    numbers.sort((a, b) => a - b);
    dfs(new Set());
    return answer.join('\n');

    function dfs(selectedNumbers) {
        if (selectedNumbers.size === M) {
            answer.push([...selectedNumbers].join(' '));
            return;
        }

        for (let i = 0; i < N; i++) {
            if (selectedNumbers.has(numbers[i])) continue;
            selectedNumbers.add(numbers[i]);
            dfs(selectedNumbers);
            selectedNumbers.delete(numbers[i]);
        }
    }
}

function input(test) {
    const fs = require('fs');
    const data = (
        process.platform === 'linux'
            ? fs.readFileSync('/dev/stdin').toString().trim()
            : test
    ).split('\n');
    const [N, M] = data[0].split(' ').map(Number);
    const numbers = data[1].split(' ').map(Number);
    return [N, M, numbers];
}

/****** TEST CASE *******/

const TEST1 = `3 1
4 5 2`;
const TEST2 = `4 2
9 8 7 1`;
const TEST3 = `4 4
1231 1232 1233 1234`;

console.log(solution(...input(TEST1)));
console.log(solution(...input(TEST2)));
console.log(solution(...input(TEST3)));
