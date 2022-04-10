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
 */

function solution(n, k, cmd) {
    const program = new Program(n, k);

    cmd.forEach(command => {
        const [type, number] = command.split(' ');

        if (type === 'U' || type === 'D') program.moveCursor(type, number);
        if (type === 'C') program.remove();
        if (type === 'Z') program.cancelRemove();
    });

    return program.rows;
}

class Row {
    previousRow = null;
    nextRow = null;

    constructor(number) {
        this.number = number;
    }

    get previous() {
        return this.previousRow;
    }

    get next() {
        return this.nextRow;
    }

    setPrevious(row) {
        this.previousRow = row;
    }

    setNext(row) {
        this.nextRow = row;
    }

    add(newRow) {
        if (this.next) this.next.setPrevious(newRow);
        this.setNext(newRow);
        newRow.setPrevious(this);
    }

    remove() {
        this.previous?.setNext(this.next);
        this.next?.setPrevious(this.previous);
    }
}

class Program {
    history = [];

    constructor(n, k) {
        this.numberOfRow = n;

        const rows = this.createTable(n);
        this.cursor = rows[k];
    }

    createTable(n) {
        const rows = [...Array(n)].map((_, number) => new Row(number));
        for (let number = 0; number < n - 1; number++) {
            rows[number].add(rows[number + 1]);
        }
        return rows;
    }

    setCursor(row) {
        this.cursor = row;
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
        if (row.previous) row.previous.add(row);
        else row.add(row.next);
    }

    get previous() {
        return this.cursor.previous;
    }

    get next() {
        return this.cursor.next;
    }

    get rows() {
        const remain = Array(this.numberOfRow).fill('X');

        ['previous', 'next'].forEach(direction => {
            let row = this.cursor;
            while (row) {
                remain[row.number] = 'O';
                row = row[direction];
            }
        });

        return remain.join('');
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
