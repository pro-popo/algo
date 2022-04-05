/**
 * 밑변의 길이와 높이가 n인 삼각형에서
 * 맨 위 꼭짓점부터 반시계 방향으로 달팽이 채우기를 진행한 후,
 * 첫 행부터 마지막 행까지 모두 순서대로 합친 새로운 배열을 반환하자.
 *
 * @param {*} n (1~1_000)
 * @returns
 */
function solution(n) {
    const triangle = new Triangle(n);
    triangle.fillMap();
    return triangle.printMap();
}
class Triangle {
    constructor(n) {
        this.n = n;
        this.map = Array.from(Array(n), (_, index) =>
            Array(index + 1).fill(false),
        );

        this.r = -1;
        this.c = 0;
        this.number = 1;
    }

    direction = {
        DOWN: [1, 0],
        RIGHT: [0, 1],
        UP: [-1, -1],
    };

    fillMap() {
        let count = Math.ceil(this.n / 2);

        while (count--) {
            ['DOWN', 'RIGHT', 'UP'].forEach(type => {
                this.type = type;
                this.move();
            });
        }
    }

    move() {
        while (
            this.map[this.nextR] &&
            this.map[this.nextR][this.nextC] === false
        ) {
            this.r = this.nextR;
            this.c = this.nextC;

            this.map[this.r][this.c] = this.number++;
        }
    }

    get nextR() {
        return this.r + this.direction[this.type][0];
    }
    get nextC() {
        return this.c + this.direction[this.type][1];
    }

    printMap() {
        return this.map.flatMap(n => n);
    }
}

console.log(solution(4));
console.log(solution(5));
console.log(solution(6));
console.log(solution(12));
