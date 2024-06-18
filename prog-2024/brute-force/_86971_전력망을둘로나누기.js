/**
 * n개의 송전탑이 전선을 통해 하나의 트리 형태로 연결되어 있다.
 * 전선 하나를 끊어서 현재의 전력망 네트워크를 2개로 분할하고자 한다.
 * 두 전력망이 가지고 있는 송전탑 개수의 차이 (최소값)
 *
 * @param {number} n 송전탑의 개수
 * @param {[number,number][]} wires 전선 정보
 * @returns
 */

function solution(n, wires) {
    const tree = Array.from(Array(n + 1), () => Array(n + 1).fill(false));
    for (const [wireA, wireB] of wires) {
        tree[wireA][wireB] = tree[wireB][wireA] = true;
    }

    let min = Number.MAX_SAFE_INTEGER;
    for (const [wireA, wireB] of wires) {
        tree[wireA][wireB] = tree[wireB][wireA] = false;

        const [countA, countB] = [wireA, wireB].map(root => {
            const qu = [root];
            const visited = [...Array(n + 1)].fill(false);
            visited[root] = true;

            let count = 1;
            while (qu.length > 0) {
                const wire = qu.pop();
                for (let i = 0; i < n + 1; i++) {
                    if (tree[wire][i] && !visited[i]) {
                        visited[i] = true;
                        qu.push(i);
                        count++;
                    }
                }
            }
            return count;
        });

        tree[wireA][wireB] = tree[wireB][wireA] = true;
        min = Math.min(min, Math.abs(countA - countB));
    }

    return min;
}

// console.log(
//     solution(9, [
//         [1, 3],
//         [2, 3],
//         [3, 4],
//         [4, 5],
//         [4, 6],
//         [4, 7],
//         [7, 8],
//         [7, 9],
//     ]),
// );

console.log(
    solution(3, [
        [1, 2],
        [1, 3],
    ]),
);
