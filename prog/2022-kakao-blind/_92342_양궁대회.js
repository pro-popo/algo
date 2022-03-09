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
 */

class Archery {
    constructor(info, score, remainAllows) {
        this.info = info;
        this.score = score;
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
}

function solution(n, info) {
    const apeach = new Archery(
        info,
        info.reduce(
            (score, arrows, index) => score + (arrows && 10 - index),
            0,
        ),
    );
    const ryan = new Archery(Array(11).fill(0), 0, n);
    const wonGameByRyan = new Archery(Array(11).fill(0), 0);

    findWinningGameByRyan(ryan, apeach, (round = 0), wonGameByRyan);

    return wonGameByRyan.score ? wonGameByRyan.info : [-1];
}

function findWinningGameByRyan(ryan, apeach, round, wonGameByRyan) {
    if (round > 10 || ryan.remainAllows < 0) return;

    if (ryan.score > apeach.score) {
        if (
            ryan.score > wonGameByRyan.score ||
            (ryan.score === wonGameByRyan.score &&
                isGetMoreSmallRound(ryan, wonGameByRyan))
        ) {
            wonGameByRyan.info = [...ryan.info];
            wonGameByRyan.info[10] += ryan.remainAllows;

            wonGameByRyan.score = ryan.score;
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

const isGetMoreSmallRound = (ryan, wonGameByRyan) => {
    for (let i = 10; i >= 0; i--) {
        if (ryan.info[i] === wonGameByRyan.info[i]) continue;
        if (ryan.info[i] > wonGameByRyan.info[i]) return true;
        break;
    }
    return false;
};
console.log(solution(10, [2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0]));
console.log(solution(10, [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 9]));

// console.log(solution(1, [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
// console.log(solution(9, [0, 0, 1, 2, 0, 1, 1, 1, 1, 1, 1]));
// console.log(solution(10, [0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 3]));
