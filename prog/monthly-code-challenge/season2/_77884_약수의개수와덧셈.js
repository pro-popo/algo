/**
 * 두 정수 사이의 모든 수들 중에서,
 * 약수의 개수가 짝수인 수는 더하고,
 * 약수의 개수가 홀수인 수는 뺸 수를 반환하자.
 *
 * @param {*} left (1~1_000)
 * @param {*} right (1~1_000)
 * @returns 약수의 개수가 짝수이면 더하고 홀수이면 뺀 결과를 반환
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
