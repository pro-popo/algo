/**
 * n개의 정수들을 순서를 바꾸지 않고 적절하게 더하거나 빼서 타겟 넘버를 만들고자 한다.
 *
 * @param {number[]} numbers
 * @param {number} target
 * @returns _43165_타겟넘버의 수
 */

function solution(numbers, target) {
    let answer = 0;
    const dfs = (idx, sum) => {
        if (idx === numbers.length) {
            if (sum === target) answer++;
            return;
        }
        dfs(idx + 1, sum + numbers[idx]);
        dfs(idx + 1, sum - numbers[idx]);
    };
    dfs(0, 0);
    return answer;
}

console.log(solution([1, 1, 1, 1, 1], 3));
