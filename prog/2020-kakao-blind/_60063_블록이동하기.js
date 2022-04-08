/**
 * 로봇경진대회에 출품할 로봇을 준비하고 있다.
 * 로봇은 2x1 크기이다.
 * 무지는 0과 1로 이루어진 NxN 크기의 지도에서 로봇을 움직여
 * (N,N) 위치까지 이동하도록 프로그래밍을 하려고 한다.
 * 로봇은 (1,1) 위치에서, 가로방향으로 놓여있는 상태로 시작하며,
 * 앞뒤 구분없이 움직일 수 있다.
 *
 * 회전할 때는 벽이 없어야 하며,
 * 한 칸 이동하거나 90도 회전하는데 걸리는 시간은 1초이다.
 *
 * @param {*} board 0과 1로 이루어진 지도 (5~100)
 * @returns 로봇이 (N,N) 위치까지 이동하는데 필요한 최소 시간
 */

function solution(board) {
    [board.BLANK, board.WALL] = [0, 1];

    const queue = new Queue();
    queue.add(new Robot([0, 0], [0, 1]));

    const endPoint = `${board.length - 1},${board.length - 1}`;
    let answer = 0;
    while (!queue.isEmpty) {
        let size = queue.length;
        while (size--) {
            const robot = queue.shift();

            if (robot.toString().includes(endPoint)) return answer;

            startMove(robot);
            startRotate(robot);
        }

        answer++;
    }

    function startMove(robot) {
        for (let d = 0; d < Direction.MAX_LENGTH; d += 2) {
            const direction = new Direction(d);
            const movedRobot = robot.moveRobot(direction.get());
            if (
                movedRobot.point.some(isImmovable) ||
                queue.isRemainHistory(movedRobot) ||
                queue.isRemainHistory(movedRobot.reverse)
            )
                continue;

            queue.add(movedRobot);
        }
    }

    function startRotate(robot) {
        [robot, robot.reverse].forEach(robot => {
            const [standardPoint, rotatePoint] = robot.point;
            const index = Direction.findIndexDirection(
                standardPoint,
                rotatePoint,
            );

            rotate(robot, new Direction(index), Direction.LEFT_ROTATE);
            rotate(robot, new Direction(index), Direction.RIGHT_ROTATE);
        });
    }

    function rotate(robot, direction, directionOfRotate) {
        let numberOfRotate = 2;

        while (numberOfRotate--) {
            direction.add(directionOfRotate);

            const rotatedRobot = robot.rotateRobot(direction.get());
            if (rotatedRobot.point.some(isImmovable)) break;
            if (
                isSlash(numberOfRotate) ||
                queue.isRemainHistory(rotatedRobot) ||
                queue.isRemainHistory(rotatedRobot.reverse)
            )
                continue;

            queue.add(rotatedRobot);
        }
    }

    function isSlash(numberOfRotate) {
        return numberOfRotate % 2 !== 0;
    }

    function isImmovable([x, y]) {
        return isOutOfRange() || board[x][y] === board.WALL;

        function isOutOfRange() {
            return x < 0 || y < 0 || x === board.length || y === board.length;
        }
    }
}

class Queue {
    items = [];
    history = new Set();

    add(item) {
        this.items.push(item);
        this.history.add(item.toString());
    }

    get length() {
        return this.items.length;
    }

    get isEmpty() {
        return this.length === 0;
    }

    isRemainHistory(item) {
        return this.history.has(item.toString());
    }

    shift() {
        return this.items.shift();
    }
}

class Robot {
    constructor(left, right) {
        this.left = left;
        this.right = right;
    }

    get point() {
        return [this.left, this.right];
    }

    moveRobot(move) {
        return new Robot(
            ...this.point.map(([x, y]) => [x + move[0], y + move[1]]),
        );
    }

    rotateRobot(rorate) {
        return new Robot(
            [...this.left],
            [this.left[0] + rorate[0], this.left[1] + rorate[1]],
        );
    }

    get reverse() {
        return new Robot([...this.right], [...this.left]);
    }

    toString() {
        return `${this.left} ${this.right}`;
    }
}

class Direction {
    static LEFT_ROTATE = 1;
    static RIGHT_ROTATE = -1;

    constructor(value) {
        this.value = value;
    }

    static get list() {
        return [
            [0, 1],
            [1, 1],
            [1, 0],
            [1, -1],
            [0, -1],
            [-1, -1],
            [-1, 0],
            [-1, 1],
        ];
    }

    static get MAX_LENGTH() {
        return Direction.list.length;
    }

    static findIndexDirection(standardPoint, targetPoint) {
        return Direction.list.findIndex(
            ([moveX, moveY]) =>
                standardPoint[0] + moveX === targetPoint[0] &&
                standardPoint[1] + moveY === targetPoint[1],
        );
    }

    add(value) {
        value += this.value;
        if (value >= Direction.MAX_LENGTH) return this.set(0);
        if (value < 0) return this.set(Direction.MAX_LENGTH - 1);
        return this.set(value);
    }

    get() {
        return Direction.list[this.value];
    }

    set(value) {
        this.value = value;
    }
}

/****** TEST CASE *******/

console.log(
    solution([
        [0, 0, 0, 1, 1],
        [0, 0, 0, 1, 0],
        [0, 1, 0, 1, 1],
        [1, 1, 0, 0, 1],
        [0, 0, 0, 0, 0],
    ]), // 7
);

console.log(
    solution([
        [0, 0, 0, 0, 1, 1, 1],
        [1, 1, 0, 0, 1, 1, 1],
        [1, 0, 0, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 1, 0, 0],
        [1, 1, 1, 1, 1, 0, 0],
        [1, 1, 1, 1, 1, 0, 0],
    ]), // 13
);
