/**
 * n을 3진법 상에서 앞뒤로 뒤집은 후,
 * 이를 다시 10진법으로 표현한 수를 반환하자.
 *
 * @param {*} n 자연수
 * @returns
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   Number의 toString과 parseInt 함수를 사용하여 원하는 진법으로 변환한다.
 *
 * - JavsScript로 진법 변환하는 방식을 알면 쉽게 풀 수 있는 문제다!
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
