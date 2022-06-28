/**
 * 듣도 못한 사람의 명단과, 보도 못한 사람의 명단이 주어질 때,
 * 듣도 보도 못한 사람의 명단을 구하고자 한다.
 *
 * @param {number} N - 듣도 못한 사람의 수 (1~500_000)
 * @param {number} M - 보도 못한 사람의 수 (1~500_000)
 * @param {string[]} notSeen - 듣도 못한 사람들 (이름 길이: 1~20)
 * @param {string[]} notHeard - 보도 못한 사람들
 * @return - 듣보잡의 수와 그 명단을 사전순으로 출력
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   Set 객체를 활용하여 중복된 이름을 검색할 수 있다.
 *   먼저 듣도 못한 사람들을 Set 객체에 저장한다.
 *   그 다음, 보도 못한 사람들을 순회하여 Set 객체에 존재하는 이름만 필터링한다.
 *   필터링된 이름들을 사전순으로 정렬한다.
 *   정렬된 배열의 길이와 원소들을 순서대로 출력한다.
 */

function solution(N, M, notSeen, notHeard) {
    const notSeenAndnotHeard = findNotSeenAndNetHeard(notSeen, notHeard);
    return printLengthAndElements(notSeenAndnotHeard);
}

function findNotSeenAndNetHeard(notSeen, notHeard) {
    notSeen = new Set(notSeen);
    return notHeard
        .filter(name => notSeen.has(name))
        .sort((a, b) => a.localeCompare(b));
}

function printLengthAndElements(arr) {
    let log = arr.length + '\n';
    arr.forEach(name => (log += name + '\n'));
    return log;
}

function input(test) {
    const fs = require('fs');
    const data = (
        process.platform === 'linux'
            ? fs.readFileSync('/dev/stdin').toString().trim()
            : test
    ).split('\n');
    const [N, M] = data.shift().split(' ').map(Number);
    const [notSeen, notHeard] = [data.splice(0, N), data];

    return [N, M, notSeen, notHeard];
}

/****** TEST CASE *******/

const TEST1 = `3 4
ohhenrie
charlie
baesangwook
obama
baesangwook
ohhenrie
clinton`;

console.log(solution(...input(TEST1)));
