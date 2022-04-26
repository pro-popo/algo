/**
 * 함수 f(x)를 다음과 같이 정의한다.
 * - x보다 크고 x와 비트가 1~2개 다른 수들 중에서 제일 작은 수
 *   [EX] f(2) = 3
 *        f(7) = 11
 * @param {*} numbers 정수들이 담긴 배열
 * @returns 모든 수들에 대하여 각 수의 f값
 */

function solution(numbers) {
    return numbers.map(f);
}

function f(number) {
    let bit = number.toString(2);
    let target = number + 1;
    while (true) {
        const movedBit = target.toString(2);
        if (bit.length != movedBit.length) bit = '0' + bit;
        const diff = [...movedBit].reduce(
            (diff, number, index) => (number == bit[index] ? diff : diff + 1),
            0,
        );

        if (diff <= 2) return target;
        target++;
    }
}

console.log(solution([2, 7]));
