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
