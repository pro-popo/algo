/**
 * 1~N까지의 마을이 존재한다.
 * 각 마을은 양방향으로 통행할 수 있는 도로로 연결되어 있다.
 * 도로를 지날 때 걸리는 시간은 도로별로 다르다.
 *
 * 1번 마을에서 시작하여 각 마을로 음식 배달을 하려고 한다.
 * 각 마을로부터 음식 주문을 받을 때,
 * N개의 마을 중에서 K시간 이하로 배달이 가능한 마을에서만 주문을 받고자 한다.
 *
 * 임의의 두 마을간에 항상 이동 가능한 경로가 존재한다.
 *
 * @param {*} N 마을의 개수 (1~50)
 * @param {*} road 각 마을을 연결하는 도로의 정보 (1~2_000)
 *                 [A마을, B마을, 걸리는 시간]
 *                 이때, 두 마을을 연결하는 도로는 여러 개가 있을 수 있다.
 * @param {*} K 음식 배달이 가능한 시간 (1~500_000)
 * @returns 음식 주문을 받을 수 있는 마을의 개수
 */

function solution(N, road, K) {
    const EMPTY = Number.MAX_VALUE;
    const roads = Array.from(Array(N + 1), () => Array(N + 1).fill(EMPTY));
    road.forEach(([home, otherHome, time]) => {
        roads[home][otherHome] = Math.min(time, roads[home][otherHome]);
        roads[otherHome][home] = Math.min(time, roads[otherHome][home]);
    });

    const start = 1;
    const queue = [start];
    const times = Array(N + 1).fill(EMPTY);
    times[start] = 0;

    while (queue.length) {
        const home = queue.shift();
        roads[home].forEach((time, nextHome) => {
            if (times[home] + time >= times[nextHome]) return;
            times[nextHome] = times[home] + time;
            queue.push(nextHome);
        });
    }

    return times.filter(time => time <= K).length;
}

/****** TEST CASE *******/

console.log(
    solution(
        5,
        [
            [1, 2, 1],
            [2, 3, 3],
            [5, 2, 2],
            [1, 4, 2],
            [5, 3, 1],
            [5, 4, 2],
        ],
        3,
    ),
);

console.log(
    solution(
        6,
        [
            [1, 2, 1],
            [1, 3, 2],
            [2, 3, 2],
            [3, 4, 3],
            [3, 5, 2],
            [3, 5, 3],
            [5, 6, 1],
        ],
        4,
    ),
);
