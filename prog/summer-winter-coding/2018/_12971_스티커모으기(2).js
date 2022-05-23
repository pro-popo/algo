/**
 * N개의 스티커가 원형으로 연결되어 있다.
 * 원형으로 연결된 스티커에서 몇 장의 스티커를 뜯어내어
 * 뜯어낸 스티커에 적힌 숫자의 합이 최대가 되도록 하고 싶다.
 * 단, 스티커 한 장을 뜯어내면 양쪽으로 인접해있는 스티커는 찢어져서 사용할 수 없다.
 *
 * 이때 스티커를 뜯어내어 얻을 수 있는 숫자의 합의 최댓값을 구하자.
 *
 * @param {number[]} sticker - 원형으로 연결된 스티커의 숫자들 (1~100_000)
 * @returns {number} 스티커를 뜯어내어 얻을 수 있는 숫자의 합의 최댓값
 */

function solution(sticker) {
    const dp1 = Array(sticker.length).fill(0);
    const dp2 = Array(sticker.length).fill(0);

    dp1[0] = dp1[1] = sticker[0];
    dp2[1] = sticker[1];

    for (let i = 2; i < sticker.length; i++) {
        dp1[i] = Math.max(dp1[i - 2] + sticker[i], dp1[i - 1]);
        dp2[i] = Math.max(dp2[i - 2] + sticker[i], dp2[i - 1]);

        if (i === sticker.length - 1) dp1[i] = dp1[i - 1];
    }

    return Math.max(dp1[sticker.length - 1], dp2[sticker.length - 1]);
}

/****** TEST CASE *******/

console.log(solution([14, 6, 5, 11, 3, 9, 2, 10]));
