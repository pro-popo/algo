/**
 * 조이스틱으로 알파벳 이름을 완성하자.
 * 맨 처음에는 A로만 이루어져 있다.
 * - 위: 다음 알파벳
 * - 아래: 이전 알파벳 (A->Z)
 * - 왼: 커서 왼쪽이동
 * - 오: 커서 오른쪽이동
 *
 * @param {*} name 만들고자 하는 이름
 * @returns 조이스틱 조작 횟수의 최솟값
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저, 알파벳을 변환한다.
 *   이때, 위(A~target)과 아래(Z~target+1)중 차이가 작은 값을 선택한다.
 *   두 번째로, 커서를 이동한다.
 *   이때, 모든 연속으로 나타나는 A를 찾은 뒤,
 *   왼쪽으로 먼저 갔을 경우와, 오른쪽으로 먼저 갔을 경우 중 거리가 짧은 값을 선택한다.
 *
 * - 머리가 아팠던 문제였다. 😥
 *   처음 코드에서는, A가 연속으로 나타나는 모든 경우를 대상으로 검사하지 않았다.
 *   가장 적게 이동하는 조건은,
 *   1. 연속으로 존재하는 A의 개수가 가장 긴 구간
 *   2. 방향 전환시, 돌아오는 거리가 최소인 구간 === 출발지 혹은 도착지 근처인 구간 ("BAAABAAABBBB"인 경우)
 *   라고 생각하여 이를 고려해서 코드를 작성했다.
 *
 *   즉, A가 연속으로 나타나는 가장 긴 구간을 찾았으며,
 *   이때, 긴 구간이 여러 개인 경우,
 *   A구간이 출발지 혹은 도착지에 붙어있는 경우를 높은 우선순위로 조건을 두었다.
 *
 *   하지만, 위의 풀이에 대한 반례로 "BAABBAAAABBBB"처럼 최적의 거리가 긴 구간에서만 나타나는 것이 아니었다.
 *   (테케 12번 정답 예상)
 *
 *   모든 예외를 찾고 조건을 추가하다보니, 코드가 복잡해지면서 디버깅이 어려워졌다. 😂
 *   결국 모든 경우를 검사하는 방향으로 코드를 새로 작성했다...😅
 *
 */
function solution(name) {
    const conversions = startConvert(name);
    const moves = startMove(name);
    return conversions + moves;
}

function startConvert(name) {
    return [...name].reduce((sum, target) => {
        const upConversion = target.charCodeAt() - 'A'.charCodeAt();
        const downConversion = 'Z'.charCodeAt() - target.charCodeAt() + 1;
        return sum + Math.min(upConversion, downConversion);
    }, 0);
}

function startMove(name) {
    let min = name.length - 1;
    for (let i = 1, length = name.length; i < length; i++) {
        if (name[i] !== 'A') continue;

        const [start, end] = findConsecutiveA(name, i);
        const [left, right] = [length - end - 1, start - 1];

        min = Math.min(
            min,
            countingMoves(left, right),
            countingMoves(right, left),
        );
    }
    return min;
}

function findConsecutiveA(name, index) {
    let end = index;
    while (end < name.length && name[end] === 'A') end++;
    return [index, end - 1];
}

function countingMoves(firstDirection, secondDirection) {
    const turn = secondDirection > 0 ? 2 : 1;
    return firstDirection * turn + secondDirection;
}

console.log(solution('AAA')); // 0
console.log(solution('BBB')); // 5
console.log(solution('BAAABBBAA')); // 9
console.log(solution('BBAAAB')); // 6
console.log(solution('BBBAAB')); // 8
console.log(solution('M')); // 12
console.log(solution('N')); // 13
console.log(solution('O')); // 12
console.log(solution('BAAABBBABAAAB')); // 15
console.log(solution('BABB')); // 5
console.log(solution('BAABBAAAABBBB')); // 17
