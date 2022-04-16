/**
 * 게임 화면은 N*N크기의 정사각형 격자이며,
 * 위쪽에는 크레인이 있고, 오른쪽에는 바구니가 있다.
 * 모든 인형은 격자 한 칸을 차지하며, 격자의 가장 아래 칸부터 쌓여있다.
 *
 * 게임 사용자는 크레인을 좌우로 움직여 가장 위에 있는 인형을 집어 올릴 수 있다.
 * 집어올린 인형은 바구니에 쌓이고, 바구니의 가장 아래 칸부터 인형에 순섣로 쌓이게 된다.
 * 이때, 같은 모양의 인형 두 개가 연속으로 쌓이게 되면 터뜨려지면서 바구니에서 사라지게 된다.
 *
 * 바구니는 모든 인형이 들어갈 수 있을 만큼 충분히 크다.
 *
 * @param {*} board 게임 화면의 격자의 상태가 담긴 2차원 배열 (5~30)
 *                  0: 빈칸, 1~100: 인형
 * @param {*} moves 인형을 집기 위해 크레인을 작동시킨 위치 (1~1_000)
 * @returns 터트려져 사라진 인형의 개수
 *
 */

function solution(board, moves) {
    const BOARD_LENGTH = board.length;
    const rotatedBoard = Array.from(Array(BOARD_LENGTH), () => []);
    for (let c = 0; c < BOARD_LENGTH; c++) {
        for (let r = BOARD_LENGTH - 1; r >= 0; r--) {
            board[r][c] && rotatedBoard[c].push(board[r][c]);
        }
    }

    const basket = [];
    let total = 0;
    moves.forEach(move => {
        const top = basket.pop();
        const input = rotatedBoard[move - 1].pop();

        input && total++;

        if (top === input) return;

        if (top) basket.push(top);
        if (input) basket.push(input);
    });

    return total - basket.length;
}

/****** TEST CASE *******/

console.log(
    solution(
        [
            [0, 0, 0, 0, 0],
            [0, 0, 1, 0, 3],
            [0, 2, 5, 0, 1],
            [4, 2, 4, 4, 2],
            [3, 5, 1, 3, 1],
        ],
        [1, 5, 3, 5, 1, 2, 1, 4],
    ),
);
