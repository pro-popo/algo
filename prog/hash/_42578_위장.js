/**
 * [HASH] 위장
 * ### 문제
 * 매일 다른 옷을 조합하여 입음
 * 조건) 추가로 입거나, 대신 착용하거나
 * 
 * ### 입력
 * - clothes : 가진 의상, 2차원 배열 [의상의 이름, 의상의 종류]
 * 
 * ### 출력
 * - 서로 다른 옷의 조합 수
 */

function solution(clothes) {
    const mapClothes = new Map();
    clothes.forEach(clothe => {
        const [_, kind] = clothe;
        mapClothes.set(kind, (mapClothes.get(kind) || 1) + 1);
    });
    return [...mapClothes.values()].reduce((answer, value) => answer * value, 1) - 1;
}

console.log(solution([["yellowhat", "headgear"], ["bluesunglasses", "eyewear"], ["green_turban", "headgear"]]))