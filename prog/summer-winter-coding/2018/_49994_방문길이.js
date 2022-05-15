/**
 * 게임 캐릭터를 4가지 명령러를 통해 움직이려고 한다.
 * - U: 위쪽으로 한 칸
 * - D: 아래쪽으로 한 칸
 * - R: 오른쪽으로 한 칸
 * - L: 왼쪽으로 한 칸
 *
 * 캐릭터는 (0,0) 위치에서 시작한다.
 * 좌표평면의 최대 범위는,
 * X좌표: -5, 5
 * Y좌표: -5, 5 이다.
 *
 * 명령어에 따라 게임 캐릭터가 지나 간 길 중
 * 캐릭터가 처음 걸어본 길의 길이를 구하고자 한다.
 *
 * @param {*} dirs 명령어 (500 이하)
 * @returns 게임 캐릭터가 처음 걸어본 길의 길이
 */

const [MIN_LENGTH, MAX_LENGTH] = [-5, 5];
const direction = new Map([
    ['U', [-1, 0]],
    ['D', [1, 0]],
    ['R', [0, 1]],
    ['L', [0, -1]],
]);

function solution(dirs) {
    let current = [0, 0];
    const visited = new Set();
    [...dirs].forEach(command => {
        const move = direction.get(command);
        const next = [current[0] + move[0], current[1] + move[1]];
        if (isOutOfRange(next)) return;

        if (!visited.has(next + current)) visited.add(current + next);
        current = next;
    });

    return visited.size;
}

function isOutOfRange(point) {
    return (
        point[0] < MIN_LENGTH ||
        point[1] < MIN_LENGTH ||
        point[0] > MAX_LENGTH ||
        point[1] > MAX_LENGTH
    );
}

/****** TEST CASE *******/

console.log(solution('ULURRDLLU'));
console.log(solution('LULLLLLLU'));
