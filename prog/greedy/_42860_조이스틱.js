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
    const conversions = startConvert(name);
    const moves = startMove(name);
    return conversions + moves;
}

function startConvert(name) {
    return [...name].reduce((sum, target) => {
        const upConversion = target.charCodeAt() - 'A'.charCodeAt();
        const downConversion = 'Z'.charCodeAt() - target.charCodeAt() + 1;
        return sum + Math.min(upConversion, downConversion);
    }, 0);
}

function startMove(name) {
    let min = name.length - 1;
    for (let i = 1, length = name.length; i < length; i++) {
        if (name[i] !== 'A') continue;

        let start = i;
        while (i < length && name[i] === 'A') i++;
        let end = i - 1;

        const [left, right] = [length - end - 1, start - 1];
        min = Math.min(
            min,
            countingMoves(left, right),
            countingMoves(right, left),
        );
    }
    return min;
}

function countingMoves(firstDirection, secondDirection) {
    const turn = secondDirection >= 0 ? 2 : 1;
    return firstDirection * turn + secondDirection;
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
