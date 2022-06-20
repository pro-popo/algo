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
    let arr = [...Array(n)].map((_, idx) => idx + 1);
    while (--k > 0) nextPermutation(arr);
    return arr;
}

function nextPermutation(arr) {
    const n = arr.length;
    let top = n - 1;
    while (top > 0 && arr[top - 1] >= arr[top]) top--;

    if (top === 0) return;

    let target = n - 1;
    while (arr[top - 1] >= arr[target]) target--;
    swap(top - 1, target);

    let k = n - 1;
    while (top < k) {
        swap(top, k);
        top++;
        k--;
    }

    function swap(i, j) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

/****** TEST CASE *******/

console.log(solution(3, 5));
