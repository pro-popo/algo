/**
 * 어떤 문자열 x에 대한 이진 변환은 다음과 같이 정의한다.
 * 1. x의 모든 0을 제거
 * 2. x의 길이를 c라고 할 때, x를 "c를 2진법으로 표현한 문자열"로 바꾼다.
 *
 * x가 "1"이 될때까지 계속 s를 이진 변환을 가했을 때,
 * 이진 변환의 횟수와 변환 과정에서 제거된 모든 0의 개수를 구하자.
 *
 * @param {*} s 0과 1로 이루어진 문자열 (1~150,000)
 * @returns [이진 변환의 횟수, 제거된 0의 개수]
 *
 * ### 리뷰
 * - 풀이 방식은 문제에서 제시한 이진 변환 과정 그대로 구현하면 된다!
 *   2진법으로 변환하는 방법만 안다면, 쉽게 풀 수 있는 문제였다. 🤗
 */

function solution(s) {
    let answer = [0, 0];
    while (s !== '1') {
        const stringOfOnes = removeZeros(s);

        const [countConversions, countRemovedZero] = answer;
        answer = [
            countConversions + 1,
            countRemovedZero + s.length - stringOfOnes.length,
        ];

        s = convertStringLengthToBinary(stringOfOnes);
    }
    return answer;
}

function removeZeros(s) {
    return [...s].filter(char => char !== '0').join('');
}

function convertStringLengthToBinary(string) {
    return string.length.toString(2);
}

/****** TEST CASE *******/

console.log(solution('110010101001'));
console.log(solution('01110'));
console.log(solution('1111111'));
