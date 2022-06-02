/**
 * 하노이 탑은 퍼즐의 일종이다.
 * 다양한 크기의 원판들과 세 개의 기둥이 존재한다.
 * 한 기둥에 원판들이 큰 순으로 순서대로 쌓여있다.
 *
 * 다음 두 가지 조건을 만족시키면서, 다른 기둥으로 옮겨서 쌓고자 한다.
 * 1. 한 번에 하나의 원판만 옮길 수 있다.
 * 2. 큰 원판이 작은 원판 위에 있어서는 안된다.
 *
 * 1번,2번,3번 기둥이 존재한다.
 * 1번에는 n개의 원판이 있고,
 * 이 n개의 원판을 3번 원판으로 최소 횟수로 옮기고자 한다.
 *
 * @param {number} n - 원판의 개수 (~15)
 * @returns {number[][]} - 3번 원판으로 최소로 옮기는 방법
 */

function solution(n) {
    const route = [];
    hanoi(n, 1, 2, 3);
    return route;

    function hanoi(number, from, by, to) {
        if (number === 1) {
            route.push([from, to]);
            return;
        }
        hanoi(number - 1, from, to, by);
        route.push([from, to]);
        hanoi(number - 1, by, from, to);
    }
}

/****** TEST CASE *******/

console.log(solution(2));
