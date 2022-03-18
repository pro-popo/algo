/**
 * 시청자들이 가장 많이 보는 구간에 공익광고를 넣고자 한다.
 *
 * 동영상의 전체 재생 구간과,
 * 각 시청자들이 동영상을 재생한 구간의 위치(시작-끝)가 표시되어 있다.
 *
 * 또한, 공익광고의 재생시간이 주어지며
 * 최적의 공익광고 위치를 찾아야 한다.
 * 즉, 동영상을 시청한 시청자들의 누적 재생시간이 가장 큰 구간이 최적의 구간이 된다.
 *
 *
 * @param {*} playTime
 * @param {*} advTime
 * @param {*} logs
 * @returns
 */

function solution(playTime, advTime, logs) {
    [playTime, advTime, logs] = convertInputsToSeconds(playTime, advTime, logs);
    const prefixSumOfViewers = calculatePrefixSumOfViewers(logs, playTime);

    let [start, end] = [0, advTime - 1];
    let [maxViewers, answer] = [-1, -1];
    while (end <= playTime) {
        const viewers =
            prefixSumOfViewers[end] - (prefixSumOfViewers[start - 1] || 0);

        if (viewers > maxViewers) {
            maxViewers = viewers;
            answer = start;
        }
        start++, end++;
    }

    return convertToTime(answer);
}

function convertInputsToSeconds(playTime, advTime, logs) {
    [playTime, advTime] = [playTime, advTime].map((time) =>
        convertToSeconds(time),
    );
    logs = logs.map((log) =>
        log.split('-').map((time) => convertToSeconds(time)),
    );
    return [playTime, advTime, logs];
}

function convertToSeconds(time) {
    const [hour, minute, second] = time.split(':').map(Number);
    return hour * 60 * 60 + minute * 60 + second;
}

function convertToTime(second) {
    return [
        Math.floor(second / 60 / 60),
        Math.floor(second / 60) % 60,
        second % 60,
    ]
        .map((number) => (number / 10 < 1 ? `0${number}` : number))
        .join(':');
}

function calculatePrefixSumOfViewers(logs, playTime) {
    const prefixSum = logs.reduce((prefixSum, [start, end]) => {
        prefixSum[start]++;
        prefixSum[end]--;
        return prefixSum;
    }, Array(playTime + 1).fill(0));

    let turn = 2;
    while (turn-- > 0) {
        for (let i = 1; i <= playTime; i++) {
            prefixSum[i] += prefixSum[i - 1];
        }
    }

    return prefixSum;
}

// console.log(
//     solution('02:03:55', '00:14:15', [
//         '01:20:15-01:45:14',
//         '00:40:31-01:00:00',
//         '00:25:50-00:48:29',
//         '01:30:59-01:53:29',
//         '01:37:44-02:02:30',
//     ]),
// );

console.log(
    solution('50:00:00', '50:00:00', [
        '15:36:51-38:21:49',
        '10:14:18-15:36:51',
        '38:21:49-42:51:45',
    ]),
);
