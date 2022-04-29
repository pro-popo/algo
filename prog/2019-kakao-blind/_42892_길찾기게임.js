/**
 * 이 게임은, 두 팀이 같은 곳을 다른 순서로 방문하여 먼저 순회를 마친 팀이 승리하는 것이다.
 * 방문할 곳의 2차원 좌표 값을 구하고, 각 장소를 이진트리의 노드가 되도록 구성한 후
 * 순회 방법을 힌트로 주어 각 팀이 스스로 경로를 찾도록 할 계획이다.
 *
 * 아래와 같은 규칙으로 트리 노드를 구성한다.
 * - 모든 노드는 서로 다른 x 좌표를 가진다.
 * - 같은 레벨에 있는 노드는 같은 y 좌표를 가진다.
 * - 특정 노드의 왼쪽 서브 트리에 있는 모든 노드의 x값은 해당 노드의 x값보다 작다.
 * - 특정 노드의 오른쪽 서브 트리에 있는 모든 노드의 x값은 해당 노드의 x값보다 크다.
 *
 * @param {*} nodeinfo 이진트리를 구성하는 노드들의 좌표 (1 ~ 10_000)
 *                     노드: 1~10_000 | 트리 깊이: 1_000 이하
 * @returns 이진트리를 전위 순회, 후위 순회한 결과
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저, 주어진 nodeinfo를 가지고 트리 구조를 형성한다.
 *   그 다음, 최상위 노드부터 시작하여 전위 순회와 후외 순회를 진행한다.
 *   각 순회에 대한 결과를 순차적으로 반환한다.
 *
 *   트리 구조를 형성하는 과정은 다음과 같다.
 *   먼저 nodeinfo를 순회하여 각각의 노드를 생성한다.
 *   생성한 노드들을 y(레벨)를 기준으로 내림차순 정렬한다. (nodes)
 *   이때 가장 맨 앞에 있는 노드(nodes[0])가 최상위 노드가 된다.
 *
 *   최상위 노드부터 시작하여, 모든 노드를 순회한다.
 *   이 순회 과정에서 해당 노드의 자식 노드들(왼쪽/오른쪽 자식 노드)을 찾는다.
 *   이때, 특정 노드의 자식 노드들은 다음과 같은 조건을 만족해야 한다.
 *   - 자식 노드들은 부모 노드보다 y(레벨)이 낮아야 한다.
 *   - 자식 노드들은 유효한 x 범위 내에 존재해야 한다.
 *     특정 노드의 [왼쪽/오른쪽] 서브 트리에 존재하는 모든 노드의 x값이 특정 노드보다 [작아야/커야]한다.
 *     즉, 상위 노드들의 x값에 따라 자식 노드가 위치할 수 있는 x의 범위를 구해야 한다.
 *     이는 부모 노드의 자식 노드에 대한 x의 제한 범위를 활용하여 구할 수 있다.
 *
 *   nodes를 순회하여 위 조건을 만족하는, 최초의 [왼쪽/오른쪽] 자식 노드를 찾으면 된다.
 *   즉, 위의 조건을 만족하면서 그 중 가장 y(레벨)가 높은 노드를 찾으면 된다. (부모 노드와 가장 가까운 자식 노드)
 *
 *   문제에서 주어진 예시로 살펴보자.
 *   y를 기준으로 내림차순을 하면, 최상위 노드는 7번 노드([8,6])가 된다.
 *   이때, 7번의 자식 노드들에 대한 x의 제한 범위는 [최소 x값 - 1, 최대 x값 + 1],
 *   즉 [-1, 100_001]이다.
 *
 *   이를 활용하여 [왼쪽/오른쪽] 자식 노드를 찾아보자.
 *   먼저, 7번 노드보다 y값이 작아야 한다.
 *   그리고 7번 노드의 [왼쪽/오른쪽] 자식 노드는 7번 노드보다 [왼쪽/오른쪽]에 위치해야 한다.
 *   따라서 왼쪽 자식 노드의 x값은 [-1, 8(7번 노드의 x값)] 범위 내에 존재해야 하며,
 *   오른쪽 자식 노드의 x값은 [8(7번 노드의 x값), 100_001] 범위 내에 존재해야 한다.
 *
 *   nodes를 순회하여, 위의 조건을 만족하는 최초의 [왼쪽/오른쪽] 자식 노드를 각각 찾으면 된다.
 *   즉, 위의 조건을 만족하면서 y값이 가장 높은 노드를 찾는다.
 *   이때, 7번 노드의 왼쪽 자식 노드는 4번 노드([3,5])가 되며,
 *   오른쪽 자식 노드는 2번 노드([11,5])가 된다.
 *
 *   이에 따라 각 4번과 2번 노드의 자식 노드들에 대한 x의 제한 범위를 업데이트 해준다.
 *   - 4번 노드의 자식 노드에 대한 x의 limit = [-1, 8]
 *   - 2번 노드의 자식 노드에 대한 x의 limit = [8, 100_001]
 *
 *   그 다음 과정에서 4번 노드의 자식 노드를 구하게 된다면,
 *   4번 노드의 왼쪽 자식 노드의 x값 범위는 [-1, 3]
 *   4번 노드의 오른쪽 자식 노드의 x값 범위는 [3, 8]이 된다.
 *
 *   위 과정을 따라 모든 노드의 순회를 마친다면, 완벽한 트리를 형성할 수 있다.
 *
 * - 다른 풀이 방식으로는,
 *   트리를 형성할 때 재귀를 활용하는 방식이다.
 *   먼저, 노드를 y를 기준으로 내림차순 정렬한다. (nodes)
 *   이때 nodes[0]는 최상위 노드이다.
 *
 *   nodes를 순회하여,
 *   최상위 노드에 나머지 노드들을 순서대로 연결한다.
 *   최상위 노드에 특정 노드를 연결하는 방식은 다음과 같다.
 *   - 부모 노드와 특정 노드의 x값을 비교한다.
 *     만약 자식 노드의 x값이 더 작을 경우, 부모 노드의 왼쪽 자식 노드에 추가한다.
 *     만약 자식 노드의 x값이 더 클 경우, 부모 노드의 오른쪽 자식 노드에 추가한다.
 *
 *     이때, 이미 해당 자리에 다른 노드가 존재하는 경우,
 *     재귀를 통해 해당 노드의 자식 노드로 연결을 시도한다.
 *
 *     빈 자리가 생길 때까지 위 과정을 반복한다.
 *
 *   이 방법이 훨씬 효율적이고 빠르다! 👍
 *   이에 대한 코드는 otherCase_CreateTree 함수에서 살펴볼 수 있다!
 */

