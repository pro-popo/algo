/**
 * 행렬의 덧셈은 행과 열의 크기가 같은 두 행렬의
 * 같은 행, 열의 값을 서로 더한 결과가 된다.
 *
 * @param {number[][]} arr1 (1~500)
 * @param {number[][]} arr2 (1~500)
 * @returns 행렬 덧셈의 결과
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   행렬을 순회하여,
 *   각 두 행렬의 동일한 위치에 존재하는 숫자를 더해준다.
 */

function solution(arr1, arr2) {
    return arr1.map((row, i) => row.map((num, j) => num + arr2[i][j]));
}

/****** TEST CASE *******/

console.log(
    solution(
        [
            [1, 2],
            [2, 3],
        ],
        [
            [3, 4],
            [5, 6],
        ],
    ),
);
console.log(solution([[1], [2]], [[3], [4]]));
