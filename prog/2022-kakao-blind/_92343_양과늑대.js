/**
 * 최대한 모을 수 있는 양은 몇 마리인지 구하자.
 *
 * 2진 트리 초원에는 늑대와 양이 존재한다.
 * 루트 노드에서 출발하여 각 노드를 돌아다녀 양을 모으려고 한다.
 * 각 노드를 방문할 때마다 해당 노드에 있는 양과 늑대가 따라온다.
 * 이때, 양의 수보다 늑대의 수가 같거나 많아지면 모든 양을 잡아먹는다.
 *
 * @param {*} info 각 노드에 있는 양/늑대에 대한 정보가 담긴 배열 (2~17) / 양:0, 늑대:1 / 루트 노드은 항상 0
 * @param {*} edges 2진 트리의 각 노드들의 연결 관계를 담은 2차원 배열
 * @returns 모을 수 있는 양이 최대 몇 마리인지
 */

let answer = 1;
function solution(info, edges) {
    const graph = createGraph(edges, info);

    answer = 1;
    DFS(graph, 1, (paths = new Set()));
    return answer;
}

function createGraph(edges, info) {
    const graph = Array.from(Array(info.length), () => []);
    edges.forEach(([parent, child]) => graph[parent].push(child));
    graph.info = info;
    return graph;
}

const [SHEEP, WOLF] = [0, 1];
function DFS(graph, visitedNodes, paths) {
    if (isChekedPaths(paths, visitedNodes)) return;
    paths.add(visitedNodes);

    let [wolf, sheep] = countNodesTypes(graph, visitedNodes);
    if (wolf >= sheep) return;
    answer = Math.max(answer, sheep);

    graph.forEach((_, parent) => {
        if (isUnvisitedNode(visitedNodes, parent)) return;

        graph[parent].forEach((child) => {
            DFS(graph, visitedNodes | (1 << child), paths);
        });
    });
}

const isChekedPaths = (paths, visitedNodes) => paths.has(visitedNodes);

function countNodesTypes(graph, visitedNodes) {
    let [wolf, sheep] = [0, 0];
    graph.forEach((_, node) => {
        if (isUnvisitedNode(visitedNodes, node)) return;
        if (graph.info[node] === WOLF) wolf++;
        if (graph.info[node] === SHEEP) sheep++;
    });
    return [wolf, sheep];
}

const isUnvisitedNode = (visitedNodes, node) => !(visitedNodes & (1 << node));

/****** TEST CASE *******/
console.log(
    solution(
        [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
        [
            [0, 1],
            [1, 2],
            [1, 4],
            [0, 8],
            [8, 7],
            [9, 10],
            [9, 11],
            [4, 3],
            [6, 5],
            [4, 6],
            [8, 9],
        ],
    ),
);

console.log(
    solution(
        [0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0],
        [
            [0, 1],
            [0, 2],
            [1, 3],
            [1, 4],
            [2, 5],
            [2, 6],
            [3, 7],
            [4, 8],
            [6, 9],
            [9, 10],
        ],
    ),
);

console.log(
    solution(
        [0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0],
        [
            [0, 1],
            [0, 2],
            [1, 3],
            [1, 4],
            [3, 7],
            [4, 8],
            [2, 5],
            [2, 6],
            [5, 9],
            [9, 11],
            [6, 10],
            [10, 12],
            [12, 13],
        ],
    ),
); // 반례: 8
