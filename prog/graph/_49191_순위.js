/**
 * 권투 경기는 1대 1방식으로 진행된다.
 * 심판은 주어진 경기 결과를 가지고 선수들의 순위를 매긴다.
 * 하지만, 몇몇 경기 결과를 분실하여 정확하게 순위를 매길 수 없다.
 *
 * @param {*} n 선수의 수
 * @param {*} results 경기 결과를 담은 2차원 배열 [이긴사람, 진사람]
 * @returns 정확하게 순위를 매길 수 있는 선수의 수
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
