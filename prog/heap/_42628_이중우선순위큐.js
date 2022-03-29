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
    const queue = [];
    operations.forEach(operation => {
        const [command, number] = operation.split(' ');
        if (command === 'I') {
            queue.push(+number);
            queue.sort((a, b) => a - b);
            return;
        }
        if (number > 0) queue.pop();
        else queue.shift();
    });
    return queue.length ? [queue[0], queue.pop()].reverse() : [0, 0];
}

console.log(solution(['I 16', 'D 1']));
console.log(solution(['I 7', 'I 5', 'I -5', 'D -1']));
