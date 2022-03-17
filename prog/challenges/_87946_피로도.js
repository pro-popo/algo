/**
 * 한 유저가 탐험할 수 있는 최대 던전 수를 구하자.
 *
 * 일정 피로도를 사용해서 던전을 탐험할 수 있다.
 * 각 던전마다 탐험을 시작하기 위해 필요한 최소 필요 피로도와
 * 던전 탐험을 마쳤을 때 소모되는 소모 피로도가 있다.
 * 예로, 최소 필요 피로도가 80, 소모 피로도가 20인 던전을 탐험하기 위해
 * 유저의 현재 남은 피로도는 80이상 이어야 한다.
 *
 * @param {*} k 현재 피로도 (1~5_000)
 * @param {*} dungeons [[최소 필요 피로도, 소모 피로도]], 최소 필요도 >= 소모 피로도
 * @returns 유저가 탐험할 수 있는 최대 던전 수
 */

function solution(k, dungeons) {
    let answer = 0;
    DFS(k, 0, new Set());

    function DFS(k, count, visitedDungeon) {
        answer = Math.max(answer, count);

        dungeons.forEach(([need, used], i) => {
            if (k < need || visitedDungeon.has(i)) return;

            visitedDungeon.add(i);
            DFS(k - used, count + 1, visitedDungeon);
            visitedDungeon.delete(i);
        });
    }
    return answer;
}

console.log(
    solution(80, [
        [80, 20],
        [50, 40],
        [30, 10],
    ]),
);
