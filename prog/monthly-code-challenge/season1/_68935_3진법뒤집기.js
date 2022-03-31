/**
 * n을 3진법 상에서 앞뒤로 뒤집은 후,
 * 이를 다시 10진법으로 표현한 수를 반환하자.
 *
 * @param {*} n 자연수
 * @returns
 */

function solution(n) {
    const trit = changeDecimalToTrit(n);
    const reverseTrit = [...trit].reverse().join('');
    return changeTritToDecimal(reverseTrit);
}

function changeDecimalToTrit(number) {
    return number.toString(3);
}

function changeTritToDecimal(number) {
    return parseInt(number, 3);
}

console.log(solution(45));
