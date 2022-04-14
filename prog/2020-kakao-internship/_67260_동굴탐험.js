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
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저 path를 순회하여 그래프를 형성한다.
 *   그리고, order를 순회하여 각 방에 대해 먼저 방문해야 하는 방을 저장한다. (highPrioirty)
 *
 *   모든 방을 방문하는 방법은 다음과 같다.
 *   BFS를 활용하여 0번 방부터 순회한다.
 *   이때, 현재 방보다 먼저 방문해야 하는 방이 존재하는데 아직 미방문 상태라면, 현재 방은 나중에 방문한다.
 *   그리고 나중에 먼저 방문해야 하는 방의 방문이 끝났을 때,
 *   방문을 미뤘던 방을 방문할 수 있도록 별도의 배열에 저장한다. (lowPriority)
 *
 *   그 다음, 현재 방을 먼저 방문하기 위해 방문을 미뤘던 방이 있었다면, 큐에 추가한다.
 *   또한 현재 방과 이어진 방이 있다면, 큐에 추가한다.
 *
 *   위의 과정을 큐가 빌 때까지 반복한다.
 *   탐색이 끝난 뒤, 모든 방을 방문했는지 확인한다.
 *
 * - 처음에는, path를 tree 형태로 바꾼 다음에,
 *   DFS로 가장 먼저 방문해야 하는 방을 방문하여 모든 방을 탐색하고자 했다.
 *   이때, 현재 방을 방문하려고 했을 때 먼저 앞에서 방문했을 경우,
 *   사이클이 형성되므로 모든 방을 방문할 수 없다고 판단했다.
 *   그러나, 생각한 방식으로 구현이 잘 안 돼서 결국 꼬여버렸고,
 *   완벽하게 이해를 못 한 상태라고 판단하여 중도 포기해 버렸다..😂
 *
 * - 결국 다른 풀이를 참고하여 푼 문제이다. 😅
 *   DFS 대신 BFS로 접근해보니, 생각보다 문제를 복잡하게 생각했구나...
 *   이마를 탁 쳤던 문제였다.. 🤦‍♀️
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
