/**
 * n명의 사람이 일렬로 줄을 서고 있다.
 * n명의 사람들에게는 각각 1번부터 n번까지 번호가 매겨져 있다.
 * n명이 사람을 줄 서는 방법 중, k번째 방법을 반환하자.
 *
 * @param {*} n - 사람의 수 (~20)
 * @param {*} k - 자연수
 * @returns - 사람을 나열하는 방법을 사전 순으로 나열 했을 때의 k번째 방법
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   팩토리얼을 활용하여 k번째 방법에서 각 자릿수에 어떤 숫자가 오는지 계산할 수 있다.
 *
 *   먼저, n=3일 경우 [1,2,3]을 나열할 수 있는 방법은 다음과 같다.
 *   [1,2,3]
 *   [1,3,2]
 *   -------
 *   [2,1,3]
 *   [2,3,1]
 *   -------
 *   [3,1,2]
 *   [3,2,1]
 *
 *   이때, 맨 앞의 숫자별로 구간을 나누면
 *   각각 (3!/3), 즉 2개로 나뉜다.
 *   여기서 3!/3은 (3-1)!와 동일하다.
 *   즉, 구간별로 총 (n-1)!개씩 나뉘는 것을 알 수 있다.
 *
 *   위의 원리를 활용하여 k번째 방법에서 각 원소에 어떤 숫자가 올 수 있는지 구할 수 있다.
 *   arr = [1,2,3]이고 k=5일 경우, [3,1,2]이다.
 *   먼저 0번째 인덱스의 숫자가 무엇인지 알기 위해서
 *   k를 구간별 개수로 나눈 값으로 알 수 있다.
 *   이때, k가 아닌 k-1부터 시작한다.
 *   4 / (arr.length-1)! = 4 / 2! = 2
 *   즉, 5번째 방법의 0번째 인덱스의 숫자는 [1,2,3]의 2번째 인덱스의 숫자이다.
 *
 *   그리고 k는 구간별 개수로 나눈 나머지 값을 저장한다.
 *   k %= 2! (k = 0)
 *
 *   또한 arr은 2번째 인덱스를 제외한 숫자들로 갱신한다. (사용한 숫자 제외)
 *   arr = [1,2]
 *
 *   그 다음, 위 과정과 동일한 방법으로 1번째 인덱스를 구한다. (k = 0, arr = [1,2], answer = [3])
 *   0 / 1! = 0
 *   즉, 1번째 인덱스의 숫자는 [1,2]의 0번째 인덱스의 숫자이다.
 *   k = 0 % 1 = 0
 *   arr = [2]
 *
 *   마지막으로 2번째 인덱스는, (k = 0, arr = [2], answer = [3,1])
 *   [2]의 0번째 인덱스의 숫자가 된다.
 *
 *   위 과정을 통해 k번째 방법의 원소들을 찾을 수 있다.
 *
 * - 처음에는 순열과 Next Permutation을 통해 K번째 방법을 구했지만,
 *   효율성 문제에서 시간초과가 발생했다. 😂
 *   결국 시간 문제를 해결하지 못하고 다른 풀이를 참고했다.
 *   팩토리얼을 통해 문제를 접근하는 방식이 정말 신기했다. 👍
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
