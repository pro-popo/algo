/**
 * 하드디스크는 한 번에 하나의 작업만 수행할 수 있다.
 * 모든 작업을 처리하는데 걸리는 시간의 평균 중,
 * 가장 작은 평균을 구하자.
 *
 * @param {*} jobs [작업이 요청되는 시점, 작업의 소요시간]
 * @returns 작업의 요청부터 종료까지 걸린 시간의 평균을 가장 줄이는 방법으로 처리할 때의 평균
 */

function solution(jobs) {
    return averageProcessTime(sumTime, jobs.length);
}

function averageProcessTime(sumTime, numberOfJob) {
    const sumTime = sumProcessTimeOfAllJob(jobs);
    return Math.floor(sumTime / numberOfJob);
}

function sumProcessTimeOfAllJob(jobs) {
    let remainJobs = [...jobs].sort(ASC_REQUEST_TIME);

    const queue = [];
    let [time, sumTime] = [0, 0];

    do {
        const [requestedJobs, notRequestedJobs] =
            divideByRequestJobs(remainJobs);
        if (isNotRequestedAllJob(requestedJobs) && ++time) continue;

        remainJobs = notRequestedJobs;
        queue.push(...requestedJobs);
        queue.sort(ASC_REQUIRED_TIME);

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

    function isNotRequestedAllJob(requestedJobs) {
        return !queue.length && !requestedJobs.length;
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
