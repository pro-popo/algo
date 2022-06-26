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
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   학생 번호들을 순회하면서 k만큼 뒤에서부터 문자열을 자른다.
 *   (String.slice 메서드 활용)
 *   자른 문자열들을 Set 객체에 저장하여,
 *   학생 번호가 모두 다른 경우, 즉 해당 Set 객체의 크기가 학생의 수와 동일한 경우를 찾는다.
 *
 *   이때, 해당 조건을 만족하는 최소 k를 구하기 위해서
 *   자른 문자열의 길이가 1인 경우부터 검사한다.
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
