/**
 * 모든 정수들의 합을 구하자.
 * @param {*} absolutes 정수들의 절댓값들
 * @param {*} signs 정수들의 부호들 (true: 양수, false: 음수)
 * @returns 실제 정수들의 합
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   정수들의 절댓값을 순회하여,
 *   해당 정수가 양수인 경우는 +1, 음수인 경우는 -1을 곱한다.
 *   그 다음, 모든 정수들의 합을 구하면 된다.
 */

function solution(absolutes, signs) {
    return absolutes.reduce(
        (sum, absolute, i) => (sum += absolute * (signs[i] || -1)),
        0,
    );
}

/****** TEST CASE *******/

console.log(solution([4, 7, 12], [true, false, true]));
console.log(solution([1, 2, 3], [false, false, true]));
