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
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   words를 순서대로 순회한다.
 *   이때 해당 단어가 이미 언급된 단어이거나,
 *   이전 단어의 끝문자와 현재 단어의 첫문자가 동일하지 않는 경우는 끝말잇기 규칙을 어긴 것이다.
 *   따라서 해당 단어를 말한 사람은 탈락으로 처리한다.
 *   해당 단어을 말한 사람은 [(i % n) + 1]번째이며,
 *   [Math.ceil((i + 1) / n)]번째 차례에서 탈락한 것이다.
 *
 *   끝말잇기의 중복 단어 처리는 Set 객체를 활용한다.
 */

function solution(n, words) {
    const usedWord = new Set();
    let answer = null;
    words.reduce((suggestion, word, i) => {
        if (answer) return;

        if (usedWord.has(word) || word[0] !== suggestion)
            answer = [(i % n) + 1, Math.ceil((i + 1) / n)];

        usedWord.add(word);
        return word[word.length - 1];
    }, words[0][0]);

    return answer || [0, 0];
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
