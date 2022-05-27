/**
 * 문자열 s에는 공배긍로 구분된 숫자들이 저장되어 있다.
 * 그 숫자들 중 최솟값과 최댓값을 찾아 "최솟값 최댓값"형태의 문자열을 반환하자.
 *
 * @param {string} s - 둘 이상의 정수가 공백으로 구분된 문자열
 * @returns {string} "최솟값 최댓값"
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   String의 split 메서드로 문자열을 공백을 기준으로 나눠 배열을 생성한다.
 *   Math의 min과 max 메서드를 활용하여 최솟값과 최댓값을 구한다.
 *
 * - 다른 풀이 방식으로는,
 *   숫자가 담긴 배열을 오름차순으로 정렬하여
 *   첫 번째 요소(최솟값)과 마지막 요소(최댓값)을 반환한다.
 */

function solution(s) {
    const numbers = s.split(' ');
    return `${Math.min(...numbers)} ${Math.max(...numbers)}`;
}

/****** TEST CASE *******/

console.log(solution('1 2 3 4'));
console.log(solution('-1 -2 -3 -4'));
console.log(solution('-1 -1'));
