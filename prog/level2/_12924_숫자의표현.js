/**
 * 자연수 n을 연속한 자연수들로 표현하는 방법이 여러개가 존재한다.
 * 예로 15는,
 * - 1 + 2 + 3 + 4 + 5 = 15
 * - 4 + 5 + 6 = 15
 * - 7 + 8 = 15
 * - 15 = 15
 * 로 표현할 수 있다.
 *
 * 연속된 자연수들로 n을 표현하는 방법의 수를 구하자.
 *
 * @param {number} n - 자연수 (1~10,000)
 * @returns 연속된 자연수들로 n을 표현하는 방법의 수
 */

function solution(n) {
    const numbers = [...Array(n)].map((_, i) => i + 1);
    const sum = prefixSum(numbers);

    let [start, end] = [0, 0];
    let answer = 1;
    while (end < numbers.length) {
        const number = sum[end] - sum[start];
        if (number === n) answer++;

        if (number >= n) start++;
        else end++;
    }

    return answer;
}

function prefixSum(numbers) {
    const arr = [0, ...numbers];
    for (let i = 1; i < arr.length; i++) {
        arr[i] += arr[i - 1];
    }
    return arr;
}

/****** TEST CASE *******/

console.log(solution(15));
console.log(solution(3));
console.log(solution(4));
