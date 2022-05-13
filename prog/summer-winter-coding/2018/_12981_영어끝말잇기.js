/**
 * n명의 사람이 영어 끝말잇기를 하고 있다.
 * 영어 끝말잇기는 다음과 같은 규칙을 따른다.
 * 1. 1번부터 순서대로 한 사람씩 단어를 말한다.
 * 2. 마지막 사람이 말하면, 다시 1번부터 시작한다.
 * 3. 앞사람이 말한 단어의 마지막 문자로 시작하는 단어를 말한다.
 * 4. 이전에 등장했던 단어는 사용할 수 없다.
 * 5. 한 글자인 단어는 인정되지 않는다.
 *
 * @param n 사람의 수 (2~10)
 * @param words 사람들이 순서대로 말한 단어 (n~100)
 *              단어의 길이: 2~50
 * @returns 가장 먼저 탈락한 사람의 번호와 몇 번째 차례에서 탈락했는지 반환
 *          만약 탈락자가 없다면 [0,0]을 반환
 */

function solution(n, words) {
    const usedWord = new Set([words[0]]);
    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const preWord = words[i - 1];
        if (usedWord.has(word) || word[0] !== preWord[preWord.length - 1])
            return [(i % n) + 1, Math.ceil((i + 1) / n)];
        usedWord.add(word);
    }
    return [0, 0];
}

/****** TEST CASE *******/

console.log(
    solution(3, [
        'tank',
        'kick',
        'know',
        'wheel',
        'land',
        'dream',
        'mother',
        'robot',
        'tank',
    ]),
);

console.log(
    solution(5, [
        'hello',
        'observe',
        'effect',
        'take',
        'either',
        'recognize',
        'encourage',
        'ensure',
        'establish',
        'hang',
        'gather',
        'refer',
        'reference',
        'estimate',
        'executive',
    ]),
);

console.log(
    solution(2, ['hello', 'one', 'even', 'never', 'now', 'world', 'draw']),
);
