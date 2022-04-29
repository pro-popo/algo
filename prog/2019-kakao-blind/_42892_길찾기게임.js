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

    const LIMIT_X = [1, 100_001];
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
            child.setParent(parent);
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
    parent = null;
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

    setParent(parent) {
        this.parent = parent;
    }

    setChilds(childs) {
        this.childs = childs;
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
