/**
 * n개의 송전탑이 전선을 통해 하나의 트리 형태로 연결되어 있다.
 * 전선들 중 하나를 끊어 2개로 분할하고자 한다.
 * 이때, 두 전력망이 갖게 되는 송전탄의 개수를 최대한 비슷하게 맞추고자 한다.
 *
 * @param {*} n 송전탑의 개수 (2~100)
 * @param {*} wires 전선 정보
 * @returns 두 전력망이 가지고 있는 송전탑의 개수 차이(절대값)
 */

function solution(n, wires) {
    const graph = createGraph(n, wires);

    return Math.min(
        ...wires.map((wire) => {
            const towers = countTowers(new Set(wire));
            return differenceTowers(towers);
        }),
    );

    function countTowers(removeWire) {
        const visited = new Set();
        let numberOfTower = 0;

        const queue = [1];
        while (queue.length) {
            const parent = queue.shift();
            for (const child of graph[parent]) {
                if (isRemoveWire([parent, child]) || visited.has(child))
                    continue;
                queue.push(child);
            }

            visited.add(parent);
            numberOfTower++;
        }

        return [numberOfTower, n - numberOfTower];

        function isRemoveWire(towers) {
            return towers.every((tower) => removeWire.has(tower));
        }
    }

    function differenceTowers(towers) {
        return Math.abs(towers[0] - towers[1]);
    }
}

function createGraph(n, edges) {
    const graph = Array.from(Array(n + 1), () => []);

    edges.forEach(([a, b]) => {
        graph[a].push(b);
        graph[b].push(a);
    });

    return graph;
}

console.log(
    solution(9, [
        [1, 3],
        [2, 3],
        [3, 4],
        [4, 5],
        [4, 6],
        [4, 7],
        [7, 8],
        [7, 9],
    ]),
);
