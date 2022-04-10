/**
 * 명령어 기반으로 표의 행을 선택, 삭제, 복구하는 프로그램을 개발하고자 한다.
 * 한 번에 한 행만 선택할 수 있으며, 표의 범위를 벗어날 수 없다.
 *
 * - U X : X칸 위에 있는 행 선택
 * - D X : X칸 아래에 있는 행 선택
 * - C : 행 삭제 후 아래 행 선택 (마지막 행인 경우, 윗 행 선택)
 * - Z : 가장 최근에 삭제된 행 복구 (선택된 행은 그대로)
 *
 * @param {*} n 표의 행 개수 (5 ~ 1_000_000)
 * @param {*} k 선택된 행의 위치
 * @param {*} cmd 명령어들 (1 ~ 200_000)
 * @returns 모든 명령어를 수행한 후 표의 상태 (삭제:X, 존재:O)
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   양방향 연결 리스트(Row)를 생성하여, 모든 행을 연결해 준다.
 *   (하나의 행에 대해 위쪽 행과 아래쪽 행을 저장)
 *
 *   그 다음, 명령어를 순차적으로 수행한다.
 *   - ["U", "D"]
 *     해당 방향으로 X칸 만큼 커서를 이동한다.
 *   - ["C"]
 *     해당 행의 위쪽 행과 아래쪽 행을 연결하여 해당 행을 제거한다.
 *     그 다음, history에 제거한 행을 추가한 뒤, 커서를 아래쪽 행으로 이동한다.
 *   - ["Z"]
 *     history에서 가장 나중에 제거된 행을 꺼낸 뒤,
 *     제거된 행에 기록된 위쪽 행과 아래쪽 행을 해당 행과 연결한다.
 *
 *   모든 명령어를 수행한 뒤,
 *   남아있는 행은 "O", 제거된 행은 "X"로 표현하여 표의 상태를 출력한다.
 *
 * - n는 최대 1_000_000이기 때문에,
 *   일반적으로 일차원 배열로 해결하기에는 많은 시간이 소요된다.
 *
 * - 다른 풀이 방식으로는,
 *   Segment Tree나 Fenwick Tree를 사용할 수 있다고 한다.🙄
 *   먼저, 각 행의 삭제 여부를 0과 1로 표현한다.
 *   이때 포인트는, "어떻게 효율적으로 커서를 X만큼 이동시키는가"이다.
 *   현재 커서에서 구간의 합이 총 X가 되는 지점으로 이동해야 한다.
 *   이를 계산하기 위해,
 *   - Segment Tree 또는 Fenwick Tree
 *   - 이분 탐색
 *   이 두 기법을 조합하여 어느 지점까지 이동해야 할지 O((log2N)^2)시간에 구할 수 있다.
 *
 *   😵... 위의 풀이 방식으로 풀어보려고 했지만,
 *   무슨 소리인지 잘 모르겠다...😂
 *
 */

function solution(n, k, cmd) {
    const program = new Program(n, k);

    cmd.forEach(command => program.execute(command));

    return program.rows;
}

class Program {
    cursor = null;
    history = [];

    constructor(n, k) {
        this.numberOfRow = n;

        const rows = this.createTable(n);
        this.header = rows[0];
        this.setCursor(rows[k + 1]);
    }

    createTable(n) {
        const rows = [...Array(n + 1)].map((_, number) => new Row(number - 1));
        for (let number = 0; number < n; number++) {
            rows[number].add(rows[number + 1]);
        }
        return rows;
    }

    setCursor(row) {
        this.cursor = row;
    }

    execute(command) {
        const [type, number] = command.split(' ');

        if (type === 'U' || type === 'D') this.moveCursor(type, number);
        if (type === 'C') this.remove();
        if (type === 'Z') this.cancelRemove();
    }

    moveCursor(type, number) {
        while (number--) {
            if (type === 'U') this.setCursor(this.previous);
            if (type === 'D') this.setCursor(this.next);
        }
    }

    remove() {
        this.cursor.remove();

        this.history.push(this.cursor);
        this.setCursor(this.next || this.previous);
    }

    cancelRemove() {
        const row = this.history.pop();
        row.previous.add(row);
    }

    get previous() {
        return this.cursor.previous;
    }

    get next() {
        return this.cursor.next;
    }

    get rows() {
        const remain = Array(this.numberOfRow).fill('X');

        let row = this.header;
        while ((row = row.next)) remain[row.number] = 'O';

        return remain.join('');
    }
}

class Row {
    previousRow = null;
    nextRow = null;

    constructor(number) {
        this.number = number;
    }

    connect(firstRow, secondRow) {
        firstRow?.setNext(secondRow);
        secondRow?.setPrevious(firstRow);
    }

    add(newRow) {
        this.connect(newRow, this.next);
        this.connect(this, newRow);
    }

    remove() {
        this.connect(this.previous, this.next);
    }

    setPrevious(row) {
        this.previousRow = row;
    }

    setNext(row) {
        this.nextRow = row;
    }

    get previous() {
        return this.previousRow;
    }

    get next() {
        return this.nextRow;
    }
}

/****** TEST CASE *******/

console.log(
    solution(8, 2, ['D 2', 'C', 'U 3', 'C', 'D 4', 'C', 'U 2', 'Z', 'Z']),
);

console.log(
    solution(8, 2, [
        'D 2',
        'C',
        'U 3',
        'C',
        'D 4',
        'C',
        'U 2',
        'Z',
        'Z',
        'U 1',
        'C',
    ]),
);
