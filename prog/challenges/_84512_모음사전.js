/**
 * 사전에는 알파벳 모음 [A,E,I,O,U]만을 이용하여 만들수 있는,
 * 길이 5 이하의 모든 단어가 수록되어 있다.
 *
 * 사전은 "A", "AA", ... ,"UUUUU" 순이다.
 * 하나의 word가 주어질 때, 이 단어가 사전에 몇 번째 단어인가?
 *
 * @param {*} word
 * @returns
 */

function solution(searchWord) {
    const alphabets = ['A', 'E', 'I', 'O', 'U'];
    const dictionary = new Set();
    let answer = 0;
    combination('');

    function combination(word) {
        if (word === searchWord) {
            answer = dictionary.size;
            return;
        }
        if (word.length === 5) return;

        alphabets.forEach((alphabet) => {
            const newWord = word + alphabet;
            if (dictionary.has(newWord)) return;
            dictionary.add(newWord);
            combination(newWord);
        });
    }
    return answer;
}

console.log(solution('AAAAE'));
