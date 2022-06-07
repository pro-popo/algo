/**
 * 콜라츠 추측은,
 * 주어진 수가 1이 될때까지 다음 작업을 반복하면 모든 수를 1로 만들 수 있다는 추축이다.
 * 1. 입력된 수가 짝수면 2로 나누고,
 *    홀수면 3을 곱하고 1을 더한다.
 * 2. 결과로 나온 수에 같은 작업이 1이 될 때까지 반복한다.
 *
 * 위 작업을 몇 번이나 반복해야 하는지 반환하자.
 *
 * @param {number} num - 입력된 수 (1~8000000)
 * @returns - 작업을 몇 번 반복해야 하는지
 *            단, 500번을 넘어가는 경우 -1 을 반환
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   num이 짝수이면 2로 나누고,
 *   홀수이면 3으로 곱한 다음 1을 더한다.
 *   num이 1이 될 때까지 위 과정을 반복하며 반복 횟수를 센다.
 */

function solution(num) {
    let count = 0;
    do {
        if (num === 1) return count;

        if (isEven(num)) num /= 2;
        else num = num * 3 + 1;
    } while (++count <= 500);

    return -1;
}

function isEven(number) {
    return number % 2 === 0;
}

/****** TEST CASE *******/

console.log(solution(6));
console.log(solution(16));
console.log(solution(626331));
