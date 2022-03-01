/**
 * 무인도에 갇힌 사람들을 구명보트로 구출하자!
 * 구명보트는 최대 2명, 무게 제한이 존재한다.
 *
 * @param {*} people 사람들의 몸무게를 담은 배열 (40~240kg, 50_000명)
 * @param {*} limit 구명보트 무게 제한 (40~240)
 * @returns 모든 사람을 구출하기 위해 필요한 구명보트 개수의 최솟값
 */

function solution(people, limit) {
    const weights = people.reduce((weights, person) => {
        weights[person]++;
        return weights;
    }, Array(MAX_WEIGHT + 1).fill(0));

    let answer = 0;
    people.sort(DESC).forEach((weight) => {
        if (isNotExistWeight(weights, weight)) return;

        answer++;

        weights[weight]--;
        let restWeight = limit - weight;

        while (restWeight >= MIN_WEIGHT) {
            if (isNotExistWeight(weights, restWeight)) {
                restWeight--;
                continue;
            }
            weights[restWeight]--;
            break;
        }
    });
    return answer;
}

const [MIN_WEIGHT, MAX_WEIGHT] = [40, 240];

const DESC = (a, b) => b - a;

const isNotExistWeight = (weights, target) => weights[target] === 0;

console.log(solution([70, 50, 80, 50], 100)); // 3
console.log(solution([70, 50, 80], 100)); // 3
console.log(solution([40, 50, 80, 100], 200)); // 2
console.log(solution([40, 40, 40, 40], 240)); // 2
