/**
 * 시험장은 하나의 이진 트리 형태로 연결되어 있다.
 * 시험장은 고유 번호(ID)와 응시자 수에 대한 정보를 가지고 있다.
 *
 * 안정적인 시험을 위해, 시험장에서 오는 트래픽을 k개의 그룹으로 나누어
 * 각 그룹별 서버로 분산시키기로 했다.
 * 시험장 사이를 연결한 간선들 중 k-1개를 끊어서 k개의 그룹으로 나누고자 한다.
 * 이때, 그룹별 최대 트래픽을 최소화하기 위해 가장 큰 그룹의 인원을 최소화시켜야 한다.
 *
 * @param {*} k 나눌 그룹의 수 (1 ~ 10_000)
 * @param {*} num 각 시험장의 응시자 수
 *                길이, 원소: 1 ~ 10_000
 * @param {*} links 시험장의 연결 상태
 *                  [왼쪽 자식 노드, 오른쪽 자식 노드]
 *                  노드가 없는 경우 -1이 담겨있다.
 * @returns 최소화된 최대 그룹의 인원
 */

function solution(k, num, links) {
    const tree = createTree(num, links);
    const root = tree.find(node => !node.parent);
    const groups = createGroups(tree, root);

    const queue = [root];

    while (--k > 0) {
        const node = queue.shift();
        const splitNodes = splitTree(node);
        if (!splitNodes) return groups[node.id];

        queue.push(...splitNodes);
        queue.sort((node, otherNode) => groups[otherNode.id] - groups[node.id]);
    }

    return groups[queue[0].id];

    function splitTree(node) {
        const target = findSplitNode(node);
        if (target === node) return null;

        const targetParent = target.parent;

        if (targetParent.leftChild === target) targetParent.leftChild = null;
        if (targetParent.rightChild === target) targetParent.rightChild = null;
        target.setParent(null);

        let parent = targetParent;
        while (parent) {
            groups[parent.id] -= groups[target.id];
            parent = parent.parent;
        }
        return [node, target];
    }

    function findSplitNode(root) {
        let max = [root, groups[root.id]];
        const queue = [root];
        while (queue.length) {
            const node = queue.shift();
            const diff = Math.abs(groups[root.id] - groups[node.id] * 2);
            if (max[1] > diff) max = [node, diff];

            if (node.leftChild) queue.push(node.leftChild);
            if (node.rightChild) queue.push(node.rightChild);
        }
        return max[0];
    }
}

function createTree(num, links) {
    const tree = Array.from(
        Array(num.length),
        (_, id) => new Node(id, num[id]),
    );

    links.forEach(([leftChild, rightChild], id) => {
        tree[id].setChilds(tree[leftChild], tree[rightChild]);

        if (tree[leftChild]) tree[leftChild].setParent(tree[id]);
        if (tree[rightChild]) tree[rightChild].setParent(tree[id]);
    });
    return tree;
}

function createGroups(tree) {
    const groups = tree.map(node => node.testTakers);
    [...groups].forEach((testTakers, id) => {
        let node = tree[id].parent;
        while (node) {
            groups[node.id] += testTakers;
            node = node.parent;
        }
    });
    return groups;
}

class Node {
    parent = null;
    leftChild = null;
    rightChild = null;

    constructor(id, testTakers) {
        this.id = id;
        this.testTakers = testTakers;
    }

    setParent(parent) {
        this.parent = parent;
    }

    setChilds(leftChild, rightChild) {
        this.leftChild = leftChild;
        this.rightChild = rightChild;
    }
}

/****** TEST CASE *******/

console.log(
    solution(
        3,
        [12, 30, 1, 8, 8, 6, 20, 7, 5, 10, 4, 1],
        [
            [-1, -1],
            [-1, -1],
            [-1, -1],
            [-1, -1],
            [8, 5],
            [2, 10],
            [3, 0],
            [6, 1],
            [11, -1],
            [7, 4],
            [-1, -1],
            [-1, -1],
        ],
    ),
);

// console.log(
//     solution(
//         1,
//         [6, 9, 7, 5],
//         [
//             [-1, -1],
//             [-1, -1],
//             [-1, 0],
//             [2, 1],
//         ],
//     ),
// );

// console.log(
//     solution(
//         2,
//         [6, 9, 7, 5],
//         [
//             [-1, -1],
//             [-1, -1],
//             [-1, 0],
//             [2, 1],
//         ],
//     ),
// );

// console.log(
//     solution(
//         3,
//         [100, 90, 7, 95, 93],
//         [
//             [-1, -1],
//             [-1, 4],
//             [-1, 0],
//             [2, 1],
//             [-1, -1],
//         ],
//     ),
// ); // 반례

// console.log(
//     solution(
//         3,
//         [1000, 2, 3, 5, 1000, 1000],
//         [
//             [1, 2],
//             [-1, -1],
//             [3, 5],
//             [4, -1],
//             [-1, -1],
//             [-1, -1],
//         ],
//     ),
// );

// const values = Array(10_000).fill(10_000);
// const arr = [...Array(10_000)].map((_, index) => [index + 1, -1]);
// console.log(solution(5_000 - 1, values, arr));
