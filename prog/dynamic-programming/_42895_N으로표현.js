/**
 * 숫자 N과 사칙연산만 사용해서 표현할 수 있는 방법을 구하자.
 * [EX] 12 = (55 + 5) / 5
 *
 * @param {*} N 1~9
 * @param {*} number 1~32_000
 * @returns N 사용횟수의 최솟값, 8보다 크면 -1
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   sum = sum @ (N @ N)에 대한 모든 경우의 결과를 가지고 DFS를 진행한다.
 *   이때 "@"는 사칙연산(+, -, /, *)을 의미한다.
 *
 *   위와 같이 접근한 이유는,
 *   괄호 혹은 연산자에 대한 우선 순위가 존재하기 때문이다.
 *   반례로 [5, 26]가 존재한다. (답: 4)
 *
 *   또한, N은 NN, NNN와 같이 이어붙이기가 가능하다.
 *   (N @ N)에서 두 피연산자를 대상으로
 *   N을 (i 혹은 j)개수만큼 이어붙인 모든 경우에 대해 위의 연산을 진행한다.
 *
 *   중복 계산을 줄이고자, (DP-메모이제이션)
 *   number크기의 배열을 생성한 다음,
 *   숫자(index)를 표현하기 위해 필요한 N의 개수를 저장하였다.
 *
 * - 처음에는 괄호 혹은 연산자에 대한 우선 순위를 고려하지 않았다.
 *   또한, "계산결과N => N이 5인 경우 105"와 같이
 *   계산 결과에 N을 이어붙이기가 가능한 줄 알았다. 😅
 *
 * - 다른 풀이 중에서,
 *   메모이제이션을 사용할 때,
 *   사용한 N의 개수에 따라 표현할 수 있는 숫자들을 저장하였다.
 *   (Set 객체 사용)
 *   그리고, dp에 저장된 숫자들을 가지고 계산을 진행한다.
 *   예) dp[3] => dp[1] @ dp[2] , dp[2] @ dp[1]
 *   추가로, NN, NNN와 같이 반복되는 숫자를 해당 dp에 저장해야 한다.
 *
 *   나눗셈의 소수점을 제거하기 위해,
 *   Math.floor 대신에 arg1/arg2>>0을 사용할 수 있다.
 */

const USAGE_LIMIT = 8;
function solution(N, number) {
    const memo = Array(number + 1).fill(USAGE_LIMIT + 1);
    nextCalculations(N, number, (sum = 0), (usedN = 0), memo);

    return memo[number] > USAGE_LIMIT ? -1 : memo[number];
}

function nextCalculations(N, number, sum, usedN, memo) {
    if (sum < 0) return;
    if (isOveruseN(usedN, USAGE_LIMIT) || isMinUsedN(usedN, memo[sum])) return;

    memo[sum] = usedN;
    if (sum === number) return;

    const remainN = USAGE_LIMIT - usedN;
    for (let i = 1; i <= remainN; i++) {
        const left = Number(`${N}`.repeat(i));

        for (let j = 0; j <= i; j++) {
            const right = Number(`${N}`.repeat(j));

            arithmeticOperation(left, right).forEach((right) => {
                const countN = usedN + i + j;
                arithmeticOperation(sum, right).forEach((result) => {
                    nextCalculations(N, number, result, countN, memo);
                });
            });
        }
    }
}

const isOveruseN = (usedN, remainN) => usedN > remainN;

const isMinUsedN = (usedN, min) => min > 0 && usedN >= min;

function arithmeticOperation(left, right) {
    return [left + right, left - right, Math.floor(left / right), left * right];
}

console.log(solution(5, 12)); // 4
console.log(solution(2, 11)); // 3
console.log(solution(5, 26)); // 4
