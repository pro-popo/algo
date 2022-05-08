/**
 * 이 게임은 여러 사람이 둥글게 앉아서
 * 숫자 0부터 시작하여, 숫자를 하나씩 차례대로 말하는 게임이다.
 * 0,1,2,...,9,1,0,1,1...
 *
 * 만약 이진법으로 진행하면 다음과 같다.
 * 0,1,1,0,1,1,1,...
 *
 * 이 게임의 난이도를 높이고자 이진법에서 십육진법까지,
 * 모든 진법으로 게임을 진행하고자 한다.
 *
 * 이를 위해, 자신이 말해야 하는 숫자를 미리 출력해주는 프로그램을 만들고자 한다.
 *
 * @param {*} n 진법 (2~16)
 * @param {*} t 미리 구할 숫자의 갯수 (0~1_000)
 * @param {*} m 게임에 참가하는 인원 (2~100)
 * @param {*} p 튜브의 순서 (1~m)
 * @returns 튜브가 말해야 하는 숫자 t개
 *          단, 10~15는 각각 대문자 A~F로 출력한다.
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저, 숫자 0부터 n진법으로 변환하여 문자열에 이어붙인다.
 *   문자열의 총 길이가 (t*m)이 될 때까지 위의 과정을 반복한다.
 *   (이때, 영문자는 대문자로 변경해야 한다.)
 *
 *   그 다음, 문자열을 순회하여 (인덱스 % 총 인원 + 1)가 p인, 즉 튜브의 순서인 경우만 골라낸다.
 *
 * - 제한 범위가 작기 때문에,
 *   진법 변환하는 방법만 안다면 쉽게 풀 수 있는 문제였다.
 */

function solution(n, t, m, p) {
    const numbers = createNumbers(n, t * m);
    return numbers.filter(isTubeTurn).join('');

    function isTubeTurn(_, index) {
        return (index % m) + 1 === p;
    }
}

function createNumbers(notation, maxLength) {
    let numbers = '';
    for (let i = 0; numbers.length < maxLength; i++) {
        numbers += convertToNotation(i, notation);
    }
    return numbers.slice(0, maxLength).toUpperCase().split('');
}

function convertToNotation(number, notation) {
    return number.toString(notation);
}

/****** TEST CASE *******/

console.log(solution(2, 4, 2, 1));
console.log(solution(16, 16, 2, 1));
console.log(solution(16, 16, 2, 2));
