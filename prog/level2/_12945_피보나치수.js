/**
 * 피보나치 수는  F(0) = 0, F(1) = 1일 때,
 * F(n) = F(n-1) + F(n-2)가 적용되는 수이다.
 *
 * @param {number} n (2~100_000)
 * @returns n번째 피보나치 수를 1234567으로 나눈 나머지를 반환
 */

function solution(n) {
    return fibonacci(n) % 1234567;
}

function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

/****** TEST CASE *******/

console.log(solution(3));
console.log(solution(5));
