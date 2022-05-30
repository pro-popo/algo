/**
 * JadenCase란 모든 단어의 첫 문자가 대문자이고,
 * 그 이외의 알파벳은 소문자인 문자열이다.
 * 단, 첫 문자가 알파벳이 아닐 경우 그대로 해당 문자를 출력한다.
 *
 * @param {string} s - 문자열 (1~200)
 * @returns  {string} - JadenCase로 바꾼 문자열
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저 문자열을 공백을 기준으로 단어를 나눈다.
 *   단어를 순회하여, 첫 글자는 대문자로 그 다음 문자들은 소문자로 변환한다.
 *   단어를 다시 합쳐서 하나의 문자열로 반환한다.
 *
 * - 다른 풀이 방식으로는,
 *   문자열을 순회하여
 *   첫 글자이거나 해당 문자 앞에 공백이 존재할 경우 대문자로 변환하고,
 *   그 외에는 소문자로 변환한다.
 */

function solution(s) {
    return s
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

/****** TEST CASE *******/

console.log(solution('3people unFollowed me'));
console.log(solution('for the last week'));
console.log(solution('for   t'));