function solution(nodeinfo) {
    const root = createTree(nodeinfo);
    return [preorderTraverse, postorderTraverse].map(traverse =>
        traverse(root, []),
    );
}

function createTree(nodeinfo) {
    const nodes = nodeinfo
        .map((point, number) => new Node(point, number + 1))
        .sort((node, otherNode) => otherNode.y - node.y);

    const LIMIT_X = [-1, 100_001];
    const limit = Array.from(Array(nodes.length + 1), () => LIMIT_X);

    nodes.forEach(parent => {
        const parentLimit = limit[parent.number];
        const childsLimit = [
            [parentLimit[0], parent.x],
            [parent.x, parentLimit[1]],
        ];

        const childs = childsLimit.map(limit => findChild(parent, limit));

        parent.setChilds(childs);
        childs.forEach((child, index) => {
            if (!child) return;
            limit[child.number] = childsLimit[index];
        });
    });

    return nodes[0];

    function findChild(node, limit) {
        return nodes.find(
            child =>
                child.y < node.y && child.x > limit[0] && child.x < limit[1],
        );
    }
}

function preorderTraverse(node, visited) {
    if (!node) return;
    visited.push(node.number);
    node.childs.forEach(child => preorderTraverse(child, visited));
    return visited;
}

function postorderTraverse(node, visited) {
    if (!node) return;
    node.childs.forEach(child => postorderTraverse(child, visited));
    visited.push(node.number);
    return visited;
}

class Node {
    childs = [null, null];

    constructor(point, number) {
        this.point = point;
        this.number = number;
    }

    get x() {
        return this.point[0];
    }

    get y() {
        return this.point[1];
    }

    setChilds(childs) {
        this.childs = childs;
    }
}

function otherCase_CreateTree(nodeinfo) {
    const nodes = nodeinfo
        .map((point, number) => new Node(point, number + 1))
        .sort((node, otherNode) => otherNode.y - node.y);

    const root = nodes[0];
    nodes.forEach(child => {
        if (root === child) return;
        connectNode(root, child);
    });

    return root;

    function connectNode(parent, child) {
        if (parent.x > child.x) {
            if (!parent.childs[0]) {
                parent.childs[0] = child;
                return;
            }
            connectNode(parent.childs[0], child);
        }

        if (parent.x < child.x) {
            if (!parent.childs[1]) {
                parent.childs[1] = child;
                return;
            }
            connectNode(parent.childs[1], child);
        }
    }
}

/****** TEST CASE *******/

console.log(
    solution([
        [5, 3],
        [11, 5],
        [13, 3],
        [3, 5],
        [6, 1],
        [1, 3],
        [8, 6],
        [7, 2],
        [2, 2],
    ]),
);

console.log(
    solution([
        [5, 3],
        [11, 5],
        [13, 3],
        [6, 0],
        [8, 6],
        [7, 2],
        [0, 0],
    ]),
);
