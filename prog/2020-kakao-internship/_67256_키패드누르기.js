/**
 * 전화 키패드에서 왼손과 오른속의 엄지손가락만을 사용하여
 * 숫자만을 입력하려고 한다.
 *
 * 왼손 엄지손가락은 * 키패드,
 * 오른손 엄지손가락은 # 키패드에서 시작한다.
 *
 * 엄지손가락 사용은 다음과 같은 규칙을 따른다.
 * - 엄지손가락은 상하좌우 4가지 방향으로만 이동할 수 있다.
 * - 1,4,7은 왼손 엄지손가락을 사용한다.
 * - 3,6,9는 오른손 엄지손가락을 사용한다.
 * - 2,5,8,0은 현재 가장 가까운 엄지손가락을 사용한다.
 *   만약 거리가 같다면,
 *   오른손잡이는 오른손, 왼손잡이는 왼손을 사용한다.
 *
 * @param {*} numbers 순서대로 누를 번호가 담긴 배열 (1~1_000)
 * @param {*} hand 왼손잡이/오른손잡이 ("left"/"right")
 * @returns 각 번호를 누른 엄지손가락 배열 ("L"/"R")
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   numbers를 순회하여, 번호를 하나씩 누른다.
 *   이때 번호를 누를 때에는,
 *   column이 0인 경우는 왼손으로, column이 2인 경우는 오른손으로 누른다.
 *   column이 1인 경우는 왼손과 오른손으로 해당 번호를 눌렀을 때의 각각 이동 횟수를 구한다. (BFS)
 *   이때, 이동횟수가 적은 손으로 해당 번호를 누른다.
 *   만약 동일할 경우, hand의 따라 결정한다.
 *
 * - 입력의 범위가 전부 작기 때문에
 *   제시한 규칙에 따라 그대로 구현하면 되는 문제이다!
 *
 * - 굳이 BFS로 이동횟수를 구해 가까운 손을 찾을 필요 없이,
 *   좌표를 활용하여 구할 수 있다. (맨핸튼 거리)
 *   두 좌표 간의 거리 : |x1 - x2| + |y1 - y2|
 */

function solution(numbers, hand) {
    const user = new PhoneUser(hand);
    return numbers.map(number => user.pressNumber(number)).join('');
}

class Phone {
    static keypad = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        ['*', 0, '#'],
    ];

    static points = Phone.createPoints();

    static createPoints() {
        const points = {};
        for (let r = 0; r < Phone.MAX_ROW; r++) {
            for (let c = 0; c < Phone.MAX_COLUMN; c++) {
                points[Phone.keypad[r][c]] = [r, c];
            }
        }
        return points;
    }

    static number([r, c]) {
        return this.keypad[r][c];
    }

    static point(number) {
        return this.points[number];
    }

    static get MAX_ROW() {
        return this.keypad.length;
    }

    static get MAX_COLUMN() {
        return this.keypad[0].length;
    }
}

class PhoneUser {
    static LEFT = 'left';
    static RIGHT = 'right';

    constructor(hand = null) {
        this.hand = hand;
        this.left = Phone.point('*');
        this.right = Phone.point('#');
    }

    setLeft(point) {
        this.left = point;
    }

    setRight(point) {
        this.right = point;
    }

    changeHandPoint(hand, point) {
        this[hand] = point;
    }

    pressNumber(number) {
        const leftMovement = this.countMovement(
            PhoneUser.LEFT,
            this.left,
            number,
        );
        const rightMovement = this.countMovement(
            PhoneUser.RIGHT,
            this.right,
            number,
        );

        const point = Phone.point(number);
        if (leftMovement === rightMovement) {
            this.changeHandPoint(this.hand, point);
            return this.hand[0].toUpperCase();
        }

        if (leftMovement < rightMovement) {
            this.changeHandPoint(PhoneUser.LEFT, point);
            return 'L';
        }

        if (leftMovement > rightMovement) {
            this.changeHandPoint(PhoneUser.RIGHT, point);
            return 'R';
        }
    }

    countMovement(hand, startPoint, searchNumber) {
        const searchPoint = Phone.point(searchNumber);
        const [FIRST_COLUMN, LAST_COLUMN] = [0, Phone.MAX_COLUMN - 1];
        if (
            (hand === PhoneUser.LEFT && searchPoint[1] === FIRST_COLUMN) ||
            (hand === PhoneUser.RIGHT && searchPoint[1] === LAST_COLUMN)
        )
            return 0;

        return manhattanDistance(startPoint, searchPoint);

        function manhattanDistance([x1, y1], [x2, y2]) {
            return Math.abs(x1 - x2) + Math.abs(y1 - y2);
        }
    }
}

/****** TEST CASE *******/

console.log(solution([1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5], 'right'));
