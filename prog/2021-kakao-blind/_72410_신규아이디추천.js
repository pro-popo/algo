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
 * ### 리뷰
 * - 풀이 방식은, 아이디 추천 규칙에 대한 순서대로 기입하면 된다.
 *
 * - 정규식을 알면 쉽게 풀 수 있는 문제이다.
 *   하나의 정답만 있는 것이 아니라,
 *   다양한 방식의 정규식이 나올 수 있어서 재미있는 문제였다. 👍
 *
 * - 다른 풀이에서,
 *   정규식으로 빈 문자열을 찾기 위해,
 *   /^$/을 사용하거나, padEnd(1, 'a')을 사용할 수 있다.
 *
 *   길이가 2자 이하인 경우,
 *   id.padEnd(3, id[id.length-1])처럼 작성할 수 있고,
 *   id.replace(/^(.)$/, "$1$1$1")처럼 작성할 수 있다.
 *   첫 번째 방식으로 풀다가, 두 번째 방식이 더 깔끔한 것 같아서 수정했다!
 *
 *   [a-zA-Z0-9_] 대신 \w를 사용해도 되지만,
 *   [a-zA-Z0-9_] 이외에도 -.를 추가해줘야 한다.
 *
 * - 정규식을 사용하면 좋은 점은,
 *   if문과 같은 많은 조건문을 정규식으로 짧게 표현할 수 있다.
 *   또한, 정규식과 메서드 체이닝의 조합으로 반복적인 값 할당을 생략하는 것이 쉽다.
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
