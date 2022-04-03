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
    countZeroAndOne(new Square([0, 0], arr.length));

    return answer;

    function countZeroAndOne(square) {
        if (square.isAllSameNumber(arr)) {
            const number = arr[square.point[0]][square.point[1]];
            answer[number]++;
            return;
        }

        square.divideIntoFourParts().forEach(countZeroAndOne);
    }
}

class Square {
    constructor(point, size) {
        this.point = point;
        this.size = size;
    }

    isAllSameNumber(arr) {
        const [R, C] = this.point;
        for (let r = R; r < R + this.size; r++) {
            for (let c = C; c < C + this.size; c++) {
                if (arr[r][c] !== arr[R][C]) return false;
            }
        }
        return true;
    }

    divideIntoFourParts() {
        const [R, C] = this.point;
        const halfSize = Math.floor(this.size / 2);

        return [
            [R, C],
            [R, C + halfSize],
            [R + halfSize, C],
            [R + halfSize, C + halfSize],
        ].map(point => new Square(point, halfSize));
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
