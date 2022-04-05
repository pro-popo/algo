/**
 * 밑변의 길이와 높이가 n인 삼각형에서
 * 맨 위 꼭짓점부터 반시계 방향으로 달팽이 채우기를 진행한 후,
 * 첫 행부터 마지막 행까지 모두 순서대로 합친 새로운 배열을 반환하자.
 *
 * @param {*} n (1~1_000)
 * @returns
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저, 숫자를 채워야 하는 공간을 먼저 확보한다.
 *   그리고, 커서를 이동하면서 숫자를 채워 나간다.
 *
 *   이동 방향은 아래쪽 -> 오른쪽 -> 위쪽 순으로,
 *   해당 방향으로 더 이상 이동할 수 없을 때까지 (범위를 넘어서거나, 숫자가 이미 채워진 상태)
 *   계속 이동하여 숫자를 채운다.
 *   위와 같은 과정을 Math.ceil(n/3)만큼 반복하여 전체를 채워준다. (보이는 삼각형의 개수만큼)
 *
 *   모든 숫자를 채웠다면, flatMap 메서드를 사용하여 2차원 배열을 펼쳐준다.
 *
 * - 처음에는, 위/아래/오른쪽으로 이동하는 함수를 각각 만들어서 중복 코드가 많았다.
 *   리팩터링이 필수인 문제라고 느꼈다. 😅
 *
 * - 이동 범위를 계산해서 숫자를 채우는 방식도 있지만,
 *   계산 실수가 너무 많아서 한 방향으로 갈 수 있을 때까지 이동하는 방식으로 바꿨다. 😵
 *
 * - 삼각 달팽이 모양 그대로 구현하자니 복잡해져서, 대신 직사각형으로 구현하였다.
 */
function solution(n) {
    const triangle = new Triangle(n);
    triangle.fillMap();
    return triangle.printMap();
}

class Triangle {
    constructor(n) {
        this.n = n;
        this.initState();
    }

    initState() {
        this.map = Array.from(Array(this.n), (_, index) =>
            Array(index + 1).fill(false),
        );

        this.r = -1;
        this.c = 0;
        this.number = 1;
    }

    fillMap() {
        let count = Math.ceil(this.n / 3);

        while (count--) {
            ['DOWN', 'RIGHT', 'UP'].forEach(type => {
                this.type = type;
                while (this.isMovable()) {
                    this.moveCursor();
                    this.fill();
                }
            });
        }
    }

    isMovable() {
        return (
            this.map[this.nextR] && this.map[this.nextR][this.nextC] === false
        );
    }

    moveCursor() {
        this.r = this.nextR;
        this.c = this.nextC;
    }

    fill() {
        this.map[this.r][this.c] = this.number++;
    }

    direction = {
        DOWN: [1, 0],
        RIGHT: [0, 1],
        UP: [-1, -1],
    };

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

/****** TEST CASE *******/

console.log(solution(4));
console.log(solution(5));
console.log(solution(6));
console.log(solution(12));
