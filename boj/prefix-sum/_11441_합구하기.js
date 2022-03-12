/**
 * i번째 수부터 j번째 수까지의 합을 구하는 프로그램을 작성하자.
 * 이때, N개의 숫자들, M개의 구간들이 입력으로 주어진다.
 *
 * @param {*} ([numbers, ranges]) [수들의 배열, 구간(i, j)]
 * @returns i번째 수부터 j번째 수까지의 합
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   우선, N개의 숫자들에 대하여 누적합을 구한다.
 *   이때, 현재 숫자에 이전 숫자를 더한 값을 저장하면 된다.
 *
 *   그리고 위의 배열을 활용하여 [i,j]에 대한 구간 합을 구한다.
 *   누적합[j] - 누적합[i-1]을 계산하면 i ~ j까지의 합을 구할 수 있다.
 *   0~j가지의 합에서 0~(i-1)까지의 누적합을 빼면, i~j에 대한 누적합이 나오기 때문이다.
 *
 * - M개의 구간을 단순히 숫자를 하나씩 더하게 되면 O(N*M)으로,
 *   최악의 경우 10_000_000_000 이다.
 *
 *   하지만 먼저 구간합을 구하게 되면,
 *   (i,j)의 합을 구할 때 O(1)로 구할 수 있다. => O(N+M)
 *
 * - [i, j]에 대한 구간합을 구할 때마다
 *   console.log로 바로 출력하면 시간초과가 발생한다.
 *   이 경우, 구간합을 구해서 하나의 문자열로 이은 다음에 출력하면 시간을 단축할 수 있다.
 *
 */
function solution([numbers, ranges]) {
    const cumulativeSum = calculateCumulativeSum(numbers);
    return ranges
        .map(([start, end]) => cumulativeSum[end] - cumulativeSum[start - 1])
        .join('\n');
}

function calculateCumulativeSum(numbers) {
    const cumulativeSum = [0, ...numbers];
    for (let i = 1; i < cumulativeSum.length; i++) {
        cumulativeSum[i] += cumulativeSum[i - 1];
    }
    return cumulativeSum;
}

function input(test) {
    const fs = require('fs');
    const stdin = (
        process.platform === 'linux'
            ? fs.readFileSync('/dev/stdin').toString().trim()
            : test
    ).split('\n');

    let [N, numbers, M, ...ranges] = stdin;
    numbers = numbers.split(' ').map(Number);
    ranges = ranges.map((range) => range.split(' ').map(Number));

    return [numbers, ranges];
}

const TEST1 = `5
10 20 30 40 50
5
1 3
2 4
3 5
1 5
4 4`;

const TEST2 = `3
1 0 -1
6
1 1
2 2
3 3
1 2
2 3
1 3`;

console.log(solution(input(TEST1)));
