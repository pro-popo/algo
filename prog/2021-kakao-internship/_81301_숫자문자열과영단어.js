/**
 * 네오와 프로도가 숫자 놀이를 하고 있다.
 * 플레이어가 숫자를 건널 때 일부 자릿수를 영단어로 바꾼 카드를 건네주면,
 * 상대편은 원래 숫자를 찾는 게임이다.
 * [EX] 1478 → "one4seveneight"
 *
 * @param {*} s 문자열 (1~50)
 * @returns 원래 숫자
 */
function solution(s) {
    const dictionary = [
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

    dictionary.forEach((word, number) => {
        const regexp = new RegExp(word, 'g');
        s = s.replace(regexp, number);
    });
    return +s;
}

console.log(solution('one4seveneight'));
