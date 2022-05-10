/**
 * 카카오톡으로 전송되는 메시지를 압축하여 전송 효율을 높이고자 한다.
 * 압축 전의 정보를 완벽하게 복원 가능한 무손실 압축 알고리즘을 구현하자.
 *
 * 여러 압축 알고리즘 중, LZW(Lemple-Ziv-Welch) 압축을 구현할 것이다.
 * LZW 압축은 이미지 파일 포맷인 GIF 등 다양한 응용에서 사용되었다.
 *
 * LZW 압축은 다음 과정을 거친다.
 * 1. 길이가 1인 모든 단어를 포함하도록 사전을 초기화한다.
 * 2. 사전에서 현재 입력과 일치하는 가장 긴 문자열 w를 찾는다.
 * 3. w에 해당하는 사전의 색인 번호를 출력하고, 입력에서 w를 제거한다.
 * 4. 입력에서 처리되지 않은 다음 글자가 남아 있다면(c), w+c에 해당하는 단어를 사전에 등록한다.
 * 5. 단계 2로 돌아간다.
 *
 * @param {*} msg 영문 대문자로만 이뤄진 문자열 (1~1000)
 * @returns 주어진 문자열을 압축한 후의 사전 색인 번호
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저 LZW 압축에 사용할 사전을 생성한다. 이때, 사전은 A-Z까지 등록한 상태이다.
 *
 *   그 다음, 메시지의 i번째 문자부터 압축을 시도한다.
 *   먼저, i번째 문자에 그 다음 문자를 하나씩 이어 붙이면서, 사전에 등록된 단어 중 가장 긴 단어를 찾는다.
 *   가장 긴 단어를 찾았다면 압축 결과물에 추가한다.
 *   압축 결과물에 추가할 때에는, 사전에 등록된 단어의 색인 번호로 추가한다.
 *   그리고 위의 과정에서 발견된, 사전에 등록되지 않은 최초의 단어는 사전에 추가한다.
 *
 *   i번째 문자의 압축을 시도한 다음, 그 다음 문자에 대해 압축을 시도한다.
 *   이때, i번째 문자와 함께 압축된 문자는 제외해야 한다.
 *   만약, i번째 문자를 압축할 때 압축한 단어의 길이가 2라면, i+1번째 문자의 압축은 생략한다.
 *
 *   모든 문자를 압축할 때까지 위 과정을 반복한다.
 *
 * - 문제에서 제시한 조건을 그대로 구현하면 되는 문제였다!
 *
 * - 다른 풀이 방식 중,
 *   Array.reduce를 사용하는 방식이 있다.
 *   msg를 reduce로 순회하여,
 *   word = msg.reduce((word, cur)=> {
 *      newWord = word + cur;
 *      if (newWord가 사전에 있는 경우) return newWord;
 *      사전에 newWord 추가
 *      if (word가 사전에 있는 경우) 압축된 결과에 word의 index 추가
 *      return cur;
 *   })
 *   마지막 word도 압축된 결과에 추가한다.
 *   위처럼, 한 번의 순회로 모든 문자를 압축할 수 있어 효율적이다! 👍
 */

function solution(msg) {
    const LZW = new LZW_Compression(msg);
    return LZW.compressedReault;
}

class LZW_Compression {
    dictionary = new Dictionary();
    result = [];

    constructor(msg) {
        this.msg = msg;
        this.startCompress();
    }

    startCompress() {
        for (let i = 0; i < this.msg.length; ) {
            const word = this.findLongStringInDictionary(this.msg.slice(i));
            this.compressWord(word);
            this.insertWordInDictionary(word + this.msg[i + word.length]);

            i += word.length;
        }
    }

    get compressedReault() {
        return this.result;
    }

    findLongStringInDictionary(msg) {
        let word = '';
        for (let i = 0; i < msg.length; i++) {
            if (!this.dictionary.has(word + msg[i])) break;
            word += msg[i];
        }

        return word;
    }

    insertWordInDictionary(word) {
        this.dictionary.insert(word);
    }

    compressWord(word) {
        this.result.push(this.dictionary.get(word));
    }
}

class Dictionary {
    dictionary = new Map();
    index = 0;

    constructor() {
        this.createDictionary();
    }

    createDictionary() {
        for (let i = 0; i < 26; i++) {
            this.insert(String.fromCharCode('A'.charCodeAt() + i));
        }
    }

    insert(word) {
        if (!this.has(word)) this.dictionary.set(word, this.nextIndex());
    }

    has(word) {
        return this.dictionary.has(word);
    }

    nextIndex() {
        return ++this.index;
    }

    get(word) {
        return this.dictionary.get(word);
    }
}

/****** TEST CASE *******/

console.log(solution('KAKAO'));
console.log(solution('TOBEORNOTTOBEORTOBEORNOT'));
