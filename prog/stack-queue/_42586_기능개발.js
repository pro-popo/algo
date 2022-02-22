/**
 * [STACK/QUEUE] 기능개발
 * ### 문제
 * - 각 기능은 진도가 100%일 때 서비스에 반영 가능
 * - 뒤에 있는 기능이 앞 기능보다 먼저 개발 됐을 경우, 함께 배포될 수 있음
 * - 각 배포마다 몇 개의 기능이 배포되는지 return
 * 
 * ### 입력
 * - progresses : 배포 순서
 * - speeds : 개발 속도
 * 
 * ### 출력
 * - 각 배포마다 몇 개의 기능이 배포되는지 배열로 반환
 */
function solution(progresses, speeds) {
    let currentDay = -1;
    const completionDays = progresses.map((progress, idx) => Math.ceil((100 - progress) / speeds[idx]));
    const answer = [];

    completionDays.forEach(completionDay => {
        if (currentDay >= completionDay) answer[answer.length - 1]++;
        else {
            answer.push(1);
            currentDay = completionDay;
        }
    })

    return answer;
}

console.log(solution([93, 30, 55], [1, 30, 5]))
console.log(solution([95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1]))
console.log(solution([100, 100, 100, 100, 100, 100, 1], [1, 1, 1, 1, 1, 1, 30]))