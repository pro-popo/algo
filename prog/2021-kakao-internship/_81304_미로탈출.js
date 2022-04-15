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

function solution(n, start, end, roads, originTraps) {
    const graph = createGraph(n + 1, roads);

    const rooms = [...Array(n + 1)].map(
        (_, number) => new Room(number, originTraps.indexOf(number)),
    );

    const visitedRooms = Array.from(Array(n + 1), () =>
        Array(1 << originTraps.length).fill(false),
    );

    const queue = [[rooms[start], 0, new Trap(0)]];
    while (queue.length) {
        const [room, totalCost, traps] = queue.shift();

        if (room.number === end) return totalCost;

        if (visitedRooms[room.number][traps.triggered]) continue;
        visitedRooms[room.number][traps.triggered] = true;

        rooms.forEach(nextRoom => {
            let cost = isReverseArrows(traps, room, nextRoom)
                ? graph[nextRoom.number][room.number]
                : graph[room.number][nextRoom.number];

            if (cost === graph.MAX_COST) return;

            queue.push([
                nextRoom,
                totalCost + cost,
                nextRoom.isTrap() ? traps.trigger(nextRoom) : traps,
            ]);
        });

        queue.sort(ASC_COST);
    }

    function isReverseArrows(traps, room, nextRoom) {
        return traps.isTriggered(room) ^ traps.isTriggered(nextRoom);
    }

    function ASC_COST([, cost], [, otherCost]) {
        return cost - otherCost;
    }
}

class Room {
    constructor(number, trapNumber) {
        this.number = number;
        this.trapNumber = trapNumber;
    }

    isTrap() {
        return this.trapNumber !== -1;
    }
}

class Trap {
    constructor(triggeredTraps) {
        this.triggeredTraps = triggeredTraps;
    }

    get triggered() {
        return this.triggeredTraps;
    }

    trigger(room) {
        return new Trap(this.triggered ^ (1 << room.trapNumber));
    }

    isTriggered(room) {
        return (this.triggered & (1 << room.trapNumber)) !== 0;
    }
}

function createGraph(n, roads) {
    const MAX_COST = Number.MAX_VALUE;

    const graph = Array.from(Array(n), () => Array(n).fill(MAX_COST));
    roads.forEach(([start, end, cost]) => {
        graph[start][end] = Math.min(graph[start][end], cost);
    });

    graph.MAX_COST = MAX_COST;

    return graph;
}

/****** TEST CASE *******/

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
