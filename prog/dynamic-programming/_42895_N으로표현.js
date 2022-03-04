/**
 * 숫자 N과 사칙연산만 사용해서 표현할 수 있는 방법을 구하자,
 * [EX] 12 = (55 + 5) / 5
 *
 * @param {*} N 1~9
 * @param {*} number 1~32_000
 * @returns N 사용횟수의 최솟값, 8보다 크면 -1
 */
const USAGE_LIMIT = 8;
function solution(N, number) {
    const memo = Array(number + 1).fill(USAGE_LIMIT + 1);
    nextCalculations(N, number, (sum = 0), (numberOfN = 0), memo);

    return memo[number] > USAGE_LIMIT ? -1 : memo[number];
}

function nextCalculations(N, number, sum, numberOfN, memo) {
    if (sum < 0 || numberOfN > USAGE_LIMIT) return;
    if (memo[sum] > 0 && numberOfN >= memo[sum]) return;
    memo[sum] = numberOfN;
    if (sum === number) return;

    const remainN = USAGE_LIMIT - numberOfN;
    for (let i = 1; i <= remainN; i++) {
        const left = Number(`${N}`.repeat(i));

        for (let j = 0; j <= remainN - i; j++) {
            const right = Number(`${N}`.repeat(j));

            arithmeticOperation(left, right).forEach((operand) => {
                const countN = numberOfN + i + j;
                arithmeticOperation(sum, operand).forEach((result) => {
                    nextCalculations(N, number, result, countN, memo);
                });
            });
        }
    }
}

function arithmeticOperation(left, right) {
    return [left + right, left - right, Math.floor(left / right), left * right];
}
console.log(solution(5, 12)); // 4
console.log(solution(2, 11)); // 3
console.log(solution(5, 26)); // 4
