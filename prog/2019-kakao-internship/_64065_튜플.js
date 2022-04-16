/**
 * 튜플이란,
 * - 셀수있는 수량의 순서있는 열거
 * - 어떤 순서를 따르는 요소들의 모음
 *
 * n-튜플이란,
 * - n개의 요소를 가진 튜플
 *
 * 튜플의 성질은,
 * 1. 중복된 원소가 있을 수 있다.
 * 2. 원소에 정해진 순서가 있으며, 순서가 다르면 서로 다른 튜플이다.
 * 3. 튜플의 원소 개수는 유한하다.
 *
 * 원소의 개수가 n개이고, 중복되는 원소가 없는 튜플(a1, a2, ..., an)은
 * 다음과 같이 집합 기호 "{", "}"를 이용해 표현할 수 있다.
 * > {{a1}, {a1, a2}, ... {a1, a2, ..., an}}
 *
 * 특정 튜플을 표현하는 집합이 담긴 문자열이 주어질 때,
 * 이 문자열이 표현하는 튜플을 구하고자 한다.
 *
 * @param {*} s (5~1_000_000)
 * @returns s가 표현하는 튜플
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저 문자열을 배열의 형태로 변환한다. (정규식 활용)
 *   그 다음, 배열의 길이가 짧은 순으로 정렬한다.
 *   정렬된 2차원 배열을 flapMap으로 펼쳐준 뒤,
 *   해당 배열을 Set 생성자에 전달하여 중복 숫자를 제거한다.
 *   그 결과, 원하는 튜플을 구할 수 있다.
 *
 * - 다른 풀이 방식으로,
 *   문자열을 배열의 형태로 변환할 때,
 *   문자열의 맨 앞의 "{{"와 맨 뒤의 ""}}"를 제거한 뒤 => s.slice(2, -2)
 *   "},{"로 문자열을 나눠줄 수 있다.  => s.split("},{")
 *
 *   또 다른 변환 방식은,
 *   "{"와 "}"를 각각 "["와 "]"로 바꾼 뒤, JSON.parse로 전달하면 된다.
 */

function solution(s) {
    let answer = convertToArray(s)
        .sort((a, b) => a.length - b.length)
        .flatMap(set => set);
    return [...new Set(answer)];
}

function convertToArray(s) {
    return s.match(/{[\d,]+}/g).map(s => s.match(/\d+/g).map(Number));
}

/****** TEST CASE *******/

console.log(solution('{{2},{2,1},{2,1,3},{2,1,3,4}}'));
console.log(solution('{{1,2,3},{2,1},{1,2,4,3},{2}}'));
console.log(solution('{{20,111},{111}}'));
console.log(solution('{{123}}'));
console.log(solution('{{4,2,3},{3},{2,3,4,1},{2,3}}'));
