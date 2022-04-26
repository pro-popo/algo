/**
 * 함수 f(x)를 다음과 같이 정의한다.
 * - x보다 크고 x와 비트가 1~2개 다른 수들 중에서 제일 작은 수
 *   [EX] f(2) = 3
 *        f(7) = 11
 * @param {*} numbers 정수들이 담긴 배열
 * @returns 모든 수들에 대하여 각 수의 f값
 */

function solution(numbers) {
    return numbers.map(f);
}

function f(number) {
    if (isEven(number)) return evenF(number);
    else return oddF(number);
}

function isEven(number) {
    return number % 2 === 0;
}

function evenF(number) {
    return number + 1;
}

function oddF(number) {
    let bit = number.toString(2);
    let firstZero = bit.lastIndexOf('0');
    if (firstZero === -1) {
        bit = '0' + bit;
        firstZero = 0;
    }

    const answer = [...bit];
    answer[firstZero] = 1;
    if (firstZero !== answer.length - 1) answer[firstZero + 1] = 0;

    return parseInt(answer.join(''), 2);
}

/****** TEST CASE *******/

console.log(solution([1, 2, 7, 3]));
console.log(solution([21]));
