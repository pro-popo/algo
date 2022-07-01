/**
 * N장의 카드가 있다.
 * 각각의 카드는 위에서부터 차례로 1부터 N까지의 번호가 붙어있다.
 *
 * 카드가 한 장 남을 때까지 다음 동작을 반복한다.
 * 1. 제일 위에 있는 카드를 바닥에 버린다.
 * 2. 제일 위에 있는 카드를 제일 아래에 있는 카드 밑으로 옮긴다.
 *
 * 예로 N=4인 경우,
 * 1234 => 234 => 342 => 42 => 24 => 4
 * N이 주어졌을 때, 제일 마지막에 남게 되는 카드를 구하자.
 *
 * @param {number} N - 카드 개수 (500_000)
 * @return {number} - 마지막에 남게 되는 카드
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저 1~N까지의 배열을 생성한다.
 *   point 변수를 생성하여, -1을 할당한다.
 *
 *   그리고 다음 과정을 반복한다.
 *   1. point를 2만큼 증가시킨다.
 *   2. 배열에서 point번째의 숫자를 배열의 마지막 원소로 추가한다.(push)
 *   더이상 추가할 숫자가 없을 때까지,
 *   즉, point번째의 숫자가 없을 때까지 위 과정을 반복한다.
 *
 *   반복문을 벗어나면, 배열의point-1번째 숫자를 반환한다.
 */

function solution(N) {
    const numbers = [...Array(N)].map((_, i) => i + 1);

    let point = -1;
    do {
        point += 2;
        numbers.push(numbers[point]);
    } while (numbers[point]);

    return numbers[point - 1];
}

function input(test) {
    const fs = require('fs');
    const data = (
        process.platform === 'linux'
            ? fs.readFileSync('/dev/stdin').toString().trim()
            : test
    ).split('\n');

    return +data[0];
}

/****** TEST CASE *******/

const TEST1 = `6`;

console.log(solution(input(TEST1)));
