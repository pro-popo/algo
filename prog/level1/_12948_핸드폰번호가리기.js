/**
 * 개인정보 보호를 위해 고지서를 보낼 때 고객들의 전화번호의 일부를 가린다.
 * 전화번호가 주어졌을 때, 전화번호의 뒷 4자리르 제외한 나머지를 전부 "*"으로 가리자.
 *
 * @param {string} phone_number - 전화번호 (4~20)
 * @returns {string} - 전화번호 뒷 4자리를 제외한 나머지를 "*"로 가린 문자열
 */

function solution(phone_number) {
    return [...phone_number]
        .map((number, i) => (phone_number.length - 4 > i ? '*' : number))
        .join('');
}

/****** TEST CASE *******/

console.log(solution('01033334444'));
console.log(solution('027778888'));
