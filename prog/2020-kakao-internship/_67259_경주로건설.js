/**
 * 고객사로부터 자동차 경주로 건설에 필요한 견적을 의뢰받았다.
 * 경주로 부지는 N*N 크기의 정사각형 격자 형태이다.
 *
 * 각 격자의 칸은 0 또는 1로 채워져 있다. (0: 비어있음, 1: 벽)
 * 경주로의 출발점은 [0,0]이며, 도착점은 [N-1, N-1]이다.
 *
 * 죠르디는 자동차가 도착점까지 무사히 도달할 수 있게
 * 중간에 끊기지 않도록 경주로를 건설해야 한다.
 * 경주로는 상,하,좌,우로 인접한 두 빈 칸을 연결하여 건설할 수 있다.
 *
 * 인접한 두 빈 칸이 연결된 경주로를 "직선 도로"라고 한다.
 * 또한 두 직선 도로가 서로 직각으로 만나는 지점을 "코너"라고 부른다.
 *
 * 건설 비용을 계산할 때,
 * 직선 도로는 100원, 코너는 500원이 추가로 든다.
 * 견적서 작성을 위해, 경주로를 건설하는 데 필요한 최소 비용을 계산하고자 한다.
 *
 * @param board 도면의 상태를 나타내는 2차원 배열 (3~25)
 * @returns 경주로를 건설하는데 필요한 최소 비용
 */

function solution(board) {
    const startPoint = new Point([0, 0], -1);
    const endPoint = new Point([board.length - 1, board.length - 1]);

    const dp = Array.from(Array(board.length), () =>
        [...Array(board.length)].map(() => Array(4).fill(Number.MAX_VALUE)),
    );
    for (let d = 0; d < 4; d++) {
        dp[startPoint.x][startPoint.y][d] = 0;
    }

    let answer = Number.MAX_VALUE;
    DFS(startPoint, new RaceTrack(0, -1), new Set());

    return answer;

    function DFS(point, raceTrack, visited) {
        if (dp[point.x][point.y][point.direction] <= raceTrack.price) return;
        dp[point.x][point.y][point.direction] = raceTrack.price;

        if (point.isSamePoint(endPoint)) {
            answer = Math.min(answer, raceTrack.price);
            return;
        }

        point.move().forEach(next => {
            if (
                isOutOfRange(next.x, next.y) ||
                visited.has(next.toString()) ||
                board[next.x][next.y] === 1
            )
                return;

            visited.add(next.toString());
            DFS(
                next,
                new RaceTrack(
                    raceTrack.straightRoad + 1,
                    point.isSameDirection(next)
                        ? raceTrack.corner
                        : raceTrack.corner + 1,
                ),
                visited,
            );
            visited.delete(next.toString());
        });
    }

    function isOutOfRange(x, y) {
        return x < 0 || y < 0 || x === board.length || y === board.length;
    }
}

class RaceTrack {
    constructor(straightRoad, corner) {
        this.straightRoad = straightRoad;
        this.corner = corner;
    }

    get price() {
        return this.straightRoad * 100 + this.corner * 500;
    }
}

class Point {
    constructor(point, direction) {
        this.point = point;
        this.direction = direction;
    }

    get x() {
        return this.point[0];
    }
    get y() {
        return this.point[1];
    }

    toString() {
        return this.point.toString();
    }

    isSamePoint(point) {
        return this.toString() === point.toString();
    }

    isSameDirection(point) {
        return this.direction === point.direction;
    }

    static dt = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ];

    move() {
        return Point.dt.map(
            (move, direction) =>
                new Point([this.x + move[0], this.y + move[1]], direction),
        );
    }
}

/****** TEST CASE *******/

console.log(
    solution([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]),
);

console.log(
    solution([
        [0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 1],
        [0, 0, 1, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 1, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0],
    ]),
);

console.log(
    solution([
        [0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 0],
        [0, 0, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 1],
        [0, 1, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0],
    ]),
);

console.log(
    solution([
        [0, 0, 1, 0],
        [0, 0, 0, 0],
        [0, 1, 0, 1],
        [1, 0, 0, 0],
    ]),
);
