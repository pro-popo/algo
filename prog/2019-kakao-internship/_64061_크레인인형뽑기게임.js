/**
 * 게임 화면은 N*N크기의 정사각형 격자이며,
 * 위쪽에는 크레인이 있고, 오른쪽에는 바구니가 있다.
 * 모든 인형은 격자 한 칸을 차지하며, 격자의 가장 아래 칸부터 쌓여있다.
 *
 * 게임 사용자는 크레인을 좌우로 움직여 가장 위에 있는 인형을 집어 올릴 수 있다.
 * 집어올린 인형은 바구니에 쌓이고, 바구니의 가장 아래 칸부터 인형에 순섣로 쌓이게 된다.
 * 이때, 같은 모양의 인형 두 개가 연속으로 쌓이게 되면 바구니에서 제거된다.
 *
 * 바구니는 모든 인형이 들어갈 수 있을 만큼 충분히 크다.
 *
 * @param {*} board 게임 화면의 격자의 상태가 담긴 2차원 배열 (5~30)
 *                  0: 빈칸, 1~100: 인형
 * @param {*} moves 인형을 집기 위해 크레인을 작동시킨 위치 (1~1_000)
 * @returns 터트려져 사라진 인형의 개수
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저 크레인 위치의 인형을 쉽게 뽑기 위해서,
 *   board를 시계 방향으로 90도 돌린다. (이때, 인형만 저장한다.)
 *   0 0 3      1
 *   0 2 1  =>  2 2
 *   1 2 3      3 1 3
 *
 *   그 다음, moves를 순회하여
 *   바구니 맨 위에 저장된 인형과 크레인 위치의 인형을 각각 뽑는다.
 *   만약 두 개의 인형이 동일하다면 둘 다 제거한다. (제거한 인형 count)
 *   그게 아니면 두 개의 인형을 바구니에 추가한다.
 *
 *   순회가 끝나면, 제거한 인형의 개수를 반환한다.
 *
 * - 다른 풀이 방식으로는,
 *   board의 최대 크기가 30이기 때문에 별도로 board를 조작할 필요없이,
 *   크레인의 위치에서 순차적으로 가장 맨 위에 있는 인형을 찾아도 된다!
 */

function solution(board, moves) {
    const rotatedBoard = rotateBoard(board);
    const basket = [];
    let remove = 0;
    moves.forEach(move => {
        const top = basket.pop();
        const input = rotatedBoard[move - 1].pop();

        if (top === input) {
            remove += 2;
            return;
        }

        if (top) basket.push(top);
        if (input) basket.push(input);
    });

    return remove;
}

function rotateBoard(board) {
    const BOARD_LENGTH = board.length;
    const rotatedBoard = Array.from(Array(BOARD_LENGTH), () => []);
    for (let c = 0; c < BOARD_LENGTH; c++) {
        for (let r = BOARD_LENGTH - 1; r >= 0; r--) {
            board[r][c] && rotatedBoard[c].push(board[r][c]);
        }
    }
    return rotatedBoard;
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
