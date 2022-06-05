/**
 * 하샤드 수는 자연수 x의 자릿수의 합을 x로 나누어 떨어지는 수를 의미한다.
 * 자연수 x가 하샤드 수인지 판별하자.
 *
 * @param {number} x - 자연수
 * @returns {boolean} - 하샤드 수 검사 결과
 */

function solution(x) {
    return x % [...String(x)].reduce((sum, number) => sum + +number, 0) === 0;
}

/****** TEST CASE *******/
console.log(solution(10));
console.log(solution(12));
console.log(solution(12345));
