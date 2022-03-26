/**
 * 잠겨있는 자물쇠를 여는 방법은 다음과 같다.
 * N*N 형태의 자물쇠와 M*M 형태의 열쇠가 존재한다.
 * 자물쇠는 홈이 파여 있고, 열쇠 또한 홈과 돌기 부분이 있다.
 *
 * 열쇠는 회전과 이동이 가능하며,
 * 열쇠의 돌기 부분을 자물쇠의 홈 부분에 딱 맞게 채우면 자물쇠가 열리는 구조이다.
 * => 비어있는 곳이 없어야 열 수 있다.
 *
 * 0은 홈 부분, 1은 돌기 부분이다.
 * @param {*} key 열쇠를 나타내는 2차원 배열
 * @param {*} lock  자물쇠를 나타내는 2차원 배열
 * @returns 열쇠로 자물쇠를 열 수 있으면 true, 없면 false를 반환
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   key를 이동시켜 해당 위치에서 자물쇠를 열 수 있는지 검사한다.
 *   만약, 열 수 없다면 key를 회전시켜 위의 과정을 반복한다. (360도 회전할 때까지)
 *
 *   key의 이동범위는 (N+2*M, N+2*M) 크기의 2차원 배열이다.
 *   이때, lock는 key의 이동 범위의 중앙에 존재한다.
 *
 * - 풀이 방식은 거의 비슷하다!
 *   key의 이동범위를 [-M, N]으로 둘 수 있다.
 *
 * - key를 기준으로 lock과 비교를 하면,
 *   lock의 hole이 전부 채워졌는지 체크하는 로직이 필요하다.
 *   lock를 기준으로 하면 불필요한 계산을 줄일 수 있을 것 같다. 🤔
 *
 * - 처음에, key를 회전 시킬 때 위치 정보([row, column])로 저장했는데,
 *   괜히 번거로운 계산 로직만 늘어나서 값으로 저장하는 방식으로 코드를 수정했다!
 */

const HOLE = 0;

function solution(key, lock) {
    const [N, M] = [lock.length, key.length];

    let rotation = 4;
    do {
        if (tryUnlock()) return true;
        key = rotateSquare(key);
    } while (--rotation);

    return false;

    function tryUnlock() {
        const MAX_MOVE_RANGE = N + M * 2;
        for (let row = MAX_MOVE_RANGE; row >= 0; row--) {
            for (let column = MAX_MOVE_RANGE; column >= 0; column--) {
                const currentLocation = { row, column };
                if (isUnlockable(currentLocation)) return true;
            }
        }
        return false;
    }

    function isUnlockable(current) {
        let remainLockHoles = countHole(lock);
        for (let kr = 0; kr < M; kr++) {
            for (let kc = 0; kc < M; kc++) {
                let [lr, lc] = [
                    N + M - current.row + kr,
                    N + M - current.column + kc,
                ];

                if (isOutOfRange(lr, lc)) continue;

                if (key[kr][kc] === lock[lr][lc]) return false;

                if (lock[lr][lc] === HOLE) remainLockHoles--;
            }
        }

        if (remainLockHoles === 0) return true;
    }

    function isOutOfRange(row, column) {
        return row < 0 || column < 0 || row >= N || column >= N;
    }
}

function rotateSquare(square) {
    const SQUARE_LENGTH = square.length;
    const rotatedSquare = Array.from(Array(SQUARE_LENGTH), () =>
        Array(SQUARE_LENGTH).fill(0),
    );

    square.forEach((rows, row) =>
        rows.forEach(
            (value, column) =>
                (rotatedSquare[column][SQUARE_LENGTH - 1 - row] = value),
        ),
    );

    return rotatedSquare;
}

function countHole(square) {
    const LENGTH = square.length;
    let numberOfHole = 0;

    for (let i = 0; i < LENGTH; i++) {
        for (let j = 0; j < LENGTH; j++) {
            if (square[i][j] === HOLE) numberOfHole++;
        }
    }

    return numberOfHole;
}

/****** TEST CASE *******/

console.log(
    solution(
        [
            [0, 0, 0],
            [1, 0, 0],
            [0, 1, 1],
        ],
        [
            [1, 1, 1],
            [1, 1, 0],
            [1, 0, 1],
        ],
    ),
);
