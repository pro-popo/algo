/**
 * 이중 우선순위 큐는 다음 연산을 할 수 있는 자료구조이다.
 * - I 숫자 : 큐에 주어진 숫자 삽입
 * - D 1 : 큐에서 최댓값 삭제
 * - D -1 : 큐에서 최솟값 삭제
 *
 * @param {*} operations 이중 우선순위 큐가 할 연산들 (1~1_000_000)
 * @returns 모든 연산 처리 후의 [최댓값, 최솟값], 큐가 비어있는 경우 [0, 0]
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   우선순위큐에 숫자를 삽입할 때마다 오름차순으로 정렬한다.
 *   최댓값을 삭제할 때는 pop 메서드,
 *   최솟값을 삭제할 때는 shift 메서드를 사용한다.
 *
 * - 아무래도 프로그래머스의 테스트케이스가 조금 빈약한 것 같다. 🤔
 *   문제에서 의도한 것과 같이 이중 우선순위 큐를 사용하지 않아도
 *   하나의 우선순위 큐로도 충분히 통과하는 문제였다.
 *   배열 정렬의 시간복잡도가 NlogN이라고 했을 때,
 *   대충 원소의 개수가 1_000개인 배열을 1_000_000번 정렬한다고 가정해도...
 *   1_000_000_000이 넘는다. 🤔
 *   시간초과를 기대했지만, 통과해 버렸다.. 😅
 *   백준에서 유사한 문제가 있어서 한 번 풀어볼 예정이다!
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
