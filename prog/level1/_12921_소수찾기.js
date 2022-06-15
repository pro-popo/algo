/**
 * 1부터 n 사이에 존재하는 소수의 개수를 반환하자.
 * 소수는 1과 자기 자신으로만 나누어지는 수를 의미한다.
 *
 * @param {number} n (2~1000000)
 * @returns - 1 ~ n 사이의 소수 개수
 */

function solution(n) {
    return countPrimeNumbers(n);
}

function countPrimeNumbers(n) {
    const isPrime = Array(n + 1).fill(true);
    isPrime[0] = isPrime[1] = false;

    for (let i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (let j = 2; i * j <= n; j++) {
                isPrime[i * j] = false;
            }
        }
    }

    return isPrime.filter(number => number).length;
}

/****** TEST CASE *******/

console.log(solution(10));
console.log(solution(5));
