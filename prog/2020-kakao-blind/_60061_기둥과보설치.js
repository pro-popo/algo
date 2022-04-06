/**
 * 프로그램은 2차원 가상 벽면에 기둥과 보를 이용한 구조물을 설치할 수 있다.
 * 기둥과 보는 길이가 1인 선분으로,
 * - "기둥"은 바닥 위에 있거나,
 *   보의 한쪽 끝 부분 위에 있거나,
 *   다른 기둥 위에 있어야 한다.
 * - "보"는 한쪽 끝 부분이 기둥 위에 있거나,
 *   양쪽 끝 부분이 다른 보와 동시에 연결되어 있어야 한다.
 *
 * 맨 처음 벽면은 비어있는 상태다.
 * 기둥과 보는 격자선 교차점에 걸치지 않고,
 * 격자 칸의 각 변에 정확히 일치하도록 설치할 수 있다.
 *
 * 명령어에 따라 기둥과 보를 설치하거나 삭제하려고 한다.
 * 만약 위의 조건을 만족하지 않는 명령어라면 해당 작업을 무시한다.
 *
 * @param {*} n 벽면의 크기 (5~100)
 * @param {*} build_frame 기둥과 보를 설치하거나 삭제하는 작업에 대한 2차원 배열.
 *                        [x, y, a, b] : [가로 좌표, 세로 좌표, 구조물 종류(0:기둥, 1:보), 명령어(0:삭제, 1:설치)]
 * @returns 모든 명령어를 수행한 후 구조물의 상태를 반환
 *          [x, y, a]
 *          x좌표를 기준으로 오름차순,
 *          x좌표가 같을 경우 y좌표 기준으로 오름차순,
 *          x,y좌표가 모두 같은 경우 기둥이 보의 앞에 존재.
 *
 */

function solution(n, build_frame) {
    const program = new Program(n);
    build_frame.forEach(([x, y, kind, command]) => {
        const structure = new Structure(x, y, kind);

        if (command === Program.DELETE)
            program.isPossibleDelete(structure) && program.delete(structure);

        if (command === Program.INSERT)
            program.isPossibleInsert(structure) && program.insert(structure);
    });

    return program.mapInfo;
}

class Program {
    static DELETE = 0;
    static INSERT = 1;

    constructor(n) {
        this.beamMap = this.createMap(n + 1);
        this.columnMap = this.createMap(n + 1);
    }

    createMap(n) {
        return Array.from(Array(n), () => Array(n).fill(false));
    }

    isPossibleDelete(structure) {
        this.delete(structure);
        const isPass = this.structures.every(structure =>
            this.isPossibleInsert(structure),
        );
        this.insert(structure);

        return isPass;
    }

    isPossibleInsert(structure) {
        const [x, y] = structure.info();
        const {
            isFloor,
            isExistStructuresOnBelowOfColumn,
            isExistColumnOnBelowOfBeam,
            isExistBeamsOnBothEndsOfBeam,
        } = this.conditionsOfInsert([x, y]);

        if (structure.isColumn())
            return isFloor() || isExistStructuresOnBelowOfColumn();

        if (structure.isBeam())
            return (
                isExistColumnOnBelowOfBeam() || isExistBeamsOnBothEndsOfBeam()
            );
    }

    delete(structure) {
        const map = this.targetMap(structure);
        map[structure.x][structure.y] = false;
    }

    insert(structure) {
        const map = this.targetMap(structure);
        map[structure.x][structure.y] = structure;
    }

    targetMap(structure) {
        if (structure.isBeam()) return this.beamMap;
        if (structure.isColumn()) return this.columnMap;
    }

    conditionsOfInsert([x, y]) {
        const isExistBeam = ([x, y]) => this.beamMap[x] && this.beamMap[x][y];
        const isExistColumn = ([x, y]) =>
            this.columnMap[x] && this.columnMap[x][y];

        const isFloor = () => y === 0;

        const isExistStructuresOnBelowOfColumn = () => {
            const columnOnBelow = [x, y - 1];
            const beamsOnBelow = [
                [x, y],
                [x - 1, y],
            ];
            return (
                beamsOnBelow.some(point => isExistBeam(point)) ||
                isExistColumn(columnOnBelow)
            );
        };

        const isExistColumnOnBelowOfBeam = () => {
            const columnsOnBelow = [
                [x, y - 1],
                [x + 1, y - 1],
            ];
            return columnsOnBelow.some(point => isExistColumn(point));
        };

        const isExistBeamsOnBothEndsOfBeam = () => {
            const beamsOnBothEnds = [
                [x - 1, y],
                [x + 1, y],
            ];
            return beamsOnBothEnds.every(point => isExistBeam(point));
        };

        return {
            isFloor,
            isExistStructuresOnBelowOfColumn,
            isExistColumnOnBelowOfBeam,
            isExistBeamsOnBothEndsOfBeam,
        };
    }

    get mapInfo() {
        return this.structures
            .sort((a, b) => {
                if (a.x === b.x && a.y === b.y) return a.isBeam() ? 1 : -1;
                if (a.x === b.x) return a.y - b.y;
                return a.x - b.x;
            })
            .map(structure => structure.info());
    }

    get structures() {
        return [...this.columnMap, ...this.beamMap]
            .flatMap(structure => structure)
            .filter(structure => structure);
    }
}

class Structure {
    static COLUMN = 0;
    static BEAM = 1;

    constructor(x, y, kind) {
        this.x = x;
        this.y = y;
        this.kind = kind;
    }

    info() {
        return [this.x, this.y, this.kind];
    }

    isBeam() {
        return this.kind === Structure.BEAM;
    }

    isColumn() {
        return this.kind === Structure.COLUMN;
    }
}

/****** TEST CASE *******/

console.log(
    solution(5, [
        [0, 0, 0, 1],
        [2, 0, 0, 1],
        [4, 0, 0, 1],
        [0, 1, 1, 1],
        [1, 1, 1, 1],
        [2, 1, 1, 1],
        [3, 1, 1, 1],
        [2, 0, 0, 0],
        [1, 1, 1, 0],
        [2, 2, 0, 1],
        [5, 0, 0, 1],
        [5, 1, 0, 1],
        [5, 2, 0, 1],
        [5, 1, 0, 0],
    ]),
);
