/**
 * 조이스틱으로 알파벳 이름을 완성하자.
 * 맨 처음에는 A로만 이루어져 있다.
 * - 위: 다음 알파벳
 * - 아래: 이전 알파벳 (A->Z)
 * - 왼: 커서 왼쪽이동
 * - 오: 커서 오른쪽이동
 *
 * @param {*} name
 * @returns
 */
function solution(name) {
    const conversion = minConversion(name);
    const move = minMove(name);
    return conversion + move;
}

function minConversion(name) {
    return [...name].reduce((sum, target) => {
        const upConversion = target.charCodeAt() - 'A'.charCodeAt();
        const downConversion = 'Z'.charCodeAt() - target.charCodeAt() + 1;
        return sum + Math.min(upConversion, downConversion);
    }, 0);
}

function minMove(name) {
    const { start, end } = findMaxSkipLocation(name);
    if (start === -1) return name.length - 1;

    const [left, right] = [name.length - 1 - end, start - 1];
    return countingMove(Math.min(left, right), Math.max(left, right));
}

function findMaxSkipLocation(name) {
    let current = { start: -1, skip: 0 };
    let max = { ...current, end: 0 };

    [...name].forEach((alphabet, index) => {
        if (index === 0) return;
        if (alphabet === 'A') {
            current.skip++;
            if (current.start === -1) current.start = index;
            return;
        }

        if (
            current.skip > max.skip ||
            (current.skip === max.skip && max.start !== 1)
        ) {
            max = { ...current, end: index - 1 };
        }
        current = { start: -1, skip: 0 };
    });

    if (current.skip >= max.skip) {
        max = { ...current, end: name.length - 1 };
    }
    return max;
}

function countingMove(first, second) {
    const turn = second > 0 ? 2 : 1;
    return first * turn + second;
}

console.log(solution('AAA')); // 0
console.log(solution('BBB')); // 5
console.log(solution('BAAABBBAA')); // 9
console.log(solution('BBAAAB')); // 6
console.log(solution('BBBAAB')); // 8
console.log(solution('M')); // 12
console.log(solution('N')); // 13
console.log(solution('O')); // 12
console.log(solution('BAAABBBABAAAB')); // 15
console.log(solution('BABB')); // 5
