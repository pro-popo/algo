/**
 * 면접 응시자들은 거리를 둬서 대기를 해야한다.
 * 다음과 같은 규칙으로 대기실에 거리를 두고 앉도록 안내하고 있다.
 * 1. 대기실은 5개로, 5x5 크기다.
 * 2. 응시자들 끼리는 맨핸튼 거리가 2이하로 앉지 말아야한다.
 *    맨해튼 거리: |r1 - r2| + |c1 - c2|
 *    단, 응시자가 앉아있는 자리 사이가 파티션으로 막혀있는 경우는 허용한다.
 *
 * @param {*} places 5x5 크기의 2차원 배열
 *            places 원소: 최대 5
 *            (P:응시자, O:빈테이블, X:파티션)
 * @returns 각 대기실의 거리두기 준수 여부를 배열로 반환
 *          [1: 모든 응시자가 준수, 0: 1명 이상의 응시자가 미준수]
 */

const MAX_LENGTH = 5;
const [PERSON, TABLE] = ['P', 'O', 'X'];

function solution(places) {
    return places.map(place => {
        for (let i = 0; i < MAX_LENGTH; i++) {
            for (let j = 0; j < MAX_LENGTH; j++) {
                if (place[i][j] === PERSON && !isKeepDistance(place, [i, j]))
                    return 0;
            }
        }
        return 1;
    });
}

const dt = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
];

function isKeepDistance(place, start) {
    const queue = [start];
    const visited = new Set([start.toString()]);

    let distance = 0;
    while (distance++ < 2 && queue.length) {
        let size = queue.length;
        while (size--) {
            const [x, y] = queue.shift();
            for (let d = 0; d < 4; d++) {
                const next = [x + dt[d][0], y + dt[d][1]];
                if (isOutOfRange(next) || visited.has(next.toString()))
                    continue;

                const type = place[next[0]][next[1]];
                if (type === PERSON) return false;
                if (type === TABLE) queue.push(next);
                visited.add(next.toString());
            }
        }
    }
    return true;
}

function isOutOfRange([x, y]) {
    return x < 0 || y < 0 || x === MAX_LENGTH || y === MAX_LENGTH;
}

console.log(
    solution([
        ['POOOP', 'OXXOX', 'OPXPX', 'OOXOX', 'POXXP'],
        ['POOPX', 'OXPXP', 'PXXXO', 'OXXXO', 'OOOPP'],
        ['PXOPX', 'OXOXP', 'OXPOX', 'OXXOP', 'PXPOX'],
        ['OOOXX', 'XOOOX', 'OOOXX', 'OXOOX', 'OOOOO'],
        ['PXPXP', 'XPXPX', 'PXPXP', 'XPXPX', 'PXPXP'],
    ]),
);
