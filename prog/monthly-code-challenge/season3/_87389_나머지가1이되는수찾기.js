/**
 * 자연수 n을 x로 나눈 나머지가 1이 되도록 하는
 * 가장 작은 자연수 x를 반환한다.
 * @param {*} n (3~1_000_000)
 * @returns
 */

function solution(n) {
    return [...Array(n).keys()].find(x => n % x === 1);
}

/****** TEST CASE *******/
console.log(solution(10, 3));
console.log(solution(12, 11));
