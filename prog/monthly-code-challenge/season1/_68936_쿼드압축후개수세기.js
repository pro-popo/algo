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
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저 해당 정사각형의 모든 숫자가 동일한지 확인한다.
 *   만약 동일하다면, answer에 해당 숫자의 개수를 늘려준다.
 *   그렇지 않다면, 해당 정사각형을 4등분으로 나눈 뒤,
 *   위의 과정을 반복한다.
 *
 * - 정사각형을 어떻게 4등분으로 나눌 것인지를 오랫동안 고민했다. 🤔
 *   처음에는, 정사각형의 시작 지점과 마지막 지점을 저장하고, 그에 대한 중간 지점을 찾았다.
 *   그러나, 정사각형의 크기를 안다면 계산 로직이 훨씬 간단해짐을 깨닫고 코드를 수정했다. 🤗
 *
 * - 처음 코드가 틀렸던 이유는,
 *   정사각형을 4등분할 때,
 *   중간 지점을 R의 기준으로 구한 뒤, 이를 C에 적용했기 때문이다. 😅
 *
 * - 다른 풀이 방식 중,
 *   배열의 범위가 2^n이기 때문에,
 *   size의 절반을 구할 때 "size >>= 1"로 계산할 수 있다.
 *
 *   참고로, ~~(n/2)와 parseInt(n/2)는 Math.floor(n/2)와 동일하지만,
 *   명확한 걸 좋아해서 Math.floor를 사용했다!
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
