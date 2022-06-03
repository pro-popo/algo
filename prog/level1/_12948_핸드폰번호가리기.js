/**
 * 개인정보 보호를 위해 고지서를 보낼 때 고객들의 전화번호의 일부를 가린다.
 * 전화번호가 주어졌을 때, 전화번호의 뒷 4자리르 제외한 나머지를 전부 "*"으로 가리자.
 *
 * @param {string} phone_number - 전화번호 (4~20)
 * @returns {string} - 전화번호 뒷 4자리를 제외한 나머지를 "*"로 가린 문자열
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   문자열을 순회하여, 인덱스가 (전화번호 길이 - 4)보다 작은 경우 "*"로 대체한다.
 *
 * - 다른 풀이 방식으로,
 *   다음과 같은 정규식을 활용할 수 있다.
 *   phone_number.replace(/\d(?=\d{4})/g, '*')
 *
 * - 또 다른 풀이 방식으로,
 *   String의 메서드를 활용하여 "*"를 반복적으로 생성할 수 있다.
 *   (1) "*".repeat(phone_number.length - 4) + phone_number.slice(-4)
 *   (2) phone_number.slice(-4).padStart(phone_number.length, "*")
 *
 *   Array의 메서드를 활용할 경우,
 *   [...phone_number].fill("*", 0, phone_number.length - 4).join("")
 */

function solution(phone_number) {
    return [...phone_number]
        .map((number, i) => (phone_number.length - 4 > i ? '*' : number))
        .join('');
}

/****** TEST CASE *******/

console.log(solution('01033334444'));
console.log(solution('027778888'));
