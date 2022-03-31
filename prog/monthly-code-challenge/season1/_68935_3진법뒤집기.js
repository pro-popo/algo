/**
 * n을 3진법 상에서 앞뒤로 뒤집은 후,
 * 이를 다시 10진법으로 표현한 수를 반환하자.
 *
 * @param {*} n 자연수
 * @returns
 */

function solution(n) {
    const reverseTrit = [...n.toString(3)].reverse().join('');
    return parseInt(reverseTrit, 3);
}

console.log(solution(45));
