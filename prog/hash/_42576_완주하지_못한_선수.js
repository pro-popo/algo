/**
 * ### 문제
 * - 단 한 명의 선수만 완주 못함
 *
 * ### 입력
 * - participant : 참여 선수들
 * - completion : 완주한 선수들
 *
 * ### 출력
 * - 완주하지 못한 선수의 이름을 return
 */

// function solution(participant, completion) {
//     return participant.find(person => !completion[person]--, completion.map(person => (completion[person] | 0) + 1))
// }

function solution(participant, completion) {
    completion.sort(ASC);
    participant.sort(ASC);

    return participant
        .sort(ASC)
        .find((person, index) => person !== completion[index]);
}

const ASC = (a, b) => a.localeCompare(b);

console.log(
    solution(
        ['marina', 'josipa', 'nikola', 'vinko', 'filipa'],
        ['josipa', 'filipa', 'marina', 'nikola'],
    ),
);

console.log(
    solution(
        ['mislav', 'stanko', 'mislav', 'ana'],
        ['stanko', 'ana', 'mislav'],
    ),
);
