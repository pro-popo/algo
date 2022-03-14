/**
 * 신규 유저들이 규칙에 맞지 않는 아이디를 입력했을 때,
 * 입력된 아이디와 유사하면서 규칙에 맞는 아이디를 추천해주는 프로그램 개발
 *
 * 아이디 규칙
 * - 3자~15자
 * - 알파벳 소문자, 숫자, -, _, . 문자만 사용
 * - 마침표(.)는 처음과 끝에 사용할 수 없으며, 연속으로 사용할 수 없음
 *
 * 규칙에 맞는 새로운 아이디 추천
 * 1. 소문자로 치환
 * 2. 사용이 불가능한 문자들 제거
 * 3. 연속된 마침표(.)을 하나로 치환
 * 4. 처음, 끝에 존재하는 마침표(.) 제거
 * 5. 빈 문자열이면, a를 대입
 * 6. 길이가 16자 이상이면, 첫 15개의 문자를 제외한 나머지 제거
 *    만약 제거 후 마침표가 끝에 위치하면, 제거
 * 7. 길이가 2자 이하면, 마지막 문자를 길이가 3이 될 때까지 반복
 *
 * @param {*} new_id 아이디
 * @returns 추천 아이디
 *
 */

function solution(new_id) {
    return new_id
        .toLowerCase()
        .replace(impossibleCharacters, '')
        .replace(consecutivePeriods, '.')
        .replace(startOrEndPeriod, '')
        .replace(emptyString, 'a')
        .slice(0, 15)
        .replace(endPeriod, '')
        .replace(oneCharacter, '$1$1$1')
        .replace(twoCharacters, '$1$2$2');
}

const impossibleCharacters = /[^a-z0-9-_.]/g;
const consecutivePeriods = /\.{2,}/g;
const startOrEndPeriod = /^\.|\.$/g;
const emptyString = /^$/;
const endPeriod = /\.$/;
const oneCharacter = /^(.)$/;
const twoCharacters = /^(.)(.)$/;

/****** TEST CASE *******/
console.log(solution('...!@BaT#*..y.abcdefghijklm'));
console.log(solution('z-+.^.'));
console.log(solution('=.='));
