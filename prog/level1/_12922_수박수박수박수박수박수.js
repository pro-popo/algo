/**
 * 길이가 n일때,
 * "수박수박수박수...."와 같은 패턴을 유지하는 문자열을 반환하자.
 *
 * 예로 길이가 3이면 "수박수",
 * 길이가 4이면 "수박수박"을 반환한다.
 *
 * @param {*} n - 길이 (~10_000)
 * @returns "수박수박수박수...."와 같은 패턴을 유지하는 문자열
 */

function solution(n) {
    return [...Array(n)]
        .map((_, i) => ((i + 1) % 2 > 0 ? '수' : '박'))
        .join('');
}

/****** TEST CASE *******/

console.log(solution(3));
console.log(solution(4));
