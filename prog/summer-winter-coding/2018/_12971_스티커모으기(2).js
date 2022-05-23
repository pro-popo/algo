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
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   이 문제에서 고려해야 하는 점은 다음과 같다.
 *   1. 현재 스티커를 뜯는 경우와 뜯지 않는 경우
 *   2. 첫 번째 스티커를 뜯는 경우와 뜯지 않는 경우
 *
 *   먼저, (1) 현재 스티커를 뜯을지 뜯지 않을지 결정하는 과정은 다음과 같다. (DP 활용)
 *   i번째 스티커를 뜯으면 i-1, i+1번째 스티커는 뜯을 수 없다.
 *   이때, i번째 스티커까지 왔을 때 총 합의 최댓값이 무엇인지가 중요하다.
 *   만약 i번째 스티커를 뜯었다면, i-1번째 스티커는 뜯지 못하므로
 *   i-2번째까지의 최댓값과 i번째 스티커를 더하면 된다.
 *   즉, DP[i] = sticker[i] + DP[i-2]가 된다.
 *   반대로 i번째 스티커를 뜯지않았다면, DP[i] = DP[i-1]이 된다.
 *
 *   따라서, i번째 스티커를 뜯거나 뜯지 않았을 경우 중 최댓값을 DP[i]에 저장하면 된다.
 *   이 경우, 점화식을 세우면 다음과 같다.
 *   DP[i] = Math.max(DP[i-1], sticker[i] + DP[i-2])
 *
 *   위 과정을, (2) 첫 번째 스티커를 뜯는 경우와 뜯지 않는 경우를 나누어서 계산해야 한다.
 *   그 이유는 첫 번째 스티커를 뜯는 여부에 따라 마지막 스티커를 뜯을 수 있는지 결정할 수 있기 때문이다.
 *   이 경우 DP를 두 개를 생성한다면 쉽게 계산할 수 있다.
 *   마지막으로 첫 번째 스티커를 뜯는 경우와 뜯지 않는 경우 중 최댓값이 큰 경우를 반환하면 된다.
 *
 * - 어떤 식으로 접근해야할지 고민하다가 결국 코드를 참고했던 문제이다. 😅
 *   특히 첫 번째 스티커를 뜯는 경우와 뜯지 않는 경우를 나누어서 계산하는 방법은 생각하지 못한 접근법이었다.
 */

function solution(sticker) {
    if (sticker.length === 1) return sticker[0];

    const firstSelection = Array(sticker.length - 1).fill(0);
    firstSelection[0] = firstSelection[1] = sticker[0];

    const firstNotSelection = Array(sticker.length).fill(0);
    firstNotSelection[1] = sticker[1];

    return Math.max(sumSticker(firstSelection), sumSticker(firstNotSelection));

    function sumSticker(dp) {
        for (let i = 2; i < dp.length; i++) {
            dp[i] = Math.max(dp[i - 2] + sticker[i], dp[i - 1]);
        }
        return dp.pop();
    }
}

/****** TEST CASE *******/

console.log(solution([14, 6, 5, 11, 3, 9, 2, 10]));
