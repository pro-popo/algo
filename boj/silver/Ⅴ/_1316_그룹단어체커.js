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
