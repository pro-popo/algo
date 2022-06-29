/**
 * 지민이는 길이가 64cm인 막대를 가지고 있다.
 * Xcm인 막대를 가지기 위해,
 * 원래 가지고 있던 막대를 더 작은 막대로 잘라 풀로 붙여서 만들고자 한다.
 *
 * 막대는 아래와 같은 과정을 거쳐서 자른다.
 * 1. 가지고 있는 막대의 길이를 모두 더한다.
 *    처음에는 64cm 막대 하나만 가지고 있다.
 *    이때 합이 X보다 크다면, 아래와 같은 과정을 반복한다.
 *    1-1. 가지고 있는 막대 중 길이가 가장 짧은 것을 절반으로 자른다.
 *    2-2. 만약, 위에서 자른 막대의 절반 중 하나를 버리고 남아있는 막대의 길이의 합이 X보다 크거나 같다면
 *         위에서 자른 막대의 절반 중 하나를 버린다.
 * 2. 남아있는 모든 막대를 풀로 붙여서 Xcm를 만든다.
 *
 * X가 주어졌을 때, 위의 과정을 거친다면,
 * 몇 개의 막대를 풀로 붙여서 Xcm를 만들 수 있는지 구하자.
 *
 * @param {number} X - 갖고 싶은 막대의 길이
 */

function solution(X) {
    const sticks = [64];
    let sum = 64;

    while (sum > X) {
        sticks.sort((a, b) => b - a);
        const min = sticks.pop();
        const half = min / 2;
        sticks.push(half, half);

        if (sum - half >= X) {
            sum -= half;
            sticks.pop();
        }
    }

    return sticks.length;
}

function input(test) {
    const fs = require('fs');
    return process.platform === 'linux'
        ? fs.readFileSync('/dev/stdin').toString() * 1
        : test;
}

/****** TEST CASE *******/

const TEST1 = `23`;
const TEST2 = `32`;
const TEST3 = `64`;
const TEST4 = `48`;

console.log(solution(input(TEST1)));
console.log(solution(input(TEST2)));
console.log(solution(input(TEST3)));
console.log(solution(input(TEST4)));
