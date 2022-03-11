/**
 * 적의 공격 / 아군의 회복 스킬 이후, 파괴되지 않은 건물을 찾자.
 *
 * N*M 크기의 맵에는 내구도를 가진 건물이 각 칸마다 하나씩 있다.
 * 건물은 적의 공격을 받으면 내구도가 감소하고,
 * 내구도가 0이하가 되면 파괴된다. (단, 이미 파괴된 건물도 계속 내구도가 하락/상승될 수 있다)
 * 아군은 회복 스킬을 사용하여 건물의 내구도를 높일 수 있다.
 *
 * @param {*} board 건물의 내구도를 나타내는 2차원 정수 배열 (1~1_000)
 * @param {*} skill 적의 공격 혹은 아군의 회복 스킬을 나타내는 2차원 정수 배열 (1~250_000)
 *                  [type, r1, c1, r2, c2, degree] => type: 1(공격) 2(회복)
 * @returns 적의 공격 혹은 아군의 회복 스킬이 모두 끝난 뒤, 파괴되지 않은 건물의 개수
 *
 */

function solution(board, skill) {
    const [ROW, COLUWN] = [board.length, board[0].length];
    const effects = Array.from(Array(ROW), () => Array(COLUWN).fill(0));

    skill.forEach(([type, r1, c1, r2, c2, degree]) => {
        type === 1 && (degree = -degree);
        for (let i = r1; i <= r2; i++) {
            effects[i][c1] += degree;
            if (c2 + 1 < COLUWN) effects[i][c2 + 1] += -degree;
        }
    });
    let answer = 0;
    board.forEach((_, r) => {
        let effect = 0;
        board[r].forEach((_, c) => {
            effect += effects[r][c];
            if (board[r][c] + effect > 0) answer++;
        });
    });
    return answer;
}

console.table(
    solution(
        [
            [5, 5, 5, 5, 5],
            [5, 5, 5, 5, 5],
            [5, 5, 5, 5, 5],
            [5, 5, 5, 5, 5],
        ],
        [
            [1, 0, 0, 3, 4, 4],
            [1, 2, 0, 2, 3, 2],
            [2, 1, 0, 3, 1, 2],
            [1, 0, 1, 3, 3, 1],
        ],
    ),
);
