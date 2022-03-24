/**
 * 문자열에서 같은 값이 연속해서 나타는 것을 그 문자의 개수와 반복되는 값으로 표현하여
 * 더 짧은 문자열로 줄여서 표현하고자 한다.
 *
 * 단, 문자열 1개 이상의 단위로 잘라서 더 짧은 문자열로 표현할 수 있는지 방법을 찾아야 한다.
 * 만약, 해당 단위로 자르고 마지막에 남은 문자열이 있다면, 그대로 붙여주면 된다.
 *
 * @param {*} s 압축할 문자열 (1~1_000)
 * @returns 압축한 문자열 중 가장 짧은 것의 길이
 */

function solution(s) {
    return Math.min(
        Number.MAX_VALUE,
        ...[...s].map((_, index) => compressString(s, index + 1).length),
    );
}

function compressString(origin, unit) {
    const compressedWords = [];
    let standare = origin.slice(0, unit);
    let repeatCount = 1;
    let index = unit;
    do {
        if (standare === origin.slice(index, index + unit)) {
            repeatCount++;
            continue;
        }

        const compressedString =
            (repeatCount === 1 ? '' : repeatCount) + standare;
        compressedWords.push(compressedString);

        standare = origin.slice(index, index + unit);
        repeatCount = 1;
    } while (index < origin.length && (index += unit));

    return compressedWords.join('');
}

console.log(solution('aabbaccc'));
console.log(solution('ababcdcdababcdcd'));
console.log(solution('abcabcdede'));
console.log(solution('abcabcabcabcdededededede'));
console.log(solution('xababcdcdababcdcd'));
