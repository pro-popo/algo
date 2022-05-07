/**
 * 셔틀은 다음과 같은 규칙으로 운행한다.
 * - 09:00부터 총 n회 t분 간격으로 역에 도착하며,
 *   하나의 셔틀에는 최대 m명의 승객이 탈 수 있다.
 * - 대기열에 선 크루까지 포함해서 대기 순서대로 태우고 바로 출발한다.
 *
 * 어떤 크루가 몇 시에 셔틀 대기열에 도착하는지 확인하여,
 * 셔틀을 타고 사무실로 갈 수 있는 도착 시각 중 제일 늦은 시각을 구하자.
 *
 * 단, 콘은 게으르기 때문에 같은 시각에 도착한 크루 중 대기열에서 제일 뒤에 선다.
 * 또한, 모든 크루는 23:59에 집에 돌아간다.
 *
 * @param {*} n 셔틀 운행 횟수 (0~10)
 * @param {*} t 셔틀 운행 간격 (0~60)
 * @param {*} m 한 셔틀에 탈 수 있는 최대 크루 수 (0~45)
 * @param {*} timetable 크루가 대기열에 도착하는 시각들 (1~2_000) => HH:MM
 * @returns 셔틀을 타고 사무실로 갈 수 있는 제일 늦은 도착 시각
 */

function solution(n, t, m, timetable) {
    let remainPeople = timetable
        .map(convertMinute)
        .sort((time, otherTime) => otherTime - time);

    let currentTime = convertMinute('09:00');
    let ridePeople = [];
    do {
        ridePeople = [];
        let count = 0;
        while (count++ < m && remainPeople.length) {
            const time = remainPeople.pop();
            if (time > currentTime) {
                remainPeople.push(time);
                break;
            }
            ridePeople.push(time);
        }
    } while (--n > 0 && (currentTime += t));

    if (ridePeople.length < m) return convertTime(currentTime);
    return convertTime(ridePeople.pop() - 1);
}

function convertMinute(time) {
    const [hour, minute] = time.split(':').map(Number);
    return hour * 60 + minute;
}

function convertTime(time) {
    const hour = Math.floor(time / 60) + '';
    const minute = time - hour * 60 + '';

    return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`;
}

console.log(solution(1, 1, 5, ['08:00', '08:01', '08:02', '08:03']));
console.log(solution(2, 10, 2, ['09:10', '09:09', '08:00']));
console.log(solution(2, 1, 2, ['09:00', '09:00', '09:00', '09:00']));
