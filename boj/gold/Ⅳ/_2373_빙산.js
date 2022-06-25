/**
 * 지구 온난화로 인해 빙산이 녹고 있다.
 * 빙산의 각 부분별 높이 정보는 배열의 각 칸에 양의 정수로 저장된다.
 * 바다의 경우 0으로 표현된다.
 *
 * 빙산의 높이는 바닷물에 많이 접해있는 부분에서 더 빨리 줄어든다.
 * 빙산의 높이는 일년마다 그 칸에 동서남북 네 방향으로 붙어있는 0의 개수만큼 줄어든다.
 *
 * 한 덩어리의 빙산이 주어질 때,
 * 이 빙산이 두 덩어리 이상으로 분이되는 최초의 시간을 구하자.
 * 만약, 전부 다 녹을 때까지 두 덩어리 이상으로 분리되지 않는다면 0을 반환한다.
 *
 * @param {*} N - 행 (3~300)
 * @param {*} M - 열 (3~300)
 * @param {*} map - 값: 0~10, 빙산이 차지하는 칸의 개수: 10_000개 이하
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   일년마다 다음과정을 반복한다.
 *   1. map에 존재하는 빙산의 개수를 센다.
 *      빙산의 개수를 세는 방법은, BFS 알고리즘을 활용할 수 있다.
 *      map을 순회하여 얼음을 만날 경우(높이가 1 이상인 칸),
 *      1-1. 큐에 해당 위치를 저장한다.
 *      1-2. 큐가 빌때까지 다음 과정을 반복한다.
 *           큐에서 위치 정보를 꺼낸 다음,
 *           해당 위치에서 네 방향으로 탐색을 진행한다.
 *           다음 위치가 얼음인 경우 해당 위치를 큐에 집어 놓고 방문 처리를 한다.
 *      이때, 1-1번 과정을 거칠 때마다 빙산의 개수를 추가한다.
 *      즉, 1-1번 과정을 두 번이상 거치게되면 빙산의 개수가 두 개이상임을 알 수 있다.
 *
 *   2. 빙산의 개수가 2개인 경우, 경과한 시간을 반환한다.
 *      반면에 0개인 경우, 빙산이 두개 이상으로 분리되지 않는다는 의미이므로 0을 반환한다.
 *      그게 아니라면, 빙산을 녹이는 로직을 실행한다.
 *      2-1. map을 순회하여 물로 인해 녹아야 하는 얼음의 위치들을 별도의 배열에 저장한다.
 *           얼음 근처에 물인 칸이 몇 개있는지 센 다음,
 *           해당 위치와 함께 별도의 배열에 저장한다. [위치, 접촉한 물의 개수]
 *      2-2. 녹아야 하는 얼음들의 위치를 순회하여 물의 개수만큼 해당 위치의 높이를 감소시킨다.
 *      2-3. 빙산을 전부 녹였다면, 1번 과정으로 돌아간다.
 *
 * - 구현을 하면서, 빙산을 녹이는 과정에서 실수를 많이 했다.
 *   처음에는 물과 접촉한 얼음을 찾은 경우, 바로 높이를 감소 시켰다.
 *   이때, 해당 과정에서 높이가 0이 된 얼음의 위치를 근처 얼음이 물로 취급해 버렸다.
 *   그래서 1번 과정(빙산의 개수 세기)에서 빙산의 위치를 별도로 저장한 다음 2번 과정을 진행하였지만,
 *   두 로직에 대해 의존성을 없애고 싶어서 2번 과정에서 별도로 녹아야하는 얼음의 위치 정보들을 먼저 구했다.
 */

function solution(N, M, map) {
    const iceberg = new Iceberg(map);
    let time = 0;
    do {
        const numberOfIceberg = iceberg.countIceberg();
        if (numberOfIceberg === 2) return time;
        if (numberOfIceberg === 0) break;
        iceberg.meltIceberg();
    } while (++time);

    return 0;
}

class Iceberg {
    constructor(map) {
        this.map = map;
        this.ROW = map.length;
        this.COLUMN = map[0].length;
    }

    countIceberg() {
        let numberOfIceberg = 0;
        const visitedIce = Array.from(Array(this.ROW), () =>
            Array(this.COLUMN).fill(false),
        );

        for (let i = 0; i < this.ROW; i++) {
            for (let j = 0; j < this.COLUMN; j++) {
                if (!this.isIce([i, j]) || visitedIce[i][j]) continue;
                if (++numberOfIceberg > 1) return numberOfIceberg;
                bfs.call(this, [i, j]);
            }
        }

        return numberOfIceberg;

        function bfs(point) {
            const queue = [point];
            visitedIce[point[0]][point[1]] = true;

            while (queue.length) {
                const point = queue.shift();
                for (const next of Direction.movedPoints(point)) {
                    if (
                        this.isOutOfRange(next) ||
                        visitedIce[next[0]][next[1]] ||
                        !this.isIce(next)
                    )
                        continue;

                    queue.push(next);
                    visitedIce[next[0]][next[1]] = true;
                }
            }
        }
    }

    meltIceberg() {
        findMeltIce
            .call(this)
            .forEach(([[r, c], countWater]) => (this.map[r][c] -= countWater));

        function findMeltIce() {
            const meltIce = [];
            for (let i = 0; i < this.ROW; i++) {
                for (let j = 0; j < this.COLUMN; j++) {
                    const point = [i, j];
                    if (!this.isIce(point)) continue;

                    let countWater = 0;
                    for (const next of Direction.movedPoints(point)) {
                        if (this.isOutOfRange(next) || this.isIce(next))
                            continue;
                        countWater++;
                    }

                    if (countWater) meltIce.push([[i, j], countWater]);
                }
            }
            return meltIce;
        }
    }

    isIce(point) {
        return this.map[point[0]][point[1]] > 0;
    }

    isOutOfRange(point) {
        return (
            point[0] < 0 ||
            point[1] < 0 ||
            point[0] === this.ROW ||
            point[1] === this.COLUMN
        );
    }
}

class Direction {
    static dt = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ];

    static movedPoints(point) {
        return Direction.dt.map(move => [
            point[0] + move[0],
            point[1] + move[1],
        ]);
    }
}

function input(test) {
    const fs = require('fs');
    const data = (
        process.platform === 'linux'
            ? fs.readFileSync('/dev/stdin').toString().trim()
            : test
    ).split('\n');

    const [N, M] = data.shift().split(' ').map(Number);
    const map = data.map(row => row.split(' ').map(Number));
    return [N, M, map];
}

/****** TEST CASE *******/

const TEST1 = `5 7
0 0 0 0 0 0 0
0 10 9 10 0 0 0
0 0 0 0 0 0 0
0 0 0 0 0 0 0
0 0 0 0 0 0 0`;

console.log(solution(...input(TEST1)));
