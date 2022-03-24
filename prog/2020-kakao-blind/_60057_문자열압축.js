/**
 * 문자열에서 같은 값이 연속해서 나타는 것을 그 문자의 개수와 반복되는 값으로 표현하여
 * 더 짧은 문자열로 줄여서 표현하고자 한다.
 *
 * 단, 문자열 1개 이상의 단위로 잘라서 더 짧은 문자열로 표현할 수 있는지 방법을 찾아야 한다.
 * 만약, 해당 단위로 자르고 마지막에 남은 문자열이 있다면, 그대로 붙여주면 된다.
 *
 * @param {*} s 압축할 문자열 (1~1_000)
 * @returns 압축한 문자열 중 가장 짧은 것의 길이
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   1~s.length까지의 단위로 문자열 압축을 시작한다.
 *   앞에서부터 순차적으로 해당 단위만큼 문자열을 잘라
 *   기준이 되는 문자열과 동일한 문자열이 몇 개인지 센다.
 *   만약 기준이 되는 문자열과 동일하지 않다면,
 *   해당 문자열을 새로운 기준으로 저장한다.
 *   위의 과정을 모든 문자를 순회할 때까지 반복한다.
 *
 * - 문자열의 길이가 길지 않아서 단위의 범위를 s.length로 잡아도 되지만,
 *   s.length/2까지 비교해도 된다.
 *   단위가 s.length/2 이상인 경우의 압축된 문자열의 길이는, s.length의 길이와 동일하기 때문이다.
 */

function solution(s) {
    return Math.min(
        Number.MAX_VALUE,
        ...[...s].map(
            (_, index) =>
                new Compression(s, index + 1).startCompression().length,
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
        return (this.index += this.unit);
    }

    get target() {
        return this.origin.slice(this.index, this.index + this.unit);
    }

    nextStandare() {
        this.standare = this.target;
        this.repeatCount = 1;
    }

    get compressString() {
        return (this.repeatCount === 1 ? '' : this.repeatCount) + this.standare;
    }
    startCompression() {
        const compressedWords = [];
        do {
            this.nextTarget();
            if (this.standare === this.target) {
                this.repeatCount++;
                continue;
            }

            compressedWords.push(this.compressString);
            this.nextStandare();
        } while (!this.isFinishCompression());

        return compressedWords.join('');
    }

    isFinishCompression() {
        return this.index >= this.origin.length;
    }
}

console.log(solution('ababcdcdababcdcd'));
console.log(solution('abcabcdede'));
console.log(solution('abcabcabcabcdededededede'));
console.log(solution('xababcdcdababcdcd'));
