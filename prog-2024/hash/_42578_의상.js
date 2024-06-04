/**
 * 각 종류별로 최대 1가지 의상만 착용 가능.
 * 착용한 의상의 일부가 겹치더라고, 다른 의상이 겹치지 않거나 추가로 더 착용한 경우,
 * 서로 다른 방법으로 옷을 착용한 것으로 계산.
 * 하루에 최소 한 개의 의상을 입음
 *
 * @param {string[][]} clothes 의상들이 담긴 2차원 배열
 * @returns 서로 다른 옷의 조합의 수
 */

function solution(clothes) {
    const mapClothes = clothes.reduce(
        (map, [, type]) => map.set(type, (map.get(type) || 0) + 1),
        new Map(),
    );
    return (
        [...mapClothes.values()].reduce((acc, cur) => acc * (cur + 1), 1) - 1
    );
}

console.log(
    solution([
        ['yellow_hat', 'headgear'],
        ['blue_sunglasses', 'eyewear'],
        ['green_turban', 'headgear'],
    ]),
);

console.log(
    solution([
        ['crow_mask', 'face'],
        ['blue_sunglasses', 'face'],
        ['smoky_makeup', 'face'],
    ]),
);
