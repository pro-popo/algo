/**
 * n명의 사람이 일렬로 줄을 서고 있다.
 * n명의 사람들에게는 각각 1번부터 n번까지 번호가 매겨져 있다.
 * n명이 사람을 줄 서는 방법 중, k번째 방법을 반환하자.
 *
 * @param {*} n - 사람의 수 (~20)
 * @param {*} k - 자연수
 * @returns - 사람을 나열하는 방법을 사전 순으로 나열 했을 때의 k번째 방법
 */

function solution(n, k) {
    const factorial = initFactorial(n);

    let count = k - 1;
    const arr = [...Array(n)].map((_, idx) => idx + 1);
    const answer = [];
    while (arr.length) {
        const numberOfCases = factorial(arr.length - 1);
        const index = Math.floor(count / numberOfCases);
        count %= numberOfCases;

        answer.push(arr[index]);
        arr.splice(index, 1);
    }

    return answer;
}

function initFactorial(n) {
    const dp = Array(n);
    dp[0] = 1;

    for (let i = 1; i <= n; i++) {
        dp[i] = dp[i - 1] * i;
    }

    return number => dp[number];
}

/****** TEST CASE *******/

console.log(solution(3, 5));
