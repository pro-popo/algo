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
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   문자열을 공백을 기준으로 나눈 다음,
 *   각 단어를 이상한 문자로 변환한다.
 *   단어의 인덱스가 짝수인 경우 대문자로, 홀수인 경우 소문자로 변환한다.
 *   모든 단어를 변환했다면, 다시 공백을 기준으로 합쳐준다.
 *
 * - 다른 풀이 방식으로는,
 *   정규식을 활용할 수 있다.
 *   /(\w)(\w)/g 정규식을 활용하여 두 문자씩 순회한다.
 *   이때, 첫 번째 문자는 대문자로, 두 번째 문자는 소문자로 대체할 수 있다.
 */

function solution(s) {
    return s.split(' ').map(toStrangeWord).join(' ');
}

function toStrangeWord(word) {
    return [...word]
        .map((alphabet, idx) =>
            isEven(idx) ? alphabet.toUpperCase() : alphabet.toLowerCase(),
        )
        .join('');
}

function isEven(num) {
    return num % 2 === 0;
}

/****** TEST CASE *******/

console.log(solution('try hello world'));
