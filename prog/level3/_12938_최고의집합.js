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
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   만약, n이 s보다 크다면 [-1]을 반환한다.
 *   이는 모든 원소가 1이고 총합이 s일 때,
 *   최대 배열의 크기는 s이기 때문이다.
 *
 *   먼저, s/n의 값으로 채운 n크기의 배열을 생성한다.
 *   배열의 마지막 원소부터 차례대로 s%n개의 원소를 1씩 증가시킨다.
 *   마지막으로 해당 배열을 반환✅한다.
 *
 * - 각 원소의 곱이 최대가 되는 경우를 구하는 방법을 많이 고민했다.
 *   처음에는, [s] 배열의 크기가 n이 될때까지 가장 큰 원소를 절반으로 나누었다.
 *   그러나 반례로, n=3이고 s=18일 때, [9,4,4]가 아닌 [6,6,6]의 경우가 더 크다.
 */

function solution(n, s) {
    if (n > s) return [-1];

    const quotient = Math.floor(s / n);
    let remainder = s % n;
    return [...Array(n)]
        .map(() => (remainder-- > 0 ? quotient + 1 : quotient))
        .sort((a, b) => a - b);
}

/****** TEST CASE *******/

console.log(solution(2, 9));
console.log(solution(2, 1));
console.log(solution(2, 8));
console.log(solution(3, 19));
