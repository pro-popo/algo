/**
 * 명함 지갑을 만드는 회사에서 지갑의 크기를 정하고자 한다.
 *
 * @param {*} sizes 모든 명함의 가로 길이와 세로 길이를 나타내는 2차원 배열
 * @returns 모든 명함을 수납할 수 있는 가장 작은 지갑의 크기
 */

function solution(sizes) {
    let answer = { width: 0, height: 0 };
    sizes.forEach(([width, height]) => {
        answer = {
            width: Math.max(answer.width, Math.max(width, height)),
            height: Math.max(answer.height, Math.min(width, height)),
        };
    });

    return answer.width * answer.height;
}

/****** TEST CASE *******/

console.log(
    solution([
        [60, 50],
        [30, 70],
        [60, 30],
        [80, 40],
    ]),
);

console.log(
    solution([
        [10, 7],
        [12, 3],
        [8, 15],
        [14, 7],
        [5, 15],
    ]),
);

console.log(
    solution([
        [14, 4],
        [19, 6],
        [6, 16],
        [18, 7],
        [7, 11],
    ]),
);
