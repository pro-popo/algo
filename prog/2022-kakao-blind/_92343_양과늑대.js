/**
 * 최대한 모을 수 있는 양은 몇 마리인지 구하자.
 *
 * 2진 트리 초원에는 늑대와 양이 존재한다.
 * 루트 노드에서 출발하여 각 노드를 돌아다녀 양을 모으려고 한다.
 * 각 노드를 방문할 때마다 해당 노드에 있는 양과 늑대가 따라온다.
 * 이때, 양의 수보다 늑대의 수가 같거나 많아지면 모든 양을 잡아먹는다.
 *
 * @param {*} info 각 노드에 있는 양/늑대에 대한 정보가 담긴 배열 (2~17) / 양:0, 늑대:1 / 루트 노드는 항상 0
 * @param {*} edges 2진 트리의 각 노드들의 연결 관계를 담은 2차원 배열
 * @returns 모을 수 있는 양이 최대 몇 마리인지
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   2진 트리에서 생성할 수 있는 모든 경로에 대해서 완전 탐색을 진행한다.
 *   이때, 늑대의 수가 양의 수보다 크거나 같은 경우는 진입이 불가능하므로
 *   조건에 맞지 않는 경로는 제외한다.
 *   또한, 새로운 경로를 생성할 때마다 양의 최댓값을 비교하여 갱신한다.
 *
 *   무한 루프를 빠지는 것을 방지하기 위해, 생성한 경로를 별도로 저장해서
 *   중복 경로는 제외시켜준다.
 *
 * - 처음 접근법은, (74% 정답)
 *   먼저 각각의 양들을 만나기 위해,
 *   최소 만나야하는 늑대들에 대한 정보들(node)을 담은 배열을 생성한다. (BFS로 진행)
 *   그리고 위의 배열들을 하나의 배열에 저장하고 순회한다.
 *   순회하면서, 현재 양의 마릿수와 늑대의 마릿수로 만날 수 있는 양을 찾아낸다.
 *   더 이상 데려올 수 있는 양이 존재하지 않을 때까지 순회를 반복한다.
 *
 *   늑대의 마릿수는 순회하면서 만난 늑대들과,
 *   해당 양을 만나기 위해 최소 만나야 하는 늑대들을 Set 객체에 전달하면 구할 수 있다.
 *
 *   위의 접근법이 잘못된 이유는,
 *   A번 양과 B번 양 둘 중에 한 마리만 데려올 수 있는 경우,
 *   A번 양보다 B번 양을 데려와야 더 많은 양을 데려올 수 있는 경우가 있기 때문이다.
 *   이에 대한 반례는 아래 TEST CASE에서 3번에 테케가 이에 속한다.
 *
 * - 여러가지 시도를 하다가 결국엔 답안을 참고한 문제이다.. 😭
 *   완전 탐색을 해야겠다, 생각은 했지만 어떤 식으로 모든 경로를 찾아야 하는지 모르겠더라.. 😥
 *
 * - 대부분 완전탐색 + DFS + 비트마스킹 조합인 풀이가 많았다.
 *
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
