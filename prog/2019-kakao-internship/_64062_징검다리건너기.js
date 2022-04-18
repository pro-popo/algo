/**
 * 징검다리를 건널 수 있도록 다음과 같이 규칙을 만들었다.
 * - 징검다리는 일렬로 놓여 있고,
 *   디딤돌에 적혀 있는 숫자는 밟을 때마다 1씩 줄어든다.
 * - 디딤돌의 숫자가 0이 되면 더 이상 밟을 수 없다.
 * - 다음으로 밟을 수 있는 디딤돌이 여러 개 인 경우,
 *   무조건 가장 가까운 디딤돌로만 건널 뛸 수 있다.
 *
 * 출발지는 맨 왼쪽이며, 도착지는 맨 오른쪽이다.
 * 한 번에 한 명씩 징검다리를 건너야 하며,
 * 한 친구가 징검다리를 모두 건넌 후, 그 다음 친구가 건널 수 있다.
 *
 * @param {*} stones 디딤돌에 적힌 숫자가 담긴 배열
 *                   크기: 1~200_000, 값: 1~200_000_000,
 * @param {*} k 한 번에 건널 뛸 수 있는 최대 칸
 * @returns 최대 몇 명까지 징검다리를 건널 수 있는가
 *          이때, 친구들의 수는 무제한이다.
 */

function solution(stones, k) {
    let min = 0;
    let max = Number.MAX_SAFE_INTEGER;

    let answer = 0;
    while (min <= max) {
        const mid = Math.floor((min + max) / 2);

        if (isCrossedEveryone(mid)) {
            min = mid + 1;
            answer = mid;
            continue;
        }
        max = mid - 1;
    }
    return answer;

    function isCrossedEveryone(person) {
        let skip = 0;
        for (const stone of stones) {
            if (stone - person < 0) skip++;
            else skip = 0;

            if (skip === k) return false;
        }
        return true;
    }
}

console.log(solution([2, 4, 5, 3, 2, 1, 4, 2, 5, 1], 3));
