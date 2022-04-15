/**
 * 카카오 미로 탈출이 출시되었다.
 * 방과 방 사이를 연결하는 길은,
 * 이동 시간이 존재하며, 화살표가 가리키는 방향으로만 이동할 수 있다.
 *
 * 미로에는 함정이 존재하며,
 * 함정으로 이동하면 이동한 함정과 연결된 모든 화살표의 방향이 바뀐다.
 * 만약, 함정을 두 번째 방문하게 되면 원래 방향으로 돌아온다.
 *
 * 이때, 탈출하는데 걸리는 최소 시간을 구하고자 한다.
 *
 * @param {*} n (2~1,000)
 * @param {*} start 출발 방
 * @param {*} end 도착 방
 * @param {*} roads 통로와 이동시간을 나타내는 2차원 정수 배열
 *                  서로 다른 두 방 사이에 직접 연결된 길이 여러 개 존재할 수 있다.
 * @param {*} traps 함정 방의 번호들 (10)
 * @returns 탈출하는데 걸리는 최소 시간
 */

function solution(n, start, end, roads, traps) {
    const graph = Array.from(Array(n + 1), () =>
        Array(n + 1).fill(Number.MAX_VALUE),
    );
    roads.forEach(([start, end, cost]) => {
        graph[start][end] = Math.min(graph[start][end], cost);
    });

    const MAX_TRAPS_CASE = 1 << traps.length;
    const visitedRooms = Array.from(Array(n + 1), () =>
        Array(MAX_TRAPS_CASE).fill(false),
    );

    const queue = [[start, 0, 0]];
    while (queue.length) {
        const [room, totalCost, visitedTraps] = queue.shift();
        if (room === end) return totalCost;

        if (visitedRooms[room][visitedTraps]) continue;
        visitedRooms[room][visitedTraps] = true;

        graph[room].forEach((_, nextRoom) => {
            const cost = isReverseArrow(visitedTraps, room, nextRoom)
                ? graph[nextRoom][room]
                : graph[room][nextRoom];

            if (cost === Number.MAX_VALUE) return;

            let newVisitedTraps = visitedTraps;
            if (traps.includes(nextRoom)) {
                const trap = traps.indexOf(nextRoom);
                newVisitedTraps = isVisitedTraps(visitedTraps, nextRoom)
                    ? visitedTraps ^ (1 << trap)
                    : visitedTraps | (1 << trap);
            }

            queue.push([nextRoom, totalCost + cost, newVisitedTraps]);
        });

        queue.sort(([, cost], [, otherCost]) => cost - otherCost);
    }

    function isReverseArrow(visitedTraps, room, nextRoom) {
        return (
            Math.abs(
                isVisitedTraps(visitedTraps, room) -
                    isVisitedTraps(visitedTraps, nextRoom),
            ) > 0
        );
    }

    function isVisitedTraps(visitedTraps, room) {
        return (visitedTraps & (1 << traps.indexOf(room))) !== 0;
    }
}

console.log(
    solution(
        3,
        1,
        3,
        [
            [1, 2, 2],
            [3, 2, 3],
        ],
        [2],
    ),
);

console.log(
    solution(
        4,
        1,
        4,
        [
            [1, 2, 1],
            [3, 2, 1],
            [2, 4, 1],
        ],
        [2, 3],
    ),
);
