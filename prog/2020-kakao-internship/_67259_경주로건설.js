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
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   시작지점에서 도착지점까지 DFS를 진행한다. (혹은 BFS)
 *
 *   이때, 최소 비용을 구하기 위해,
 *   시작지점에서 현재지점까지의 최소 비용을 별도의 배열에 저장한다. (DP)
 *   또한, 현재 지점에서 도로가 어떤 방향인지에 따라 최소 비용을 별도로 저장해야 한다.
 *   (memo[좌표 x][좌표 y][도로 방향] = price)
 *   이는 현재의 도로 방향에 따라 다음 위치에 설치할 도로의 비용(직선도로 혹은 코너)이 달라지기 때문이다!
 */

function solution(board) {
    const startPoint = new Point([0, 0]);
    const endPoint = new Point([board.length - 1, board.length - 1]);

    const prices = createPrices(board.length);
    for (let d = 0; d < 4; d++) {
        prices.set(new Point(startPoint.point, d), 0);
    }

    DFS(startPoint, new RaceTrack(0, -1));

    return Math.min(...prices[board.length - 1][board.length - 1]);

    function DFS(point, raceTrack) {
        if (prices.get(point) <= raceTrack.price) return;
        prices.set(point, raceTrack.price);

        if (point.isSamePoint(endPoint)) return;

        Direction.move(point).forEach(next => {
            if (isOutOfRange(next.x, next.y) || board[next.x][next.y] === 1)
                return;

            DFS(
                next,
                new RaceTrack(
                    raceTrack.straightRoad + 1,
                    raceTrack.corner + Direction.isDifferent(point, next),
                ),
            );
        });
    }

    function isOutOfRange(x, y) {
        return x < 0 || y < 0 || x === board.length || y === board.length;
    }
}

function createPrices(N) {
    const prices = Array.from(Array(N), () =>
        [...Array(N)].map(() => Array(4).fill(Number.MAX_VALUE)),
    );

    prices.get = function (point) {
        return prices[point.x][point.y][point.direction];
    };

    prices.set = function (point, value) {
        prices[point.x][point.y][point.direction] = value;
    };

    return prices;
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
}

class Direction {
    static dt = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
    ];

    static get points() {
        return Direction.dt.map(
            (point, direction) => new Point(point, direction),
        );
    }

    static move(point) {
        return Direction.points.map(
            move =>
                new Point([point.x + move.x, point.y + move.y], move.direction),
        );
    }

    static isDifferent(point, other) {
        return point.direction !== other.direction;
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
