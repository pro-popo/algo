/**
 * [HASH] 완주하지 못한 선수
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
    const mapCompletion = new Map();
    completion.forEach(person => {
        mapCompletion.set(person, (mapCompletion.get(person) || 0) + 1);
    });

    return participant.find(person => {
        if (!mapCompletion.get(person)) return person;

        mapCompletion.set(person, mapCompletion.get(person) - 1);
    });
}

console.log(solution(["mislav", "stanko", "mislav", "ana"], ["stanko", "ana", "mislav"]));
