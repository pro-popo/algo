/**
 * 자연수 N과 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하자.
 * - 1부터 N까지 자연수 중에서 중복 없이 M개를 고른 수열
 * - 고른 수열은 오름차순이어야 한다.
 *
 * 문제의 조건을 만족하는 수열을 한 줄씩 출력한다.
 * 이때 중복되는 수열을 여러 번 출력하면 안되며, 각 수열은 공백으로 구분해서 출력한다.
 *
 * @param {*} N (1~8)
 * @param {*} M (1~8)
 */

function solution(N, M) {
    const answer = [];
    permutation(1, []);
    return answer.join('\n');

    function permutation(number, selectedNumbers) {
        if (selectedNumbers.length === M) {
            answer.push(selectedNumbers.join(' '));
            return;
        }
        if (number > N) return;
        permutation(number + 1, selectedNumbers.concat(number));
        permutation(number + 1, selectedNumbers);
    }
}

function input(test) {
    const fs = require('fs');
    const data =
        process.platform === 'linux'
            ? fs.readFileSync('/dev/stdin').toString().trim()
            : test;
    return data.split(' ').map(Number);
}

/****** TEST CASE *******/

const TEST1 = `3 1`;
const TEST2 = `4 2`;
const TEST3 = `4 4`;

console.log(solution(...input(TEST1)));
console.log(solution(...input(TEST2)));
console.log(solution(...input(TEST3)));
