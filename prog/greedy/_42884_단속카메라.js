/**
 * 고속도로를 이용하는 모든 차량이
 * 단속용 카메라를 한 번은 만나도록 카메라를 설치하자.
 *
 * @param {*} routes 차량의 경로 [진입지점, 나간지점] -30_000~30_000 / 차량 1~10_000
 * @returns 최소 몇대의 카메라를 설치해야 하는가
 *
 */

function solution(routes) {
    routes.sort(ASC);

    let answer = 0;
    let camera = -30_001;
    routes.forEach(([start, end]) => {
        if (start <= camera) {
            camera = Math.min(camera, end);
            return;
        }
        camera = end;
        answer++;
    });
    return answer;
}

const ASC = ([startA, endA], [startB, endB]) => {
    if (startA === startB) return endA - endB;
    return startA - startB;
};

console.log(
    solution([
        [2, 3],
        [-18, -13],
        [-20, -15],
        [-20, -10],
        [-14, -5],
        [-5, -3],
    ]),
);
