/**
 * 두 수를 입력받아 두 수의 최대공약수와 최소공배수를 반환하자.
 *
 * @param {number} n (1~1_000_000)
 * @param {number} m
 * @returns - [최대공약수, 최소공배수]
 */

function solution(n, m) {
    return [GCD(n, m), LCM(n, m)];
}

function GCD(num1, num2) {
    if (num2 === 0) return num1;
    return GCD(num2, num1 % num2);
}

function LCM(num1, num2) {
    return Math.floor((num1 * num2) / GCD(num1, num2));
}

/****** TEST CASE *******/

console.log(solution(3, 12));
console.log(solution(2, 5));
