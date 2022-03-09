/**
 * 라이언은 어피치를 가장 큰 점수를 이기기 위해
 * n발의 화살을 어던 과녁 점수에 맞혀야 하는가?
 *
 * 이전 양궁대회 우승자는 라이언이다.
 * 이번 경기는 라이언 vs 어피치이다.
 *
 * 양궁대회는 전 대회 우승자에게 불리하게 규칙이 적용된다.
 * 1. 어피치 화살 n발 => 라이언 화살 n발
 * 2. 점수 계산
 *    - k점에 더 많은 화살을 맞힌 선수가 k점을 가져간다.
 *    - 동일한 경우 어피치가 k점을 가져간다.
 *    - 단, k점을 여러 번 맞춰도 k점만 가져간다.
 *    - 또한, 한 번이라도 맞힌 경우만 점수를 가져간다.
 * 3. 최종 점수가 높은 선수가 우승자
 *    - 단, 점수가 동일하면 어피치가 승리다.
 *
 * 만약, 라이언이 가장 큰 점수 차이로 우승할 수 있는 방법이 여러 가지 일 경우,
 * 가장 낮은 점수를 더 맞힌 경우를 반환
 *
 * @param {*} n 화살의 개수 (1~10)
 * @param {*} info 어피치가 맞힌 과녁 점수의 개수 (10~0점 순서)
 * @returns 라이언이 맞힌 과녁 점수의 배열, 우승할 수 없는 경우 [-1] 반환
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   라이언이 만들 수 있는 점수판의 모든 경우를 생성하여 그 중 어피치와의 점수 차이가 가장 큰 경우를 찾는다.
 *   10~1점을 순회하여 두 가지 경우를 가지고 재귀를 돌린다.
 *   1. 라이언이 K점을 얻은 경우
 *   2. 라이언이 K점을 못 얻은 경우
 *   이때 라이언이 얻은 점수가 어피치가 얻은 점수보다 큰 경우, 해당 점수판을 저장한다.
 *   만약 이미 저장된 점수판이 있다면,
 *   그 중 어피치와의 점수 차이가 큰 점수판을 선택한다.
 *   점수 차이가 동일한 경우, 두 점수판을 작은 점수부터 순회하여 가장 낮은 점수를 많이 맞춘 점수판으로 갱신한다.
 *
 * - 문제를 잘 이해하고 정리한다면 쉽게 풀 수 있는 문제였다.
 *   화살의 개수와 과녁 점수의 개수가 작기 때문에 (최대 10)
 *   완전탐색으로 충분히 풀 수 있다. 시간 걱정을 할 필요가 없었다!
 *
 * - 그러나, 시간이 많이 걸렸다.. 그 이유는,
 *   최종 점수판을 갱신할 때, 라이언이 얻을 수 있는 최댓값을 기준으로 비교하여 점수판을 갱신했다.
 *   순간적으로 어피치의 점수가 고정된 값이라고 생각했다.
 *   그래서 "라이언의 점수가 커지면 당연히 라이언과 어피치와의 점수 차이도 커지겠지!"라고 잘못 접근한 것이다. 😥
 *
 * - 항상 함수로만 로직을 추출하다가 이번에는 클래스를 사용해 보았다.
 *   익숙하지 않아서 구성하는데에 시간이 좀 걸렸다.
 *   "이 로직을 클래스의 필드/메서드로 넣어도 되는건가?"에 대한 고민이 가장 많았다.
 *   처음에는 함수만으로도 충분히 깔끔하게 짤 수 있다고 생각했는데 생각보다 좋았다.
 *   가장 좋았던 점은, 함수의 매개변수의 개수를 줄일 수 있다는 점이다. 👍
 *   wonGameByRyan 객체도 라이언의 데이터니까 묶을 수 있을 것 같은데,
 *   아쉽게도 좋은 방법이 떠오르지 않았다. 생각나면 수정하자..🤔
 */

class Archery {
    constructor(info, score, remainAllows) {
        this.info = info;
        this.score = score || calculationScore();
        this.remainAllows = remainAllows;
    }

    winRound(round, usedAllows) {
        const info = [...this.info];
        info[round] = usedAllows;
        return new Archery(
            info,
            this.score + (10 - round),
            this.remainAllows - usedAllows,
        );
    }

    loseRound(round) {
        if (!this.info[round]) return this;
        return new Archery(this.info, this.score - (10 - round));
    }

    calculationScore() {
        return this.info.reduce(
            (score, arrows, index) => score + (arrows && 10 - index),
            0,
        );
    }

    isHitMoreSmallRound(info) {
        for (let i = 10; i >= 0; i--) {
            if (this.info[i] === info[i]) continue;
            if (this.info[i] > info[i]) return true;
            break;
        }
        return false;
    }
}

function solution(n, info) {
    const apeach = new Archery(info);
    const ryan = new Archery(Array(11).fill(0), 0, n);
    const wonGameByRyan = {
        info: Array(11).fill(0),
        diffScore: 0,
    };

    findWinningGameByRyan(ryan, apeach, (round = 0), wonGameByRyan);

    return wonGameByRyan.diffScore ? wonGameByRyan.info : [-1];
}

function findWinningGameByRyan(ryan, apeach, round, wonGameByRyan) {
    if (round > 10 || ryan.remainAllows < 0) return;

    if (ryan.score > apeach.score) {
        ryan.diffScore = ryan.score - apeach.score;

        if (
            ryan.diffScore > wonGameByRyan.diffScore ||
            (ryan.diffScore === wonGameByRyan.diffScore &&
                ryan.isHitMoreSmallRound(wonGameByRyan.info))
        ) {
            wonGameByRyan.info = [...ryan.info];
            wonGameByRyan.info[10] += ryan.remainAllows;
            wonGameByRyan.diffScore = ryan.diffScore;
        }
    }

    findWinningGameByRyan(
        ryan.winRound(round, apeach.info[round] + 1),
        apeach.loseRound(round),
        round + 1,
        wonGameByRyan,
    );
    findWinningGameByRyan(ryan, apeach, round + 1, wonGameByRyan);
}

/****** TEST CASE *******/
console.log(solution(1, [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
console.log(solution(9, [0, 0, 1, 2, 0, 1, 1, 1, 1, 1, 1]));
console.log(solution(10, [0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 3]));
console.log(solution(10, [2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0]));
