/**
 * 비밀지도는 숫자로 암호화되어 있어 위치를 확인하기 위해서는 암호를 해독해야 한다.
 * 지도 암호를 해동하는 방법은 다음과 같다.
 * 1. 지도는 N x N 크기로, 공백 또는 벽("#")이다.
 * 2. 전체 지도는 두 장의 지도를 겹쳐서 얻을 수 있다.
 *    두 지도 중 어느 하나라도 벽이라면, 전체 지도에서도 벽이다.
 * 3. 두 지도는 각각 정수 배열로 암호화되어 있다.
 * 4. 암호화된 배열은 지도의 각 가로줄에서 벽을 1, 공백을 0으로 부호화했을 때 얻어지는 이진수에 해당하는 값의 배열이다.
 *
 * 비밀지도의 암호를 해독하는 작업을 도와줄 프로그램을 작성하자.
 *
 * @param {*} n 지도의 한 변 크기(1~16)
 * @param {*} arr1 정수 배열
 * @param {*} arr2 정수 배열
 * @returns 원래의 비밀지도를 해독하여 "#"와 ""으로 구성된 문자열 배열
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저 A지도와 B지도를 합쳐 하나의 지도로 반환한다.
 *   이때, A지도의 숫자와 B지도의 숫자를 OR 연산하여 합칠 수 있다.
 *
 *   지도의 숫자들을 이진수로 바꾼 뒤, 각 이진수의 길이를 전부 통일한다.
 *   그 다음, 이진수를 " " 혹은 "#"로 바꿔서 출력한다.
 *
 * - 처음에는,
 *   각 지도들의 숫자를 이진수로 변환한 다음에,
 *   같은 위치의 숫자가 둘 다 0일 경우는 " ", 아니면 "#"를 출력하도록 작성하였다.
 */

function solution(n, arr1, arr2) {
    const map = joinMap(arr1, arr2);
    return decodeMap(map);
}

function joinMap(arr1, arr2) {
    return arr1.map((_, i) => arr1[i] | arr2[i]);
}

function decodeMap(map) {
    return map
        .map(convertToBinary)
        .map(binary => binary.padStart(map.length, '0'))
        .map(convertToString);
}

function convertToBinary(number) {
    return number.toString(2);
}

function convertToString(str) {
    return str.replace(/0/g, ' ').replace(/1/g, '#');
}

/****** TEST CASE *******/

console.log(solution(5, [9, 20, 28, 18, 11], [30, 1, 21, 17, 28]));
console.log(solution(6, [46, 33, 33, 22, 31, 50], [27, 56, 19, 14, 14, 10]));
