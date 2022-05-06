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
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저, 응답완료시간을 초단위로 변환한다. (=끝시간)
 *   그 다음, 변환한 초단위에 처리시간을 빼서 시작시간을 구한다.
 *
 *   끝시간이 작은 시간부터 순회하여
 *   각 시간들의 [끝시간, 끝시간+1]의 구간에 속하는 시간들을 구한다.
 *   이때, 구간에 속하는 시간들의 개수가 가장 많은 경우를 찾는다.
 *
 * - 처음에는 끝시간이 작은 시간부터 순회하여
 *   [끝시간, 끝시간+1] 구간에 속하는 시간들을 찾는 과정에서,
 *   구간에 속하지 않는 시간이 나타났을 경우 이후의 시간들도 구간에 속하지 않을 거라고 판단했다.
 *   그래서 탐색을 중단한 뒤, 다음 시간의 구간에 대해 검사를 시작했다.
 *
 * - 테스트 케이스 중 3번/18번이 틀린 이유는,
 *   구간에 속하지 않는 시간이 나타났을 때 탐색을 중단했기 때문이다.
 *   탐색 중단한 이후의 시간 중에서 끝시간이 크지만, 처리 시간이 길어서 앞에 있는 시간보다 시작시간이 빠른 경우가 존재한다.
 *   즉, 다음 예시를 살펴보면,
 *   '2016-09-15 00:00:04.000 2s',
 *   '2016-09-15 00:00:08.000 1s',
 *   '2016-09-15 00:00:10.000 10s',
 *   [4.000 ~ 6.001] 구간에 속하는 시간은 총 1번, 3번 시간으로 2개이다.
 *
 * - 위의 풀이법의 시간복잡도는 O(N*N)이다.
 *   따라서 시간의 수가 총 2_000개이기 때문에,
 *   완전탐색해도 최악의 경우 2_000 * 2_000 = 4_000_000으로 충분하다!
 */

function solution(lines) {
    const times = lines.map(convertTime);

    return Math.max(
        ...times.map(
            standardTime => findTimesInSection(times, standardTime).length,
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

function findTimesInSection(times, standardTime) {
    return times.filter(isIncludeSection);

    function isIncludeSection(time) {
        const section = [standardTime.end, standardTime.end + 1];
        return section[0] <= time.end && section[1] > time.start;
    }
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
