/**
 * 0부터 9까지의 일부 숫자가 들어있는 numbers 배열이 있다.
 * 이때 numbers에 포함되지 않은 숫자들을 모두 더하자.
 * @param {*} numbers
 * @returns numbers에 미포함된 숫자들의 합
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   0~9까지의 모든 수의 합과 numbers의 모든 수의 합을 빼준다.
 *
 * - 다른 풀이 방식으로는,
 *   0~9까지 더할 때, numbers에 포함된 숫자는 제외하고 더한다.
 */

function solution(numbers) {
    const originNumbers = [...Array(10)].map((_, number) => number);
    return sumAll(originNumbers) - sumAll(numbers);
}

function sumAll(numbers) {
    return numbers.reduce((sum, number) => sum + number, 0);
}

/****** TEST CASE *******/

console.log(solution([1, 2, 3, 4, 6, 7, 8, 0]));
console.log(solution([5, 8, 4, 0, 6, 7, 9]));
