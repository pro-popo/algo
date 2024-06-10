/**
 * 지갑의 크기를 정하고자 한다.
 * 모든 명함을 수납할 수 있는 지갑
 *
 * @param {number[][]} sizes 모든 명합의 가로 길이와 세로 길이
 * @returns 모든 명함을 수납할 수 있는 가장 작은 지갑
 */
function solution(sizes) {
    let [max, min] = [0, 0];
    sizes.forEach(size => {
        max = Math.max(max, ...size);
        min = Math.max(min, Math.min(...size));
    });
    return max * min;
}

console.log(
    solution([
        [60, 50],
        [30, 70],
        [60, 30],
        [80, 40],
    ]),
);

console.log(
    solution([
        [10, 7],
        [12, 3],
        [8, 15],
        [14, 7],
        [5, 15],
    ]),
);
