/**
 * 길이가 같은 두 1차원 정수 배열 a와 b의 내적을 반환한다.
 * 이때, a와 b의 내적은 a[0]*b[0] + a[1]*b[1] + ... + a[n-1]*b[n-1]이다.
 * @param {*} a 1차원 정수 배열
 * @param {*} b 1차원 정수 배열
 * @returns a와 b의 내적을 반환
 *
 */

function solution(a, b) {
    return a.reduce((answer, _, index) => {
        return answer + a[index] * b[index];
    }, 0);
}

console.log(solution([1, 2, 3, 4], [-3, -1, 0, 2]));
