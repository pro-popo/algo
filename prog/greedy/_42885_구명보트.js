/**
 * 무인도에 갇힌 사람들을 구명보트로 구출하자!
 * 구명보트는 최대 2명, 무게 제한이 존재한다.
 *
 * @param {*} people 사람들의 몸무게를 담은 배열 (40~240kg, 50_000명)
 * @param {*} limit 구명보트 무게 제한 (40~240)
 * @returns 모든 사람을 구출하기 위해 필요한 구명보트 개수의 최솟값
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저, 각각의 weight별로 몇 명이 존재하는지 계산한 배열을 생성한다.
 *   이 배열은 특정 weight가 존재하는지 빠르게 찾기 위해 활용된다.
 *
 *   그리고, 사람들의 몸무게를 내림차순으로 정렬한 뒤 순회한다.
 *   해당 몸무게와 함께 탈 수 있는 최대 몸무게를 구한 뒤, (limit - weight)
 *   사람들의 몸무게 중, 최대 몸무게와 동일한 혹은 근접하게 작은 몸무게를 찾아 함께 구명보트에 탄다.
 *
 * - 정답은 맞았지만, 조금 어렵게 생각한 풀이라고 생각한다.
 *   위의 풀이는 "최대한 limit를 꽉꽉 채워야한다." 라는 생각을 가지고 접근했다.
 *   하지만 "구명보트는 최대 2명만 탈 수 있다." 라는 조건 때문에,
 *   태울 수 있는 사람을 기준으로 생각했으면 좀 더 쉬웠을 것 같다.
 *
 * - 다른 풀이 중에서 인상 깊었던 풀이는,
 *   people을 오름차순으로 정렬한 뒤, 양 끝에 포인터(i,j)를 둬서 두 값의 차이와 limit를 비교한다.
 *   limit보다 크면 j를 감소, 작거나 같으면 i와 j를 증가/감소시킨다.
 *   이때, j와 함께 구명보트를 탈 수 있는 사람을 counting하여(i의 개수) people.lenght와 뺀 값이 구명보트 개수의 최솟값이 된다.
 */

function solution(people, limit) {
    const weights = Array(MAX_WEIGHT + 1).fill(0);
    people.forEach((weight) => {
        weights[weight]++;
    });

    let answer = 0;
    people.sort(DESC).forEach((weight) => {
        if (isNotExistWeight(weights, weight)) return;
        weights[weight]--;

        let restWeight = findGoWithPerson(weights, limit - weight);
        weights[restWeight]--;
        answer++;
    });
    return answer;
}

const [MIN_WEIGHT, MAX_WEIGHT] = [40, 240];

const DESC = (a, b) => b - a;

function findGoWithPerson(weights, weight) {
    while (weight >= MIN_WEIGHT && isNotExistWeight(weights, weight)) {
        weight--;
    }
    return weight;
}

const isNotExistWeight = (weights, target) => weights[target] === 0;

console.log(solution([70, 50, 80, 50], 100)); // 3
console.log(solution([70, 50, 80], 100)); // 3
console.log(solution([40, 50, 80, 100], 200)); // 2
console.log(solution([40, 40, 40, 40], 240)); // 2
