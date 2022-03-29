/**
 * 이중 우선순위 큐는 다음 연산을 할 수 있는 자료구조이다.
 * - I 숫자 : 큐에 주어진 숫자 삽입
 * - D 1 : 큐에서 최댓값 삭제
 * - D -1 : 큐에서 최솟값 삭제
 *
 * @param {*} operations 이중 우선순위 큐가 할 연산들
 * @returns 모든 연산 처리 후의 [최댓값, 최솟값], 큐가 비어있는 경우 [0, 0]
 */

function solution(operations) {
    const queue = new DoublePriorityQueue();

    operations.forEach(operation => {
        const [command, number] = operation.split(' ');
        if (command === 'I') queue.insert(+number);
        if (command === 'D') queue.delete(number);
    });

    return queue.isEmpty() ? [0, 0] : [queue.max, queue.min];
}

class DoublePriorityQueue {
    queue = [];

    insert(number) {
        this.queue.push(number);
        this.queue.sort((a, b) => a - b);
    }

    delete(type) {
        if (type == 1) this.queue.pop();
        if (type == -1) this.queue.shift();
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    get max() {
        return this.queue[this.queue.length - 1];
    }

    get min() {
        return this.queue[0];
    }
}

console.log(solution(['I 16', 'D 1']));
console.log(solution(['I 7', 'I 5', 'I -5', 'D -1']));
