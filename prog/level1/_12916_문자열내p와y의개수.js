/**
 * 대문자와 소문자가 섞여있는 문자열 s가 주어진다.
 * 이때, p의 개수와 y의 개수가 동일하면 true, 다르면 false를 반환한다.
 * 이때 소문자와 대문자를 구별하지 않는다.
 *
 * @param {string} s - 문자열 (~50)
 * @returns - p와 y의 개수가 동일한지 검사
 */

function solution(s) {
    const countP = s.match(/p/gi)?.length;
    const countY = s.match(/y/gi)?.length;
    return countP === countY;
}

/****** TEST CASE *******/

console.log(solution('pPoooyY'));
console.log(solution('Pyy'));
