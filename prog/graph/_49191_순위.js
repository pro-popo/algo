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
    const score = Array.from(Array(n), () => Array(n).fill(false));

    results.forEach(([winner, loser]) => (score[winner - 1][loser - 1] = true));

    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (score[i][k] && score[k][j]) score[i][j] = true;
            }
        }
    }

    return score.filter((result, player) =>
        result.every(
            (_, other) =>
                player === other ||
                score[player][other] ||
                score[other][player],
        ),
    ).length;
}

console.log(
    solution(5, [
        [4, 3],
        [4, 2],
        [3, 2],
        [1, 2],
        [2, 5],
    ]),
);
// console.log(
//     solution(7, [
//         [6, 1],
//         [6, 3],
//         [1, 2],
//         [4, 2],
//         [3, 2],
//         [2, 5],
//         [5, 7],
//         [1, 3],
//         [3, 4],
//     ]),
// );
