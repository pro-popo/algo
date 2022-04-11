/**
 * 전화 키패드에서 왼손과 오른속의 엄지손가락만을 사용하여
 * 숫자만을 입력하려고 한다.
 *
 * 왼손 엄지손가락은 * 키패드,
 * 오른손 엄지손가락은 # 키패드에서 시작한다.
 *
 * 엄지손가락 사용은 다음과 같은 규칙을 따른다.
 * - 엄지손가락은 상하좌우 4가지 방향으로만 이동할 수 있다.
 * - 1,4,7은 왼손 엄지손가락을 사용한다.
 * - 3,6,9는 오른손 엄지손가락을 사용한다.
 * - 2,5,8,0은 현재 가장 가까운 엄지손가락을 사용한다.
 *   만약 거리가 같다면,
 *   오른손잡이는 오른손, 왼손잡이는 왼손을 사용한다.
 *
 * @param {*} numbers 순서대로 누를 번호가 담긴 배열 (1~1_000)
 * @param {*} hand 왼손잡이/오른손잡이 ("left"/"right")
 * @returns 각 번호를 누른 엄지손가락 배열 ("L"/"R")
 */

function solution(numbers, hand) {
    const phone = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        ['*', 0, '#'],
    ];
    const points = {};
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 3; c++) {
            points[phone[r][c]] = [r, c];
        }
    }
    const user = { left: points['*'], right: points['#'], hand };
    const [LEFT, RIGHT] = ['L', 'R'];
    return numbers
        .map(number => {
            const [, column] = points[number];
            if (column === 0) {
                user.left = points[number];
                return LEFT;
            }

            if (column === 2) {
                user.right = points[number];
                return RIGHT;
            }

            const leftMovement = countMovement(user.left, number);
            const rightMovement = countMovement(user.right, number);
            if (leftMovement === rightMovement) {
                user[user.hand] = points[number];
                return user.hand === 'left' ? LEFT : RIGHT;
            }
            if (leftMovement < rightMovement) {
                user.left = points[number];
                return LEFT;
            }
            if (leftMovement > rightMovement) {
                user.right = points[number];
                return RIGHT;
            }
        })
        .join('');

    function countMovement(startPoint, number) {
        const queue = [startPoint];
        const visited = new Set([startPoint.toString()]);
        const dt = [
            [0, 1],
            [0, -1],
            [1, 0],
            [-1, 0],
        ];
        let move = 0;
        while (queue.length) {
            let size = queue.length;
            while (size--) {
                const [r, c] = queue.shift();
                if (phone[r][c] === number) return move;
                for (const move of dt) {
                    const next = [r + move[0], c + move[1]];
                    if (isOutOfRange(next) || visited.has(next.toString()))
                        continue;
                    queue.push(next);
                    visited.add(next.toString());
                }
            }
            move++;
        }

        function isOutOfRange([r, c]) {
            return r < 0 || c < 0 || r === 4 || c === 3;
        }
    }
}

console.log(solution([1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5], 'right'));
