/**
 * N개의 아파트가 일렬로 쭉 늘어서 있다.
 * 일부 아파트 옥상에는 4g 기지국이 설치되어 있다.
 * 이때 4g 기지국을 5g 기지국으로 바꾸고자 한다.
 *
 * 그러나 5g 기지국은 4g 기지국보다 전달 범위가 좁다.
 * 5g 기지국으로 바꿀 경우 어떤 아파트에는 전파가 도달하지 않는다.
 *
 * 전파의 도달 거리가 W일 때, 설치된 아파트를 기준으로 양쪽으로 W만큼 전달할 수 있다.
 *
 * 이때, 기지국을 최소로 설치하면서 모든 아파트에 전파를 전달하고자 한다.
 *
 * @param {number} n - 아파트의 개수 (200,000,000)
 * @param {array} stations - 기지국이 설치된 아파트의 번호 (10,000)
 * @param {number} w - 전파 도달 거리 (10,000)
 * @returns {number} - 모든 아파트에 전파를 전달하기 위해 증설해야 할 기지국 개수
 */

function solution(n, stations, w) {
    let stationIndex = 0;
    let install = 0;
    let pointer = w + 1;
    while (pointer <= n) {
        if (
            stationIndex < stations.length &&
            stations[stationIndex] <= pointer
        ) {
            pointer = stations[stationIndex] + w * 2 + 1;
            stationIndex++;
            continue;
        }
        install++;
        if (pointer + w >= n) break;

        pointer += w * 2 + 1;
        if (pointer > n) pointer = n;
    }
    return install;
}

/****** TEST CASE *******/

console.log(solution(11, [4, 11], 1));
console.log(solution(16, [9], 2));
console.log(solution(12, [], 2));
// 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16
