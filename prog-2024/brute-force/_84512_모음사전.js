/**
 * 사전에 알파벳 모음  'A', 'E', 'I', 'O', 'U' 만 사용하여
 * 길이 5 이하의 단어 수록
 *
 * 해당 단어가 몇번 째 단어인지 반환
 *
 * @param {string} word
 * @returns
 */

const alphabets = ['A', 'E', 'I', 'O', 'U'];
const dictionary = createDictionary();
function createDictionary(dictionary = [], word = '') {
    if (word.length === 5) return;
    for (const alphabet of alphabets) {
        const newWord = word + alphabet;
        dictionary.push(newWord);
        createDictionary(dictionary, newWord);
    }
    return dictionary;
}

function solution(word) {
    return dictionary.findIndex(target => target === word) + 1;
}

console.log(solution('AAAAE'));
console.log(solution('AAAE'));
console.log(solution('I'));
