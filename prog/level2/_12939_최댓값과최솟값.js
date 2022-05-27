/**
 * 문자열 s에는 공배긍로 구분된 숫자들이 저장되어 있다.
 * 그 숫자들 중 최솟값과 최댓값을 찾아 "최솟값 최댓값"형태의 문자열을 반환하자.
 *
 * @param {string} s - 둘 이상의 정수가 공백으로 구분된 문자열
 * @returns {string} "최솟값 최댓값"
 */

function solution(s) {
    const numbers = s.split(' ');
    return `${Math.min(...numbers)} ${Math.max(...numbers)}`;
}

/****** TEST CASE *******/

console.log(solution('1 2 3 4'));
console.log(solution('-1 -2 -3 -4'));
console.log(solution('-1 -1'));
