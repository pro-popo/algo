/**
 * 1번 노드에서 가장 멀리 떨어진 노드의 개수를 구하자.
 * 즉, 최단경로로 이동했을 때 간선의 개수가 가장 많은 노드들의 개수를 의미한다.
 *
 * @param {*} n 노드의 개수
 * @param {*} edge 간선에 대한 정보가 담긴 2차 배열
 * @returns 1번 노드로부터 가장 멀리 떨어진 노드가 몇 개인가
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저 그래프를 표현하기 위해,
 *   1~n까지의 각 노드들과 연결된 노드들에 대한 정보를 해당 배열에 추가하였다.
 *   [
 *     [],
 *     [2, 3], // : 1번 노드와 연결된 노드들
 *     [1, 4], // : 2번 노드와 연결된 노드들
 *   ]
 *
 *   그 다음, queueeue에 1번 노드를 추가한다.
 *   queueeue가 빌 때까지 queueeue의 길이만큼 아래 과정을 반복한다.
 *   (이는, 가장 멀리 떨어진 노드의 개수를 구하기 위함이다.)
 *
 *   먼저 queueeue에서 하나의 노드를 꺼낸 뒤,
 *   해당 노드와 연결된 노드들을 queueeue에 추가한다. (BFS 탐색)
 *   이때, 방문했던 노드는 제외한다.
 *
 *   이렇게 마지막까지 반복했을 때의 queueeue의 길이가
 *   1번 노드로부터 가장 멀리 떨어진 노드의 개수가 된다.
 *
 * - 다른 풀이와 유사하다!
 */

function solution(n, edge) {
    const graph = makeGraph(n, edge);

    let answer = 0;
    const [queue, visited] = [[1], new Set([1])];
    while (queue.length) {
        let size = queue.length;
        answer = size;
        while (size--) {
            const node = queue.shift();
            const connectedNodes = graph[node];

            const unvisitedNodes = findUnvisitedNodes(connectedNodes, visited);
            unvisitedNodes.forEach((node) => {
                queue.push(node);
                visited.add(node);
            });
        }
    }
    return answer;
}

function makeGraph(n, edge) {
    const graph = Array.from(Array(n + 1), () => []);
    edge.forEach(([node, otherNode]) => {
        graph[node].push(otherNode);
        graph[otherNode].push(node);
    });
    return graph;
}

function findUnvisitedNodes(nodes, visited) {
    return nodes.filter((node) => !visited.has(node));
}

console.log(
    solution(6, [
        [3, 6],
        [4, 3],
        [3, 2],
        [1, 3],
        [1, 2],
        [2, 4],
        [5, 2],
    ]),
);
