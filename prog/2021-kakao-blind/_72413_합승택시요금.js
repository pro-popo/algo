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
