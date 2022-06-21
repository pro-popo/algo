/**
 * 두 수를 입력받아 두 수의 최대공약수와 최소공배수를 반환하자.
 *
 * @param {number} n (1~1_000_000)
 * @param {number} m
 * @returns - [최대공약수, 최소공배수]
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   유클리드 호제법을 활용하여 최대공약수와 최소공배수를 구할 수 있다.
 *
 *   [최대공약수]
 *   2개의 자연수 a,b에 대하여
 *   a를 b로 나눈 나머지를 r이라고 하면,
 *   a와 b의 최대공약수는 b와 r의 최대공약수와 같다.
 *   이때, 나머지가 0일 될 때까지 위 과정을 반복하여
 *   나누는 수가 a와 b의 최대공약수가 된다.
 *   예로 2와 5의 경우,
 *   2 % 5 = 1
 *   5 % 1 = 0 => 최대공약수: 1
 *
 *   [최소공배수]
 *   최대공약수를 구했다면, 이를 활용하여 최소공배수도 구할 수 있다.
 *   두 수 곱을 최대공약수를 나눈 값이 최소공배수가 된다.
 *   a * b / GCD(a, b)
 *
 * - 참고로, 유클리드 호제법의 시간복잡도가 O(logN)이다.
 *   단순히 반복문을 통해 최대공약수를 구할 경우, 시간복잡도는 O(N)이 된다.
 */

function solution(n, m) {
    return [GCD(n, m), LCM(n, m)];
}

function GCD(num1, num2) {
    if (num2 === 0) return num1;
    return GCD(num2, num1 % num2);
}

function LCM(num1, num2) {
    return (num1 * num2) / GCD(num1, num2);
}

/****** TEST CASE *******/

console.log(solution(3, 12));
console.log(solution(2, 5));
