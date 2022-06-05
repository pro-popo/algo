/**
 * 각 문자열의 인덱스 n번째 글자를 기준으로 오름차순 정렬을 하고자 한다.
 * 이때, n번째 글자가 동일할 경우, 문자열을 사전순으로 정렬한다.
 *
 * @param {string[]} strings - 문자열들
 *                      길이: 1~50, 원소의 길이: 1~100
 * @param {number} n - 인덱스 n
 * @returns 조건에 맞게 정렬한 문자열들
 */

function solution(strings, n) {
    return strings.sort((s1, s2) => {
        const compareResult = s1[n].localeCompare(s2[n]);
        if (compareResult === 0) return s1.localeCompare(s2);
        return compareResult;
    });
}

/****** TEST CASE *******/

console.log(solution(['sun', 'bed', 'car']));
console.log(solution(['abce', 'abcd', 'cdx']));
