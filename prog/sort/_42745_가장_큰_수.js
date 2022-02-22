/**
 * [SORT] 가장 큰 수 
 * ### 문제
 * - 정수를 이어 붙여 만들 수 있는 가장 큰 수 알아내기
 * 
 */
function solution(numbers) {
    const answer = numbers.map(String)
        .sort((a, b) => (b + a) - (a + b))
        .join('');
    return +answer === 0 ? "0" : answer;
}

console.log(solution([6]))
console.log(solution([3, 30, 34, 5, 9, 0]))
