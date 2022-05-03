/**
 * 다트 게임은 다트판에 다트를 세 차례 던져 그 점수의 합계로 실력을 겨루는 게임이다.
 * 다트 게임의 점수 계산 로직은 다음과 같다.
 * 1. 총 3번의 기회
 * 2. 점수: 0점 ~ 10점
 * 3. 점수와 함께 Single(S), Double(D), Triple(T) 영역이 존재한다.
 *    각 영역 당첨 시, 점수에서 1제곱, 2제곱, 3제곱으로 계산된다.
 * 4. 옵션으로 스타상(*), 아차상(#)이 존재한다.
 *    *: 해당 점수와 바로 전에 얻은 점수를 각 2배
 *    #: 해당 점수는 마이너스
 * 5. *은 첫 번째 기회에서도 나올 수 있다.
 *    이 경우 첫 번째 *의 점수만 2배이다.
 * 6. *의 효과는 다른 *의 효과와 중첩될 수 있다. (4배)
 * 7. *의 효과는 #의 효과와 중첩될 수 있다. (-2배)
 * 8. S,D,T는 점수마다 하나씩 존재한다.
 * 9. *, #은 점수마다 둘 중 하나만 존재할 수 있으며, 존재하지 않을 수 도있다.
 *
 *
 * @param {*} dartResult "점수|보너스|[옵션]"으로 이루어진 문자열 3세트
 * @returns 3번의 기회에서 얻은 점수 합계
 */

function solution(dartResult) {
    const areas = { S: 1, D: 2, T: 3 };
    const options = { '*': [2, [0, -1]], '#': [-1, [0]] };

    const numbers = dartResult.match(/[0-9]+/g).map(Number);
    dartResult.match(/[^0-9]+/g).forEach((dart, i) => {
        const [area, option] = dart.split('');

        numbers[i] = Math.pow(numbers[i], areas[area]);
        if (option) {
            const [value, targets] = options[option];
            targets.forEach(target => (numbers[i + target] *= value));
        }
    });

    return numbers.reduce((sum, number) => sum + number);
}

/****** TEST CASE *******/

console.log(solution('1S2D*3T'));
console.log(solution('1D2S#10S'));
console.log(solution('1D2S0T'));
console.log(solution('1S*2T*3S'));
console.log(solution('1D#2S*3S'));
console.log(solution('1T2D3D#'));
console.log(solution('1D2S3T*'));
