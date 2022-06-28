/**
 * 듣도 못한 사람의 명단과, 보도 못한 사람의 명단이 주어질 때,
 * 듣도 보도 못한 사람의 명단을 구하고자 한다.
 *
 * @param {number} N - 듣도 못한 사람의 수 (1~500_000)
 * @param {number} M - 보도 못한 사람의 수 (1~500_000)
 * @param {string[]} notSeen - 듣도 못한 사람들 (이름 길이: 1~20)
 * @param {string[]} notHeard - 보도 못한 사람들
 * @return - 듣보잡의 수와 그 명단을 사전순으로 출력
 */

function solution(N, M, notSeen, notHeard) {
    notSeen = new Set(notSeen);
    const notSeenAndnotHeard = notHeard
        .filter(name => notSeen.has(name))
        .sort((a, b) => a.localeCompare(b));

    let print = notSeenAndnotHeard.length + '\n';
    notSeenAndnotHeard.forEach(name => (print += name + '\n'));

    return print;
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
