/**
 * 알파벳 소문자로 이루어진 단어를 가지고 아래와 같은 과정을 해 보고자 한다.
 * 1. 먼저 단어에서 임의의 두 부분을 골라서 단어를 쪼갠다.
 *    즉, 주어진 단어를 세 개의 더 작은 단어로 나누는 것이다.
 *    각각은 적어도 길이가 1이상인 단어여야 한다.
 * 2. 나눈 세 개의 작은 단어들을 앞뒤를 뒤집다.
 * 3. 그리고 다시 원래의 순서대로 합친다.
 *
 * 이렇게 만들 수 있는 단어 중, 사전순으로 가장 앞서는 단어를 출력하자.
 *
 * @param {*} word - 영어 소문자로 된 단어 (3~50)
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저 2중 for문을 활용하여, 세 개의 단어로 나누기 위한 두 개의 경계선을 구한다.
 *   두 개의 경계선을 가지고 단어를 세 개의 단어로 나눈다.
 *   나눈 단어들의 앞뒤를 뒤집는다.
 *   그리고 나눈 단어들을 전부 합친다.
 *   위 과정에서 나온 단어들을 하나의 배열에 저장하여,
 *   사전순으로 정렬하여 가장 맨 앞에 있는 단어를 반환한다.
 */

function solution(word) {
    const words = [];
    for (let i = 1; i < word.length; i++) {
        for (let j = i + 1; j < word.length; j++) {
            const convertedWord = divide(word, i, j)
                .map(reverseString)
                .join('');
            words.push(convertedWord);
        }
    }

    return words.sort((a, b) => a.localeCompare(b))[0];
}

function divide(word, front, end) {
    return [word.slice(0, front), word.slice(front, end), word.slice(end)];
}

function reverseString(string) {
    return [...string].reverse().join('');
}

function input(test) {
    const fs = require('fs');
    return (
        process.platform === 'linux'
            ? fs.readFileSync('/dev/stdin').toString().trim()
            : test
    ).split('\n');
}

/****** TEST CASE *******/

const TEST1 = `mobitel`;

console.log(solution(...input(TEST1)));
