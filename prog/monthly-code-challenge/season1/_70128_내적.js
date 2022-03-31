/**
 * 길이가 같은 두 1차원 정수 배열 a와 b의 내적을 반환한다.
 * 이때, a와 b의 내적은 a[0]*b[0] + a[1]*b[1] + ... + a[n-1]*b[n-1]이다.
 * @param {*} a 1차원 정수 배열
 * @param {*} b 1차원 정수 배열
 * @returns a와 b의 내적을 반환
 *
 * ### 리뷰
 * - 풀이방식은 다음과 같다.
 *   1 ~ n-1까지 순회하여, a[index]와 b[index]의 곱을 전부 더해주면 된다.
 *
 * - 문제에서 알려준 내적에 대한 식을 그대로 구현하면 된다!
 */

function solution(a, b) {
    return dotProduct(a, b);
}

function dotProduct(a, b) {
    return a.reduce((answer, _, index) => {
        return answer + a[index] * b[index];
    }, 0);
}

console.log(solution([1, 2, 3, 4], [-3, -1, 0, 2]));
