/**
 * n개의 섬 사이에 다리를 건설할 때,
 * 모든 섬이 서로 통행 가능하도록 만들 때 필요한 최소 비용을 구하자!
 *
 * - 같은 연결은 두 번 주어지지 않음
 *   또한, 순서가 바뀌더라도 같은 연결로 봄 (0-1 => 1-0 입력 X)
 *
 * - 연결할 수 없는 섬은 주어지지 않음
 *   다만, 두 섬 사이의 건설이 불가능한 곳도 있음
 *
 * @param {*} n 섬의 개수 (1~100)
 * @param {*} costs ((n-1)*n)/2, [A섬,B섬,비용]
 * @returns 다리를 건설하는데 드는 최소 비용
 */

function solution(n, costs) {
    const map = Array.from(Array(100), () => []);
    costs.forEach(([start, end, cost]) => {
        map[start].push([end, cost]);
        map[end].push([start, cost]);
    });

    let answer = 0;
    const visited = Array(100).fill(false);
    const queue = [[0, 0]];
    while (queue.length > 0) {
        const [start, cost] = queue.shift();

        if (visited[start]) continue;
        visited[start] = true;
        answer += cost;

        map[start].forEach(([end, cost]) => {
            if (visited[end]) return;
            queue.push([end, cost]);
        });

        queue.sort(ASC_COST);
    }
    return answer;
}

const ASC_COST = ([a, costA], [b, costB]) => costA - costB;

console.log(
    solution(4, [
        [0, 1, 1],
        [0, 2, 2],
        [1, 2, 5],
        [1, 3, 1],
        [2, 3, 8],
    ]),
);
