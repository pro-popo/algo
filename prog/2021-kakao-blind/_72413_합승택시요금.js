/**
 * 무지는 택시비를 아낄 수 있는 방법을 고민하고 있다.
 * 어피치는 무지와 비슷한 방향으로 가는 택시를 종종 이용한다.
 * 무지와 어피치가 택시 합승을 적절히 이용하여,
 * 택시요금을 얼마나 아낄 수 있는지 계산하고자 한다.
 *
 * 동일한 출발지에서, 각자의 집을 방문하고자 한다.
 * 이때, 두 사람이 모두 귀가하는 데 소요되는 예상 최저 택시 요금이 얼마인가?
 *
 * @param {*} n 지점의 개수 [3 ~ 200]
 * @param {*} s 출발지점
 * @param {*} a A의 도착지점
 * @param {*} b B의 도착지점
 * @param {*} fares 지점 사이의 예상 택시요금 [2 ~ n*(n-1)/2]
 * @returns 최저 예상 택시요금
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저, fares를 순회하여 그래프를 형성한다. (taxiFares)
 *   그 다음, 플로이드-워셜(Floyd-Warshal) 알고리즘을 활용하여
 *   모든 정점에 대한 최단 경로(최저 택시요금)를 구한다.
 *   (참고로, 플로이드-워셜 알고리즘의 시간복잡도는 O(N^3)이다.)
 *
 *   모든 정점에 대한 최저 택시요금을 구했다면,
 *   이를 활용하여 S,A,B 사이의 최저 택시 요금을 구할 수 있다.
 *
 *   S출발지에서 A,B 도착지까지 이동했을 때의 택시 요금은,
 *   [S출발지][X도착지] + [X출발지][A도착지] + [X출발지][B도착지]와 동일하다.
 *   즉, S,A,B가 X(1~n지점)을 경유했을 때 계산한 택시 요금 중
 *   가장 총합이 낮은 택시요금을 찾으면 된다.
 *
 * - 다른 방법으로는,
 *   플로이드-워셜 대신 다익스트라(Dijkstra) 알고리즘을 사용할 수 있다.
 */

function solution(n, s, a, b, fares) {
    const N = n + 1;
    const taxiFares = createGraph(N, fares);

    floydWarshall(N, taxiFares);

    return findLowestFinalTaixFare(taxiFares, s, a, b);
}

function createGraph(N, edges) {
    const graph = Array.from(Array(N), () => Array(N).fill(Number.MAX_VALUE));

    edges.forEach(([start, end, fare]) => {
        graph[start][end] = graph[end][start] = fare;
        graph[start][start] = graph[end][end] = 0;
    });
    return graph;
}

function floydWarshall(N, taxiFares) {
    for (let k = 1; k < N; k++) {
        for (let i = 1; i < N; i++) {
            for (let j = 1; j < N; j++) {
                if (taxiFares[i][k] + taxiFares[k][j] >= taxiFares[i][j])
                    continue;
                taxiFares[i][j] = taxiFares[i][k] + taxiFares[k][j];
            }
        }
    }
}

function findLowestFinalTaixFare(taxiFares, s, a, b) {
    return Math.min(
        ...taxiFares.map(
            (_, i) => taxiFares[s][i] + taxiFares[i][a] + taxiFares[i][b],
        ),
    );
}

/****** TEST CASE *******/

console.log(
    solution(6, 4, 6, 2, [
        [4, 1, 10],
        [3, 5, 24],
        [5, 6, 2],
        [3, 1, 41],
        [5, 1, 24],
        [4, 6, 50],
        [2, 4, 66],
        [2, 3, 22],
        [1, 6, 25],
    ]),
);

console.log(
    solution(7, 3, 4, 1, [
        [5, 7, 9],
        [4, 6, 4],
        [3, 6, 1],
        [3, 2, 3],
        [2, 1, 6],
    ]),
);

console.log(
    solution(6, 4, 5, 6, [
        [2, 6, 6],
        [6, 3, 7],
        [4, 6, 7],
        [6, 5, 11],
        [2, 5, 12],
        [5, 3, 20],
        [2, 4, 8],
        [4, 3, 9],
    ]),
);
