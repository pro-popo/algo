function solution(maps) {
    const dt = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ];

    const [R, C] = [maps.length, maps[0].length];

    const visited = Array.from(Array(R), () => Array(C).fill(false));
    const qu = [[0, 0]];
    visited[0][0] = true;

    let answer = 0;
    while (qu.length !== 0) {
        const size = qu.length;
        answer++;
        for (let s = 0; s < size; s++) {
            const [curR, curC] = qu.shift();

            if (curR === R - 1 && curC === C - 1) {
                return answer;
            }
            for (let d = 0; d < 4; d++) {
                const nextR = curR + dt[d][0];
                const nextC = curC + dt[d][1];
                if (nextR < 0 || nextC < 0 || nextR >= R || nextC >= C)
                    continue;
                if (maps[nextR][nextC] == 0 || visited[nextR][nextC]) continue;

                qu.push([nextR, nextC]);
                visited[nextR][nextC] = true;
            }
        }
    }
    return -1;
}

console.log(
    solution([
        [1, 0, 1, 1, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 1, 1, 1],
        [1, 1, 1, 0, 1],
        [0, 0, 0, 0, 1],
    ]),
);

console.log(
    solution([
        [1, 0, 1, 1, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 1, 1, 1],
        [1, 1, 1, 0, 0],
        [0, 0, 0, 0, 1],
    ]),
);
