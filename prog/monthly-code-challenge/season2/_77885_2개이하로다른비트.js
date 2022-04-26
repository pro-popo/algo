/**
 * 함수 f(x)를 다음과 같이 정의한다.
 * - x보다 크고 x와 비트가 1~2개 다른 수들 중에서 제일 작은 수
 *   [EX] f(2) = 3
 *        f(7) = 11
 * @param {*} numbers 정수들이 담긴 배열
 * @returns 모든 수들에 대하여 각 수의 f값
 *
 * ### 리뷰
 * - 풀이 방법은 다음과 같다.
 *   만약 해당 숫자가
 *   - 짝수인 경우,
 *     (숫자 + 1)을 반환한다.
 *
 *   - 홀수인 경우,
 *     먼저 숫자를 2진수로 변환한다.
 *     그 다음, 0이 마지막으로 나타나는 위치를 찾아서
 *     해당 위치를 1로 바꾸고, 그 다음 위치를 0으로 바꾼다.
 *     이때, 만약 모든 숫자가 1인 경우, 맨 앞에 0을 추가한 뒤 위 과정을 진행한다.
 *     마지막으로 수정한 2진수를 10진수로 변환한 뒤 반환한다.
 *
 * - 비트의 규칙을 활용한 풀이법이다.
 *   숫자가 짝수인 경우,
 *   2 => 0010 , f(2) = 3 => 0011
 *   4 => 0100 , f(4) = 5 => 0101
 *   6 => 0110 , f(6) = 7 => 0111
 *   위처럼, 짝수의 최하위 비트는 무조건 0이며,
 *   최하위 비트 0을 1로 바꿔주면 조건을 만족하는 비트가 된다.
 *   즉, 해당 숫자보다 1이 큰 숫자가 정답이 된다.
 *
 *   숫자가 홀수인 경우,
 *   3 => 0011 , f(3) = 5 => 0101
 *   7 => 0111 , f(7) = 11 => 1011
 *   9 => 1001 , f(9) = 13 => 1010
 *   위처럼, 가장 최하위에 있는 0 비트를 1, 그 다음 비트를 0으로 바꾸면
 *   조건을 만족하는 비트가 된다.
 *
 * - 처음에는,
 *   해당 숫자보다 큰 숫자 중,
 *   2진수로 변환한 두 숫자를 비교하여 서로 다른 비트가 2개 이하인 숫자를 찾았다.
 *   그러나, 테스트케이스 10번/11번에서 시간초과가 발생했다. 😂
 */
function solution(numbers) {
    return numbers.map(f);
}

function f(number) {
    if (isEven(number)) return evenF();
    else return oddF();

    function evenF() {
        return number + 1;
    }

    function oddF() {
        let bit = convertToBinary(number);
        let lastZero = bit.lastIndexOf('0');
        if (lastZero === -1) {
            bit = '0' + bit;
            lastZero = 0;
        }

        const answer = [...bit];
        [answer[lastZero], answer[lastZero + 1]] = [1, 0];

        return convertToDecimal(answer.join(''));
    }
}

function isEven(number) {
    return number % 2 === 0;
}

function convertToDecimal(number) {
    return parseInt(number, 2);
}

function convertToBinary(number) {
    return number.toString(2);
}

/****** TEST CASE *******/

console.log(solution([1, 2, 7, 3]));
console.log(solution([21]));
