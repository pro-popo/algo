/**
 * 두 수의 최소공배수란, 공통이 되는 가장 작은 숫자를 의미한다.
 * 예로, 2와 7의 최소공배수는 14가 된다.
 * 정의를 확장해서, n개의 수의 최소공배수는 n개의 수들의 배수 중 공통이 되는 가장 작은 숫자가 된다.
 *
 * @param {number[]} arr - n개의 숫자를 담은 배열
 *                         길이: 1~15, 원소: 100이하
 * @returns n개의 수들의 최소공배수
 */

function solution(arr) {
    return arr.reduce(findleastCommonMultiple);
}

function findleastCommonMultiple(a, b) {
    for (let i = 1; ; i++) {
        if ((i * a) % b === 0) return i * a;
    }
}

/****** TEST CASE *******/

console.log(solution([2, 6, 8, 14]));
console.log(solution([1, 2, 3]));
