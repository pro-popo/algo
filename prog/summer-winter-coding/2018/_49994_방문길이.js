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
