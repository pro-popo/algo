/**
 * 운영체제가 다음 규칙에 따라 프로세스를 관리할 경우 특정 프로세스가 몇 번째로 실행되는지
 *
 * 1. 큐에서 대기중인 프로세스를 하나 꺼낸다
 * 2. 큐에 대기중은 프로세스 중 우선순위가 더 높은 프로세가 있다면 방금 꺼낸 프로세스를 다시 큐에 넣는다
 * 3. 만약 그런 프로세스가 없다면 방금 꺼낸 프로세스를 실행
 *   3.1 한 번 실행한 프로세스는 다시 큐에 넣지 않고 그대로 종료
 *
 * @param {number[]} priorities 실행 대기 큐에 있는 프로세스 중요도가 순서대로 담기 배열
 * @param {number} location 몇 번째로 실행되는지 알고싶은 프로세스 위치
 * @returns 해당 프로세스가 몇 번째로 실행되는지
 */

function solution(priorities, location) {
    const queue = Array.from(Array(priorities.length), (_, idx) => idx);

    let answer = 1;
    while (queue.length) {
        const target = queue.shift();
        if (queue.some(process => priorities[target] < priorities[process]))
            queue.push(target);
        else if (target === location) return answer;
        else answer++;
    }
    return answer;
}

console.log(solution([2, 1, 3, 2], 2));
console.log(solution([1, 1, 9, 1, 1, 1], 0));
console.log(solution([1, 1, 2, 3, 1, 2], 0));
