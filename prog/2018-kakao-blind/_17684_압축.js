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
