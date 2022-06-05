/**
 * 여러 이름을 포함한 배열에서의 김서방("Kim")의 위치(x)를 찾자.
 *
 * @param {string[]} seoul - 여러 이름을 포함한 배열
 * @returns {string} - "김서방은 x에 있다"
 */

function solution(seoul) {
    const index = seoul.findIndex(name => name === 'Kim');
    return `김서방은 ${index}에 있다`;
}

/****** TEST CASE *******/

console.log(solution(['Jane', 'Kim']));
