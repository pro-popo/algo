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
    let [sum1, sum2] = [queue1, queue2].map(queue =>
        queue.reduce((sum, number) => sum + number),
    );
    let count = 0;
    let [p1, p2] = [0, 0];
    const MAX_INDEX = queue1.length;
    while (sum1 !== sum2 && ++count) {
        if (sum1 > sum2) {
            if (MAX_INDEX * 2 === p1) return -1;
            sum1 -= queue1[p1];
            sum2 += queue1[p1];
            queue2.push(queue1[p1++]);
        } else if (sum1 < sum2) {
            if (MAX_INDEX * 2 === p2) return -1;
            sum2 -= queue2[p2];
            sum1 += queue2[p2];
            queue1.push(queue2[p2++]);
        }
    }
    return count;
}

/****** TEST CASE *******/
console.log(solution([3, 2, 7, 2], [4, 6, 5, 1]));
console.log(solution([1, 2, 1, 2], [1, 10, 1, 2]));
console.log(solution([1, 1], [1, 5]));
