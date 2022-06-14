/**
 * 문자열 s를 내림차순으로 정렬해 새로운 문자열을 반환하고자 한다.
 * 이때, 대소문자는 소문자보다 작은 것으로 간주한다.
 *
 * @param {*} s - 문자열
 * @returns - 내림차순으로 정렬된 문자열
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
