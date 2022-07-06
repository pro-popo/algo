/**
 * 준규가 사는 나라는 우리가 사용하는 연도와 다른 방식을 사용한다.
 * 수 3개를 이용하여 연도를 나타낸다.
 * 각각의 수는 지구(E), 태양(S), 달(M)을 나타낸다.
 * 이 세 수는 서로 다른 범위를 가진다. (1 ≤ E ≤ 15, 1 ≤ S ≤ 28, 1 ≤ M ≤ 19)
 *
 * 우리의 1년은 준규가 살고있는 나라에서는 1 1 1로 나타낼 수 있다.
 * 1년이 지날 때마다, 세 수는 모두 1씩 증가한다. 만약 범위를 넘어가는 경우 1이 된다.
 *
 * 예로, 15년은 15 15 15로 나타낼 수 있다.
 * 16년은 16 16 16이 아닌, 1 16 16이 된다. (범위를 초과했기 때문)
 *
 * E,S,M이 주어졌을 때 우리가 알고 있는 연도로 몇 년인지 구하는 프로그램을 작성하자.
 *
 * @param {number} E - 지구
 * @param {number} S - 태양
 * @param {number} M - 달
 */
function solution(E, S, M) {
    let [e, s, m] = [1, 1, 1];
    let year = 1;

    while (e !== E || s !== S || m !== M) {
        if (++e > 15) e = 1;
        if (++s > 28) s = 1;
        if (++m > 19) m = 1;

        year++;
    }

    return year;
}

function input(test) {
    const fs = require('fs');
    const data =
        process.platform === 'linux'
            ? fs.readFileSync('/dev/stdin').toString().trim()
            : test;

    return data.split(' ').map(Number);
}

/****** TEST CASE *******/

const TEST1 = `1 16 16`;
const TEST2 = `1 1 1`;
const TEST3 = `1 2 3`;
const TEST4 = `15 28 19`;

console.log(solution(...input(TEST1)));
console.log(solution(...input(TEST2)));
console.log(solution(...input(TEST3)));
console.log(solution(...input(TEST4)));
