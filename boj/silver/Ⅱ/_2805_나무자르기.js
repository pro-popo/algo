/**
 * 상근이는 나무 M미터가 필요하다.
 * 상근이는 목재절단기를 이용해서 나무를 구하고자 한다.
 *
 * 먼저, 상근이는 절단기에 높이 H를 지정한다.
 * 높이 지정 후, 톱날이 땅으로부터 H미터 위로 올라간다.
 * 그리고 한 줄에 연속해있는 나무를 모두 절단한다.
 *
 * 따라서, 높이가 H보다 큰 나무는 H 위의 부분이 잘리고
 * 높이가 H보다 낮은 나무는 잘리지 않는다.
 *
 * 예로, 나무의 높이가 20, 15, 10, 17인 경우,
 * 높이를 15로 지정하면 나무를 자른 후 길이가 5인 나무와 2인 나무를 들고 집에 갈 것이다.
 *
 * 상근이는 나무를 필요한 만큼만 집으로 가져가고자 한다.
 * 이때, 적어도 M미터의 나무를 집에 가져가기 위해 절단기에 설정할 수 있는 높이의 최댓값을 구하자.
 *
 * @param {number} N - 나무의 수 (1~1,000,000)
 * @param {number} M - 필요한 나무의 길이 (1~2,000,000,000)
 * @param {number[]} trees - 나무의 높이들 (0~1_000_000_000)
 * @return - 적어도 M미터의 나무를 집에 가져가기 위해 절단기에 설정할 수 있는 높이의 최댓값
 */
function solution(N, M, trees) {
    let [min, max] = [0, 1_000_000_000];
    let answer = 0;
    while (min <= max) {
        const mid = Math.floor((min + max) / 2);
        if (cutTrees(mid, trees) >= M) {
            min = mid + 1;
            answer = mid;
            continue;
        }
        max = mid - 1;
    }
    return answer;
}

function cutTrees(cutter, trees) {
    return trees.reduce(
        (sum, tree) => sum + (tree - cutter > 0 ? tree - cutter : 0),
        0,
    );
}

function input(test) {
    const fs = require('fs');
    const data = (
        process.platform === 'linux'
            ? fs.readFileSync('/dev/stdin').toString().trim()
            : test
    ).split('\n');
    const [[N, M], trees] = data.map(data => data.split(' ').map(Number));
    return [N, M, trees];
}

/****** TEST CASE *******/

const TEST1 = `4 7
20 15 10 17`;

const TEST2 = `5 20
4 42 40 26 46`;

console.log(solution(...input(TEST1)));
console.log(solution(...input(TEST2)));
