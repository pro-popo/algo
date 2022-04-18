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
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   디딤돌을 건널 수 있는 사람의 수를 기준으로 이분 탐색을 진행한다.
 *   이때, 최소 사람의 수는 0이고,
 *   최대 사람의 수는 디딤돌에 적힌 가장 큰 숫자이다.
 *
 *   검사할 사람의 수는 다음과 같이 구한다.
 *   검사할 사람의 수 = (최소 사람의 수 + 최대 사람의 수) / 2
 *
 *   이때, 해당하는 수만큼 모든 사람들이 징검다리를 건널 수 있는지 확인한다.
 *   만약 모든 사람들이 건널 수 있다면, 정답을 갱신해 준다.
 *   그리고 다음에 검사할 범위를 검사 결과에 따라 조정한다.
 *
 *   모든 사람들이 징검다리를 건너는지 검사하는 과정은 다음과 같다.
 *   징검다리를 순회하여,
 *   해당 돌의 숫자가 사람의 수보다 작을 경우 (다같이 못 건너는 경우)
 *   해당 돌은 건너 뛴다.
 *
 *   이렇게 연속적으로 돌을 건너 뛴 횟수가 k와 동일할 경우,
 *   전부 징검다리를 못 건넌다 라는 의미이므로 false를 반환한다.
 *
 *   징검다리의 순회를 마친 경우,
 *   전부 징검다리를 건넜다는 의미이므로 true를 반환한다.
 *
 */

function solution(stones, k) {
    let min = 0;
    let max = Number.MAX_SAFE_INTEGER;

    let answer = 0;
    while (min <= max) {
        const person = Math.floor((min + max) / 2);

        if (isCrossedEveryone(person)) {
            min = person + 1;
            answer = person;
            continue;
        }
        max = person - 1;
    }
    return answer;

    function isCrossedEveryone(person) {
        let skipStone = 0;
        for (const stone of stones) {
            if (stone - person < 0) skipStone++;
            else skipStone = 0;

            if (skipStone === k) return false;
        }
        return true;
    }
}

console.log(solution([2, 4, 5, 3, 2, 1, 4, 2, 5, 1], 3));
