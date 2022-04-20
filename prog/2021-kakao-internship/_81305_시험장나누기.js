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
    const heights = calculateHeight(root);

    let [min, max] = [1, 1e9];
    let answer = -1;
    while (min <= max) {
        const mid = Math.floor((min + max) / 2);
        if (countGroup(heights, num, mid) <= k) {
            max = mid - 1;
            answer = mid;
            continue;
        }
        min = mid + 1;
    }

    return answer;
}

function countGroup(heights, num, MAX_TEST_TAKER) {
    let numberOfGroup = 0;
    const testTakers = [...num];

    for (let i = heights.length - 1; i >= 0; i--) {
        for (let j = 0; j < heights[i].length; j++) {
            const node = heights[i][j];

            const root = testTakers[node.id];
            const left = node.leftChild ? testTakers[node.leftChild.id] : 0;
            const right = node.rightChild ? testTakers[node.rightChild.id] : 0;

            const [OneGroup, TwoGroup, ThreeGroup] = [1, 2, 3].map(type =>
                splitGroup([root, left, right], type),
            );

            if (isPossibleGroup(OneGroup)) {
                testTakers[node.id] = OneGroup[0];
                continue;
            }

            if (isPossibleGroup(TwoGroup)) {
                testTakers[node.id] = TwoGroup[0];
                numberOfGroup++;
                continue;
            }
            if (isPossibleGroup(ThreeGroup)) {
                testTakers[node.id] = ThreeGroup[0];
                numberOfGroup += 2;
                continue;
            }

            return Number.MAX_VALUE;
        }
    }

    return numberOfGroup + 1;

    function isPossibleGroup(group) {
        return group.every(testTakers => testTakers <= MAX_TEST_TAKER);
    }
}

function splitGroup([root, left, right], type) {
    switch (type) {
        case 1:
            return [root + left + right];
        case 2:
            return [root + Math.min(left, right), Math.max(left, right)];
        case 3:
            return [root, left, right];
    }
}

function createTree(num, links) {
    const tree = Array.from(
        Array(num.length),
        (_, id) => new Node(id, num[id]),
    );

    links.forEach((childs, id) => {
        const root = tree[id];
        const [leftChild, rightChild] = childs.map(child => tree[child]);

        root.setChilds([leftChild, rightChild]);
        if (leftChild) leftChild.setParent(root);
        if (rightChild) rightChild.setParent(root);
    });

    return tree;
}

function calculateHeight(root) {
    const heights = [];

    const queue = [root];
    while (queue.length) {
        let size = queue.length;
        heights.push([]);
        while (size--) {
            const node = queue.shift();
            if (!node) continue;

            heights[heights.length - 1].push(node);
            queue.push(node.leftChild, node.rightChild);
        }
    }

    return heights;
}

class Node {
    parent = null;
    leftChild = null;
    rightChild = null;

    constructor(id) {
        this.id = id;
    }

    setParent(parent) {
        this.parent = parent;
    }

    setChilds(childs) {
        [this.leftChild, this.rightChild] = childs;
    }

    get childs() {
        return [this.leftChild, this.rightChild];
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

console.log(
    solution(
        1,
        [6, 9, 7, 5],
        [
            [-1, -1],
            [-1, -1],
            [-1, 0],
            [2, 1],
        ],
    ),
);

console.log(
    solution(
        2,
        [6, 9, 7, 5],
        [
            [-1, -1],
            [-1, -1],
            [-1, 0],
            [2, 1],
        ],
    ),
);

console.log(
    solution(
        3,
        [100, 90, 7, 95, 93],
        [
            [-1, -1],
            [-1, 4],
            [-1, 0],
            [2, 1],
            [-1, -1],
        ],
    ),
);

const num = Array(10_000).fill(10_000);
const links = [...Array(10_000)].map((_, index) => [index + 1, -1]);
console.log(solution(10_000, num, links));
