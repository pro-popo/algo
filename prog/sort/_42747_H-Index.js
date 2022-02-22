/**
 * [SORT] H-Index
 * ### 문제
 * - H-Index : 과학자의 생산성과 영향력을 나타내는 지표
 * - H-Index를 나타내는 h 구하기
 * 
 * ### 조건
 * - 논문 n편 중, 
 * - h번 이상 인용된 논문이 h편 이상
 * - 나머지 논문이 h번 이하로 인용되었다면, h의 최댓값이 H-Index
 */
function solution(citations) {
    return citations.sort((a, b) => b - a)
        .filter((citation, idx) => citation >= idx + 1).length;
}

console.log(solution([3]))
console.log(solution([1, 3, 5, 6]))
// 6 5 3 1

