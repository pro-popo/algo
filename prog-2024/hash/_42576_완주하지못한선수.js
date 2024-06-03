/**
 * 단 한 명의 선수를 제외하고 모든 선수가 마라톤을 완주
 *
 * @param {string[]} participant 마라톤에 참여한 선수들의 이름이 담긴 배열
 * @param {string[]} completion 완주한 선수들의 이름
 * @returns 완주하지 못한 선수의 이름
 */
function solution(participant, completion) {
    const mapCompletion = completion.reduce(
        (map, target) => map.set(target, (map.get(target) || 0) + 1),
        new Map(),
    );
    return participant.find(target => {
        const count = (mapCompletion.get(target) || 0) - 1;
        mapCompletion.set(target, count);
        return count < 0;
    });
}

console.log(solution(['leo', 'kiki', 'eden'], ['eden', 'kiki']));
console.log(
    solution(
        ['mislav', 'stanko', 'mislav', 'ana'],
        ['stanko', 'ana', 'mislav'],
    ),
);
