/**
 * n개의 음이 아닌 정수들의 순서를 바꾸지 않고
 * 적절하게 더하거나 빼서
 * 타겟 넘버를 생성하는 방법의 수를 구하자
 *
 *
 * @param {*} numbers :사용할 수 있는 숫자들의 배열
 * @param {*} target  :타겟 넘버
 * @returns  :타겟 넘버를 만드는 방법의 수
 *
 *
 * ### 리뷰
 * - 다른 사람 코드와 거의 유사하다!
 * - 전역변수(targetCount)을 어디에 둘지에 대해 고민을 했다.
 *   main함수에 두고 매개변수로 전달하면, 전달 인자가 너무 많아져 코드 복잡도가 높아졌다.
 *   전역변수로 분리하고자 외부에 배치했다. 대신, solution 함수에서 초기화 하는 추가 작업이 필요하다.
 *
 *   또 다른 방법으로는, dfs함수를 inner function로 작성하는 방법이 있을 것 같다!
 *   (많은 풀이 방식에서 이 방식을 선택했으나,
 *    내부 함수로 작성하면 오히려 함수를 분리하지 않는 것과 동일한 복잡도를 가진다는 생각이 들었다.)4
 *
 */

let targetCount = 0;

function solution(numbers, target) {
    targetCount = 0;

    dfs(numbers, 0, 0, target);
    return targetCount;
}

function dfs(numbers, sum, index, target) {
    if (index == numbers.length) {
        if (sum === target) targetCount++;
        return;
    }
    dfs(numbers, sum + numbers[index], index + 1, target);
    dfs(numbers, sum - numbers[index], index + 1, target);
}

console.log(solution([1, 1, 1, 1, 1], 3));
console.log(solution([4, 1, 2, 1], 4));
