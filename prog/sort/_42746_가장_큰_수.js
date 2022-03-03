/**
 * - 정수를 이어 붙여 만들 수 있는 가장 큰 수 알아내기
 * @param {*} numbers 0 또는 양의 정수가 감긴 배열
 * @returns 가장 큰 수 (문자열 형태)
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   두 숫자를 이어 붙였을때 큰 숫자가 나오는 경우를 기준으로 numbers를 내림차순 한다.
 *
 * - 이 문제의 함정은 모든 number가 0인 경우이다.
 *   join('')으로 합칠경우, '0000'인 경우가 나오기 때문에
 *   마지막에 처리를 해줘야 한다.
 *
 * - 다른 풀이 방식 중,
 *   numbers를 문자열로 바꿀 필요없이,
 *   `${b}${a}`와 같이 템플릿 문자열을 활용하거나,
 *   b+''+a처럼 표현할 수 있다.
 */
function solution(numbers) {
    const answer = numbers
        .map(String)
        .sort((a, b) => b + a - (a + b))
        .join('');
    return +answer === 0 ? '0' : answer;
}

console.log(solution([0, 0, 0]));
console.log(solution([6]));
console.log(solution([3, 30, 34, 5, 9, 0]));
