/**
 * 자연수 N과 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하자.
 * - 1부터 N까지 자연수 중에서 M개를 고른 수열
 * - 같은 수를 여러 번 골라도 된다.
 *
 * 문제의 조건을 만족하는 수열을 한 줄씩 출력한다.
 * 이때 중복되는 수열을 여러 번 출력하면 안되며, 각 수열은 공백으로 구분해서 출력한다.
 *
 * @param {*} N (1~7)
 * @param {*} M (1~7)
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   중복 순열을 구현하는 문제이다.
 *   1부터 n까지 순회하여, 해당 숫자를 선택했을 경우와 선택하지 않았을 경우를 재귀로 탐색한다.
 *   이때, 다음 탐색에서 선택할 숫자는 이전 숫자와 동일한 숫자도 가능하다.
 *   선택한 숫자의 개수가 M이 될 때 별도의 배열에 선택한 숫자들을 저장한 뒤 탐색을 중단한다.
 *
 *   모든 탐색을 마친 뒤, 모든 수열을 한 줄씩 출력한다.
 */

function solution(N, M) {
    const answer = [];
    dfs([]);
    return answer.join('\n');

    function dfs(selectedNumbers) {
        if (selectedNumbers.length === M) {
            answer.push(selectedNumbers.join(' '));
            return;
        }

        for (let i = 1; i <= N; i++) {
            dfs(selectedNumbers.concat(i));
        }
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
const TEST3 = `3 3`;

console.log(solution(...input(TEST1)));
console.log(solution(...input(TEST2)));
console.log(solution(...input(TEST3)));
