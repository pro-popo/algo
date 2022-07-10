/**
 * 자연수 N과 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하자.
 * - 1부터 N까지 자연수 중에서 M개를 고른 수열
 * - 같은 수를 여러 번 골라도 된다.
 * - 고른 수열은 비내림차순이어야 한다.
 *   비내림차순이란, 길이가 K인 수열 A가 A1 ≤ A2 ≤ ... ≤ A(K-1) ≤ A(K)를 만족한다.
 *
 * 문제의 조건을 만족하는 수열을 한 줄씩 출력한다.
 * 이때 중복되는 수열을 여러 번 출력하면 안되며, 각 수열은 공백으로 구분해서 출력한다.
 *
 * @param {*} N (1~8)
 * @param {*} M (1~8)
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   중복 수열을 구현하는 방식과 유사하다.
 *   1~N까지 순회하여, 현재의 숫자를 선택할 경우와 선택하지 않을 경우에 따라 DFS를 진행한다.
 *   선택한 숫자의 개수가 M이 될 때까지 재귀를 호출한다.
 *   이때, 다음 숫자가 이전 숫자보다 같거나 크게 하기 위해 매개변수로 이전 숫자를 전달한다.
 *   그리고 이전 숫자보다 큰 숫자에 대해 다음 숫자를 결정한다.
 *
 *   모든 순회를 마쳤다면, 생성했던 모든 수열을 순차적으로 출력한다.
 */

function solution(N, M) {
    const answer = [];
    dfs(1, []);
    return answer.join('\n');

    function dfs(number, selectedNumbers) {
        if (selectedNumbers.length === M) {
            answer.push(selectedNumbers.join(' '));
            return;
        }

        for (let i = number; i <= N; i++) {
            dfs(i, selectedNumbers.concat(i));
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
