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
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   순열을 활용하여 구할 수 있다.
 *   1부터 시작하여 해당 숫자를 선택했을 경우와 선택하지 않았을 경우로 나누어 재귀로 탐색한다.
 *   이때, 다음 탐색에서 선택할 숫자는 이전 숫자보다 1만큼 큰 숫자로 탐색한다.
 *   선택한 숫자의 개수가 M이 될 때 별도의 배열에 선택한 숫자들을 저장한 뒤 탐색을 중단한다.
 *   또한, 탐색 숫자가 N보다 커질 때 탐색을 중단한다.
 *
 *   모든 탐색을 마친 뒤, 모든 수열을 한 줄씩 출력한다.
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
