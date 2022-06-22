/**
 * 재현이는 잘못된 수를 부를 때마다 0을 외쳐서, 가장 최근에 재민이가 쓴 수를 지우게 시킨다.
 * 재민이는 이렇게 모든 수를 받아 적은 후, 그 수의 합을 알고 싶어 한다.
 *
 * @param {number[]} numbers - 재현이가 부른 숫자들 (0~1,000,000)
 * @return - 재현이가 제대로 부른 수들의 합
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   스택을 활용하여 숫자들을 관리한다.
 *   numbers를 순회하여 순차적으로 스택에 숫자를 push한다.
 *   이때, 만약 현재 숫자가 0인 경우, 스택에서 숫자를 하나 꺼낸다.
 *   모든 순회를 마친 다음, 모든 숫자를 합한 값을 반환한다.
 */

function solution(numbers) {
    const stack = [];
    numbers.forEach(number => {
        if (number === 0) stack.pop();
        else stack.push(number);
    });

    return stack.reduce((sum, number) => sum + number, 0);
}

function input(test) {
    const fs = require('fs');
    const data = (
        process.platform === 'linux'
            ? fs.readFileSync('/dev/stdin').toString().trim()
            : test
    ).split('\n');

    return data.map(Number).slice(1);
}

const TEST1 = `4
3
0
4
0`;

console.log(solution(input(TEST1)));
