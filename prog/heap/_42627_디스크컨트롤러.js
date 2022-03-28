/**
 * 하드디스크는 한 번에 하나의 작업만 수행할 수 있다.
 * 모든 작업을 처리하는데 걸리는 시간의 평균 중,
 * 가장 작은 평균을 구하자.
 *
 * @param {*} jobs [작업이 요청되는 시점, 작업의 소요시간]
 * @returns 작업의 요청부터 종료까지 걸린 시간의 평균을 가장 줄이는 방법으로 처리할 때의 평균
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   남아있는 jobs의 요청시간을 오름차순으로 정렬한다.
 *   이때, 해당 시점(time)에서 처리할 수 있는 jobs를 우선순위큐(queue)에 저장한다.
 *   만약, 해당 시점에서 처리할 수 있는 jobs이 존재하지 않는 경우 시점을 늘린다. (time++)
 *   존재한다면, 우선순위큐에 존재하는 jobs를 작업 소요 시간을 오름차순으로 정렬한 뒤,
 *   첫 번째 작업을 꺼내 해당 작업을 처리한다.
 *   모든 jobs를 처리할 때까지 위의 과정을 반복한다.
 *
 * - 우선순위큐의 정렬 기준을 정했다면 쉽게 풀 수 있는 문제이다. 🤗
 *
 */

function solution(jobs) {
    return averageProcessTime(jobs);
}

function averageProcessTime(jobs) {
    const sumTime = sumProcessTime(jobs);
    return Math.floor(sumTime / jobs.length);
}

function sumProcessTime(jobs) {
    let remainJobs = [...jobs].sort(ASC_REQUEST_TIME);

    const queue = [];
    let [time, sumTime] = [0, 0];

    do {
        const [requestedJobs, notRequestedJobs] =
            divideByRequestJobs(remainJobs);

        remainJobs = notRequestedJobs;
        queue.push(...requestedJobs);
        queue.sort(ASC_REQUIRED_TIME);

        if (isNotRequestedAllJob() && ++time) continue;

        [time, sumTime] = processJob(queue.shift());
    } while (remainJobs.length || queue.length);

    return sumTime;

    function divideByRequestJobs(jobs) {
        let index = findNotRequestJob();
        return [jobs.slice(0, index), jobs.slice(index)];
    }

    function findNotRequestJob() {
        let index = remainJobs.findIndex(isNotRequestJob);
        if (isRequestedAllJob()) index = remainJobs.length;
        return index;

        function isNotRequestJob([requestTime]) {
            return requestTime > time;
        }
        function isRequestedAllJob() {
            return index === -1;
        }
    }

    function isNotRequestedAllJob() {
        return !queue.length;
    }

    function processJob(job) {
        const [requestTime, requiredTime] = job;
        return [
            time + requiredTime,
            sumTime + time + requiredTime - requestTime,
        ];
    }
}

const ASC_REQUEST_TIME = ([requestTime], [other]) => requestTime - other;
const ASC_REQUIRED_TIME = ([, requiredTime], [, other]) => requiredTime - other;

/****** TEST CASE *******/

console.log(
    solution([
        [0, 3],
        [1, 9],
        [2, 6],
    ]),
);

console.log(
    solution([
        [0, 3],
        [1, 9],
        [2, 6],
        [30, 3],
    ]),
);
