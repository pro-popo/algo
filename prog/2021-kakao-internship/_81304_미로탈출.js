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
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저, roads를 순회하여 인접행렬의 형태로 그래프를 형성한다.
 *
 *   그 다음, 우선순위큐를 준비한다. (원소: [방 번호, 총 비용, 모든 함정의 트리거 여부])
 *   이 우선순위큐는 낮은 비용 순으로 원소를 정렬한다.
 *
 *   start 지점부터 시작하여, 해당 방과 연결된 모든 방을 큐에 추가한다.
 *   이때 비용을 계산하기 위해,
 *   현재의 방과 이동할 방의 함정 트리거 여부를 확인하여 화살표가 반대로 바꼈는지 확인해야 한다.
 *   화살표가 반대로 바뀌는 경우는, 두 개의 방 중 하나의 방만 함정이 트리거 된 경우이다.
 *
 *   모든 함정의 트리거 여부를 저장하기 위해, 비트마스킹을 활용한다.
 *   참고로, 트리거 여부의 최대 범위는 0000000000 ~ 1111111111이다.
 *
 *   만약 동일한 함정을 두 번째 방문하는 경우에는 트리거를 취소해야 한다. (화살표를 두 번 뒤집으면 원래 방향과 동일)
 *   이때는 XOR 연산을 활용하면 된다. (모든 함정의 트리거 여부 ^ (1 << 함정 번호))
 *
 *   위와 같은 과정은 end번 방을 방문할 때까지 반복한다.
 *
 *   여기서 중요한 점은, 방의 방문 처리다.
 *   중복 탐색을 방지하기 위해 별도의 방문 처리가 필요하다. (시간초과 TC. 22번/26번)
 *
 *   이를 위해 다음과 같이 방문 처리를 진행한다.
 *   > visited[방번호][모든 함정의 트리거 여부]
 *
 *   위처럼 각각의 함정들이 트리거된 여부에 따라 분기하여 방에 대한 방문 처리를 따로 해야 한다.
 *   이는 함정들의 트리거 여부가 비용에 영향을 미치기 때문이다.
 *
 * - 처음에는 방문 처리를 다음과 같이 진행했다.
 *   > visited[방번호][함정의 트리거 여부]
 *
 *   즉, 현재 방에 대한 함정의 트리거 여부(0 혹은 1)에 따라 분기하여 방문 처리를 진행했다.
 *   그러나, 연결된 다른 방의 트리거 여부에도 영향을 받기 때문에
 *   현재 방을 다시 방문해야 하는 경우가 존재한다. (실패 TC. 3번/5번)
 *   특히 현재 방은 일반 방인데 연결된 함정으로 인해 재방문해야 할 경우, 이미 방문처리가 되어서 탐색을 중단하게 된다.
 *   이에 대한 반례는 아래에서 확인할 수 있다! 🤗
 *
 * - 이 문제는 다익스크라 + 비트마스킹의 응용 문제라고 할 수 있다.
 *   다만, 시작 정점에서 모든 정점에 대한 최단 거리가 아닌,
 *   시작 정점에서 특정 정점까지의 최단 거리를 구하면 되기 때문에 dist를 따로 저장할 필요가 없다.
 *   우선순위큐로 비용이 가장 작은 경우를 먼저 방문하기 때문에 방문 처리만 해도 충분하다!
 *
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

/* TC. 3번/5번 반례 */
console.log(
    solution(
        4,
        1,
        4,
        [
            [1, 2, 1],
            [2, 3, 1],
            [3, 2, 1],
            [3, 4, 1],
            [1, 4, 10],
        ],
        [3],
    ),
);
