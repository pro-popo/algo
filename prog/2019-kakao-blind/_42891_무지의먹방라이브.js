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
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   X번째 음식을 다 섭취하기 위해 걸리는 시간은, (X번째 음식의 time * 남은 음식 수)이다.
 *   이를 활용하면 음식을 섭취하기 위해 소요되는 시간을 건널 뛸 수 있다.
 *
 *   먼저 food를 time을 기준으로 오름차순 정렬한다. (foods)
 *   foods를 순회하여 순차적으로 해당 음식을 다 섭취한다.
 *   (time을 기준으로 정렬하면, X번째 음식 이전의 음식은 전부 섭취했음을 알 수 있다.)
 *
 *   만약 foods = [1,2,3]이라면,
 *   foods[0] 음식을 전부 섭취하기 위해 걸리는 시간은 다음과 같다.
 *   - foods[0] * 남은 음식의 수
 *     즉, 1 * 3 => 4초가 걸린다.
 *     foods = [0,1,2] => 총 4초 소요
 *
 *   그 다음, foods[1] 음식을 섭취하기 위해 걸리는 시간은 다음과 같다.
 *   - (foods[1] - foods[0]) * 남은 음식의 수 + 누적시간
 *     즉, (2 - 1) * 2 + 4 => 6초가 걸린다.
 *     foods = [0,0,1] => 총 6초 소요
 *
 *   따라서, X번째 음식을 다 섭취하기 위해 걸리는 시간은,
 *   (foods[X] - foods[X-1]) * 남은 음식의 수 + 누적시간 이다.
 *
 *   이렇게 순차적으로 food를 다 섭취하는 과정에서,
 *   X번째 음식을 섭취할 때까지의 총 시간이 K보다 커지게 되면,
 *   남은 음식들과 남은 시간을 가지고 K초 후에 다시 섭취하게 될 음식을 구한다.
 *   - 남은 음식들(remainFoods) : foods.slice(X)
 *   - 남은 시간(remainTime) : K - 누적시간 % 남은 음식의 수
 *   이때, 남은 음식들은 음식 번호를 기준으로 오름차순 정렬한다.
 *   음식 번호를 기준으로 정렬하면, 남은 시간이 지난 후 섭취할 음식을 쉽게 구할 수 있다.
 *   즉, 남은 음식들에서 남은 시간에 위치하는 음식이 K초 이후에 다시 섭취하게 될 음식이 된다.
 *   - remainFoods[remainTime]
 *
 *   만약, foods를 전부 순회했을 경우,
 *   누적 시간이 K보다 같거나 작은 경우로 모든 음식을 전부 섭취했음을 의미를 가진다. (-1 반환)
 *
 * - 1초씩 음식을 섭취하여 정답을 구할 경우,
 *   정확성은 다 맞지만 효율성에서 시간초과가 발생한다!
 *   이는 K의 최대 범위가 2x10^13이기 때문이다.
 */

function solution(food_times, k) {
    const foods = food_times
        .map((time, number) => new Food(time, number + 1))
        .sort(Food.ASC_TIME);

    return findFoodToEatAgain(foods, k) || -1;
}

function findFoodToEatAgain(foods, MAX_TIME) {
    let currentTime = 0;
    for (let i = 0; i < foods.length; i++) {
        const additionalTime = foods[i].time - (i > 0 && foods[i - 1].time);
        const numberOfRemainFood = foods.length - i;
        const nextTime = additionalTime * numberOfRemainFood + currentTime;

        if (nextTime > MAX_TIME) {
            const remainFoods = foods.slice(i).sort(Food.ASC_NUMBER);
            const remainTime = (MAX_TIME - currentTime) % remainFoods.length;

            return remainFoods[remainTime].number;
        }

        currentTime = nextTime;
    }

    return null;
}

class Food {
    constructor(time, number) {
        this.time = time;
        this.number = number;
    }

    static ASC_TIME(food, otherFood) {
        return food.time - otherFood.time;
    }

    static ASC_NUMBER(food, otherFood) {
        return food.number - otherFood.number;
    }
}

/****** TEST CASE *******/

console.log(solution([3, 1, 2], 5));
console.log(solution([1, 2, 3, 3], 5));
