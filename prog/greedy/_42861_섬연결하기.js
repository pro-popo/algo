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
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   queue(우선순위큐)가 빌 때까지 아래의 과정을 반복한다.
 *   먼저 출발지를 queue에서 꺼낸다. (가장 비용이 적은)
 *   해당 출발지가 이미 방문한 섬이라면, continue 아니면 answer에 비용을 더하고 방문처리 해준다.
 *   그 다음, 출발지와 연결된 모든 섬 중 방문하지 않은 섬을 대상으로 [섬, 비용] 형태로 queue에 저장한다.
 *   그리고 queue를 비용이 적은 순으로 정렬한다.
 *
 * - 문제를 보자마자 최소 신장 트리(MST)가 떠올랐다.
 *   MST를 구하는 대표적인 알고리즘은 프림(Prim)과 크루스칼(Kruskal)이 존재한다.
 *   그 중, 프림 알고리즘으로 문제를 풀었다. (코드가 더 짧아서!🤗)
 *
 * - 간선의 수가 최대 (100*99)/2 로 적다고 판단하여,
 *   인접행렬 대신 인접리스트를 사용하였다.
 *
 * - 대부분의 다른 풀이에서도 크루스칼이나 혹은 프림으로 접근하였다.
 *
 *   하나 예외였던 풀이는,
 *   Set으로 방문처리를 하고, 비용이 적은 순으로 정렬한 costs를 순회하여 연결되지 않은 섬을 찾는 것이다.
 *
 *   먼저, costs를 cost를 기준으로 오름차순하고, connected라는 Set을 준비한다.
 *   그 다음, connected의 길이가 n이 될 때까지 아래 과정을 반복한다.
 *   (즉, 모든 섬이 연결될 때까지)
 *   먼저, costs를 순회하여 연결되지 않은 섬을 찾는다.
 *   (connected에서 from은 있고 to가 없는 경우, 또는 그 반대)
 *   그리고 해당 섬의 비용을 answer에 추가한 뒤, connected에 추가한다. (from, to 둘 다)
 *
 *   a와 b가 연결되고 b와 c가 연결되면,
 *   a와 c가 연결되므로 set으로 연결된 섬을 관리한다는 점이 인상깊었다. 👍
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

const ASC_COST = ([_, costA], [_, costB]) => costA - costB;

console.log(
    solution(4, [
        [0, 1, 1],
        [0, 2, 2],
        [1, 2, 5],
        [1, 3, 1],
        [2, 3, 8],
    ]),
);
