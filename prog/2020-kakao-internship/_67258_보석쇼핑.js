/**
 * 어피치는 쇼핑할 때 매장 진열대의 특점 범위의 물건들을
 * 모두 싹쓸이 구매하는 습관이 있다.
 * 오늘은, 진열된 모든 종류의 보석을 적어도 1개 이상 포함하는
 * 가장 짧은 구간을 찾아서 구매하고자 한다.
 *
 * @param {*} gems 진열대 번호 순서대로 보석들의 이름이 저장된 배열 (1~100_000)
 * @returns 가장 짧은 구간의 [시작 진열대 번호, 끝 진열대 번호]
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   이 문제는 투 포인터 알고리즘으로 해결할 수 있다.
 *
 *   먼저, Gem의 종류의 개수를 구한다. (Set 객체 활용)
 *   그 다음 선택한 gem을 저장할 Map객체를 생성하고, (보석번호: 개수)
 *   start 포인터와 end 포인터를 [0, -1]에 둔다.
 *
 *   그리고 end가 gems 범위를 넘어갈 때까지 아래 과정을 반복한다.
 *
 *   start부터 end까지의 gem을 선택했을 때,
 *   모든 gem의 종류를 전부 선택한 상태인지 검사한다.
 *
 *   만약 모든 gem의 종류를 선택하지 않은 상태라면,
 *   end를 증가시켜 선택 범위를 넓힌다.
 *
 *   만약 모든 gem의 종류를 선택한 상태라면,
 *   answer에 더 짧은 구간을 저장한 다음,
 *   start를 증가시켜 선택 범위를 줄인다.
 *
 *   위 과정을 거치면 가장 짧은 구간을 구할 수 있다.
 *
 * - gems의 범위가 최대 100_000이기 때문에,
 *   모든 경우를 탐색할 수 없다. (100_000 * 100_000)
 *
 * - 다른 풀이 방식으로는,
 *   투 포인터를 사용하지 않고, Map 객체만 사용해서 구할 수 있다.
 *
 *   먼저, 선택한 gem을 저장하는 Map 객체를 생성한다.
 *   그 다음 gems를 순회하여 해당 gem을 Map 객체에 추가한다. (보석이름: index)
 *   만약 Map 객체에 저장된 gem이 있다면, 기존 값은 제거한 뒤에 추가한다.
 *
 *   이때, Map 객체의 size가 Gem의 종류의 개수와 동일한 경우,
 *   길이가 작은 경우로 answer를 갱신한다.
 *   answer = min([map.value()[0], index], answer)
 */

function solution(gems) {
    const numberOfGems = new Set(gems).size;

    let [start, end] = [0, -1];
    let answer = [0, gems.length];
    let boughtGems = new Map();

    while (end < gems.length) {
        if (boughtGems.size !== numberOfGems) {
            buyGem(++end);
            continue;
        }

        answer = Point.minDistance([start, end], answer);

        refundGem(start++);
    }

    return answer.map(index => index + 1);

    function buyGem(index) {
        const [gem, count] = getBoughtGem(index);
        boughtGems.set(gem, count + 1);
    }

    function refundGem(index) {
        const [gem, count] = getBoughtGem(index);

        if (count === 1) boughtGems.delete(gem);
        else boughtGems.set(gem, count - 1);
    }

    function getBoughtGem(index) {
        const gem = gems[index];
        const count = boughtGems.get(gem) || 0;
        return [gem, count];
    }
}

class Point {
    static minDistance(point, other) {
        const pointDistance = point[1] - point[0];
        const otherDistance = other[1] - other[0];

        return pointDistance < otherDistance ? point : other;
    }
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
