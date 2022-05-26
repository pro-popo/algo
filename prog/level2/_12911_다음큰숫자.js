/**
 * 자연수 n이 주어졌을 때, n의 다음 큰 숫자는 다음과 같이 정의된다.
 * 1. n의 다음 큰 숫자는 n보다 큰 자연수이다.
 * 2. n의 다음 큰 숫자와 n은 2진수로 변환했을 때 1의 갯수가 같다.
 * 3. n의 다음 큰 숫자는 1, 2번을 만족하는 수 중 가장 작은 수이다.
 *
 * 예로, 78(1001110)의 다음 큰 숫자는 83(1010011)이다.
 *
 * @param {number} n 자연수 (1,000,000)
 * @returns n의 다음 큰 숫자
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   n을 이진수로 변환하여 1의 개수를 센다.
 *   n보다 큰 숫자들을 순서대로 이진수로 변환하여 1의 개수를 센다.
 *   이때 n을 이진수로 변환했을 때의 1의 개수와 동일한 경우를 찾아,
 *   그 중 가장 작은 숫자를 반환한다.
 */

function solution(n) {
    const binary = new Binary(n);
    let target = n + 1;
    while (new Binary(target).numberOfOne !== binary.numberOfOne) target++;
    return target;
}

class Binary {
    constructor(number) {
        this.value = this.convertToBinary(number);
    }

    convertToBinary(number) {
        return number.toString(2);
    }

    get numberOfOne() {
        return this.value.match(/1/g).length;
    }
}

/****** TEST CASE *******/

console.log(solution(78));
console.log(solution(15));
