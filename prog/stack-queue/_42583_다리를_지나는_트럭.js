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
 */

function solution(bridgeLength, weight, truckWeights) {
    const initalState = {
        time: 0,
        crossingTrucks: Array(bridgeLength).fill(0),
        totalWeight: 0,
    };

    return (
        truckWeights.reduce((state, currentTruck) => {
            const crossingTime = calculateCrossingTime(
                state,
                currentTruck,
                weight,
            );

            return getCrossingTruckState(state, currentTruck, crossingTime);
        }, initalState).time + bridgeLength
    );
}

function calculateCrossingTime(state, currentTruck, weight) {
    let { totalWeight } = state;
    let crossingTrucks = [...state.crossingTrucks];

    let crossingTime = 1;
    do {
        totalWeight -= crossingTrucks.shift();
    } while (
        !isCrossingTruck(totalWeight + currentTruck, weight) &&
        crossingTime++
    );
    return crossingTime;
}

function isCrossingTruck(totalWeight, maxWeight) {
    return totalWeight <= maxWeight;
}

function getCrossingTruckState(state, currentTruck, crossingTime) {
    let { time, crossingTrucks, totalWeight } = state;
    const newCrossingTrucks = crossingTrucks.filter(
        (truck, truckIndex) =>
            truckIndex >= crossingTime || (totalWeight -= truck) < -1,
    );
    newCrossingTrucks.push(...Array(crossingTime - 1).fill(0), currentTruck);

    return {
        time: time + crossingTime,
        crossingTrucks: newCrossingTrucks,
        totalWeight: totalWeight + currentTruck,
    };
}

console.log(solution(2, 10, [7, 4, 5, 6]));
console.log(solution(100, 100, [10]));
console.log(solution(100, 100, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]));
