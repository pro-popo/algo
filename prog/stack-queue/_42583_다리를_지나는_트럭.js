/**
 * [STACK-QUEUE] 다리를 지나는 트럭
 * ### 문제
 * - 정해진 순으로 모든 트럭이 다리를 건너려면 최소 몇 초가 걸리는가?
 *
 *
 * @param {*} bridgeLength : 다리에 올라갈 수 있는 트럭 수
 * @param {*} weight : 다리가 견딜 수 있는 무게
 * @param {*} truckWeights : 트럭 별 무게
 * @returns : 모든 트럭이 다리를 건너려면 최소 몇 초가 걸리는지
 *
 *
 * ### 리뷰
 * - bridgeLength는 10,000 이하, truckWeights는 10,000 이하로,
 *   최악의 경우 10,000 * 10,000의 시간이 필요하다. (트럭 한 개씩 이동)
 *   범위가 크지 않기 때문에, 순차적으로 트럭을 이동해도 충분하다고 생각했다.
 *
 * - 풀이 방식은 다음과 같다.
 *   트럭 리스트를 순회하여, 해당 트럭이 다리 위에 올라가기 위해 필요한 시간을 계산한다.
 *   그리고, 계산한 시간을 활용하여 해당 트럭이 이동한 후의 다리 위의 상태를 반환한다.
 *   마지막 트럭까지 순회하면, 모든 트럭이 다리를 건너기 위한 최소 시간을 반환한다.
 *   (이때 마지막 트럭의 이동 시간을 더해줘야 한다. =bridgeLength)
 *
 * - 처음에는, 1️⃣현재 트럭이 다리 위로 이동하기 위해 필요한 시간 계산(calculatemovingTime)과
 *   2️⃣현재 트럭이 다리 위에 이동한 후의 상태(getCrossingTruckState)를 별도로 분리했다.
 *   최대한 하나의 기능만 동작하는, 부수효과가 없는 함수를 작성하고자 했다.
 *   이 과정에서 성능상 문제는 없지만, 불필요한 계산이 많아지고 오히려 깔끔하지 않다고 판단하여 합쳤다..
 *
 * ### 다른 사람 풀이
 * - 큐에 순서대로 트럭을 추가 [트럭무게, 다리를 건너는 시간]
 * - 현재 시간과 맨 앞의 트럭의 나갈 시간이 같은 경우 내보냄
 * - 무게 제한으로 다음 트럭이 못 올라가는 경우, 첫 번째 트럭이 빠지도록 그 시간으로 점프
 */

function solution(bridgeLength, weight, truckWeights) {
    const initalState = {
        time: 0,
        crossingTrucks: Array(bridgeLength).fill(0),
        totalWeight: 0,
    };

    return (
        truckWeights.reduce((state, currentTruck) => {
            return movedToBridgeState(state, currentTruck, weight);
        }, initalState).time + bridgeLength
    );
}

function movedToBridgeState(state, currentTruck, weight) {
    let { time, crossingTrucks, totalWeight } = state;

    let movingTime = 1;
    do {
        totalWeight -= crossingTrucks.shift();
    } while (
        !isMoveTruck(totalWeight + currentTruck, weight) &&
        movingTime++ &&
        crossingTrucks.push(0)
    );
    crossingTrucks.push(currentTruck);

    return {
        time: time + movingTime,
        crossingTrucks,
        totalWeight: totalWeight + currentTruck,
    };
}

function isMoveTruck(totalWeight, maxWeight) {
    return totalWeight <= maxWeight;
}

console.log(solution(2, 10, [7, 4, 5, 6]));
console.log(solution(100, 100, [10]));
console.log(solution(100, 100, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]));
