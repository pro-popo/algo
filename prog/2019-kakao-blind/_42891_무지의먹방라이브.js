/**
 * 무지는 다음과 같은 독특한 방식으로 먹방을 하고자 한다.
 *
 * 회전판에 먹어야 할 N개의 음식이 있다.
 * 1 ~ N번의 음식을 섭취하는데 일정한 시간이 소요된다.
 * 무지는 다음과 같은 방법으로 음식을 섭취한다.
 * - 1번 음식부터 먹기 시작하며, 회전판은 번호가 증가하는 순서대로 음식을 무지 앞으로 가져다 놓는다.
 * - 마지막 번호의 음식을 섭취한 후, 다시 1번 음식이 무지 앞으로 온다.
 * - 무지는 음식 하나를 1초 동안 섭취한 후 남은 음식은 그대로 두고, 다음 음식을 섭취한다.
 *   - 다음 음식이란, 아직 남은 음식 중 다음으로 섭취해야 할 가장 가까운 번호의 음식을 말한다.
 * - 다음 음식을 가져오는데 걸리는 시간은 없다.
 *
 * 먹방을 시작한 지 K초 후, 방송을 잠시 중단한다.
 * 다시 방송을 이어갈 때, 몇 번 음식부터 섭취해야 하는가?
 *
 * @param {*} food_times 각 음식을 먹는데 필요한 시간들
 *                       길이: 1~200_000, 원소: 1~100_000_000
 * @param {*} k 네트워크 장애가 발생한 시간 K초 (1 ~ 2x10^13)
 * @returns k초 후, 몇 번 음식부터 다시 섭취하면 되는가.
 *          음식이 없다면 -1을 반환한다.
 */

function solution(food_times, k) {
    const foods = food_times
        .map((time, number) => ({
            time,
            number: number + 1,
        }))
        .sort((a, b) => a.time - b.time);

    let time = 0;
    for (let i = 0; i < foods.length; i++) {
        const previousTime = i === 0 ? 0 : foods[i - 1].time;
        const nextTime =
            (foods[i].time - previousTime) * (foods.length - i) + time;

        if (nextTime > k) {
            const remainFoods = foods
                .slice(i)
                .sort((a, b) => a.number - b.number);
            const remainTime = k - time;

            return remainFoods[remainTime % remainFoods.length].number;
        }

        time = nextTime;
    }

    return -1;
}

/****** TEST CASE *******/

console.log(solution([3, 1, 2], 5));
console.log(solution([1, 2, 3, 3], 5));
1, 2, 3;
