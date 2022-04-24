/**
 * 두 정수 사이의 모든 수들 중에서,
 * 약수의 개수가 짝수인 수는 더하고,
 * 약수의 개수가 홀수인 수는 뺸 수를 반환하자.
 *
 * @param {*} left (1~1_000)
 * @param {*} right (1~1_000)
 * @returns 약수의 개수가 짝수이면 더하고 홀수이면 뺀 결과를 반환
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저 두 정수 사이의 모든 수들을 순회하여, 해당 정수의 약수를 구한다.
 *   해당 정수의 약수의 개수가 짝수면 1, 홀수면 -1을 정수에 곱한다.
 *   모든 정수들을 순회하여 값을 더한다.
 *
 * - 다른 풀이 방식으로,
 *   약수의 개수를 구할 때 제곱근을 활용할 수 있다. (Math.sqrt)
 *   만약 해당 정수의 제곱근이 자연수인 경우, 해당 정수의 약수의 개수는 홀수이다.
 *   - 약수의 개수가 홀수인 경우: Math.sqrt(4) => 2
 *   - 약수의 개수가 짝수인 경우: Math.sqrt(6) => 2.449489742783178
 */

function solution(left, right) {
    const numbers = [];
    for (let i = left; i <= right; i++) {
        const divisors = countDivisors(i);
        const sign = isEven(divisors) || -1;
        numbers.push(i * sign);
    }

    return numbers.reduce((sum, number) => sum + number, 0);
}

function isEven(value) {
    return value % 2 === 0;
}

function countDivisors(number) {
    return [...Array(number)].map((_, i) => i + 1).filter(isDivisor).length;

    function isDivisor(i) {
        return number % i === 0;
    }
}

/****** TEST CASE *******/

console.log(solution(13, 17));
console.log(solution(24, 27));
