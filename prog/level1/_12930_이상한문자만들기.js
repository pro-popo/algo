/**
 * 문자열 s는 한 개 이상의 단어로 구성되어 있다.
 * 각 단어는 하나 이상의 공백문자로 구분되어 있다.
 * 짝수번째 알파벳은 대문자로, 홀수번째 알파벳은 소문자로 바꾼 문자열을 반환하자.
 *
 * 이때, 문자열 전체의 짝/홀수 인덱스가 아닌 단어별로 짝/홀수 인덱스를 판단해야 한다.
 * 0번째 인덱스는 짝수번째 알파벳으로 처리한다.
 *
 * @param {*} s - 문자열
 * @returns - 조건에 맞게 변환한 문자열
 */

function solution(s) {
    return s
        .split(' ')
        .map(word =>
            [...word]
                .map((w, idx) =>
                    idx % 2 === 0 ? w.toUpperCase() : w.toLowerCase(),
                )
                .join(''),
        )
        .join(' ');
}

/****** TEST CASE *******/

console.log(solution('try hello world'));
