/**
 * 배열은 숫자 0~9까지로 이루어져 있다.
 * 배열에서 연속적으로 나타나는 숫자는 하나만 남기고 전부 제거하고자 한다.
 * 이때, 제거된 후 남은 숫자들을 반환할 때에는 순서를 유지해야 한다.
 *
 * @param {*} arr - 크기: 1_000_000, 원소의 크기: 0~9
 * @returns 연속적으로 나타는 숫자를 제거하고 남은 수들을 반환
 */

function solution(arr) {
    return arr.filter((number, i) => arr[i - 1] !== number);
}

/****** TEST CASE *******/

console.log(solution([1, 1, 3, 3, 0, 1, 1]));
console.log(solution([4, 4, 4, 3, 3]));
