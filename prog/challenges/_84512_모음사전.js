/**
 * 사전에는 알파벳 모음 [A,E,I,O,U]만을 이용하여 만들수 있는,
 * 길이 5 이하의 모든 단어가 수록되어 있다.
 *
 * 사전은 "A", "AA", ... ,"UUUUU" 순이다.
 * 하나의 word가 주어질 때, 이 단어가 사전에 몇 번째 단어인가?
 *
 * @param {*} word (1~5)
 * @returns 주어진 단어가 사전에서 몇 번째 단어인지 반환
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저, 주어진 알파벳 모음으로 조합하여 생성할 수 있는 모든 단어들을 생성한다.
 *   그 다음, 생성한 사전에서 주어진 단어를 찾는다.
 *   이때 Set 객체로 저장하면, 삽입 순으로 원소를 저장하기 때문에 순서를 알 수 있다.
 *
 * - 다른 풀이 방식으로는,
 *   해당 자리의 알파벳이 등장하는 경우의 수를 계산하여 답을 구할 수 있다.
 *   word를 순회하여, word.reduce((answer, alphabet, index) => {})
 *   각각의 알파벳에 대하여 [781, 156, 31, 6, 1][index] * ['A', 'E', 'I', 'O', 'U'].indexOf(alphabet) + 1를 진행한다.
 *   첫 번째 배열은 각 자릿수에 대해 생기는 경우의 수를 의미한다. (혹은 (5**(5 - i) - 1) / 4)
 *   두 번째 배열은 앞에 존재하는 경우의 수를 건너뛰기 위한 배열이다.
 */

function solution(word) {
    const alphabets = ['A', 'E', 'I', 'O', 'U'];
    const MAX_LENGTH = 5;
    const dictionary = makeDictionary(alphabets, MAX_LENGTH);

    return dictionary.findIndex(word) + 1;
}

function makeDictionary(alphabets, MAX_LENGTH) {
    const dictionary = new Set();
    dictionary.findIndex = findIndex;

    combination('');
    return dictionary;

    function combination(word) {
        if (word.length === MAX_LENGTH) return;

        alphabets.forEach((alphabet) => {
            const newWord = word + alphabet;

            if (dictionary.has(newWord)) return;
            dictionary.add(newWord);
            combination(newWord);
        });
    }
}

function findIndex(searchWord) {
    return [...this].findIndex((word) => word === searchWord);
}

console.log(solution('AAAAE'));
