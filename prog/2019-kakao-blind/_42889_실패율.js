/**
 * 신규 사용자와 기존 사용자 사이에 스테이지 차이가 너무 커
 * 신규 사용자의 수가 급감하고 있다.
 * 이러한 문제를 해결하기 위해,
 * 동적으로 게임 시간을 늘려서 난이도를 조절하기로 했다.
 * 그러나 실패율을 구하는 부분에서 위기에 빠졌다.
 * 실패율을 구하는 코드를 완성하자.
 *
 * - 실패율은,
 *   스테이지에 도달했으나 아직 클리어하지 못한 플레이어의 수 / 스테이지에 도달한 플레이어 수
 *
 * @param {*} N 전체 스테이지의 개수 (1~500)
 * @param {*} stages 게임을 이용하는 사용자가 현재 멈춰있는(도전 중인) 스테이지의 번호 (1~200_000)
 *                   마지막 스테이지까지 클리어: N+1
 * @returns 실패율이 높은 스테이지부터 내림차순으로 스테이지의 번호가 담겨있는 배열을 반환
 */

function solution(N, stages) {
    const challengePlayers = Array(N + 2).fill(0);
    stages.forEach(stage => challengePlayers[stage]++);

    const completedPlayers = [...challengePlayers];
    for (let i = challengePlayers.length - 1; i > 0; i--) {
        completedPlayers[i - 1] += completedPlayers[i];
    }

    const failureRates = Object.fromEntries([...Array(N)].map((_, i) => [++i]));
    for (let stage = 1; stage <= N; stage++) {
        failureRates[stage] = challengePlayers[stage] / completedPlayers[stage];
    }

    return Object.entries(failureRates)
        .sort(
            ([, filureRate], [, otherFilureRate]) =>
                otherFilureRate - filureRate,
        )
        .map(([stage]) => Number(stage));
}

/****** TEST CASE *******/

console.log(solution(5, [2, 1, 2, 6, 2, 4, 3, 3]));
console.log(solution(4, [4, 4, 4, 4, 4]));
