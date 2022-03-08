/**
 * 차량별로 주차 요금을 계산하자.
 * - 입차된 후, 출차된 내역이 없으면 23:59에 출차
 * - 기본 시간을 초과할 경우, 추가 요금 발생
 *   초과 시간 % 단위 시간 !== 0 인 경우, 올림
 *
 * @param {*} fees 주차 요금 [기본시간(분), 기본 요금, 단위 시간(분), 단위 요금]
 * @param {*} records 자동차의 입/출차 내역 [[시:분, 차량번호, (입차 | 출차)]]
 * @returns 차량 번호가 작은 자동차부터 청구할 주차 요금 배열 반환
 */

function solution(fees, records) {
    const parkingLot = new Map();
    const totalUsedTime = {};

    records.forEach((record) => {
        const [time, car, type] = record.split(' ');
        const minute = convertToMinute(time);

        switch (type) {
            case 'IN':
                parkingLot.set(car, minute);
                break;
            case 'OUT':
                const usedTime = minute - parkingLot.get(car);
                totalUsedTime[car] = (totalUsedTime[car] || 0) + usedTime;
                parkingLot.delete(car);
        }
    });

    clearCarInParkingLot(parkingLot, totalUsedTime);

    return Object.entries(totalUsedTime)
        .sort(ASC_CAR)
        .map(([_, usedTime]) => calculateFee(fees, usedTime));
}

function convertToMinute(time) {
    const [hour, minute] = time.split(':').map(Number);
    return hour * 60 + minute;
}

function clearCarInParkingLot(parkingLot, totalUsedTime) {
    const LAST_TIME = 23 * 60 + 59;
    for (const [car, enteredTime] of parkingLot) {
        usedTime = LAST_TIME - enteredTime;
        totalUsedTime[car] = (totalUsedTime[car] || 0) + usedTime;
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
