/**
 * 자연수 n개로 이루어진 중복 집합 중에서 다음 두 조건을 만족하는 집합을 최고의 집합이라고 한다.
 * 1. 각 원소의 합이 S가 되는 수의 집합
 * 2. 위 조건을 만족하면서 각 원소의 곱이 최대가 되는 집합
 *
 * 이때, 최고의 집합을 구하자.
 *
 * @param {number} n - 집합의 원소의 개수 (1~10_000)
 * @param {number} s - 모든 원소들의 합 (100_000_000)
 * @returns - 오름차순으로 정렬된 최고의 집합
 *            존재하지 않는 경우, [-1]을 반환
 */

function solution(n, s) {
    if (n > s) return [-1];

    const arr = Array(n).fill(Math.floor(s / n));
    let remain = n - (s % n);
    return arr.map((number, idx) => (idx >= remain ? number + 1 : number));
}

/****** TEST CASE *******/

console.log(solution(2, 9));
console.log(solution(2, 1));
console.log(solution(2, 8));
console.log(solution(3, 19));
