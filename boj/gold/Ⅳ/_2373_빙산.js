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

    dt = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ];

    countIceberg() {
        let numberOfIceberg = 0;
        const visitedIce = Array.from(Array(this.ROW), () =>
            Array(this.COLUMN).fill(false),
        );
        for (let i = 0; i < this.ROW; i++) {
            for (let j = 0; j < this.COLUMN; j++) {
                if (!this.isIce([i, j]) || visitedIce[i][j]) continue;
                if (++numberOfIceberg > 1) return numberOfIceberg;

                const queue = [[i, j]];
                visitedIce[i][j] = true;

                while (queue.length) {
                    const point = queue.shift();
                    for (const move of this.dt) {
                        const next = [point[0] + move[0], point[1] + move[1]];
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

        return numberOfIceberg;
    }

    meltIceberg() {
        this.findMeltIce().forEach(
            ([[r, c], countWater]) => (this.map[r][c] -= countWater),
        );
    }

    findMeltIce() {
        const meltIce = [];
        for (let i = 0; i < this.ROW; i++) {
            for (let j = 0; j < this.COLUMN; j++) {
                if (!this.isIce([i, j])) continue;

                let countWater = 0;
                for (const move of this.dt) {
                    const next = [i + move[0], j + move[1]];
                    if (this.isOutOfRange(next) || this.isIce(next)) continue;
                    countWater++;
                }

                if (countWater) meltIce.push([[i, j], countWater]);
            }
        }
        return meltIce;
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
