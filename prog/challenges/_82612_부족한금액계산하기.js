/**
 * 놀이기구의 원래 이용료는 price원이지만,
 * N번째 이용한다면, 원래 이용료의 N배를 받고자 한다.
 * [EX] 100원 => 2번, 200원 => 3번, 300원
 *
 * 놀이기구를 count번 타게 될 때, 가지고 있는 금액에서 얼마나 모자라는지 구하자.
 * 만약, 금액이 부족하지 않다면 0을 반환한다.
 *
 * @param {*} price 놀이기구 이용료 (1~2_500)
 * @param {*} money 가지고 있는 금액 (1~1_000_000_000)
 * @param {*} count 놀이기구의 이용 횟수 (1~2_500)
 * @returns 부족한 금액 반환, 부족하지 않다면 0 반환
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   count번째 이용 중일 경우의 비용을 계산하여 가지고 있는 금액에서 빼준다.
 *   위 과정을 count가 0이 될때까지 반복한다.
 *
 * - 다른 풀이 방식으로는,
 *   가우스 공식인 N(N+1)/2를 사용하는 방법이 있다.
 *   1*price + 2*price + ... + N*price
 *   = (1+2+...+N)*price
 *   = N(N+1)/2*price
 *
 */

function solution(price, money, count) {
    do {
        money -= calculatePrice(price, count);
    } while (isRemainCount(count) && count--);

    return isRemainMoney(money) ? 0 : -money;
}

function calculatePrice(price, count) {
    return price * count;
}

const isRemainCount = (count) => count > 0;
const isRemainMoney = (money) => money >= 0;

/****** TEST CASE *******/

console.log(solution(3, 20, 4));
