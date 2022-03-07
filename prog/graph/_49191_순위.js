/**
 * 권투 경기는 1대 1방식으로 진행된다.
 * 심판은 주어진 경기 결과를 가지고 선수들의 순위를 매긴다.
 * 하지만, 몇몇 경기 결과를 분실하여 정확하게 순위를 매길 수 없다.
 *
 * @param {*} n 선수의 수 (1~100)
 * @param {*} results 경기 결과를 담은 2차원 배열 [이긴사람, 진사람]
 * @returns 정확하게 순위를 매길 수 있는 선수의 수
 *
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저, 승리 여부를 저장하기 위한 N*N 형태의 배열(winners)을 생성한다.
 *   그 다음, 플로이드-워셜 알고리즘을 사용하여 순위(승리 여부)를 매긴다.
 *
 *   플로이드-워셜은 모든 정점의 최단 경로를 구하기 위한 알고리즘으로,
 *   시간 복잡도는 O(N^3)이다.
 *
 *   이 문제에서는 배열(winners)에 최단 경로를 저장하는 것이 아닌, 승리 여부를 저장한다.
 *   즉, "A가 B를 이기고, B가 C를 이기면, A는 C를 이긴다."
 *   라는 원리를 이용하여 승리여부를 갱신한다.
 *
 *   그리고 위에서 갱신한 winners를 순회하여,
 *   각각의 선수들이 다른 모든 선수와 순위를 매길 수 있는지에 대한 검사를 수행한다.
 *   (두 선수 중, 한 명이라도 승리했는지에 대한 여부로 판단한다.)
 *
 * - 처음에는,
 *   경기 결과를 가지고 각 선수마다 (이긴 경기 + 진 경기)를 계산하여
 *   정확하게 순위를 매길 수 있는 선수를 구하고자 했다.
 *   A가 B를 이겼을 때, A를 이긴 선수들의 이긴 경기 정보에 B를 추가,
 *   B에게 진 선수들의 진 경기 정보에 A를 추가하는 등,
 *   고려해야 하는 사항이 많다보니 코드가 복잡해져서 중간에 포기했다. 😅
 *
 * - 두 번째로 도전한 풀이 방법은,
 *   이긴 경기에 대한 배열과 진 경기에 대한 배열을 별도로 저장한다.
 *   그리고 1~N까지의 선수들을 순회하여, DFS 탐색으로 해당 선수에게 이긴 선수, 진 선수가 몇 명인지 구한다.
 *   전체 합이 N-1인 경우, 해당 선수의 순위를 매길 수 있음을 의미한다.
 *
 *   중간에 꼬여서 포기했지만, 위와 같은 방식으로도 풀 수 있다!
 *
 * - 플로이드 워셜에 대한 아이디어는 힌트를 보고 생각해낸 것이다.
 *   알고리즘 자체는 어렵지 않지만, 이런 아이디어를 구상하는 것이 어려웠던 문제였다.. 😂
 *
 */

function solution(n, results) {
    const winners = createWinnersInfo(n, results);

    floydWarshall(winners);

    return winners.filter((_, player) => isAllRanked(player, winners)).length;
}

function createWinnersInfo(n, results) {
    const winners = Array.from(Array(n), () => Array(n).fill(false));

    results.forEach(
        ([winner, loser]) => (winners[winner - 1][loser - 1] = true),
    );

    return winners;
}

function floydWarshall(winners) {
    const numberOfPlayers = winners.length;
    for (let k = 0; k < numberOfPlayers; k++) {
        for (let i = 0; i < numberOfPlayers; i++) {
            for (let j = 0; j < numberOfPlayers; j++) {
                if (winners[i][k] && winners[k][j]) winners[i][j] = true;
            }
        }
    }
}

const isAllRanked = (player, winners) =>
    winners[player].every(
        (_, other) => player === other || hasAnyoneWon(winners, player, other),
    );

const hasAnyoneWon = (winners, player, other) =>
    winners[player][other] || winners[other][player];

/****** TEST CASE *******/
console.log(
    solution(5, [
        [4, 3],
        [4, 2],
        [3, 2],
        [1, 2],
        [2, 5],
    ]),
);

console.log(
    solution(7, [
        [6, 1],
        [6, 3],
        [1, 2],
        [4, 2],
        [3, 2],
        [2, 5],
        [5, 7],
        [1, 3],
        [3, 4],
    ]),
);
