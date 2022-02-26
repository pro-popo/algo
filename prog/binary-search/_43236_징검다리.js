/**
 * 바위를 n개 제거한 뒤,
 * 각 지점 사이의 거리의 최소값 중 가장 큰 값을 구하자.
 *
 * @param {*} distance 출발지점부터 도착지점까지의 거리
 * @param {*} rocks 바위들이 있는 위치를 담은 배열
 * @param {*} n 제거할 바위의 수
 * @returns 바위를 n개 제거한 뒤 각 지점 사이의 거리의 최솟값 중에 가장 큰 값
 *
 */

function solution(distance, rocks, n) {
    const bridge = [0, ...rocks, distance].sort((a, b) => a - b);

    let [min, max] = [1, 1_000_000_000];
    let answer = 0;
    while (min <= max) {
        let mid = Math.floor((min + max) / 2);

        if (isPossibleOnMinDistance(bridge, mid, n)) {
            answer = mid;
            min = mid + 1;
            continue;
        }
        max = mid - 1;
    }
    return answer;
}

function isPossibleOnMinDistance(bridge, minDistance, remainRemoveRocks) {
    return countingRemoveRocks(bridge, minDistance) <= remainRemoveRocks;
}

function countingRemoveRocks(bridge, minDistance) {
    let start = 0;
    let removeRockCount = 0;

    for (let i = 1, len = bridge.length; i < len; i++) {
        if (bridge[i] - bridge[start] >= minDistance) {
            start = i;
            continue;
        }
        removeRockCount++;
    }
    return removeRockCount;
}
