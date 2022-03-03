/**
 * 완주하지 못한 단 한 명의 선수 찾기
 *
 * @param {*} participant 참여 선수들 (1 ~ 100_000) / 이름 (1~20)
 * @param {*} completion 완주한 선수들
 * @returns 완주하지 못한 선수
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   동명이인에 대한 처리를 위해,
 *   완주한 선수들을 순회하여 {이름: 사람수} 행태로 분류한 Map 객체를 생성한다.
 *   그리고, 참여 선수들을 순회하여 분류한 Map 객체에서 한 명씩 제거한다.
 *
 * - 시간 초과가 발생한 풀이 방식은,
 *   participant와 completion을 정렬한 다음,
 *   두 배열의 특정 index에 동일한 선수가 없는 경우를 찾는 것이다.
 *
 *   대충 sort만 해도 O(N^2)이다. (물론 더 빠를 수도 있다.)
 *   최악의 경우 10_000_000_000 이므로, 시간 초과가 발생할 수 밖에 없다. 😅
 *
 * - sort로 문자열 비교할 때, (A - B) 대신 A.localeCompare(B)를 사용해야 하는 이유는,
 *   문자열끼리 뺄셈을 할 경우 NaN를 반환하기 때문이다.
 *   사전순으로 정렬하고 싶다면, localeCompare을 사용하면 된다.
 *   또는 유니코드순으로 정렬하고 싶다면, 비교 함수를 생략하면 된다. sort();
 *
 * - (추가)
 *   시간 초과가 난 이유가 sort 때문인 줄 알았다.
 *   그러나, 다른 풀이를 보던 중 sort를 해서 푼 경우를 발견했다.😱
 *
 *   위에서 sort의 시간 복잡도를 O(N^2)로 둔 이유는,
 *   자바스크립트 엔진에 따라 또는 배열 형식에 따라 구현 방식이 다르기 때문이다.
 *   (merge sort, quick sort, tim sort 등 다양하다.)
 *   그래서 대충 O(N^2)로 생각했는데, O(Nlog(N))로 생각하는게 맞는 것 같다.
 *   그러면 최악의 경우, 100_000log100_000 = 5 * 100_000가 된다.
 *
 *   시간초과가 난 이유는, localeCompare를 사용했기 때문이라고 생각한다.
 *   (localeCompare를 제거해주니 통과했다.)
 *   localeCompare는 단순히 유니코드를 비교하는 것에 비해 성능 페널티가 크다고 한다.
 *
 *   실제로, 100_000개의 원소를 두 가지 방법으로 정렬한 경우를 비교해 보았다.
 *   여러 번 테스트를 해본 결과,
 *   🟡 unicode: 44.816ms
 *   🔴 locale: 141.709ms
 *   대략 3-4배 차이가 나는 것을 확인했다.
 *   (테스트 코드는 맨 아래 코드에서 확인할 수 있다.)
 */

function solution(participant, completion) {
    const namesOfCompletion = countingNames(completion);
    return findNotFinishParticipant(participant, namesOfCompletion);
}

function countingNames(people) {
    return people.reduce(
        (names, person) => names.set(person, (names.get(person) || 0) + 1),
        new Map(),
    );
}

function findNotFinishParticipant(participant, namesOfCompletion) {
    return participant.find((person) => {
        const numberOfName = namesOfCompletion.get(person);
        if (!numberOfName) return true;

        namesOfCompletion.set(person, numberOfName - 1);
    });
}

console.log(
    solution(
        ['marina', 'josipa', 'nikola', 'vinko', 'filipa'],
        ['josipa', 'filipa', 'marina', 'nikola'],
    ), // vinko
);

console.log(
    solution(
        ['mislav', 'stanko', 'mislav', 'ana'],
        ['stanko', 'ana', 'mislav'],
    ), // mislav
);

/********** sort로 푼 풀이 방법 **********/

function solutionSort(participant, completion) {
    participant.sort();
    completion.sort();

    return participant.find((person, index) => person !== completion[index]);
}

/********** unicode와 locale sort의 성능 비교 **********/

function solutionSortTest(arr) {
    for (let i = 0; i < 100_000; i++) {
        arr.push(
            // 두 값 비교 시, 순서가 바뀌게 하기 위해 추가
            arr[0] + String.fromCharCode('Z'.charCodeAt() - (i % 25)), // 20자
        );
    }
    const [a, b] = [[...arr], [...arr]];

    console.time('unicode');
    a.sort();
    console.timeEnd('unicode');

    console.time('locale');
    b.sort((a, b) => a.localeCompare(b));
    console.timeEnd('locale');
}

console.log(
    solutionSortTest(['abcdefghijklmnopqrs']), // 19자 => 최대 이름 글자 수 : 20
);
