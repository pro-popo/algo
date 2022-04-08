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
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   로봇을 움직이거나 회전시켜 전체 맵을 BFS로 탐색한다.
 *   먼저, 현재 위치의 로봇이 갈 수 있는 위치를 계산한다.
 *   로봇이 움직이는 방법은 다음과 같이 8가지다.
 *   - 상하좌우 이동
 *   - 왼쪽을 기준으로 오른쪽이 시계 방향, 반시계 방향으로(90도, -90도) 회전
 *   - 오른쪽을 기준으로  왼쪽이 시계 방향, 반시계 방향으로(90도, -90도) 회전
 *   이때, 벽이 존재하거나, 맵을 벗어나는 위치는 제외한다.
 *   또한, 이미 방문했던 위치도 제외한다.
 *
 *   조건에 충족하는 위치는 queue에 추가한다.
 *   이때, 방문 여부를 확인하기 위해 로봇의 위치 정보를 Set 객체로 관리한다.
 *   위치 정보는 `x1,y1 x2,y2`와 같은 문자열 형태로 저장하였다.
 *   주의할 점은, `x1,y1 x2,y2`의 위치를 반전시킨 `x2,y2 x1,y1` 또한 저장해야 한다.
 *   이는 동일한 위치에서 왼쪽과 오른쪽만 바뀐 경우를 검사하기 위함이다.
 *
 *   위와 같은 과정을 (N,N) 위치에 도착할 때까지 반복한다.
 *
 * - 로봇을 회전 시키는 방법은,
 *   왼쪽을 기준으로 오른쪽이 회전하는 경우,
 *   먼저, 왼쪽에서 어떤 방향으로 가야 오른쪽 위치로 갈 수 있는지 direction을 구한다.
 *   그 다음 해당 방향부터 시계 방향 혹은 반시계 방향으로 회전시켜 벽을 만나지 않는 경우를 찾는다.
 *
 * - 테스트 케이스 중, 10번과 14번을 계속 틀린 이유는,
 *   로봇을 회전 시킬 때마다 최대 360도까지 회전시킨 다음에 가능한 모든 경우를 찾았다.
 *   이때, 이에 대한 모든 움직임을 전부 1로 처리했다. 😅
 *   즉, 180도를 회전 시켜놓고 움직임을 1로 취급했다... 😑
 *
 * - 단순한 BFS 문제처럼 보이지만, 상당한 구현력을 요구하는 문제였다. 😵
 *   로봇이 두 칸을 차지하고, 회전까지 가능해서 구현하기 전에 구체적인 설계가 필요했다.
 *   어떤 식으로 로봇을 회전 시킬지, 어떤 형태로 데이터를 저장할 지 등 설계하는 데에 많은 시간을 소요했다.
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
            if (isImmovable(movedRobot) || isVisited(movedRobot)) continue;

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
            if (isImmovable(rotatedRobot)) break;
            if (isSlash(numberOfRotate) || isVisited(rotatedRobot)) continue;

            queue.add(rotatedRobot);
        }
    }

    function isImmovable(robot) {
        return robot.point.some(
            ([x, y]) => isOutOfRange(x, y) || board[x][y] === board.WALL,
        );
    }

    function isOutOfRange(x, y) {
        return x < 0 || y < 0 || x === board.length || y === board.length;
    }

    function isVisited(robot) {
        return (
            queue.isRemainHistory(robot) || queue.isRemainHistory(robot.reverse)
        );
    }

    function isSlash(numberOfRotate) {
        return numberOfRotate % 2 !== 0;
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
