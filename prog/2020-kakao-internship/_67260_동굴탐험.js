/**
 * n개의 방으로 이루어진 지하 동굴을 탐험하고자 한다.
 * 모든 방에는 0 ~ n-1까지 번호가 붙어 있고,
 * 입구는 0번 방과 연결되어 있다.
 *
 * 각 방들은 양방향 통행이 가능하며,
 * 서로 다른 두 방을 직접 연결하는 통로는 오직 하나다.
 * 임의의 서로 다른 두 방 사이의 최단경로는 딱 한 가지만 존재한다.
 * 또한, 임의의 두 방 사이의 이동이 불가능한 경우는 없다.
 *
 * 탐험 계획은 다음과 같다.
 * 1. 모든 방을 적어도 한 번은 방문해야 한다.
 * 2. 특정 방은 방문하기 전에 반드시 먼저 방문할 방이 정해져 있다.
 *    - 예로, A번 방을 방문하기 전에 B번 방을 먼저 방문해야 한다.
 *    - 먼저 방문해야 하는 방은 없거나, 1개이다.
 *    - 먼저 방문해야 하는 방이 동일한 경우는 없다.
 *    - 먼저 방문해야 하는 방이면서, 동시에 나중에 방문해야 하는 방인 경우는 없다.
 *    - 먼저 방문해야 하는 방과 나중에 방문할 방을 반드시 연속적으로 방문할 필요는 없다.
 *
 * 또한,
 * - "A->B", "A->C"인 경우는 없다
 * - "X->A", "Z->A"인 경우는 없다.
 * - "A->B->C"인 경우는 없다.
 *
 * @param {*} n 방 개수 (2~200_000)
 * @param {*} path 동굴의 통로에 대한 2차원 배열 (n-1)
 *                 [방 번호 A, 방 번호 B]
 * @param {*} order 방문 순서가 담긴 2차원 배열 (n/2)
 *                  [먼저 방문할 방 번호 A, 나중에 방문할 방 번호 B]
 * @returns 규칙에 맞게 모든 방을 탐험할 수 있는지 반환
 */

function solution(n, path, order) {
    const graph = createGraph(n, path);
    const highPrioirty = Array(n).fill(null);
    order.forEach(
        ([prioirtyNode, node]) => (highPrioirty[node] = prioirtyNode),
    );

    const queue = [0];
    const visited = new Set();
    const lowPriority = Array(n).fill(null);

    while (queue.length) {
        const node = queue.shift();

        if (highPrioirty[node] && !visited.has(highPrioirty[node])) {
            lowPriority[highPrioirty[node]] = node;
            continue;
        }
        if (lowPriority[node]) queue.push(lowPriority[node]);

        for (const child of graph[node]) {
            if (visited.has(child)) continue;
            queue.push(child);
        }

        visited.add(node);
    }
    return isAllVisited();

    function isAllVisited() {
        return visited.size === n;
    }
}

function createGraph(n, edges) {
    const graph = Array.from(Array(n), () => []);
    edges.forEach(([node, other]) => {
        graph[node].push(other);
        graph[other].push(node);
    });
    return graph;
}

/****** TEST CASE *******/

console.log(
    solution(
        9,
        [
            [0, 1],
            [0, 3],
            [0, 7],
            [8, 1],
            [3, 6],
            [1, 2],
            [4, 7],
            [7, 5],
        ],
        [
            [8, 5],
            [6, 7],
            [4, 1],
        ],
    ),
);

console.log(
    solution(
        9,
        [
            [8, 1],
            [0, 1],
            [1, 2],
            [0, 7],
            [4, 7],
            [0, 3],
            [7, 5],
            [3, 6],
        ],
        [
            [4, 1],
            [5, 2],
        ],
    ),
);

console.log(
    solution(
        9,
        [
            [0, 1],
            [0, 3],
            [0, 7],
            [8, 1],
            [3, 6],
            [1, 2],
            [4, 7],
            [7, 5],
        ],
        [
            [4, 1],
            [8, 7],
            [6, 5],
        ],
    ),
);
