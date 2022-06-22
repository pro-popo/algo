/**
 * 재현이는 잘못된 수를 부를 때마다 0을 외쳐서, 가장 최근에 재민이가 쓴 수를 지우게 시킨다.
 * 재민이는 이렇게 모든 수를 받아 적은 후, 그 수의 합을 알고 싶어 한다.
 *
 * @param {number[]} numbers - 재현이가 부른 숫자들 (0~1,000,000)
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
