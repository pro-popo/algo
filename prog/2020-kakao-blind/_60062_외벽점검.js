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
    const candidates = createCandidates(dist.length).sort(
        (a, b) => a.length - b.length,
    );

    const extendedWeak = [...weak, ...weak.map(w => w + n)];
    const answer = candidates.find(startCheckWeak);

    return answer ? answer.length : -1;

    function startCheckWeak(candidate) {
        const candidateDist = candidate.map(id => dist[id]);
        const isSuccessCheck = weak.some((_, firstWeakId) =>
            isCheckedAllWeak(candidateDist, firstWeakId),
        );
        return isSuccessCheck;
    }

    function isCheckedAllWeak(candidateDist, firstWeakId) {
        let candidateId = 0;
        let [startWeakId, endWeakId] = [firstWeakId, firstWeakId];

        while (!isCheckedLastWeak()) {
            if (candidateId === candidateDist.length) return false;

            if (isNotEnoughDistance()) {
                startWeakId = endWeakId;
                candidateId++;
                continue;
            }

            endWeakId++;
        }
        return true;

        function isCheckedLastWeak() {
            return endWeakId === firstWeakId + weak.length;
        }

        function isNotEnoughDistance() {
            return (
                extendedWeak[endWeakId] - extendedWeak[startWeakId] >
                candidateDist[candidateId]
            );
        }
    }
}

function createCandidates(maxId) {
    const candidates = [];
    permutation(new Set());
    return candidates;

    function permutation(candidate) {
        if (candidate.size) candidates.push([...candidate]);

        for (let id = 0; id < maxId; id++) {
            if (candidate.has(id)) continue;

            candidate.add(id);
            permutation(candidate);
            candidate.delete(id);
        }
    }
}

console.log(solution(6, [0], [1, 2, 3, 4]));
// console.log(solution(200, [0, 10, 50, 80, 120, 160], [1, 10, 5, 40, 30]));
// console.log(solution(12, [1, 3, 4, 9, 10], [3, 5, 7]));

// console.log(solution(30, [0, 3, 11, 21], [10, 4]));
// console.log(solution(200, [10, 20, 30], [1, 2, 4, 3]));
