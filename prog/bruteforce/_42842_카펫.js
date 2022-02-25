/**
 * 카펫의 노란색(중앙)과 갈색(사이드) 격자의 수를 가지고
 * 전체 카펫의 크기 기억하기
 *
 * ### 조건
 * 갈색: 8~5_000
 * 노란색: 1~2_000_000
 * 가로 길이는 세로 길이와 같거나 길다.
 *
 * @param {*} brown :갈색 격자의 수
 * @param {*} yellow :노란색 격자의 수
 * @returns :카펫의 [가로, 세로] 크기 배열
 */

function solution(brown, yellow) {
    yellow = {
        total: yellow,
        width: yellow,
        heigth: 1,
    };

    do {
        if (isMakingCarpet(yellow, brown))
            return [yellow.width + 2, yellow.heigth + 2];

        yellow = sliceYellow(yellow);
    } while (yellow.width > 0);

    return 0;
}

function sliceYellow(yellow) {
    let width = yellow.width;
    while (--width > 0) {
        if (yellow.total % width === 0) {
            return {
                total: yellow.total,
                width,
                heigth: yellow.total / width,
            };
        }
    }
    return yellow;
}

function isMakingCarpet(yellow, totalBrown) {
    return totalBrown === (yellow.width + 2 + yellow.heigth) * 2;
}

console.log(solution(10, 2));
console.log(solution(8, 1));
console.log(solution(24, 24));
console.log(solution(36, 64));
