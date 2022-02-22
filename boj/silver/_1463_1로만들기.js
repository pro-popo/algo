/**
 * [실버3] 1로 만들기
 * 1. 시간복잡도 : O(N) -> 10^6 = 1,000,000
 *    - 문제 시간제한 : 1.5초 = 25,000,000
 *
 * 2. 접근 방식
 *  (0) X ~ 1까지 순회
 *  (1) 3개의 연산 중, 가장 작은 연산 횟수를 dp에 저장
 *
 */
function solution(X) {
    const dp = Array(X + 1).fill(X + 1);
    dp[X] = 0;
    for (let i = X; i > 1; i--) {
        dp[i - 1] = Math.min(dp[i - 1], dp[i] + 1);
        if (i % 3 == 0) dp[i / 3] = Math.min(dp[i / 3], dp[i] + 1);
        if (i % 2 == 0) dp[i / 2] = Math.min(dp[i / 2], dp[i] + 1);
    }
    return dp[1];
}

function solution_first(X) {
    const dp = Array(X + 1).fill(false);
    const qu = [X];
    let result = 0;
    while (true) {
        const size = qu.length;
        for (let s = 0; s < size; s++) {
            const num = qu.shift();
            if (num == 1) {
                console.log(result);
                return;
            }
            if (num < 1) continue;

            if (num % 3 == 0 && !dp[num / 3]) {
                qu.push(num / 3);
                dp[num / 3] = true;
            }
            if (num % 2 == 0 && !dp[num / 2]) {
                qu.push(num / 2);
                dp[num / 2] = true;
            }
            if (num > 1 && !dp[num - 1]) {
                qu.push(num - 1);
                dp[num - 1] = true;
            }
        }
        result++;
    }
}

function input() {
    const fs = require('fs');
    const stdin = (
        process.platform === 'linux'
            ? fs.readFileSync('/dev/stdin').toString()
            : `10`
    ).split('\n');
    return stdin[0];
}

console.log(solution(+input()));
