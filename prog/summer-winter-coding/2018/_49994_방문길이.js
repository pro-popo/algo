/**
 * 게임 캐릭터를 4가지 명령러를 통해 움직이려고 한다.
 * - U: 위쪽으로 한 칸
 * - D: 아래쪽으로 한 칸
 * - R: 오른쪽으로 한 칸
 * - L: 왼쪽으로 한 칸
 *
 * 캐릭터는 (0,0) 위치에서 시작한다.
 * 좌표평면의 최대 범위는,
 * X좌표: -5, 5
 * Y좌표: -5, 5 이다.
 *
 * 명령어에 따라 게임 캐릭터가 지나 간 길 중
 * 캐릭터가 처음 걸어본 길의 길이를 구하고자 한다.
 *
 * @param {*} dirs 명령어 (500 이하)
 * @returns 게임 캐릭터가 처음 걸어본 길의 길이
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   명령어를 순차적으로 실행한다.
 *   캐릭터를 명령어에 따라 움직였을 때, 좌표평면의 범위를 벗어나는지 확인한다.
 *   만약 범위를 벗어난다면, 이전의 좌표를 유지한다.
 *   그게 아니라면, 캐릭터를 움직인다.
 *   이때, 캐릭터가 처음 걸어본 길을 관리하기 위해 해당 경로를 Set 객체로 저장한다.
 *
 *   방문처리는 [현재 위치, 다음 위치]를 문자열로 저장하면 된다.
 *   이때, [다음 위치, 현재 위치]에 대한 방문 기록이 있다면 방문 처리하지 않는다.
 *   즉, A->B로 이동할 때 B->A에 대한 기록이 있는 경우,
 *   해당 경로는 이미 방문한 경우이므로 따로 방문 처리하지 않는다.
 *
 *   모든 명령어를 수행한 후, 처음 걸어본 길의 길이를 반환한다.
 *
 * - 캐릭터가 걸었던 길을 어떻게 관리할지에 대해 고민하고,
 *   문제에 주어진 조건대로 구현하면 되는 문제였다!
 */

function solution(dirs) {
    const game = new Game();
    [...dirs].forEach(command => game.exec(command));

    return game.visitedRoads.size;
}

class Game {
    static MIN_LENGTH = -5;
    static MAX_LENGTH = 5;
    static direction = new Map([
        ['U', [-1, 0]],
        ['D', [1, 0]],
        ['R', [0, 1]],
        ['L', [0, -1]],
    ]);

    character = new Point([0, 0]);
    visitedRoads = new Set();

    exec(command) {
        const next = this.character.move(Game.direction.get(command));
        if (this.isOutOfRange(next)) return this.character;
        return this.moveCharacter(next);
    }

    isOutOfRange(point) {
        return (
            point.x < Game.MIN_LENGTH ||
            point.y < Game.MIN_LENGTH ||
            point.x > Game.MAX_LENGTH ||
            point.y > Game.MAX_LENGTH
        );
    }

    moveCharacter(next) {
        this.visiteRoad(next);
        return (this.character = next);
    }

    visiteRoad(next) {
        const road = [this.character, next];
        if (this.isVisitedRoad([...road].reverse())) return;
        this.visitedRoads.add(road.toString());
    }

    isVisitedRoad(road) {
        return this.visitedRoads.has(road.toString());
    }
}

class Point {
    constructor(point) {
        this.point = point;
    }

    get x() {
        return this.point[0];
    }

    get y() {
        return this.point[1];
    }

    move([x, y]) {
        return new Point([this.x + x, this.y + y]);
    }

    toString() {
        return this.point.toString();
    }
}

/****** TEST CASE *******/

console.log(solution('ULURRDLLU'));
console.log(solution('LULLLLLLU'));
