/**
 * 1부터 n 사이에 존재하는 소수의 개수를 반환하자.
 * 소수는 1과 자기 자신으로만 나누어지는 수를 의미한다.
 *
 * @param {number} n (2~1000000)
 * @returns - 1 ~ n 사이의 소수 개수
 */

function solution(n) {
    let count = 0;
    for (let i = 2; i <= n; i++) {
        if (isPrime(i)) count++;
    }
    return count;
}

function isPrime(number) {
    for (let i = 2; i * i <= number; i++) {
        if (number % i === 0) return false;
    }
    return true;
}

/****** TEST CASE *******/

console.log(solution(10));
console.log(solution(5));
