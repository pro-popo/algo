/**
 * [문제]
 * - n개의 개인정보
 * - 각 약관마다 보관 유효기간 정해짐
 * - 오늘 날짜로 파기해야 할 개인정보 번호 구하기
 * - 모든 달은 28일까지 존재
 *
 * @param {string} today : 오늘 날짜
 * @param {string[]} terms : 약관의 유효기간 (1~20)
 * @param {string[]} privacies : 수집된 개인정보의 정보 (1~100)
 * @returns 파기해야 할 개인정보의 번호 (오름차순)
 */

function solution(today, terms, privacies) {
    const mapTearms = new Map(terms.map(term => term.split(' ')));

    return privacies.reduce((answer, privacy, id) => {
        const [date, type] = privacy.split(' ');
        const privacyDate = new Date(date);
        privacyDate.setMonth(privacyDate.getMonth() + +mapTearms.get(type));

        if (new Date(today).getTime() >= privacyDate.getTime())
            return answer.concat(id + 1);
        return answer;
    }, []);
}

/** TEST CASE */
console.log(
    solution(
        '2022.05.19',
        ['A 6', 'B 12', 'C 3'],
        ['2021.05.02 A', '2021.07.01 B', '2022.02.19 C', '2022.02.20 C'],
    ),
);

console.log(
    solution(
        '2020.01.01',
        ['Z 3', 'D 5'],
        [
            '2019.01.01 D',
            '2019.11.15 Z',
            '2019.08.02 D',
            '2019.07.01 D',
            '2018.12.28 Z',
        ],
    ),
);
