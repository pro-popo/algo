/**
 * 아이언 슈트는 한 번에 K칸을 앞으로 점프하거나,
 * (현재까지 온 거리x2)에 해당하는 위치로 순간이동할 수 있는 특수한 기능이 있다.
 *
 * 아이언 슈트는 건전지로 작동된다.
 * 순간이동 할 때에는 건전지 사용량이 줄지 않지만,
 * 앞으로 K칸을 점프하면 K만큼의 건전지 사용량이 든다.
 *
 * 거리가 N만큼 떨어져 있는 장소로 가고자 한다.
 * 이때 건전지 사용량의 최솟값을 구하고자 한다.
 *
 * @param {*} n 1~10억
 * @returns 건전지 사용량의 최솟값
 */

function solution(n) {
    return [...n.toString(2)].filter(number => number == 1).length;
}

/****** TEST CASE *******/

console.log(solution(5));
console.log(solution(6));
console.log(solution(5000));
