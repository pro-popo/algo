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
        ...[...s].map(
            (_, index) =>
                new Compression(s, index + 1).startCompresstion().length,
        ),
    );
}

class Compression {
    constructor(origin, unit) {
        this.origin = origin;
        this.unit = unit;
        this.index = 0;

        this.nextStandare();
    }

    nextTarget() {
        return this.origin.slice(this.index, this.index + this.unit);
    }

    nextStandare() {
        this.standare = this.nextTarget();
        this.repeatCount = 1;
    }

    compressString() {
        return (this.repeatCount === 1 ? '' : this.repeatCount) + this.standare;
    }

    startCompresstion() {
        const compressedWords = [];
        this.index = this.unit;
        do {
            const target = this.nextTarget();
            if (this.standare === target) {
                this.repeatCount++;
                continue;
            }

            compressedWords.push(this.compressString());

            this.nextStandare();
        } while (this.index < this.origin.length && (this.index += this.unit));

        return compressedWords.join('');
    }
}

console.log(solution('aabbaccc'));
console.log(solution('ababcdcdababcdcd'));
console.log(solution('abcabcdede'));
console.log(solution('abcabcabcabcdededededede'));
console.log(solution('xababcdcdababcdcd'));
