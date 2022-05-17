/**
 * 1~N까지의 마을이 존재한다.
 * 각 마을은 양방향으로 통행할 수 있는 도로로 연결되어 있다.
 * 도로를 지날 때 걸리는 시간은 도로별로 다르다.
 *
 * 1번 마을에서 시작하여 각 마을로 음식 배달을 하려고 한다.
 * 각 마을로부터 음식 주문을 받을 때,
 * N개의 마을 중에서 K시간 이하로 배달이 가능한 마을에서만 주문을 받고자 한다.
 *
 * 임의의 두 마을간에 항상 이동 가능한 경로가 존재한다.
 *
 * @param {*} N 마을의 개수 (1~50)
 * @param {*} road 각 마을을 연결하는 도로의 정보 (1~2_000)
 *                 [A마을, B마을, 걸리는 시간]
 *                 이때, 두 마을을 연결하는 도로는 여러 개가 있을 수 있다.
 * @param {*} K 음식 배달이 가능한 시간 (1~500_000)
 * @returns 음식 주문을 받을 수 있는 마을의 개수
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저 road 정보를 활용하여 그래프를 형성한다.
 *   이때, 인접 행렬 혹은 인접 리스트 형태의 그래프를 형성할 수 있다.
 *   인접 행렬로 저장할 경우, 두 마을을 연결하는 도로 중 가장 소요 시간이 적은 도로를 저장한다.
 *
 *   그 다음, 다익스트라 알고리즘을 활용하여
 *   1번 정점에서 다른 모든 정점까지의 최단 경로를 구한다.
 *
 *   이를 위해 queue와 최단 경로를 저장할 배열을 준비한다.
 *   1번 마을부터 시작하여 BFS 탐색을 시작한다.
 *   queue에서 첫 번째 마을을 꺼낸 뒤 해당 마을과 연결된 마을을 찾는다.
 *   이때, (현재 마을까지의 최단 거리 + 현재 마을에서 다음 마을까지의 거리)가
 *   다음 마을까지의 최단 거리보다 작을 경우만 다음 마을을 queue에 추가한다.
 *   queue가 빌 때까지 위 과정을 반복한다.
 *
 *   마지막으로, 최단 경로를 저장한 배열을 순회하여 K보다 작은 경우가 몇 개인지 반환한다.
 *
 * - 도로 정보를 저장할 때,
 *   반드시 연결된 도로 중 비용이 작은 경우만 저장할 필요없이 모든 도로를 저장해도 된다!
 *   이는 마을의 개수와 도로의 개수의 제한 범위가 작아서,
 *   최단 경로를 구하는 과정에서 제외해도 충분하기 때문이다.
 *
 * - 대부분의 풀이 방식에서 다익스트라 알고리즘을 활용했으며,
 *   BFS 대신에 DFS를 활용한 풀이 방식도 있다.
 */

function solution(N, road, K) {
    const graph = createGraph(N + 1, road);
    const times = dijkstra(graph, 1);

    return times.filter(time => time <= K).length;
}

function createGraph(numberOfNode, edges) {
    const graph = Array.from(Array(numberOfNode), () =>
        Array(numberOfNode).fill(Number.MAX_VALUE),
    );

    edges.forEach(([node, otherNode, cost]) => {
        graph[node][otherNode] = Math.min(cost, graph[node][otherNode]);
        graph[otherNode][node] = Math.min(cost, graph[otherNode][node]);
    });
    return graph;
}

function dijkstra(graph, startNode) {
    const queue = [startNode];
    const dist = Array(graph.length).fill(Number.MAX_VALUE);
    dist[startNode] = 0;

    while (queue.length) {
        const node = queue.shift();
        graph[node].forEach((cost, next) => {
            if (dist[node] + cost >= dist[next]) return;
            dist[next] = dist[node] + cost;
            queue.push(next);
        });
    }

    return dist;
}

/****** TEST CASE *******/

console.log(
    solution(
        5,
        [
            [1, 2, 1],
            [2, 3, 3],
            [5, 2, 2],
            [1, 4, 2],
            [5, 3, 1],
            [5, 4, 2],
        ],
        3,
    ),
);

console.log(
    solution(
        6,
        [
            [1, 2, 1],
            [1, 3, 2],
            [2, 3, 2],
            [3, 4, 3],
            [3, 5, 2],
            [3, 5, 3],
            [5, 6, 1],
        ],
        4,
    ),
);
