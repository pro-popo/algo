/**
 * 어피치는 쇼핑할 때 매장 진열대의 특점 범위의 물건들을
 * 모두 싹쓸이 구매하는 습관이 있다.
 * 오늘은, 진열된 모든 종류의 보석을 적어도 1개 이상 포함하는
 * 가장 짧은 구간을 찾아서 구매하고자 한다.
 *
 * @param {*} gems 진열대 번호 순서대로 보석들의 이름이 저장된 배열 (1~100_000)
 * @returns 가장 짧은 구간의 [시작 진열대 번호, 끝 진열대 번호]
 */

function solution(gems) {
    const numberOfGems = new Set(gems).size;
    let [start, end] = [0, -1];
    let boughtGems = new Map();
    let answer = [0, gems.length];
    while (end < gems.length) {
        if (boughtGems.size !== numberOfGems) {
            const gem = gems[++end];
            const count = (boughtGems.get(gem) || 0) + 1;

            boughtGems.set(gem, count);
            continue;
        }

        if (end - start < answer[1] - answer[0]) answer = [start, end];

        const gem = gems[start];
        const count = boughtGems.get(gem) - 1;
        if (count === 0) boughtGems.delete(gem);
        else boughtGems.set(gem, count);
        start++;
    }

    return answer.map(index => index + 1);
}

/****** TEST CASE *******/

console.log(
    solution([
        'DIA',
        'RUBY',
        'RUBY',
        'DIA',
        'DIA',
        'EMERALD',
        'SAPPHIRE',
        'DIA',
    ]),
);
console.log(solution(['AA', 'AB', 'AC', 'AA', 'AC']));
console.log(solution(['XYZ', 'XYZ', 'XYZ']));
console.log(solution(['ZZZ', 'YYY', 'NNNN', 'YYY', 'BBB']));
console.log(solution(['A', 'B', 'A', 'B']));
