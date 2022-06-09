/**
 * 효진이는 멀리 뛰기를 연습하고 있다.
 * 효진이는 한 번에 1칸 또는 2칸을 뛸 수 있다.
 * 이때 맨 끝 칸에 도달할 수 있는 방법이 몇 가지인지 알아내자.
 *
 * @param {number} n - 멀리 뛰에 사용될 칸의 수 (1~2000)
 * @returns - 끝에 도달하는 방법의 수
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
