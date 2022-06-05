/**
 * 하샤드 수는 자연수 x의 자릿수의 합을 x로 나누어 떨어지는 수를 의미한다.
 * 자연수 x가 하샤드 수인지 판별하자.
 *
 * @param {number} x - 자연수
 * @returns {boolean} - 하샤드 수 검사 결과
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   숫자를 배열로 변환한 다음에 모든 자릿수의 합을 구한다.
 *   그 다음, 해당 숫자를 자릿수의 합으로 나눴을 때의 나머지가 0인 경우 하샤드 수임을 알 수 있다.
 */

function solution(x) {
    return isHarshadNumber(x);
}

function isHarshadNumber(target) {
    const sum = [...String(target)].reduce((sum, number) => sum + +number, 0);
    return target % sum === 0;
}

/****** TEST CASE *******/
console.log(solution(10));
console.log(solution(12));
console.log(solution(12345));
