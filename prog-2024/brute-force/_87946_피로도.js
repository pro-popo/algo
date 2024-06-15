/**
 * 피로도 시스템
 * 일정 피로도를 사용하여 던전 탐험
 * 각 던전마다 탐험을 시작하기 위해 필요한 "최소 필요 피로도"와
 * 탐험을 마쳤을 때 소모되는 "소모 피로도" 존재
 *
 * 하루에 한 번씩 탐험할 수 있는 던전 여러개 존재
 * 하루에 최대한 많이 탐험
 *
 * @param {*} k 현재 피로도
 * @param {*} dungeons 각 던전별 [최소 필요 피로도, 소모 피로도]
 * @returns 유저가 탐험할 수 있는 최대 던전 수
 */
function solution(k, dungeons) {
    let answer = -1;

    function permutation(selected) {
        if (selected.length === dungeons.length) {
            let [user, count] = [k, 0];
            for (const idx of selected) {
                const [최소_필요_피로도, 소모_피로도] = dungeons[idx];
                if (user < 최소_필요_피로도) break;
                user -= 소모_피로도;
                count++;
            }
            answer = Math.max(answer, count);
            return;
        }

        for (let i = 0; i < dungeons.length; i++) {
            if (selected.includes(i)) continue;
            permutation(selected.concat(i));
        }
    }

    permutation([]);
    return answer;
}

console.log(
    solution(80, [
        [80, 20],
        [50, 40],
        [30, 10],
    ]),
);
