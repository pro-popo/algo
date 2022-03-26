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
 * @param {*} key 열쇠를 나타내느 2차원 배열
 * @param {*} lock  자물쇠를 나타내는 2차원 배열
 * @returns 열쇠로 자물쇠를 열 수 있으면 true, 없면 false를 반환
 */

const HOLE = 0;

function solution(key, lock) {
    const [N, M] = [lock.length, key.length];
    let keyLocations = initializeLocations(key.length);
    let rotation = 4;

    do {
        if (tryUnlock()) return true;
        keyLocations = rotateSquare(keyLocations);
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
        for (let r = 0; r < M; r++) {
            for (let c = 0; c < M; c++) {
                let [kr, kc] = keyLocations[r][c];
                let [lr, lc] = [
                    N + M - current.row + r,
                    N + M - current.column + c,
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

function initializeLocations(length) {
    return Array.from(Array(length), (_, i) =>
        [...Array(length)].map((_, j) => [i, j]),
    );
}

function rotateSquare(square) {
    const SQUARE_LENGTH = square.length;
    const rotatedSquare = initializeLocations(SQUARE_LENGTH);

    square.forEach((rows, row) =>
        rows.forEach(
            (location, column) =>
                (rotatedSquare[column][SQUARE_LENGTH - 1 - row] = location),
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
