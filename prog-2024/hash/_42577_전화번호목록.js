/**
 * 한 번호가 다른 번호의 접두어인 경우가 있는지 확인
 *
 * @param {string[]} phone_book 전화번호를 담은 배열
 * @returns 어떤 번호가 다른 번호의 접두어인 경우 false
 */

function solution(phone_book) {
    return phone_book
        .sort()
        .slice(0, -1)
        .every((phone, idx) => !phone_book[idx + 1].startsWith(phone));
}

console.log(solution(['119', '97674223', '1195524421']));
console.log(solution(['123', '456', '789']));
console.log(solution(['12', '123', '1235', '567', '88']));
