/**
 * 레스토랑의 구조는,
 * - 완전히 동그란 모양
 * - 외부의 총 둘레는 n미터
 * - 외벽 몇몇 지점은 추위가 심할 경우 손상될 수 있는 취약한 지점이 존재
 *
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
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저, 1️⃣친구들을 투입하는 모든 방법을 탐색해야 한다.
 *
 *   [1], [1,2], [2], [2,1]와 같이,
 *   "몇 명의 친구를 투입할 것인지",
 *   "어떤 순서로 투입할 것인지"에 대한 모든 경우를 찾아야 한다.
 *   즉, "순열"로 모든 경우를 탐색해 저장한다.
 *
 *   탐색이 끝난 뒤, 2️⃣"배열 크기에 따라 오름차순"으로 정렬한다.
 *   이는, 점검할 수 있는 친구 수의 최소값을 찾아야 하기 때문에
 *   수가 적은 친구들을 먼저 투입하고자 한다.
 *
 *   취약 지점을 점검하기 전,
 *   3️⃣weak를 확장하여 원형을 선형으로 펼쳐준다.
 *   예로, n=5, weak=[1,2,3] 인 경우 [1,2,3,6,7,8]으로 확장할 수 있다. (각 원소를 n으로 더한 수들을 합쳐준다.)
 *   만약 3에서 1와의 거리를 구할 경우, 확장된 Weak에서 6-3으로 구할 수 있다. 여기서 6은 (n+1)이다.
 *   따라서, 원형에 대해 생각할 필요없이, 선형으로 쉽게 탐색할 수 있다.
 *
 *   또한, 굳이 반시계 방향에 대해 고려할 필요가 없다.
 *   1에서 3으로 반시계 방향으로 이동하는 경우는, 3에서 1로 이동하는 경우와 동일하다.
 *
 *   그 다음, 친구를 투입하는 모든 방법을 순회하여,
 *   4️⃣해당 투입 방법으로 모든 취약 지점을 점검하는 경우가 있는지 검사한다.
 *   점검하는 방법은 다음과 같다.
 *   모든 weak를 순회하여 해당 K번째 weak에서 시작했을 때,
 *   weak[K] ~ weak[K+weak.length]의 모든 weak를 해당 투입 방법으로 전부 방문할 수 있는지 검사한다.
 *
 *   start지점부터 end지점까지 i번째 친구로 방문할 수 있는 경우, 다음 지점(end+1)으로 이동한다.
 *   반면 i번째 친구로 방문할 수 없는 경우, end지점부터는 i+1번째 친구에게 배정한다.
 *   이때, weak[K+weak.length]를 방문하기 전에 모든 친구를 파견한 경우,
 *   해당 투입 방법으로는 점검할 수 없음을 의미한다.
 *
 *   위와 같은 과정으로 모든 취약 지점을 점검할 수 있는 투입 방법을 찾는다.
 *   이때, 가장 먼저 조건을 충족하는 투입 방법이 정답이 된다.
 *
 * - dist의 길이가 최대 8이기 때문에 완전탐색으로 충분히 탐색할 수 있다!
 *
 * - 테스트 케이스 5번과 7번이 틀린 이유는,
 *   어이없게도 Array의 find 메서드를 잘못 사용했기 때문이다.😔
 *   find 메서드는 조건을 충족하는 원소가 없는 경우, undefined를 반환한다.
 *
 *   실제로 사용한 다음 로직에서,
 *   파견방법.find(() =>
 *     weak.find((시작 weak) => 모든 wedk를 전부 방문했는가?);
 *   );
 *   weak.find가 0을 반환하는 경우가 있었기 때문에 틀렸던 것이다. (weak가 0인데 조건을 충족하는 경우)
 *   0은 falsy한 값이기 때문에, 파견방법.find에서 0을 false로 판단하는 것이다. 🤬
 *   이에 대한 문제점을 해결하기 위해, find 대신 some으로 수정했다.
 *
 *   ... 허무하다...😩 바보같다...😭
 *
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

/****** TEST CASE *******/

console.log(solution(12, [1, 5, 6, 10], [1, 2, 3, 4]));
console.log(solution(12, [1, 3, 4, 9, 10], [3, 5, 7]));
