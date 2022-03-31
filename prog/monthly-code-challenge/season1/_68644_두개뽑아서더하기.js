/**
 * 정수 배열에서 서로 다른 인덱스에 있는 두 개의 수를 뽑아 더해서
 * 만들 수 있는 모든 수의 배열에 오름차순으로 담아 반환한다.
 *
 * @param numbers 정수 배열
 * @returns 만들 수 있는 모든 수의 배열 (오름차순)
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   이중 for문으로 모든 수를 순회하여, (완전탐색)
 *   두 개의 수를 더해서 만들 수 있는 모든 수를 배열에 저장한다.
 *   이때, 중복 값을 제거하기 위해 Set 객체를 사용할 수 있다.
 *
 * - 정수 배열 원소의 개수가 최대 100이라 완전 탐색으로도 충분히 풀 수 있는 문제다.
 *   중복 수를 제거할 것이기 때문에, j의 시작값을 i+1로 두어도 된다.
 *   이 경우, 같은 원소인지 비교하는 조건문을 제거할 수 있다.
 */

function solution(numbers) {
    const answer = createNumbers(numbers);
    return answer.sort(ASC);
}

function createNumbers(numbers) {
    const newNumbers = new Set();

    const N = numbers.length;
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (i === j) continue;
            newNumbers.add(numbers[i] + numbers[j]);
        }
    }
    return [...newNumbers];
}

const ASC = (a, b) => a - b;

console.log(solution([2, 1, 3, 4, 1]));
