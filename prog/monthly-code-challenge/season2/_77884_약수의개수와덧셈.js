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
    let sum = 0;
    for (let i = left; i <= right; i++) {
        const divisors = calculateDivisor(i);
        sum += i * (isEven(divisors.size) || -1);
    }
    return sum;
}

function isEven(value) {
    return value % 2 === 0;
}

function calculateDivisor(number) {
    const divisors = new Set();
    for (let i = 1; i <= number; i++) {
        if (number % i === 0) divisors.add(i);
    }
    return divisors;
}

/****** TEST CASE *******/

console.log(solution(13, 17));
console.log(solution(24, 27));
