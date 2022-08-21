/**
 * 길이가 같은 두 개의 큐가 주어진다.
 * 하나의 큐를 콜라 원소를 추출하고, 추출된 원소를 다른 큐에 집어 넣는 작업을 통해
 * 각 큐의 원소 합이 같아지도록 만들고자 한다.
 * 이때 필요한 작업의 최소 횟수를 구하자.
 *
 * @param {*} queue1 정수 배열 (길이: 300_000, 원소: 10^9)
 * @param {*} queue2 정수 배열
 * @returns 각 큐의 원소 합을 같게 만들기 위해 필요한 작업의 최소 횟수
 *          같게 만들 수 없다면, -1 반환
 */

function solution(queue1, queue2) {
    const MAX_LENGTH = queue1.length * 2;
    [queue1, queue2] = [queue1, queue2].map(data => new Queue(data));

    let count = 0;
    while (queue1.sum !== queue2.sum && ++count) {
        if (queue1.sum > queue2.sum) {
            if (MAX_LENGTH === queue1.pointer) return -1;
            queue2.insert(queue1.pop());
        } else if (queue1.sum < queue2.sum) {
            if (MAX_LENGTH === queue2.pointer) return -1;
            queue1.insert(queue2.pop());
        }
    }
    return count;
}

class Queue {
    pointer = 0;
    constructor(data) {
        this.data = data;
        this.sum = data.reduce((sum, number) => sum + number);
    }

    pop() {
        const number = this.data[this.pointer];
        this.sum -= number;
        this.pointer++;
        return number;
    }

    insert(number) {
        this.data.push(number);
        this.sum += number;
    }
}

/****** TEST CASE *******/
console.log(solution([3, 2, 7, 2], [4, 6, 5, 1]));
console.log(solution([1, 2, 1, 2], [1, 10, 1, 2]));
console.log(solution([1, 1], [1, 5]));
