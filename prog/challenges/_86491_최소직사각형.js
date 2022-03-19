/**
 * 명함 지갑을 만드는 회사에서 지갑의 크기를 정하고자 한다.
 *
 * @param {*} sizes 모든 명함의 가로 길이와 세로 길이를 나타내는 2차원 배열
 * @returns 모든 명함을 수납할 수 있는 가장 작은 지갑의 크기
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   sizes를 순회하여,
 *   가로와 세로 길이 중 더 긴 길이를 width로, 더 짧은 길이를 height로 지정한다.
 *   그리고, 가장 긴 width와 가장 긴 height를 곱해준 값이 가장 작은 지갑의 크기가 된다.
 *
 * - 다른 풀이와 계산식만 조금씩 다를 뿐, 전체적인 풀이 방식은 비슷하다!
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
