/**
 * 자연수 N과 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하자.
 * N개의 자연수는 모두 다른 수이다.
 * - N개의 자연수 중에서 M개를 고른 수열
 * - 고른 수열은 오름차순이어야 한다.
 *
 * 문제의 조건을 만족하는 수열을 한 줄씩 출력한다.
 * 이때 중복되는 수열을 여러 번 출력하면 안되며, 각 수열은 공백으로 구분해서 출력한다.
 * 또한 수열은 사전 순으로 증가하는 순서로 출력해야 한다.
 *
 * @param {*} N (1~8)
 * @param {*} M (1~8)
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저 사전 순으로 증가하는 수열을 생성하기 위해 numbers를 오름차순으로 정렬한다.
 *   numbers의 0번째 인덱스부터 순서대로 순회하여
 *   해당 숫자를 선택하는 경우와 선택하지 않는 경우로 나누어 탐색한다.
 *   이때, 수열의 숫자가 오름차순이 되기 위해 이전 숫자보다 큰 숫자를 선택한다.
 *
 *   생성한 수열을 순서대로 출력한다.
 */

function solution(N, M, numbers) {
    const answer = [];
    numbers.sort((a, b) => a - b);
    dfs(0, new Set());
    return answer.join('\n');

    function dfs(number, selectedNumbers) {
        if (selectedNumbers.size === M) {
            answer.push([...selectedNumbers].join(' '));
            return;
        }

        for (let i = number; i < N; i++) {
            if (selectedNumbers.has(numbers[i])) continue;
            selectedNumbers.add(numbers[i]);
            dfs(i + 1, selectedNumbers);
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
