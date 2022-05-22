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
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   stations를 순회하여, 각 기지국 사이에서 전파가 전달되지 않는 구간을 구한다.
 *   이때 전파가 전달되지 않는 구간을 구하는 식은 다음과 같다.
 *   > (현재 기지국 - w) - (이전 기지국 + w) - 1
 *
 *   만약 구간이 존재한다면,
 *   해당 구간에서 최소 설치해야 하는 기지국의 개수를 계산한다.
 *   > Math.ceil(구간 / (w * 2 + 1))
 *
 *   모든 순회를 마친 뒤, 최종으로 설치해야 하는 기지국의 개수를 반환한다.
 *
 * - 처음 접근했던 방식은,
 *   아파트를 기준으로 전파가 전달되지 않는 구간을 찾아 기지국을 설치했다.
 *   그러나, 아파트의 개수가 최대 200,000,000개이기 때문에 효율성에서 시간초과가 발생한다.
 *
 * - 전파가 전달되지 않는 구간들을 찾은 뒤,
 *   설치해야 하는 기지국의 개수를 계산하고자 했으나 시간초과가 발생했다.
 */

function solution(n, stations, w) {
    let answer = 0;
    stations.concat(n + w + 1).forEach((station, i) => {
        const first = stations[i - 1] || -w;
        const second = station;

        const section = calculateEmptySection(first, second);
        if (section <= 0) return;
        answer += countInstallStation(section);
    });

    return answer;

    function calculateEmptySection(first, second) {
        return second - w - (first + w) - 1;
    }

    function countInstallStation(section) {
        return Math.ceil(section / (w * 2 + 1));
    }
}

/****** TEST CASE *******/

console.log(solution(11, [4, 11], 1));
console.log(solution(16, [9], 2));
console.log(solution(12, [], 2));
