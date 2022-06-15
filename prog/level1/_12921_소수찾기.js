/**
 * 1부터 n 사이에 존재하는 소수의 개수를 반환하자.
 * 소수는 1과 자기 자신으로만 나누어지는 수를 의미한다.
 *
 * @param {number} n (2~1000000)
 * @returns - 1 ~ n 사이의 소수 개수
 *
 * ### 리뷰
 * - 풀이 방법은 다음과 같다.
 *   에라토스테네스의 체를 활용하여 1 ~ n까지의 소수를 구할 수 있다.
 *   먼저 2~N까지 소수에 포함한다.
 *   그 다음 i=2부터 √N까지 반복하여,
 *   i를 제외한 i의 배수들을 소수에서 제외한다.
 *   즉, i가 2인 경우, 2의 배수인 값은 전부 소수에서 제외하는 것이다.
 *
 * - 처음에는,
 *   2~N까지 순회하여 해당 숫자가 소수인지 확인했다.
 *   숫자 K가 소수인지 확인하는 방법은,
 *   i~√K까지 반복하여 K를 i로 나눴을 때의 나머지를 확인했다.
 *   이때 나머지가 0인 경우, 1과 자신 이외의 약수가 존재한다는 의미하므로 소수가 아니다.
 *   위 방법은 효율성 문제 2,4번에서 시간 초과가 발생했다.
 *
 * - 소수인지 확인할 때 √N까지만 확인하는 이유는 다음과 같다.
 *   x * y = N일 때, (x,y는 N의 약수)
 *   x는 √N와 같거나 작은 경우, y는 √N보다 클 수 밖에 없다.
 *   따라서, 불필요한 계산을 줄이고자 √N까지만 확인한다.
 */

function solution(n) {
    return countPrimeNumbers(n);
}

function countPrimeNumbers(n) {
    const isPrime = Array(n + 1).fill(true);
    isPrime[0] = isPrime[1] = false;

    for (let i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (let j = 2; i * j <= n; j++) {
                isPrime[i * j] = false;
            }
        }
    }

    return isPrime.filter(number => number).length;
}

/****** TEST CASE *******/

console.log(solution(10));
console.log(solution(5));
