/**
 * 양의 정수 n을 k진수로 바꿨을 때, 변환된 수 안에 조건에 맞는 소수가 몇 개 인가?
 * - 소수 양쪽에 0이 있는 경우 0P0
 * - 소수 오른쪽에만 0이 있고 왼쪽에는 아무것도 없는 경우 P0
 * - 소수 왼쪽에만 0이 있고 오른쪽에는 아무것도 없는 경우 0P
 * - 소수 양쪽에 아무것도 없는 경우 P
 * - P는 각 자릿수에 0을 포함하지 않음 101(X)
 *
 * @param {*} n 1~1_000_000
 * @param {*} k 3~10
 * @returns 위 조건에 맞는 소수의 개수
 */

function solution(n, k) {
    const numbers = n.toString(k).split('0');
    return numbers.map(Number).filter(isPrime).length;
}

function isPrime(number) {
    if (number < 2) return false;
    for (let i = 2; i * i <= number; i++) {
        if (number % i === 0) return false;
    }
    return true;
}

console.log(solution(437674, 3));
console.log(solution(110011, 10));
