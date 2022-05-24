/**
 * rows x columns 크기인 행렬이 있다.
 * 각 영역에는 1부터 순서대로 적혀있다.
 *
 * 이 행렬에서 직사각형 모양의 범위를 여러 번 선택해,
 * 테두리 부분에 있는 숫자들을 시계방향으로 회전시키고자 한다.
 *
 * 회전들의 목록이 주어질 때, 각 회전들을 배열에 적용한 뒤
 * 회전에서 위치가 바뀐 숫자들 중 가장 작은 숫자들을 순서대로 배열에 담아 반환하자.
 *
 * @param {number} row - 행 크기 (2~100)
 * @param {number} column - 열 크기 (2~100)
 * @param {number[]} queries - 회전 목록, [[x1, y1, x2, y2]]
 *                             회전의 개수: 1~10_000
 * @returns 회전에서 위치가 바뀐 숫자들 중 가장 작은 숫자들
 */

function solution(row, column, queries) {
    const matrix = createMatrix(row, column);

    return queries
        .map(query => query.map(value => value - 1))
        .map(query => {
            const movedNumbers = rotate(matrix, query);
            return Math.min(...movedNumbers);
        });
}

function createMatrix(row, column) {
    let value = 1;
    return Array.from(Array(row), () => [...Array(column)].map(() => value++));
}

function rotate(matrix, query) {
    const [x1, y1, x2, y2] = query;
    const direction = new Clockwise();

    let point = [x1, y1];
    let target = matrix[point[0]][point[1]];

    const movedNumbers = [target];
    while (!direction.isTurnAround()) {
        const next = [point[0] + direction.x, point[1] + direction.y];
        if (isOutOfRange(next)) {
            direction.next();
            continue;
        }

        [matrix[next[0]][next[1]], target] = [target, matrix[next[0]][next[1]]];
        point = next;
        movedNumbers.push(target);
    }

    return movedNumbers;

    function isOutOfRange(point) {
        return point[0] < x1 || point[1] < y1 || point[0] > x2 || point[1] > y2;
    }
}

class Clockwise {
    direction = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];
    index = 0;

    next() {
        if (this.isTurnAround()) this.index = 0;
        else this.index++;
    }

    isTurnAround() {
        return this.index === this.direction.length;
    }

    get point() {
        return this.direction[this.index];
    }

    get x() {
        return this.point[0];
    }

    get y() {
        return this.point[1];
    }
}

/****** TEST CASE *******/

console.log(
    solution(6, 6, [
        [2, 2, 5, 4],
        [3, 3, 6, 6],
        [5, 1, 6, 3],
    ]),
);
