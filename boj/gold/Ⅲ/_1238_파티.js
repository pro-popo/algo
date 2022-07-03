/**
 * N개의 마을에 각각 한 명의 학생이 살고 있다.
 * 어느날 N명의 학생이 X번 마을에 모여서 파티를 벌이기로 했다.
 * 이 마을 사이에는 총 M개의 단방향 도로들이 존재하고, i번째 길을 지나는데 Ti의 시간을 소비한다.
 * 각각의 학생들은 파티에 참석하기 위해 걸어간 뒤 다시 집으로 돌아와야 한다.
 *
 * 이 학생들은 최단 시간에 오고 가기를 원한다.
 * 이 도로들은 단방향이기 때문에 오고 가는 길이 다를 수 있다.
 * N명의 학생들 중 오고 가는데 가장 많은 시간을 소비하는 학생은 누구일까?
 *
 * 이때, 한 도시에서 다른 도시로 가는 도로의 개수는 최대 1개이다.
 *
 * @param {number} N - 학생 수
 * @param {number} M - 도로의 개수
 * @param {number} X - 파티 장소
 * @param {number[][]} roads - 도로 정보 [출발지, 도착지, 소요시간]
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   다익스트라 알고리즘을 활용하여 각 도시에 대한 최단거리를 구할 수 있다.
 *   먼저 roads 정보를 가지고 그래프를 형성한다.
 *   1부터 N까지 순회하여, 해당 시작지점부터 X까지의 최단거리를 구한다. (다익스트라)
 *   만약 최초 시작지점이 X인 경우, 각 지점으로 다시 돌아오는 시간으로 추가한다.
 *   최종적으로 가장 많은 시간을 소비한 학생을 반환한다.
 *
 * - 다른 풀이 방식으로는,
 *   도로의 방향을 반전시켜 X부터 1~N까지의 최단거리를 구하면,
 *   각 시작지점(1~N)부터 X까지의 최단거리를 구할 수 있다.
 *   즉, 단 한번의 다익스트라로 구할 수 있다.
 *   이 경우 정점의 수가 100_000개가 넘을 경우 효율적으로 문제를 해결할 수 있다.
 */

function solution(N, M, X, roads) {
    const graph = createGraph(N, roads);

    const answer = Array(N + 1).fill(0);
    for (let i = 1; i <= N; i++) {
        const queue = [i];
        const times = Array(N + 1).fill(Number.MAX_VALUE);
        times[0] = times[i] = 0;

        while (queue.length) {
            const city = queue.shift();
            for (const [nextCity, nextTime] of graph[city]) {
                if (times[nextCity] <= times[city] + nextTime) continue;
                times[nextCity] = times[city] + nextTime;
                queue.push(nextCity);
            }
        }

        if (i === X) times.forEach((time, i) => (answer[i] += time));
        else answer[i] += times[X];
    }

    return Math.max(...answer);
}

function createGraph(N, roads) {
    const graph = Array.from(Array(N + 1), () => []);
    roads.forEach(([from, to, time]) => {
        graph[from].push([to, time]);
    });
    return graph;
}

function input(test) {
    const fs = require('fs');
    const data = (
        process.platform === 'linux'
            ? fs.readFileSync('/dev/stdin').toString().trim()
            : test
    ).split('\n');

    const [N, M, X] = data.shift().split(' ').map(Number);
    const roads = data.map(row => row.split(' ').map(Number));
    return [N, M, X, roads];
}

/****** TEST CASE *******/

const TEST1 = `4 8 2
1 2 4
1 3 2
1 4 7
2 1 1
2 3 5
3 1 2
3 4 4
4 2 3`;

console.log(solution(...input(TEST1)));
