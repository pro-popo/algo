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
        if (this.nextRow) this.nextRow.setPrevious(newRow);
        this.setNext(newRow);
        newRow.setPrevious(this);
    }
}

class Program {
    history = null;

    constructor(row) {
        this.cursor = row;
    }

    setCursor(row) {
        this.cursor = row;
    }

    get previous() {
        return this.cursor.previous;
    }

    get next() {
        return this.cursor.next;
    }

    moveCursor(type, number) {
        while (number--) {
            if (type === 'U') this.setCursor(this.previous);
            if (type === 'D') this.setCursor(this.next);
        }
    }

    remove() {
        this.previous?.setNext(this.next);
        this.next?.setPrevious(this.previous);

        const moveCursor = this.next || this.previous;
        this.setCursor(moveCursor);
        this.history.push(this.cursor);
    }

    cancelRemove() {
        const row = this.history.pop();
    }
}

function solution(n, k, cmd) {
    const rows = [...Array(n - 1)].map((_, number) => new Row(number));
    rows.reduce((row, nextRow) => {
        row.add(nextRow);
        return nextRow;
    });

    const program = new Program(rows[k]);

    cmd.forEach(command => {
        const [type, number] = command.split(' ');
        console.log(program.cursor);

        if (type === 'U' || type === 'D') program.moveCursor(type, number);
        if (type === 'C') program.remove();
        if (type === 'Z') program.cancelRemove();
    });
    return program;
}

console.log(solution(8, 2, ['D 2', 'C']));
