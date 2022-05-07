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
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저 시간들을 분단위로 변환한 다음, 내림차순으로 정렬한다.
 *   셔틀 운행 횟수만큼 반복하여,
 *   해당 셔틀에 탈 수 있는 크루를 구한다.
 *
 *   첫 번째 셔틀부터 마지막 셔틀까지 가능한 모든 크루를 탑승시킨다.
 *   콘이 셔틀타는 시간을 구하기 위해, 마지막 셔틀에 탄 크루들만 고려하면 된다.
 *   이때, 마지막 셔틀에 크루가 탑승하는 두 가지 경우를 고려해야 한다.
 *   - 마지막 셔틀이 만차인 경우
 *     이 경우, 마지막 탑승자보다 1분 빠르게 대기하면 된다.
 *   - 마지막 셔틀에 빈 자리가 남은 경우
 *     이 경우, 셔틀 시간에 대기하면 된다.
 */

function solution(n, t, m, timetable) {
    let remainPeople = timetable.map(convertMinute).sort(ASC_TIME);

    let currentTime = convertMinute('09:00');
    let peopleOnBus = [];
    do {
        [peopleOnBus, remainPeople] = getOnBus();
    } while (--n > 0 && (currentTime += t));

    if (peopleOnBus.length < m) return convertTime(currentTime);
    return convertTime(peopleOnBus.pop() - 1);

    function getOnBus() {
        let index = remainPeople.findIndex(time => currentTime < time);
        if (index < 0) index = remainPeople.length;
        if (index > m) index = m;

        return [remainPeople.slice(0, index), remainPeople.slice(index)];
    }
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

function ASC_TIME(time, otherTime) {
    return time - otherTime;
}

/****** TEST CASE *******/

console.log(solution(1, 1, 5, ['08:00', '08:01', '08:02', '08:03']));
console.log(solution(2, 10, 2, ['09:10', '09:09', '08:00']));
console.log(solution(2, 1, 2, ['09:00', '09:00', '09:00', '09:00']));
