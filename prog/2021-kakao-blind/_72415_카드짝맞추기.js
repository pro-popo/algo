/**
 * 카드 짝맞추기 보드 게임을 개발하고자 한다.
 * 4*4 크기의 격자 형태로,
 * 6가지의 그림이 그려진 카드가 각기 2장씩 화면에 무작위로 배치되어 있다.
 *
 * 유저가 카드 2장 선택하여 앞면으로 뒤집었을 때,
 * 같은 그림이 그려진 카드면 해당 카드는 게임 화면에서 사라진다.
 * 만약 아니면, 원래 상태로 뒤집힌다.
 * 이와 같은 방법으로 모든 카드를 화면에서 사라지게 하면 게임이 종료된다.
 *
 * [카드를 선택하는 방법]
 * - 커서를 이용하여 선택
 * - 커서는 Ctrl키와 방향키에 의해 이동된다.
 *   - 방향키(상하좌우)중 하나를 누르면,
 *     키 방향으로 1칸 이동
 *   - Ctrl키를 누른 상태로 방향키 중 하나를 누르면,
 *     키 방향으로 가장 가까운 카드로 한번에 이동
 *     만약, 카드가 없다면 그 방향의 가장 마지막 칸으로 이동
 *   - 만약, 누른 키 방향으로 이동 가능한 공간이 없다면, 움직일 수 없음
 * - Enter 키를 입력하여 카드를 뒤집는다.
 *   - 앞면이 보이는 카드가 1장뿐이라면, 두번째 카드를 뒤집을 때까지 앞면을 유지한다.
 *
 * 카드의 짝을 맞춰 몇 장 제거된 상태에서 카드 앞면의 그림을 알고 있다면,
 * 남은 카드를 모두 제거하는데 필요한 키 조작 횟수의 최솟값을 구하고자 한다.
 *
 * 키 조작 횟수는 각각 조작 횟수 1로 계산한다. (Ctrl키 포함 1)
 *
 * 빈 칸은 이미 카드가 제거된 상태이다.
 *
 * @param {*} board 4*4크기의 2차원 배열 (0~6, 0은 빈칸)
 * @param {*} r 커서의 최초 행 위치
 * @param {*} c 커서의 최소 열 위치
 * @returns 모든 카드를 제거하기 위한 키 조작 횟수의 최솟값
 *
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저, board를 순회하여 카드의 짝끼리 묶는다.
 *   그 다음, 주어진 카드의 짝들을 순회하여
 *   카드를 제거할 수 있는 모든 경우(순서)에 대해 검사한다.
 *   카드의 종류는 최대 6가지로, 6!가지의 방법이 존재한다. (순열, 완전탐색)
 *
 *   이때, 하나의 카드의 짝을 뒤집을 때, 두 카드 중 먼저 뒤집을 카드를 골라야 한다.
 *   [커서, 첫 번째 카드, 두 번째 카드]의 위치를 각각 시작점으로 둔 뒤,
 *   각 시작점을 시작으로 모든 공간(board)을 방문하여, 각 공간에 대한 최소 이동 횟수를 구한다. (BFS 알고리즘)
 *   그 다음,
 *   커서 -> 첫 번째 카드 -> 두 번째 카드 순으로 방문했을 경우와
 *   커서 -> 두 번째 카드 -> 첫 번째 카드 순으로 방문했을 경우 중,
 *   이동 횟수가 더 적은 경우의 순서대로 카드를 뒤집는다.
 *
 *   모든 카드를 제거했을 경우, 가장 이동 횟수가 적은 경우에 대해 별도로 저장한다.
 *   모든 순회를 마친 후, 카드를 뒤집는 횟수와 이동 횟수를 더해주면 된다.
 *
 * - 조금 복잡한 구현 문제였다.
 *   테스트 케이스 11번이 틀렸던 이유는,
 *   커서 -> 첫 번째 카드
 *   커서 -> 두 번째 카드 와 같이,
 *   커서에서 첫 번째 카드 혹은 두 번째 카드 중 어떤 카드로 이동할 지에 대해서만 고려했기 때문이다.
 *   즉, 카드의 짝의 방문 순서는 고려하지 않았다.
 *   (짝에 대해서는 어떤 순서로 방문하든 이동 횟수가 동일하다고 생각했다..😂)
 *   다음과 같이, A->B순으로 뒤집는 경우와 B->A순으로 뒤집는 경우의 이동 횟수가 다른 경우가 존재한다.
 *   0 0 0 0
 *   0 0 A 0
 *   0 0 X 0
 *   0 0 X B
 *   A의 경우, 최소 2번
 *   B의 경우, 최소 3번이다.
 *
 */

class Point {
    constructor(r, c) {
        this.r = r;
        this.c = c;
    }
}

const BOARD_LENGTH = 4;

