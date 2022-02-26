/**
 * 모든 사람이 입국 심사를 받는데 걸리는 시간을 최소로 하고싶다.
 *
 * - 각 입국심사대마다 심사 시간이 다르다.
 * - 한 심사대에서 동시에 한 명만 심사할 수 있다.
 * - 가장 앞에 서 있는 사람은,
 *   비어있는 곳을 가거나, 기다렸다가 빨리 끝나는 심사대로 가거나.
 *
 * @param {*} n 입국심사를 기다리는 사람 수 (1~1_000_000_000)
 * @param {*} times 각 심사관이 한 명을 심사하는데 걸리는 시간 (1~1_000_000_000분, 1~100_000명)
 * @returns 모든 사람이 심사를 받는데 걸리는 시간의 최솟값
 */

function solution(n, times) {
    let min = 1;
    let max = maxTotalImmigrationTime(times, n);

    while (min < max) {
        let mid = Math.floor((min + max) / 2);

        if (isPossibleOnTime(times, mid, n)) {
            max = mid;
            continue;
        }
        min = mid + 1;
    }

    return max;
}

function maxTotalImmigrationTime(times, peopleCount) {
    return Math.max(...times) * peopleCount;
}

function isPossibleOnTime(times, limitTime, peopleCount) {
    return countingPassedPeople(times, limitTime) >= peopleCount;
}

function countingPassedPeople(times, maximumTime) {
    return times.reduce(
        (count, time) => count + Math.floor(maximumTime / time),
        0,
    );
}

console.log(solution(6, [7, 10]));
