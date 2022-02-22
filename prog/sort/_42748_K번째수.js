/**
 * [SORT] K번째수
 * ### 문제
 * i번째 숫자부터 j번째 숫자까지 배열을 자르고 정렬한 후,
 * K번째 있는 수 구하기
 * 
 * ✅ 주의할 점
 * - Array.prototype.sort()의 기본 정렬 순서는 문자열 유니코드의 코드 포인터를 따른다.
 * - [EX] [1,1000,2].sort() => [1,1000,2]
 */

function solution(array, commands) {
    return commands.map(command => {
        const [start, end, findIdx] = command;
        return array.slice(start - 1, end).sort((a, b) => a - b)[findIdx - 1];
    })
}
console.log(solution([1, 5, 2, 6, 3, 7, 4], [[2, 5, 3], [4, 4, 1], [1, 7, 3]]))
