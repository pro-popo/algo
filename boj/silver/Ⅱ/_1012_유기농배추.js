/**
 * 유기농 배추를 재배하고자 한다.
 * 이때, 농약을 쓰지 않고 배추를 재배하려면 배추를 해출으로부터 보호하는 것이 중요하다.
 * 해충 방지에 효과적인 배추흰지렁이를 구입하고자 한다.
 * 특히, 한 배추에 배추흰지렁이가 한 마리 있다면, 인접한 다른 배추도 보호받을 수 있다.
 *
 * 배추를 재배하는 땅으 ㄴ고르지 못해 배추를 군데군데 심어 놓았다.
 * 이때, 모든 배추들을 보호하려면 최소 몇 마리의 지렁이가 필요한지 구하고자 한다.
 *
 * @param {number} T - 테스트 케이스
 * @param {number} N - 배추밭의 가로길이
 * @param {number} M - 배추밭의 세로길이
 * @param {number} K - 배추가 심어져 있는 위치의 개수
 * @param {number[][]} napaCabbages - 배추들의 위치 정보
 * @return - 각 테스트 케이스에 대해 필요한 최소의 배추흰지렁이 마리 수
 */

function solution(T, data) {
    let answer = '';
    while (T--) {
        const [N, M, K] = data.shift().split(' ').map(Number);
        const napaCabbages = data
            .splice(0, K)
            .map(point => point.split(' ').map(Number));

        const map = Array.from(Array(N), () => Array(M).fill(false));
        for (const [r, c] of napaCabbages) {
            map[r][c] = true;
        }

        let earthworm = 0;
        const dt = [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
        ];
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < M; j++) {
                if (!map[i][j]) continue;
                earthworm++;

                const queue = [[i, j]];
                map[i][j] = false;
                while (queue.length) {
                    const point = queue.shift();
                    for (const move of dt) {
                        const next = [point[0] + move[0], point[1] + move[1]];
                        if (
                            next[0] < 0 ||
                            next[1] < 0 ||
                            next[0] === N ||
                            next[1] === M ||
                            !map[next[0]][next[1]]
                        )
                            continue;

                        map[next[0]][next[1]] = false;
                        queue.push(next);
                    }
                }
            }
        }
        answer += earthworm + '\n';
    }

    return answer;
}

function input(test) {
    const fs = require('fs');
    const data = (
        process.platform === 'linux'
            ? fs.readFileSync('/dev/stdin').toString().trim()
            : test
    ).split('\n');

    return [+data.shift(), data];
}

/****** TEST CASE *******/

const TEST1 = `2
10 8 17
0 0
1 0
1 1
4 2
4 3
4 5
2 4
3 4
7 4
8 4
9 4
7 5
8 5
9 5
7 6
8 6
9 6
10 10 1
5 5`;

console.log(solution(...input(TEST1)));
