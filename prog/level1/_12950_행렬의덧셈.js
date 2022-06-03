/**
 * 행렬의 덧셈은 행과 열의 크기가 같은 두 행렬의
 * 같은 행, 열의 값을 서로 더한 결과가 된다.
 *
 * @param {number[][]} arr1 (1~500)
 * @param {number[][]} arr2 (1~500)
 * @returns 행렬 덧셈의 결과
 */

function solution(arr1, arr2) {
    const [R, C] = [arr1.length, arr1[0].length];

    const matrix = Array.from(Array(R), () => Array(C).fill(0));
    for (let i = 0; i < R; i++) {
        for (let j = 0; j < C; j++) {
            matrix[i][j] = arr1[i][j] + arr2[i][j];
        }
    }

    return matrix;
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
