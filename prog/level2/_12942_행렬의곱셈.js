/**
 * 2차원 행렬을 두 개 입력 받는다.
 * 첫 번째 행렬에 두 번째 행렬을 곱한 결과를 반환하는 함수를 완성하자.
 * 이때, 입력은 곱할 수 있는 배열만 주어진다.
 *
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @returns 두 행렬을 곱한 결과
 */

function solution(arr1, arr2) {
    return arr1.map((_, r) =>
        arr2[0].map((_, c) =>
            arr1[r].reduce((sum, _, i) => sum + arr1[r][i] * arr2[i][c], 0),
        ),
    );
}

/****** TEST CASE *******/

console.log(
    solution(
        [
            [1, 4],
            [3, 2],
            [4, 1],
        ],
        [
            [3, 3],
            [3, 3],
        ],
    ),
);

console.log(
    solution(
        [
            [2, 3, 2],
            [4, 2, 4],
            [3, 1, 4],
        ],
        [
            [5, 4, 3],
            [2, 4, 1],
            [3, 1, 1],
        ],
    ),
);
