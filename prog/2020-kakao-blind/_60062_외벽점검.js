/**
 * 레스토랑의 구조는,
 * - 완전히 동그란 모양
 * - 외부의 총 둘레는 n미터
 * - 외벽 몇몇 지점은 추위가 심할 경우 손상될 수 있는 취약한 지점이 존재
 * 따라서, 내부 공사 중 취약 지점들이 손상되지 않았는지 주기적으로 점검해야한다.
 * 다만, 빠른 공사 진행을 위해 점검 시간을 1시간으로 제한했다.
 * 최소한의 친구들을 투입해 취약 지점을 점검하고,
 * 나머지 친구들은 내부 공사를 돕는다.
 *
 * 레스토랑의 정북 방향 지점을 0으로 나타내며,
 * 취약 지점의 위치는 정북 방향 지점으로부터 시계 방향으로 떨어진 거리로 나타낸다.
 * 친구들은 출발 지점부터 시계 / 반시계 방향으로 외벽을 따라서만 이동 가능하다.
 *
 * @param {*} n 외벽의 길이 (1~200)
 * @param {*} weak 취약 지점의 위치가 담긴 배열 (1~15)
 * @param {*} dist 각 친구가 1시간 동안 이동할 수 있는 거리가 담긴 배열 (1~8)
 * @returns 취약 지점을 점검하기 위해 보내야하는 친구 수의 최소값. 만약 점검할 수 없다면, -1 반환
 */

function solution(n, weak, dist) {
    const extendedWeak = [...weak, ...weak.map(w => w + n)];
    const weakIDs = [...weak.map((_, i) => i), ...weak.map((_, i) => i)];

    const selectedFriends = selectFriends(dist.length).sort(
        (a, b) => a.length - b.length,
    );

    const answer = selectedFriends.find(isCheckedAllWeak);
    return answer ? answer.length : -1;

    function isCheckedAllWeak(friends) {
        const selectedDist = friends.map(friend => dist[friend]);
        return weak.find(
            (_, weakID) =>
                checkWeak(0, weakID, weakID, new Set()).size === weak.length,
        );

        function checkWeak(friend, startWeak, endWeak, finishWeak) {
            if (
                finishWeak.size === weak.length ||
                friend === selectedDist.length
            )
                return finishWeak;

            if (
                selectedDist[friend] <
                extendedWeak[endWeak] - extendedWeak[startWeak]
            ) {
                return checkWeak(friend + 1, endWeak, endWeak, finishWeak);
            }

            finishWeak.add(weakIDs[endWeak]);
            return checkWeak(friend, startWeak, endWeak + 1, finishWeak);
        }
    }
}

function selectFriends(MAX_ID) {
    const friends = [];
    permutation(new Set());
    return friends;

    function permutation(selectedFriends) {
        if (selectedFriends.size) friends.push([...selectedFriends]);

        for (let id = 0; id < MAX_ID; id++) {
            if (selectedFriends.has(id)) continue;

            selectedFriends.add(id);
            permutation(selectedFriends);
            selectedFriends.delete(id);
        }
    }
}

console.log(solution(12, [1, 5, 6, 10], [1, 2, 3, 4]));
console.log(solution(200, [0, 10, 50, 80, 120, 160], [1, 10, 5, 40, 30]));
console.log(solution(12, [1, 3, 4, 9, 10], [3, 5, 7]));

console.log(solution(30, [0, 3, 11, 21], [10, 4]));
console.log(solution(12, [0, 10], [1, 2]));
