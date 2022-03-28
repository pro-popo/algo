/**
 * 하드디스크는 한 번에 하나의 작업만 수행할 수 있다.
 * 모든 작업을 처리하는데 걸리는 시간의 평균 중,
 * 가장 작은 평균을 구하자.
 *
 * @param {*} jobs [작업이 요청되는 시점, 작업의 소요시간]
 * @returns 작업의 요청부터 종료까지 걸린 시간의 평균을 가장 줄이는 방법으로 처리할 때의 평균
 */
function solution(jobs) {
    const JOB_LENGTH = jobs.length;
    jobs.sort(([requestTime], [other]) => requestTime - other);

    const queue = [];
    let [time, sumTime] = [0, 0];

    do {
        let index = jobs.findIndex(([requestTime]) => requestTime > time);
        if (!queue.length && index === 0 && ++time) continue;
        if (index === -1) index = jobs.length;

        queue.push(...jobs.slice(0, index));
        jobs = jobs.slice(index);

        queue.sort(
            ([, requiredTime], [, otherRequired]) =>
                requiredTime - otherRequired,
        );

        const [requestTime, requiredTime] = queue.shift();
        time += requiredTime;
        sumTime += time - requestTime;
    } while (jobs.length || queue.length);

    return Math.floor(sumTime / JOB_LENGTH);
}

// console.log(
//     solution([
//         [0, 3],
//         [1, 9],
//         [2, 6],
//     ]),
// );

console.log(
    solution([
        [0, 3],
        [1, 9],
        [2, 6],
        [30, 3],
    ]),
);
