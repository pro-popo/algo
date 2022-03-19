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
 * @param {*} playTime 동영상 재생시간 길이
 * @param {*} advTime 공익광고의 재생시간 길이
 * @param {*} logs 시청자들이 해당 동영상을 재생했던 구간 정보
 * @returns 공익광고가 들어갈 시작 시각
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   누적합 알고리즘을 활용하면 가장 많이 시청한 구간을 구할 수 있다.
 *
 *   먼저 input 값들을 전부 초(second) 단위로 변경한다.
 *   그 다음, logs를 순회하여 시청자 수에 대한 누적합을 진행한다.
 *   누적 시청자의 수를 구하기 위해,
 *   log의 start초부터 end초까지 순차적으로 시청자 수를 1씩 더해주면 시간초과가 발생한다.
 *
 *   이 경우, log의 start초부터 end초까지의 시청자 수를 더해주기 위해,
 *   먼저 start초의 시청자 수에 1를 더해주고, end초의 시청자 수에 1을 빼준다.
 *   [EX] [[2초,5초], [3초,6초]] => 0 0 1 1 0 -1 -1 0 0
 *   그 다음, 현재 초의 시청자 수에 이전 초의 시청자 수를 더하는 과정을 두 번 진행한다.
 *
 *   위 과정을 두 번 진행하는 이유는,
 *   첫 번째는, 재생 구간(logs)에 대한 시청자 수를 누적합하는 과정이다.
 *   즉, 해당 X초에 몇 명의 사람들이 시청했는지를 구할 수 있다.
 *   [EX] 0 0 1 1 0 -1 -1 0 0 => 0 0 1 2 2 1 0 0 0
 *        3초에는 총 2명의 사람이 시청함
 *
 *   두 번째는, 전체 재생 구간에 대한 시청자의 수를 누적합하는 과정이다.
 *   즉, 0초 ~ X초까지 총 몇 명의 사람들이 시청했는지를 구할 수 있다.
 *   [EX] 0 0 1 2 2 1 0 0 0 => 0 0 1 3 5 6 6 6 6
 *        0초부터 3초까지 총 3명의 사람이 시청함
 *        이때, "3초~5초 구간의 누적 시청자 수"를 구하고 싶다면,
 *        "5초까지의 누적 시청자 수 - (3-1)초까지의 누적 시청자 수"를 구하면 된다.
 *
 *   누적합을 마친 후, 가장 시청자 수가 많은 구간을 구해야 한다.
 *   0초 ~ playTime초까지 순회하여,
 *   start초 ~ end초 구간(총 adbTime초)의 누적 시청자 수를 구한다.
 *   이때, 가장 누적 시청자 수가 많은 구간의 시작 시간(start초)을 별도로 저장한다.
 *
 * - 최근에 누적합 문제를 풀어서 운좋게 쉽게 접근할 수 있었던 문제였다!
 *   처음에는, X초에 대한 누적 시청자 수로만 계산을 진행했었다.
 *   이때, X초~Y초까지의 누적 시청자 수를 구하기 위해 순차적으로 더하는 과정이 필요했고,
 *   고민을 하다가 한 번 더 누적합을 진행하면 0초~X초까지의 누적 시청자 수를 구할 수 있다는 것을 깨달았다.
 *
 */

function solution(playTime, advTime, logs) {
    [playTime, advTime, logs] = convertInputsToSeconds(playTime, advTime, logs);
    const prefixSumOfViewers = calculatePrefixSumOfViewers(logs, playTime);

    let [start, end] = [0, advTime - 1];
    let [maxViewers, answer] = [-1, -1];
    while (end <= playTime) {
        const viewers = countViewersForSegment(prefixSumOfViewers, end, start);

        if (viewers > maxViewers) [maxViewers, answer] = [viewers, start];
        start++, end++;
    }

    return convertToTime(answer);
}

function convertInputsToSeconds(playTime, advTime, logs) {
    return [
        ...[playTime, advTime].map((time) => convertToSeconds(time)),
        logs.map((log) => log.split('-').map((time) => convertToSeconds(time))),
    ];
}

function convertToSeconds(time) {
    const [hour, minute, second] = time.split(':').map(Number);
    return hour * 3600 + minute * 60 + second;
}

function convertToTime(second) {
    return [
        Math.floor(second / 3600),
        Math.floor(second / 60) % 60,
        second % 60,
    ]
        .map((number) => (number / 10 < 1 ? `0${number}` : number))
        .join(':');
}

function calculatePrefixSumOfViewers(logs, playTime) {
    const prefixSum = Array(playTime + 1).fill(0);
    logs.forEach(([start, end]) => {
        prefixSum[start]++;
        prefixSum[end]--;
    });

    let turn = 2;
    while (turn-- > 0) {
        for (let i = 1; i <= playTime; i++) {
            prefixSum[i] += prefixSum[i - 1];
        }
    }

    return prefixSum;
}

function countViewersForSegment(prefixSumOfViewers, end, start) {
    return prefixSumOfViewers[end] - (prefixSumOfViewers[start - 1] || 0);
}

/****** TEST CASE *******/

console.log(
    solution('02:03:55', '00:14:15', [
        '01:20:15-01:45:14',
        '00:40:31-01:00:00',
        '00:25:50-00:48:29',
        '01:30:59-01:53:29',
        '01:37:44-02:02:30',
    ]),
);

console.log(
    solution('50:00:00', '50:00:00', [
        '15:36:51-38:21:49',
        '10:14:18-15:36:51',
        '38:21:49-42:51:45',
    ]),
);
