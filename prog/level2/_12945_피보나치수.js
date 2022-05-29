/**
 * 피보나치 수는  F(0) = 0, F(1) = 1일 때,
 * F(n) = F(n-1) + F(n-2)가 적용되는 수이다.
 *
 * @param {number} n (2~100_000)
 * @returns n번째 피보나치 수를 1234567으로 나눈 나머지를 반환
 */

function solution(n) {
    return fibonacci(n);
}

function fibonacci(n) {
    const dp = Array(n + 1).fill(null);

    for (let i = 0; i <= n; i++) {
        if (i < 2) dp[i] = i;
        else dp[i] = (dp[i - 1] + dp[i - 2]) % 1234567;
    }

    return dp[n];
}

/****** TEST CASE *******/

console.log(solution(2));
console.log(solution(3));
console.log(solution(5));
console.log(solution(8));
console.log(solution(1234567));
