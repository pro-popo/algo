/**
 * 다음 과정을 거쳐서 1차원 배열을 만들고자 한다.
 * 1. n행, n열 크기의 비어있는 2차원 배열을 만든다.
 * 2. 1~n에 대해서 다음 과정을 반복한다.
 *    - 1행 1열부터 i행 i열까지의 영역 내의 모든 빈칸을 숫자 i로 채운다.
 * 3. 1-n행을 잘라내어 모두 이어붙인 새로운 1차원 배열을 만든다.
 * 4. 새로운 1차원 배열에서 left ~ right만 남기고 나머지는 지운다.
 *
 * @param {*} n 10^7
 * @param {*} left n^2
 * @param {*} right n^2
 * @returns 주어진 과정대로 만들어진 1차원 배열
 */

function solution(n, left, right) {
    return [...Array(right - left + 1)].map((_, i) => {
        const row = ~~((i + left) / n) + 1;
        const column = ((i + left) % n) + 1;
        return Math.max(row, column);
    });
}

/****** TEST CASE *******/
console.log(solution(3, 2, 5));
