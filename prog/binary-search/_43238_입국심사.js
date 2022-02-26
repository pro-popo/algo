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
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   모든 사람들이 입국 심사를 받는데 걸리는 최소(min)/최대(max) 시간을 구한다.
 *   이를 기준으로 이분 탐색을 진행한다.
 *   최소, 최대 시간의 중간값인 mid 시간내에 모든 사람들이 입국 심사를 받을 수 있는지 검사하여 가능한 시간대를 구한다.
 *
 * - 많은 시간이 걸렸던 문제다.
 *   무엇을 기준으로 탐색을 진행해야 하는지 고민을 많이했다.
 *   처음에는, 현재 시간을 두고 심사관마다 기다려야하는 시간을 누적한 배열을 둠으로써,
 *   시간의 흐름에 따라 가능한 심사관을 찾아 사람들을 채워넣었다.
 *   그러나, 매번 정렬을 해야하기 때문에 비효율적이라 판단했다.
 *
 * - 참고로,
 *   이분탐색의 시간복잡도는 O(logN)이다.
 *
 * - 대부분 사람들이 이분 탐색으로 접근했다.
 *   신기했던 코드 중 하나는, 이분 탐색을 while문이 아닌 재귀로 작성했던 코드이다.
 */

function solution(n, times) {
    let [min, max] = [1, maxTotalImmigrationTime(times, n)];

    while (min <= max) {
        let mid = Math.floor((min + max) / 2);

        if (isPossibleOnTime(times, mid, n)) {
            max = mid - 1;
            continue;
        }
        min = mid + 1;
    }

    return min;
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
