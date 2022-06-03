/**
 * 가운데를 말해요 게임의 규칙은 다음과 같다.
 * - 백준이는 임의의 정수를 하나씩 말한다.
 * - 동생은 백준이가 지금까지 말한 수 중에서 중간값을 말한다.
 *   만약 외친 수의 개수가 짝수개라면 중간에 있는 두 수 중에서 작은 수를 말한다.
 *
 * @param {} input - N: 1~100,000
 */

function solution(input) {
    const [, numbers] = [input.shift(), input.map(Number)];

    const maxHeap = [];
    const minHeap = [];
    let answer = '';
    numbers.forEach(number => {
        if (maxHeap.length === minHeap.length) {
            maxHeap.push(number);
            maxHeap.sort((a, b) => a - b);
        } else {
            minHeap.push(number);
            minHeap.sort((a, b) => a - b);
        }

        if (maxHeap[0] > minHeap[0]) {
            [maxHeap[0], minHeap[0]] = [minHeap[0], maxHeap[0]];
        }

        answer += maxHeap[maxHeap.length - 1] + '\n';
    });

    return answer;
}

const input = testCase => {
    const fs = require('fs');
    return (
        process.platform === 'linux'
            ? fs.readFileSync('/dev/stdin').toString()
            : testCase
    )
        .trim()
        .split('\n');
};

/****** TEST CASE *******/

const testCase = `7
1
5
2
10
-99
7
5`;
console.log(solution(input(testCase)));
