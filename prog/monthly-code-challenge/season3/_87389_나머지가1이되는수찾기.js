/**
 * 자연수 n을 x로 나눈 나머지가 1이 되도록 하는
 * 가장 작은 자연수 x를 반환한다.
 *
 * @param {*} n (3~1_000_000)
 * @returns n을 x로 나눴을 때, 나머지가 1이 되도록 하는 가장 작은 x
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   1~n까지 순회하여, n을 x로 나눴을 때 나머지가 1이 되는 값을 찾는다.
 */

function solution(n) {
    return [...Array(n).keys()].find(x => n % x === 1);
}

/****** TEST CASE *******/
console.log(solution(10, 3));
console.log(solution(12, 11));
