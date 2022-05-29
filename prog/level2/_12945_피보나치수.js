/**
 * 피보나치 수는  F(0) = 0, F(1) = 1일 때,
 * F(n) = F(n-1) + F(n-2)가 적용되는 수이다.
 *
 * @param {number} n (2~100_000)
 * @returns n번째 피보나치 수를 1234567으로 나눈 나머지를 반환
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   0~n을 순회하여 피보나치 수를 계산한다.
 *   이때, 배열을 활용하여 계산한 피보나치 수를 저장한다.
 *
 * - 동적 계획법(DP)은 큰 문제를 작은 여러 개의 문제로 나누어서 푸는 기법이다.
 *   이러한 DP의 구현 방법은 Top-Down 방식과 Bottom-Up 방식이 존재한다.
 *   - Top-Down 방식
 *     큰 문제를 작은 문제로 나눈 뒤,
 *     작은 문제를 해결한 뒤 결합해 최종 문제를 해결하는 방식
 *
 *   - Bottom-Up 방식
 *     작은 문제부터 해결한 뒤 큰 문제를 해결하는 방식
 *
 *   위 문제를 재귀를 활용하여 Top-Down 방식으로 구현할 경우,
 *   Stack Oberflow가 발생한다.
 *   따라서, Top-Down 방식이 아닌 Bottom-Up 방식으로 접근해야한다.
 *
 * - 단순 재귀로만 구현할 경우, 시간복잡도는 O(2^n)으로 시간초과가 발생할 수 있다.
 *   재귀 + DP를 활용할 경우, 시간복잡도는 O(n)으로 시간초과는 해결할 수 있지만 Stack Oberflow가 발생한다.
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
