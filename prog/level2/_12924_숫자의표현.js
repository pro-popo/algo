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
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저 0~n에 대한 배열을 생성한다.
 *   그리고 해당 배열의 누적합(prefix sum)을 구한다.
 *
 *   구간의 합이 n인 경우를 찾는 과정은 다음과 같다.
 *   두 개의 포인터(start, end)를 준비한다.
 *   (0, 0)에서 시작하여, start ~ end 구간의 합을 구한다.
 *   이때 start ~ end 구간의 합은 sum[end] - sum[start]이다.
 *
 *   만약 구간의 합이 n보다 크거나 같을 경우 start++을,
 *   n보다 작을 경우 end++을 해준다.
 *   end가 배열의 크기를 넘어갈 때까지 위의 과정을 반복한다.
 *   이 과정에서 구간의 합이 n인 경우를 센 뒤 반환한다.
 *
 * - 다른 풀이 방식으로는,
 *   1부터 n까지 순회하여
 *   i가 n의 약수이고 홀수(n%i == 0 && i%2 == 1)인 경우를 카운트하면 된다. 😱
 */

function solution(n) {
    const numbers = [...Array(n)].map((_, i) => i + 1);
    const prefix = prefixSum(numbers);

    let [start, end] = [0, 0];
    let answer = 0;
    while (end < prefix.length) {
        const sum = prefix[end] - prefix[start];
        if (sum === n) answer++;

        if (sum >= n) start++;
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
