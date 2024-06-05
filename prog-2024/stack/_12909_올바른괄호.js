/**
 * 올바른 괄호인지 판단
 *
 * @param {string} s 괄호로 이루어진 문자열
 * @returns 올바른 괄호인지 boolean
 */

function solution(s) {
    let left = 0;
    for (const char of s) {
        if (char === '(') left++;
        else if (left > 0) left--;
        else return false;
    }
    return left === 0;
}

console.log(solution('()()'));
console.log(solution(')()('));
console.log(solution('(()('));
