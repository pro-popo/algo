/**
 * 완주하지 못한 단 한 명의 선수 찾기
 *
 * @param {*} participant 참여 선수들 (1 ~ 100_000)
 * @param {*} completion 완주한 선수들
 * @returns 완주하지 못한 선수
 *
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
