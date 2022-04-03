/**
 * 0과 1로 이루어진 2^n x 2^n 크기의 2차원 정수 배열이 있다.
 * 이를 쿼드 트리와 같은 방식으로 압축하고자 한다.
 * 1. 압축하고자 하는 특정 영역 S
 * 2. S 내부에 있는 모든 수가 같은 값이라면,
 *    S를 해당 수 하나로 압축한다.
 * 3. 아니면, S를 4개의 균일한 정사각형 영역으로 쪼갠 뒤,
 *    각 정사각형 영역에 대해 압축을 시도한다.
 *
 * @param {*} arr
 * @returns 배열에 최종적으로 남은 0과 1의 개수
 */

function solution(arr) {
    const answer = [0, 0];
    countZeroAndOne([0, 0], arr.length);

    return answer;

    function countZeroAndOne(point, size) {
        const [R, C] = point;

        if (isAllSameNumber()) {
            answer[arr[R][C]]++;
            return;
        }

        const halfSize = Math.floor(size / 2);
        divideIntoFourParts(halfSize).forEach(point =>
            countZeroAndOne(point, halfSize),
        );

        function isAllSameNumber() {
            const numbers = new Set();
            for (let r = R; r < R + size; r++) {
                for (let c = C; c < C + size; c++) {
                    numbers.add(arr[r][c]);
                }
            }
            return numbers.size === 1;
        }

        function divideIntoFourParts(size) {
            return [
                [R, C],
                [R, C + size],
                [R + size, C],
                [R + size, C + size],
            ];
        }
    }
}

/****** TEST CASE *******/

console.log(
    solution([
        [1, 1, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 1],
        [1, 1, 1, 1],
    ]),
);

console.log(
    solution([
        [1, 1, 1, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1, 1, 1, 1],
        [0, 1, 0, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 1, 0, 0, 1],
        [0, 0, 0, 0, 1, 1, 1, 1],
    ]),
);
