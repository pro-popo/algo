/**
 * 정수 배열에서 서로 다른 인덱스에 있는 두 개의 수를 뽑아 더해서
 * 만들 수 있는 모든 수의 배열에 오름차순으로 담아 반환한다.
 *
 * @param numbers 정수 배열
 * @returns 만들 수 있는 모든 수의 배열 (오름차순)
 */

function solution(numbers) {
    const N = numbers.length;
    const answer = new Set();

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (i === j) continue;
            answer.add(numbers[i] + numbers[j]);
        }
    }

    return [...answer].sort((a, b) => a - b);
}

console.log(solution([2, 1, 3, 4, 1]));
