/**
 * 장애 대비용 서버 증설 여부를 결정하기 위해,
 * 작년 추석 기간인 9월 15일 로그 데이터를 분석한 후 초당 최대 처리량을 계산해보기로 했다.
 * 초당 최대 처리량은 요청의 응답 완료 여부에 관계없이,
 * 임의 시간부터 1초간 처리하는 요청의 최대 개수를 의미한다.
 *
 *
 * @param {*} lines  로그 문자열 => "응답완료시간 처리시간" (1~2_000)
 *                   - 응답완료시간: 2016-09-15 hh:mm:ss.sss,
 *                   - 처리시간: s로 끝남, 0.001 ≦ T ≦ 3.000
 *                   이때, 처리기간은 시작시간과 끝시간을 포함한다.
 *                   또한, 응답완료시간을 기준으로 오름차순 정렬한다.
 *
 * @returns 초당 최대 처리량
 */

function solution(lines) {
    const times = lines
        .map(convertTime)
        .sort((time, otherTime) => time.start - otherTime.start);

    return Math.max(
        ...times.map(
            time =>
                times.filter(
                    otherTime =>
                        time.end <= otherTime.end &&
                        time.end + 1 > otherTime.start,
                ).length,
        ),
    );
}

function convertTime(line) {
    const [, time, processTime] = line.split(' ');
    const endTime = convertSecond(time);
    const startTime = endTime - +processTime.replace('s', '') + 0.001;
    return new Time(startTime, endTime);
}

function convertSecond(time) {
    const [hour, minute, second] = time.split(':').map(Number);
    return hour * 3600 + minute * 60 + second;
}

class Time {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
}

/****** TEST CASE *******/

console.log(solution(['2016-09-15 00:00:00.000 3s']));
console.log(solution(['2016-09-15 23:59:59.999 0.001s']));
console.log(
    solution(['2016-09-15 01:00:04.001 2.0s', '2016-09-15 01:00:07.000 2s']),
);
console.log(
    solution(['2016-09-15 01:00:04.002 2.0s', '2016-09-15 01:00:07.000 2s']),
);
console.log(
    solution([
        '2016-09-15 20:59:57.421 0.351s',
        '2016-09-15 20:59:58.233 1.181s',
        '2016-09-15 20:59:58.299 0.8s',
        '2016-09-15 20:59:58.688 1.041s',
        '2016-09-15 20:59:59.591 1.412s',
        '2016-09-15 21:00:00.464 1.466s',
        '2016-09-15 21:00:00.741 1.581s',
        '2016-09-15 21:00:00.748 2.31s',
        '2016-09-15 21:00:00.966 0.381s',
        '2016-09-15 21:00:02.066 2.62s',
    ]),
);
console.log(
    solution(['2016-09-15 00:00:00.000 2.3s', '2016-09-15 23:59:59.999 0.1s']),
);
