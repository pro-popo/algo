/**
 * n개의 음이 아닌 정수들의 순서를 바꾸지 않고
 * 적절하게 더하거나 빼서
 * 타겟 넘버를 생성하는 방법의 수를 구하자
 *
 *
 * @param {*} numbers :사용할 수 있는 숫자들의 배열
 * @param {*} target  :타겟 넘버
 * @returns  :타겟 넘버를 만드는 방법의 수
 */

let N = 0;
let targetCount = 0;

function solution(numbers, target) {
    N = numbers.length;
    targetCount = 0;

    dfs(numbers, 0, 0, target, targetCount);

    return targetCount;
}

function dfs(numbers, sum, index, target) {
    if (index == N) {
        if (sum === target) targetCount++;
        return;
    }
    dfs(numbers, sum + numbers[index], index + 1, target);
    dfs(numbers, sum - numbers[index], index + 1, target);
}

console.log(solution([1, 1, 1, 1, 1], 3));
console.log(solution([4, 1, 2, 1], 4));
