/**
 * 테두리 1줄은 갈색으로 칠해져 있는 격자 모양 카펫이 있다.
 * 갈색 격자의 수와 노란색 격자의 수가 주어질 때,
 * 카펫의 가로, 세로 크기를 구하자
 *
 * @param {number} brown
 * @param {number} yellow
 * @returns
 */
function solution(brown, yellow) {
    for (let w = Math.floor(brown / 2); w > 0; w--) {
        const rest = brown - w * 2;
        if (rest === 0) continue;
        if (rest % 2 === 0) {
            const h = rest / 2 + 2;
            if (w * h - brown === yellow) return [w, h];
        }
    }
}

console.log(solution(10, 2));
console.log(solution(8, 1));
console.log(solution(24, 24));
