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

    countZeroAndOne({ R: 0, C: 0 }, { R: arr.length - 1, C: arr.length - 1 });

    return answer;
    function countZeroAndOne(start, end) {
        let standard = arr[start.R][start.C];

        let isAllSameValue = true;
        for (let r = start.R; r <= end.R; r++) {
            for (let c = start.C; c <= end.C; c++) {
                if (standard !== arr[r][c]) isAllSameValue = false;
            }
        }

        if (isAllSameValue) {
            answer[standard]++;
            return;
        }

        if (end.R - start.R === 1) {
            for (let r = start.R; r <= end.R; r++) {
                for (let c = start.C; c <= end.C; c++) {
                    answer[arr[r][c]]++;
                }
            }
            return;
        }

        const half = {
            R: Math.floor((start.R + end.R) / 2),
            C: Math.floor((start.C + end.C) / 2),
        };

        [
            [
                { R: start.R, C: start.C },
                { R: half.R, C: half.C },
            ],
            [
                { R: start.R, C: half.C + 1 },
                { R: half.R, C: end.C },
            ],
            [
                { R: half.R + 1, C: start.C },
                { R: end.R, C: half.C },
            ],
            [
                { R: half.R + 1, C: half.C + 1 },
                { R: end.R, C: end.C },
            ],
        ].forEach(([start, end]) => countZeroAndOne(start, end));
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
