/**
 * 그룹 단어란, 단어에 존재하는 모든 문자에 대해
 * 각 문자가 연속해서 나타나는 경우만을 말한다.
 *
 * 예로, ccazzzzbb는 c,a,z,b가 모두 연속해서 나온다. 즉, 그룹 단어이다.
 * 반면에 aabbcca는 a가 떨어져 있기 때문에 그룹 단어가 아니다.
 *
 * 단어 N개를 입력받아 그룹 단어의 개수를 반환하자.
 *
 * @param {number} N - 단어의 개수
 * @param {string[]} words - 단어들
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저 이전 문자를 저장하는 변수와 만났던 문자를 저장하는 Set 객체를 준비한다.
 *
 *   word를 순회하여, 현재 문자와 이전 문자를 비교한다.
 *
 *   만약 현재 문자가 이전 문자랑 다를 경우,
 *   Set 객체에서 이전에 나왔던 문자인지 확인한다.
 *   이때 Set 객체에 존재할 경우, 연속적으로 나타나는 문자가 아닌 경우이므로
 *   해당 단어는 그룹 단어가 아님을 알 수 있다. 따라서 false를 반환한다.
 *
 *   만약 Set 객체에 존재하지 않을 경우,
 *   이전 문자에 현재 문자를 저장하고, Set 객체에 현재 문자를 추가한다.
 *
 *   순회를 성공적으로 마쳤다면, true를 반환한다.
 *
 *   위 과정에 따라 모든 단어에 대해 그룹 단어인지 검사한 뒤,
 *   그룹 단어가 몇개인지 반환한다.
 */

function solution(N, words) {
    return words.filter(isGroupWord).length;
}

function isGroupWord(word) {
    let previous = word[0];
    let used = new Set([previous]);

    for (const current of word) {
        if (previous === current) continue;
        if (used.has(current)) return false;
        used.add(current);
        previous = current;
    }

    return true;
}

function input(test) {
    const fs = require('fs');
    const data = (
        process.platform === 'linux'
            ? fs.readFileSync('/dev/stdin').toString().trim()
            : test
    ).split('\n');

    const N = +data.shift();
    const words = data;
    return [N, words];
}

/****** TEST CASE *******/

const TEST1 = `3
happy
new
year`;

const TEST2 = `4
aba
abab
abcabc
a`;

const TEST3 = `5
ab
aa
aca
ba
bb`;

const TEST4 = `2
yzyzy
zyzyz`;

const TEST5 = `1
z`;

console.log(solution(...input(TEST1)));
console.log(solution(...input(TEST2)));
console.log(solution(...input(TEST3)));
console.log(solution(...input(TEST4)));
console.log(solution(...input(TEST5)));
