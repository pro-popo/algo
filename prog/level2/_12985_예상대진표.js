/**
 * 게임대회는 N명이 참가하고 토너먼트 형식으로 진행된다.
 * N명의 참가자는 각각 1부터 N번을 차례대로 배정받는다.
 * 그리고 1번↔2번, 3번↔4번, ... , N-1번↔N번의 참가자끼리 게임을 진행한다.
 * 각 게임에서 이긴 사람은 다음 라운드에 진출할 수 있다.
 *
 * 이때, 다음 라운드에 진출할 참가자의 번호는 다시 1번부터 N/2번을 차례대로 배정받는다.
 *
 * 처음 라운드에서 A번을 가진 참가자는
 * 경쟁자로 생각하는 B번 참가자와 몇 번째 라운드에서 만나는지 구하고자 한다.
 * 이때, A번 참가자와 B번 참가자는 서로 붙게 되기 전까지 항상 이긴다고 가정한다.
 *
 * @param {*} n - 게임 참가자 수 (2^1 ~ 2^20)
 * @param {*} a - 참가자 번호
 * @param {*} b - 경쟁자 번호
 * @returns - A번 참가자가 경쟁자 B번 참가자와 몇 번째 라운드에서 만나는지
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   A번 참가자와 B번 참가자가 항상 이긴다는 가정으로, 다음 라운드의 번호를 계산한다.
 *
 *   만약 N이 10인 경우, 다음 라운드의 번호는 다음과 같다.
 *              1
 *          1      2
 *      1       2     3
 *    1   2   3   4   5
 *   1 2 3 4 5 6 7 8 9 10
 *
 *   이때, 다음 라운드의 번호를 구하기 위해 다음과 같은 계산식을 사용할 수 있다.
 *   Math.floor((number + 1) / 2)
 *
 *   이러한 규칙을 활용하여 두 참가자의 번호가 같을 때까지 반복한다.
 *   그리고 위 과정을 몇 번이나 걸쳤는지 센다.
 */

function solution(n, a, b) {
    let round = 0;
    while (a !== b) {
        a = Math.floor((a + 1) / 2);
        b = Math.floor((b + 1) / 2);

        round++;
    }

    return round;
}

/****** TEST CASE *******/

console.log(solution(8, 4, 7));
