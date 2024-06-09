/**
 * 트럭 여러 대가 강을 가로지르는 일차선 다리를 정해진 순으로 건너고자 한다.
 * 모든 트럭이 다리를 건너려면 최소 몇 초가 걸리는가
 *
 * @param {number} bridge_length 다리에 올라갈 수 있는 최대 트럭 수
 * @param {number} weight 버틸 수 있는 무게
 * @param {number[]} truck_weights 트럭 별 무게
 * @returns 모든 트럭이 다리르 건너려면 최소 몇 초가 걸리는 지
 */

function solution(bridge_length, weight, truck_weights) {
    const queue = Array(bridge_length).fill(0);
    let [time, totalWeight] = [0, 0];
    let truckIdx = 0;

    while (totalWeight > 0 || truckIdx < truck_weights.length) {
        time++;
        totalWeight -= queue.shift();
        const truck = truck_weights[truckIdx];
        if (totalWeight + truck <= weight) {
            totalWeight += truck;
            queue.push(truck);
            truckIdx++;
        } else queue.push(0);
    }

    return time;
}

console.log(solution(2, 10, [7, 4, 5, 6]));
console.log(solution(100, 100, [10]));
console.log(solution(100, 100, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]));
