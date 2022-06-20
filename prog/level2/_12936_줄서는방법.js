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
    const factorial = Array(n);
    factorial[0] = 1;
    for (let i = 1; i <= n; i++) {
        factorial[i] = factorial[i - 1] * i;
    }

    k--;
    let arr = [...Array(n)].map((_, idx) => idx + 1);
    const answer = [];
    while (arr.length) {
        const i = Math.floor(k / factorial[arr.length - 1]);
        k %= factorial[arr.length - 1];

        answer.push(arr[i]);
        arr.splice(i, 1);
    }

    return answer;
}

/****** TEST CASE *******/

console.log(solution(3, 5));
