/**
 * 효진이는 멀리 뛰기를 연습하고 있다.
 * 효진이는 한 번에 1칸 또는 2칸을 뛸 수 있다.
 * 이때 맨 끝 칸에 도달할 수 있는 방법이 몇 가지인지 알아내자.
 *
 * @param {number} n - 멀리 뛰에 사용될 칸의 수 (1~2000)
 * @returns - 끝에 도달하는 방법의 수
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   DP와 재귀를 활용하여 n에 대한 피보나치 수를 구하면 된다.
 *   n에 대한 피보나치 수는, n-1항과 n-2항을 합한 수이다.
 *
 * - 처음에는,
 *   현재 위치에서 1칸 이동할 경우와 2칸 이동할 경우, 즉 모든 경우를 재귀로 탐색하여
 *   n까지 도달하는 경우의 수를 세었다. (완전탐색)
 *   그러나, 시간 초과가 발생하였다.😂
 *   이 경우의 시간 복잡도는 O(2^n)으로 예상한다.
 *
 *   그러다가 1~10까지의 답을 확인해보니
 *   다음과 같이 익숙한 규칙을 발견할 수 있었다.
 *   > 1 2 3 5 8 13 21 34 55 89
 *   이는 피보나치 수열과 동일함을 확인했으며, 빠른 계산을 위해 DP를 활용하였다.
 */

function solution(n) {
    return countJump(n);
}

function countJump(n) {
    const dp = Array(n + 1).fill(null);
    dp[0] = dp[1] = 1;

    return fibonacci(n);

    function fibonacci(n) {
        if (dp[n]) return dp[n];
        return (dp[n] = (fibonacci(n - 1) + fibonacci(n - 2)) % 1234567);
    }
}

/****** TEST CASE *******/

console.log(solution(4));
console.log(solution(3));
console.log(solution(2000));
