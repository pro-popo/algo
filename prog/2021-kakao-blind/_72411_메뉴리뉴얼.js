/**
 * 이전의 각 손님들이 주문할 때 가장 많이 함께 주문한 단품메뉴들을
 * 코스요리 메뉴로 구성하고자 한다.
 * 단, 코스요리 메뉴는 최소 2가지 이상의 단품 메뉴로 구성한다.
 * 또한, 최소 2명 이상의 손님으로부터 주문된 단품메뉴 조합에 대해서만 후보에 포함한다.
 *
 * @param {*} orders 각 손님들이 주문한 단품메뉴들이 문자열 형식으로 담긴 배열
 *                   (2~20)
 * @param {*} course 추가하고 싶어하는 코스요리를 구성하는 단품메뉴들의 갯수가 담긴 배열
 *                   (1~10)
 * @returns 새로 추가하게 될 코스요리의 메뉴 구성 => 오름차순
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저, orders를 대상으로 만들 수 있는 모든 메뉴를 생성한다. (조합)
 *   이때, 해당 메뉴를 주문한 횟수와 함께 저장한다. {메뉴: 횟수}
 *
 *   그 다음, 메뉴가 등장하는 횟수가 2이상인 경우와 course의 조건에 속하는 메뉴만 걸러낸다.
 *   또한, course별로 가장 주문 횟수가 큰 메뉴만 걸러낸다.
 *   이를 위해 먼저 단품 메뉴들의 개수의 오름차순으로 메뉴를 정렬한다.
 *   만약 개수가 동일할 경우, 주문 횟수의 내림차순으로 정렬한다.
 *
 *   마지막으로, 메뉴를 사전 순으로 오름차순하여 반환한다.
 *
 */

function solution(orders, course) {
    const menus = createMenus(orders);

    const numberOfOrders = new Array(11).fill(0);
    return Array.from(menus.entries())
        .filter(([word, count]) => course.includes(word.length) && count >= 2)
        .sort(([a, countA], [b, countB]) => {
            if (a.length === b.length) return countB - countA;
            return a.length - b.length;
        })
        .filter(([word, count]) => {
            numberOfOrders[word.length] = Math.max(
                numberOfOrders[word.length],
                count,
            );
            return numberOfOrders[word.length] === count;
        })
        .map(([word]) => word)
        .sort(lexicographicalOrder);
}

const lexicographicalOrder = (a, b) => a.localeCompare(b);

function createMenus(orders) {
    const menus = new Map();
    orders
        .map((order) => [...order].sort(lexicographicalOrder))
        .forEach((order) => combination('', 0, order));
    return menus;

    function combination(word, index, alphabets) {
        menus.set(word, (menus.get(word) || 0) + 1);

        for (let i = index; i < alphabets.length; i++) {
            combination(word + alphabets[i], i + 1, alphabets);
        }
    }
}

console.log(
    solution(['ABCFG', 'AC', 'CDE', 'ACDE', 'BCFG', 'ACDEH'], [2, 3, 4]),
);
