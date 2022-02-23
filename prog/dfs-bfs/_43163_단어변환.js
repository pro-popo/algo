/**
 * 규칙에 따라 begin을 target으로 변환하는
 * 가장 짧은 변환 과정 찾기
 *
 * ### 규칙
 * 1. 한 번에 한 개의 알파벳만 변경 가능
 * 2. words에 있는 단어로만 변환 가능
 *
 * @param {*} begin
 * @param {*} target
 * @param {*} words
 * @returns
 */

function solution(begin, target, words) {
    return bfs(begin, target, words);
}

function bfs(begin, target, originWords) {
    const words = [begin, ...originWords];

    const N = words.length;

    const visited = Array(N).fill(false);
    const qu = [0];
    visited[0] = true;

    let changeCount = 0;
    while (qu.length > 0) {
        const SIZE = qu.length;
        for (let s = 0; s < SIZE; s++) {
            const word = words[qu.shift()];
            if (word === target) {
                return changeCount;
            }
            for (let i = 0; i < N; i++) {
                if (visited[i] || !isDiffSingeAlpabet(word, words[i])) continue;
                qu.push(i);
                visited[i] = true;
            }
        }
        changeCount++;
    }
    return 0;
}

function isDiffSingeAlpabet(begin, target) {
    let diffCount = 0;
    for (let i = 0, N = begin.length; i < N; i++) {
        if (begin[i] !== target[i]) diffCount++;
    }
    return diffCount <= 1;
}

console.log(solution('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog']));
