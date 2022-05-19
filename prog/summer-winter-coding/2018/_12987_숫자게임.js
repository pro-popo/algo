/**
 * 2xN명의 사원들은 N명씩 두 팀으로 나눠 숫자 게임을 하려고 한다.
 * 두 개의 팀을 각각 A팀과 B팀이라고 하자.
 * - 모든 사원이 무작위로 자연수를 하나씩 부여받는다.
 * - 각 사원은 딱 한 번씩 경기를 한다.
 * - 각 경기당 A팀과 B팀에서 각각 한 사원이 나와 서로의 수를 공개한다.
 *   이때, 숫자가 큰 쪽이 승리하며 승점을 1점 얻게 된다.
 * - 만약 숫자가 같다면 누구도 승점을 얻지 않는다.
 *
 * A팀은 빠르게 출전순서를 정했고, 이를 B팀에게 공개한다.
 * B팀은 그것을 보고 자신들의 최종 승점을 가장 높이는 방법으로 출전 순서를 정한다.
 * 이때, B팀이 얻는 승점을 구하자.
 *
 * @param {array} A - A 팀원들이 부여받은 수 (출전 순서)
 * @param {array} B - B 팀원들이 부여받은 수
 *                    길이: 1~100_000, 값: 1~1_000_000_000
 * @returns {number} - B 팀원들이 얻을 수 있는 최대 승점
 */

function solution(A, B) {
    A.sort(DESC_NUMBER);
    B.sort(ASC_NUMBER);

    A.forEach(score => {
        const otherScore = B.pop();
        if (score < otherScore) return;
        B.push(otherScore);
    });

    return A.length - B.length;
}

const ASC_NUMBER = (a, b) => a - b;
const DESC_NUMBER = (a, b) => b - a;

/****** TEST CASE *******/

console.log(solution([5, 1, 3, 7], [2, 2, 6, 8]));
console.log(solution([2, 2, 2, 2], [1, 1, 1, 1]));
