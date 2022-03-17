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
 * @param {*} dungeons [[최소 필요 피로도, 소모 피로도]], 최소 필요도 >= 소모 피로도 (1~8)
 * @returns 유저가 탐험할 수 있는 최대 던전 수
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   탐험할 수 있는 던전에 대해서 DFS 탐색을 진행한다. (순열)
 *
 * - 처음에는 소모 피로도의 오름차순으로 정렬한 뒤,
 *   순차적으로 접근하면 되지 않을까 생각했다.
 *   그러나 k=80, [[30,10], [80,20], [50,40]]에서
 *   [30,10]보다 [80,20]을 먼저 탐험해야 하는 경우가 있다는 것을 깨달았다.
 *   고민을 하다가, dungeons의 범위가 적어서 완전 탐색을 진행해도 괜찮겠다는 생각이 들었다.
 *
 * - 다른 코드와 유사하다!
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
