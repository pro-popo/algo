/**
 * 학생들을 더욱 효율적으로 관리하기 위해 학생마다 고유한 학생 번호를 부여하고자 한다.
 * 학생 번호는 0~9사이의 숫자로 이루어진 문자열로,
 * 모든 학생들의 학생 번호는 서로 다르지만 그 길이는 모두 같다.
 *
 * 이때, 뒤에서 k자리만 추려서 남겨 놓았을 때,
 * 모든 학생들의 학생 번호를 서로 다르게 만들 수 있도록 하는 최소의 k를 구하자.
 *
 * @param {number} N - 학생의 수 (2~1_000)
 * @param {string[]} students (문자열 길이: ~100)
 */

function solution(N, students) {
    const MAX_LENGTH = students[0].length;

    for (let i = MAX_LENGTH - 1; i >= 0; i--) {
        const set = new Set(students.map(student => student.slice(i)));
        if (set.size === N) return MAX_LENGTH - i;
    }
}

function input(test) {
    const fs = require('fs');
    const data = (
        process.platform === 'linux'
            ? fs.readFileSync('/dev/stdin').toString().trim()
            : test
    ).split('\n');

    return [+data.shift(), data];
}

/****** TEST CASE *******/

const TEST1 = `3
1212345
1212356
0033445`;

console.log(solution(...input(TEST1)));
