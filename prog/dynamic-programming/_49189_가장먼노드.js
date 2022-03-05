/**
 * 1번 노드에서 가장 멀리 떨어진 노드의 개수를 구하자.
 * 즉, 최단경로로 이동했을 때 간선의 개수가 가장 많은 노드들의 개수를 의미한다.
 *
 * @param {*} n 노드의 개수
 * @param {*} edge 간선에 대한 정보가 담긴 2차 배열
 * @returns 1번 노드로부터 가장 멀리 떨어진 노드가 몇 개인가
 */

function solution(n, edge) {
    const map = Array.from(Array(n + 1), () => []);
    edge.forEach(([node, otherNode]) => {
        map[node].push(otherNode);
        map[otherNode].push(node);
    });

    const visited = Array(n + 1).fill(false);
    const qu = [1];
    visited[1] = true;

    let answer = 0;
    while (qu.length) {
        let size = qu.length;
        answer = size;
        while (size-- > 0) {
            const node = qu.shift();
            for (const otherNode of map[node]) {
                if (visited[otherNode]) continue;
                qu.push(otherNode);
                visited[otherNode] = true;
            }
        }
    }
    return answer;
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
