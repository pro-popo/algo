/**
 * 자연수 n이 주어졌을 때, n의 다음 큰 숫자는 다음과 같이 정의된다.
 * 1. n의 다음 큰 숫자는 n보다 큰 자연수이다.
 * 2. n의 다음 큰 숫자와 n은 2진수로 변환했을 때 1의 갯수가 같다.
 * 3. n의 다음 큰 숫자는 1, 2번을 만족하는 수 중 가장 작은 수이다.
 *
 * 예로, 78(1001110)의 다음 큰 숫자는 83(1010011)이다.
 *
 * @param {number} n 자연수 (1,000,000)
 * @returns n의 다음 큰 숫자
 */

function solution(n) {
    const numberOfOne = countOne(convertToBinary(n));

    let target = n + 1;
    while (countOne(convertToBinary(target)) !== numberOfOne) target++;
    return target;
}

function convertToBinary(number) {
    return number.toString(2);
}

function countOne(binary) {
    return binary.match(/1/g).length;
}

/****** TEST CASE *******/

console.log(solution(78));
console.log(solution(15));
