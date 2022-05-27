/**
 * 길이가 같은 자연수 배열 A, B가 있다.
 * 두 배열에서 각각 한 개의 숫자를 뽑아 두 수를 곱한다.
 * 이 과정을 배열의 길이만큼 반복하며, 두 수를 곱한 값을 누적하여 더한다.
 * 이때 최종적으로 누적된 값이 최소가 되도록 만들고자 한다.
 * 단, 각 배열에서 K번째 숫자를 뽑았다면, 해당 숫자는 다시 뽑을 수 없다.
 *
 * @param {number[]} A
 * @param {number[]} B
 * @returns 최종적으로 누적된 최솟값
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   누적된 값이 최소가 되기 위해서는,
 *   두 원소를 곱할 때 최대한 작은 숫자와 큰 숫자를 선택하여 곱하면 된다.
 *
 *   이를 위해 정렬을 활용하면 한다.
 *   먼저 A는 오름차순, B는 내림차순으로 정렬한다.
 *   배열을 순회하여 A와 B의 i번째 원소를 곱한 뒤 값을 누적한다.
 */

function solution(A, B) {
    A.sort(ASC_NUMBER);
    B.sort(DESC_NUMBER);

    return A.reduce((sum, _, i) => sum + A[i] * B[i], 0);
}

const ASC_NUMBER = (a, b) => a - b;
const DESC_NUMBER = (a, b) => b - a;

/****** TEST CASE *******/

console.log(solution([1, 4, 2], [5, 4, 4]));
console.log(solution([1, 2], [3, 4]));
