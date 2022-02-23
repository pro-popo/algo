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
 * @returns :최소 몇 단계의 과정을 거쳤는지 반환, 변환할 수 없는 경우 0 반환
 *
 *
 * ### 리뷰
 * - 풀이 과정은 다음과 같다.
 *   현재 단어에서 변환 가능한 단어를 대기열에 추가한다.
 *   대기열에 추가한 단어를 순차적으로 꺼내서 변환 준비를 한다.
 *   target 단어와 동일할 때까지 위의 과정을 반복한다.
 *
 * - visited 배열에 객체 형태 {"단어":false}로 넣는 것 보다는 index로 접근하는게 더 빠를 것이라 생각했다.
 *   이를 위해, 기존 words 배열에 begin을 추가한 새로운 배열을 생성하였다.
 *
 * - 다른 사람과의 풀이와 유사하다!
 */

function solution(begin, target, originWords) {
    const words = [begin, ...originWords];
    const visited = Array(words.length).fill(false);

    const qu = [0];
    visited[0] = true;

    let changeCount = 0;
    while (qu.length) {
        for (let s = 0, SIZE = qu.length; s < SIZE; s++) {
            const currentIndex = qu.shift();
            const currentWord = words[currentIndex];
            visited[currentIndex] = true;

            if (currentWord === target) return changeCount;
            addNextWordsInQueue(words, currentWord, qu, visited);
        }
        changeCount++;
    }
    return 0;
}

function addNextWordsInQueue(words, currentWord, queue, visited) {
    words.forEach((nextWord, nextIndex) => {
        if (!isChangeWord(visited[nextIndex], currentWord, nextWord)) return;
        queue.push(nextIndex);
    });
}

function isChangeWord(isVisited, origin, target) {
    return !isVisited && isDiffSingeAlpabet(origin, target);
}

function isDiffSingeAlpabet(origin, target) {
    let diffCount = 0;
    for (let i = 0, N = origin.length; i < N; i++) {
        if (origin[i] !== target[i]) diffCount++;
    }
    return diffCount <= 1;
}

console.log(solution('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog']));
