/**
 * 야근을 하면 야근 피로도가 쌓인다.
 * 야근 피로도는 야근을 시작한 시점에서 남은 일의 작업량을 제곱하여 더한 값이다.
 * N시간 동안 야근 피로도를 최소화하도록 일하고자 한다.
 * 1시간 동안 작업량 1만큼을 처리할 수 있다고 할 때,
 * 야근 피로도를 최소화한 값을 구하자.
 *
 * @param {number} n - 남은 시간 (1_000_000)
 * @param {number[]} works - 각 일에 대한 작업량 (1~20_000)
 * @returns - 야근 피로도를 최소화한 값
 */

function solution(n, works) {
    works.sort((a, b) => a - b);
    const times = Array(works.length).fill(0);
    for (let i = 0; i < works.length - 1; i++) {
        times[i + 1] = times[i] + works[i + 1] - works[i];
    }

    let [min, max] = [0, works[works.length - 1]];
    let standardTime = max;
    while (min <= max) {
        const mid = Math.floor((min + max) / 2);
        if (isPossibleTime(mid)) {
            standardTime = mid;
            max = mid - 1;
            continue;
        }
        min = mid + 1;
    }

    for (let i = works.length - 1; i >= 0; i--) {
        if (standardTime >= works[i]) break;
        n -= works[i] - standardTime;
        works[i] = standardTime;
    }

    for (let i = works.length - 1; i > works.length - 1 - n; i--) {
        if (works[i] === 0) break;
        works[i]--;
    }

    return works.reduce((sum, number) => sum + number ** 2, 0);

    function isPossibleTime(standardTime) {
        let time = 0;
        for (let i = works.length - 1; i >= 0; i--) {
            if (standardTime >= works[i]) break;
            time += works[i] - standardTime;
        }
        return time <= n;
    }
}

/****** TEST CASE *******/

console.log(solution(4, [4, 3, 3]));
console.log(solution(1, [2, 1, 2]));
console.log(solution(3, [1, 1]));
