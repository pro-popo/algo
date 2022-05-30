/**
 * JadenCase란 모든 단어의 첫 문자가 대문자이고,
 * 그 이외의 알파벳은 소문자인 문자열이다.
 * 단, 첫 문자가 알파벳이 아닐 경우 그대로 해당 문자를 출력한다.
 *
 * @param {string} s - 문자열 (1~200)
 * @returns  {string} - JadenCase로 바꾼 문자열
 */

function solution(s) {
    return s
        .split(' ')
        .map(word => {
            if (!word) return word;
            return word[0].toUpperCase() + word.slice(1).toLowerCase();
        })
        .join(' ');
}

/****** TEST CASE *******/

console.log(solution('3people unFollowed me'));
console.log(solution('for the last week'));
console.log(solution('for   t'));
