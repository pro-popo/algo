/**
 * 부서별로 필요한 물품을 구매하는데 필요한 금액을 조사하고자 한다.
 * 전체 예산은 정해져 있기 때문에 최대한 많은 부서의 물품을 구매하고자 한다.
 * 
 * 물품을 구매할 때에는 각 부서가 신청한 금액만큼 모두 지원해 줘야 한다.
 * 
 * @param {number[]} d 부서별로 신청한 금액이 들어있는 배열 
 *                     길이: 1~100, 금액: 1~100_000
 * @param {number} budget 예산 (1~10_000_000)
 * @returns 최대 몇 개의 부서에 물품을 지원할 수 있는지 반환
 */

function solution(d, budget) {
    d.sort((a, b) => a - b);
    let answer = 0;
    for (const price of d) {
        if(budget - price < 0) break;

        budget -= price;
        answer++;
    }

    return answer;
}

/****** TEST CASE *******/

console.log(solution([1, 3, 2, 5, 4], 9));
console.log(solution([2, 2, 3, 3], 10));