function solution(board, r, c) {
    const pictureCards = filterPictureCards(board);
    initBoard(board, pictureCards);

    let minCursorMovement = Number.MAX_VALUE;
    permutation(new Point(r, c), 0);

    let numberOfCardFlips = pictureCards.length * 2;
    return minCursorMovement + numberOfCardFlips;

    function permutation(cursor, moveCount) {
        if (!board.remainPictureCards.size) {
            minCursorMovement = Math.min(minCursorMovement, moveCount);
            return;
        }

        pictureCards.forEach((cards, cardID) => {
            if (!board.hasCard(cardID)) return;

            const [
                moveCountWhenFirstFlipFirstCard,
                moveCountWhenFirstFlipSecondCard,
            ] = countCursorMovement(board, cursor, cards);

            const [firstCard, secondCard] = cards;
            const [nextCursor, totalMoveCount] =
                moveCountWhenFirstFlipFirstCard <
                moveCountWhenFirstFlipSecondCard
                    ? [secondCard, moveCount + moveCountWhenFirstFlipFirstCard]
                    : [firstCard, moveCount + moveCountWhenFirstFlipSecondCard];

            board.deleteCard(cardID);
            permutation(nextCursor, totalMoveCount);
            board.addCard(cardID);
        });
    }
}

function filterPictureCards(board) {
    const pictureCards = Array(9).fill(false);

    for (let i = 0; i < BOARD_LENGTH; i++) {
        for (let j = 0; j < BOARD_LENGTH; j++) {
            if (!board[i][j]) continue;
            pictureCards[board[i][j]] = pictureCards[board[i][j]] || [];
            pictureCards[board[i][j]].push(new Point(i, j));
        }
    }

    return pictureCards.filter((pictureCard) => pictureCard);
}

function initBoard(board, pictureCards) {
    board.remainPictureCards = new Set(pictureCards.map((_, cardID) => cardID));
    board.hasCard = function (cardID) {
        return this.remainPictureCards.has(cardID);
    };
    board.addCard = function (cardID) {
        this.remainPictureCards.add(cardID);
    };
    board.deleteCard = function (cardID) {
        this.remainPictureCards.delete(cardID);
    };
}

function countCursorMovement(board, cursor, cards) {
    const [firstCard, secondCard] = cards;

    const [cursorMovements, firstCardMovements, secondCardMovements] = [
        cursor,
        firstCard,
        secondCard,
    ].map((startPoint) => calculateMinimumCursorMovements(board, startPoint));

    return [
        cursorMovements.get(firstCard) + firstCardMovements.get(secondCard),
        cursorMovements.get(secondCard) + secondCardMovements.get(firstCard),
    ];
}

function calculateMinimumCursorMovements(board, start) {
    const cursorMovements = initCursorMovements();

    const queue = [start];
    cursorMovements[start.r][start.c] = 0;

    const dt = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ];
    while (queue.length) {
        const current = queue.shift();
        for (let d = 0; d < 4; d++) {
            const next = new Point(current.r + dt[d][0], current.c + dt[d][1]);

            if (isOutOfRange(next)) continue;
            moveCursorWithCtrlAndKey(current, d);
        }
    }

    return cursorMovements;

    function moveCursorWithCtrlAndKey(start, direction) {
        let next = new Point(start.r, start.c);

        while (true) {
            const current = new Point(next.r, next.c);
            next.r += dt[direction][0];
            next.c += dt[direction][1];

            if (isOutOfRange(next)) return;

            if (
                isLocationBorderOfBoard(next, direction) ||
                isPictureCard(board, next)
            ) {
                if (cursorMovements.isPossibleMoveLess(start, next)) {
                    cursorMovements.set(next, cursorMovements.get(start) + 1);
                    queue.push(new Point(next.r, next.c));
                }
                break;
            }

            if (!cursorMovements.isPossibleMoveLess(current, next)) continue;

            cursorMovements.set(next, cursorMovements.get(current) + 1);
            queue.push(new Point(next.r, next.c));
        }
    }
}

function initCursorMovements() {
    const cursorMovements = Array.from(Array(4), () =>
        Array(4).fill(Number.MAX_VALUE),
    );

    cursorMovements.get = function (point) {
        return this[point.r][point.c];
    };

    cursorMovements.set = function (point, movements) {
        this[point.r][point.c] = movements;
    };

    cursorMovements.isPossibleMoveLess = function (to, from) {
        return this.get(to) + 1 < this.get(from);
    };

    return cursorMovements;
}

function isOutOfRange(point) {
    return (
        point.r < 0 ||
        point.c < 0 ||
        point.r >= BOARD_LENGTH ||
        point.c >= BOARD_LENGTH
    );
}

function isLocationBorderOfBoard(point, direction) {
    return (
        (isMovedLeftOrRigth() &&
            (point.c === 0 || point.c === BOARD_LENGTH - 1)) ||
        (isMovedUpOrDown() && (point.r === 0 || point.r === BOARD_LENGTH - 1))
    );

    function isMovedLeftOrRigth() {
        return direction < 2;
    }
    function isMovedUpOrDown() {
        return direction > 1;
    }
}

function isPictureCard(board, point) {
    return board.hasCard(board[point.r][point.c] - 1);
}

/****** TEST CASE *******/

console.log(
    solution(
        [
            [1, 0, 0, 3],
            [2, 0, 0, 0],
            [0, 0, 0, 2],
            [3, 0, 1, 0],
        ],
        1,
        0,
    ),
);

console.log(
    solution(
        [
            [3, 0, 0, 2],
            [0, 0, 1, 0],
            [0, 1, 0, 0],
            [2, 0, 0, 3],
        ],
        0,
        1,
    ),
);
