/**
 * 양의 정수 n을 k진수로 바꿨을 때, 변환된 수 안에 조건에 맞는 소수가 몇 개 인가?
 * - 소수 양쪽에 0이 있는 경우 0P0
 * - 소수 오른쪽에만 0이 있고 왼쪽에는 아무것도 없는 경우 P0
 * - 소수 왼쪽에만 0이 있고 오른쪽에는 아무것도 없는 경우 0P
 * - 소수 양쪽에 아무것도 없는 경우 P
 * - P는 각 자릿수에 0을 포함하지 않음 101(X)
 *
 * @param {*} n 1~1_000_000
 * @param {*} k 3~10
 * @returns 위 조건에 맞는 소수의 개수
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   n을 k진수로 변환한 다음, "0"을 기준으로 숫자를 나눈다.
 *   나눈 숫자들을 순회하여 그 중 소수인 값만 찾아낸다.
 *
 * - P에 대한 조건이 많아 보여서 복잡해 보이지만,
 *   결국엔 0을 기준으로 잘라내면 모든 조건을 충족시킬 수 있다.
 *
 * - 이 문제의 핵심은 소수를 구하는 방법이다.
 *   잘못 소수를 구하면 시간초과(테케 1번)가 발생할 수 있다.
 *   [시간초과 테케] n = 797161 k = 3인 경우, 1111111111111로 변환
 *
 *   + 단순히 2~N-1까지 확인할 경우, 시간초과가 발생한다. => O(N)
 *   + N/2까지 확인하는 경우도 시간초과가 발생한다. => O(N), 상수는 제외
 *   + 약수의 중앙값을 구하는, √N까지 확인하면 시간을 단축할 수 있다! => O(√N)
 *
 * - N의 제곱근을 구할 때는 Math.sqrt를 활용해도 된다.
 *
 */

function solution(n, k) {
    const numbers = n.toString(k).split('0');
    return numbers.map(Number).filter(isPrime).length;
}

function isPrime(number) {
    if (number < 2) return false;
    for (let i = 2; i * i <= number; i++) {
        if (number % i === 0) return false;
    }
    return true;
}

console.log(solution(437674, 3));
console.log(solution(110011, 10));
