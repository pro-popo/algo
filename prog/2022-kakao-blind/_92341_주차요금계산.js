/**
 * 차량별로 주차 요금을 계산하자.
 * - 입차된 후, 출차된 내역이 없으면 23:59에 출차
 * - 기본 시간을 초과할 경우, 추가 요금 발생
 *   초과 시간 % 단위 시간 !== 0 인 경우, 올림
 *
 * @param {*} fees 주차 요금 [기본시간(분), 기본 요금, 단위 시간(분), 단위 요금]
 * @param {*} records 자동차의 입/출차 내역 [[시:분, 차량번호, (입차 | 출차)]]
 * @returns 차량 번호가 작은 자동차부터 청구할 주차 요금 배열 반환
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저, 주차장에 존재하는 차량들을 관리하는 Map 객체와 (parkingLot, {car: 입차 시간})
 *   차량별 주차 누적 시간을 관리하는 객체를 생성한다. (parkingTimes, {car: 총 주차시간})
 *
 *   순차적으로 주차장에 입차 차량을 추가한다.
 *   이때 출차 차량이 존재할 경우,
 *   주차 누적 시간 + 현재 주차 시간으로 parkingTimes을 갱신한다.
 *
 *   그 다음, parkingLot에 남아있는 차량을 정리하고,
 *   parkingTimes을 순회하여 각 차량의 주차 요금을 계산한다.
 *
 * - 처음에 어떤 정보를 어떤 형태로 저장할 것인지를 잘 정한다면, 쉽게 풀 수 있는 문제이다.
 *
 * - 다른 풀이에서,
 *   주차 차량과 주차 누적 시간을 별도로 관리할 필요없이 한 번에 계산하는 방법이 있다.
 *   parkingTime[car] += (24시(1439) - 입차시간)
 *   parkingTime[car] -= (24시(1439) - 출차시간)
 *   위와 같이 한 번에 계산할 수 있다. 😲👍
 *   [EX] 입차:8시, 출차:21시
 *        > 24 - 8 - 24 - 21 = 13시간
 *        > 21 - 8 = 13시간
 *                       8s                            21s    24s
 *   ⚪⚪⚪⚪⚪⚪⚪⚪🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟡🟣🟣🟣
 *
 *   이처럼 24시를 기준으로 계산하면, 입차시간을 별도로 계산할 필요가 없어지므로
 *   로직이 더 간단해진다!
 */

function solution(fees, records) {
    const parkingLot = new Map();
    const parkingTimes = {};

    records.forEach((record) => {
        const [time, car, type] = record.split(' ');
        const minute = convertToMinute(time);

        switch (type) {
            case 'IN':
                parkingLot.set(car, minute);
                break;
            case 'OUT':
                const usedTime = minute - parkingLot.get(car);
                parkingTimes[car] = (parkingTimes[car] || 0) + usedTime;
                parkingLot.delete(car);
        }
    });

    clearCarInParkingLot(parkingLot, parkingTimes);

    return Object.entries(parkingTimes)
        .sort(ASC_CAR)
        .map(([_, usedTime]) => calculateFee(fees, usedTime));
}

function convertToMinute(time) {
    const [hour, minute] = time.split(':').map(Number);
    return hour * 60 + minute;
}

function clearCarInParkingLot(parkingLot, parkingTimes) {
    const LAST_TIME = 23 * 60 + 59;
    for (const [car, enteredTime] of parkingLot) {
        usedTime = LAST_TIME - enteredTime;
        parkingTimes[car] = (parkingTimes[car] || 0) + usedTime;
    }
}

const ASC_CAR = ([carA], [carB]) => +carA - +carB;

function calculateFee(fees, usedTime) {
    const [defaultTime, defaultPrice, unitTime, unitPrice] = fees;

    return (
        defaultPrice +
        (usedTime > defaultTime &&
            Math.ceil((usedTime - defaultTime) / unitTime) * unitPrice)
    );
}

console.log(
    solution(
        [180, 5000, 10, 600],
        [
            '05:34 5961 IN',
            '06:00 0000 IN',
            '06:34 0000 OUT',
            '07:59 5961 OUT',
            '07:59 0148 IN',
            '18:59 0000 IN',
            '19:09 0148 OUT',
            '22:59 5961 IN',
            '23:00 5961 OUT',
        ],
    ),
);

console.log(
    solution(
        [120, 0, 60, 591],
        [
            '16:00 3961 IN',
            '16:00 0202 IN',
            '18:00 3961 OUT',
            '18:00 0202 OUT',
            '23:58 3961 IN',
        ],
    ),
);

console.log(solution([1, 461, 1, 10], ['00:00 1234 IN']));
