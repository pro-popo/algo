/**
 * 네오와 프로도가 숫자 놀이를 하고 있다.
 * 플레이어가 숫자를 건낼 때 일부 자릿수를 영단어로 바꾼 카드를 건네주면,
 * 상대편은 원래 숫자를 찾는 게임이다.
 * [EX] 1478 → "one4seveneight"
 *
 * @param {*} s 문자열 (1~50)
 * @returns 원래 숫자
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   사전을 순회하여,
 *   해당 단어가 문자열에서 존재할 경우, 숫자로 바꿔준다.
 *
 * - 정규식을 알고 있다면, 쉽게 풀 수 있는 문제였다!
 *
 * - 다른 풀이 방식으로는,
 *   해당 단어로 문자열을 자른 다음에, (split)
 *   숫자로 이어붙이면 된다. (join)
 */

function solution(s) {
    const game = new Game(s);
    return game.changeOriginNumber();
}

class Game {
    dictionary = [
        'zero',
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine',
    ];

    constructor(card) {
        this.card = card;
    }

    setCard(newCard) {
        this.card = newCard;
    }

    changeOriginNumber() {
        this.dictionary.forEach((word, number) =>
            this.setCard(this.changeWordToNumber(word, number)),
        );

        return +this.card;
    }

    changeWordToNumber(word, number) {
        const regexp = new RegExp(word, 'g');
        return this.card.replace(regexp, number);
    }
}

console.log(solution('one4seveneight'));
