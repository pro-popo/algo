/**
 * 문자열 s를 내림차순으로 정렬해 새로운 문자열을 반환하고자 한다.
 * 이때, 대소문자는 소문자보다 작은 것으로 간주한다.
 *
 * @param {*} s - 문자열
 * @returns - 내림차순으로 정렬된 문자열
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저 소문자와 대문자를 구분한다.
 *   소문자와 대문자를 각각 내림차순으로 정렬한 다음,
 *   소문자, 대문자 순으로 문자열을 이어준다.
 *
 * - 다른 풀이 방식으로는,
 *   문자열을 오름차순으로 정렬한 다음, reverse로 문자열을 반전시켜준다.
 *   (기본적으로 대문자는 소문자보다 큰 것으로 간주된다.)
 */

function solution(s) {
    const arr = [...s];
    const lowerCase = arr.filter(
        alphabet => alphabet.codePointAt() > 'Z'.codePointAt(),
    );
    const upperCase = arr.filter(
        alphabet => alphabet.codePointAt() <= 'Z'.codePointAt(),
    );

    return (
        lowerCase.sort(DESC_STRING).join('') +
        upperCase.sort(DESC_STRING).join('')
    );
}

const DESC_STRING = (a, b) => b.localeCompare(a);

/****** TEST CASE *******/

console.log(solution('Zbcdefg'));
console.log(solution('ZbcdefgA'));
