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
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저 노란색 사각형을 만든 뒤,
 *   갈색 격자의 수로 사각형을 만드는 것이 가능한지 검사한다.
 *   만약 불가능하다면, 새로운 노란색 사각형 크기로 위의 과정을 반복한다.
 *
 * - 실수했던 부분은,
 *   새로운 노란색의 [가로, 세로] 크기를 정할 때,
 *   가로를 절반으로 나누면 된다고 생각했다.
 *   그러나, 9인 경우 3*3으로 나눌 수 있다는 것을 깨달았다...
 *   해당 숫자의 약수를 찾아 크기를 정하도록 수정했다.
 *
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

function isMakingCarpet(yellow, totalBrown) {
    return totalBrown === (yellow.width + 2 + yellow.heigth) * 2;
}

function sliceYellow(yellow) {
    let width = yellow.width;
    while (--width > 0) {
        if (isMakingRectangle(yellow.total, width)) {
            return {
                total: yellow.total,
                width,
                heigth: yellow.total / width,
            };
        }
    }
    return yellow;
}

function isMakingRectangle(total, width) {
    return total % width === 0;
}

console.log(solution(10, 2));
console.log(solution(8, 1));
console.log(solution(24, 24));
console.log(solution(36, 64));
