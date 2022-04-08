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
    (board.BLANK = 0), (board.WALL = 1);
    const dt = [
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
        [-1, -1],
        [-1, 0],
        [-1, 1],
    ];

    const queue = [];
    const visited = new Set();
    addRobotInQueue(new Robot([0, 0], [0, 1]));

    const endPoint = `${board.length - 1},${board.length - 1}`;
    let answer = 0;
    while (queue.length) {
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
        for (let d = 0; d < dt.length; d += 2) {
            const movedRobot = robot.moveRobot(dt[d]);

            if (
                movedRobot.point.some(isImmovable) ||
                visited.has(movedRobot.toString())
            )
                continue;

            addRobotInQueue(movedRobot);
        }
    }

    function startRotate(robot) {
        [robot, robot.reverse].forEach(robot => {
            const [standardRobot, rotateRobot] = robot.point;
            let direction = dt.findIndex(
                ([x, y]) =>
                    x + standardRobot[0] === rotateRobot[0] &&
                    y + standardRobot[1] === rotateRobot[1],
            );

            const [LEFT_ROTATE, RIGHT_ROTATE] = [1, -1];
            rotate(robot, direction, LEFT_ROTATE);
            rotate(robot, direction, RIGHT_ROTATE);
        });
    }

    function rotate(robot, direction, directionOfRotate) {
        let numberOfRotate = 2;
        while (numberOfRotate--) {
            direction += directionOfRotate;
            if (direction === dt.length) direction = 0;
            if (direction === -1) direction = dt.length - 1;

            const rotatedRobot = robot.rotateRobot(dt[direction]);
            if (rotatedRobot.point.some(isImmovable)) break;
            if (isSlash(numberOfRotate) || visited.has(rotatedRobot.toString()))
                continue;

            addRobotInQueue(rotatedRobot);
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

    function addRobotInQueue(robot) {
        queue.push(robot);
        visited.add(robot.toString()).add(robot.reverse.toString());
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
