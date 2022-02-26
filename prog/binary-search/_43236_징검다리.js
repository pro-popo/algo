/**
 * 바위를 n개 제거한 뒤,
 * 각 지점 사이의 거리의 최소값 중 가장 큰 값을 구하자.
 *
 * @param {*} distance 출발지점부터 도착지점까지의 거리
 * @param {*} rocks 바위들이 있는 위치를 담은 배열
 * @param {*} n 제거할 바위의 수
 * @returns 바위를 n개 제거한 뒤 각 지점 사이의 거리의 최솟값 중에 가장 큰 값
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   각 지점 사이의 거리의 최솟값을 기준으로 이분 탐색을 진행한다.
 *   먼저, 각 지점 사이의 거리와 최솟값을 비교한다.
 *   이는 바위를 제거할 지에 대한 여부를 결정하고,
 *   총 제거한 바위의 수가 기준에 맞다면 해당 거리는 조건에 맞다고 판단한다.
 *
 * - 처음에는 rocks의 값들의 순서가 바뀌면 안되는 줄 알았다.(코드 새로 짬)
 * - 마지막 지점에서 거리의 최솟값을 만족하지 않은 경우, 제거할 수 있는 바위 수가 남은 경우 등
 *   여러 예외를 생각하다 보니 코드가 꼬여 버렸다. (또 코드 새로 짬)
 * - 결론은, 너무 어렵게 생각해서 코드가 정리가 안됐던 것 같다.
 *   다시 코드를 짜보니 처음 짰던 코드와 거의 유사해서 허무했다.. 😂
 */

function solution(distance, rocks, n) {
    const bridge = [0, ...rocks, distance].sort((a, b) => a - b);

    let [min, max] = [1, distance];
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
