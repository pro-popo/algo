/**
 * 각 기능은 진도가 100%일 때 서비스에 반영할 수 있음
 * 각 기능의 개발속도는 모두 다름
 * 뒤에 있는 기능이 앞에 기능보다 먼저 개발될 수 있음
 * 앞에 있는 기능이 배포될 때 함께 배포
 *
 *
 * @param {number[]} progresses  먼저 배포되어야 하는 순서대로 작업의 진도
 * @param {number[]} speeds 각 작업의 개발 속도
 * @returns 각 배포마다 몇 개의 기능이 배포되는지 반환
 */

function solution01(progresses, speeds) {
    const answer = [];
    progresses.reduce((today, progress, idx) => {
        const speed = speeds[idx];
        if (today * speed + progress < 100) {
            answer.push(1);
            return Math.ceil((100 - progress) / speed);
        }
        answer[answer.length - 1] += 1;
        return today;
    }, 0);
    return answer;
}

function solution02(progresses, speeds) {
    const days = progresses.map((progress, idx) =>
        Math.ceil((100 - progress) / speeds[idx]),
    );

    const answer = [];
    let today = 0;
    days.forEach(day => {
        if (today < day) {
            today = day;
            answer.push(1);
            return;
        }
        answer[answer.length - 1] += 1;
    });
    return answer;
}

console.log(solution01([93, 30, 55], [1, 30, 5]));
console.log(solution02([93, 30, 55], [1, 30, 5]));
