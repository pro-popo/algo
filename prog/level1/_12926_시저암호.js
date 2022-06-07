/**
 * 어떤 문장의 각 알파벳을 일정한 거리만큼 밀어서 다른 알파벳으로 바꾸는 암호화 방식을 시저 암호라고 한다.
 * 예로, "AB"를 밀 경우,
 * 1번 => "BC"
 * 2번 => "CD"
 * 3번 => "DE"
 *
 * 문자열 s를 거리 n만큼 민 암호문을 만들자.
 *
 * @param {string} s - 문자열 (1~8_000)
 *                     공백은 아무리 밀어도 공백이다.
 *                     알파벳 소문자, 대문자, 공백으로만 이루어져 있다.
 *
 * @param {number} n - 거리 (1~25)
 * @returns - 암호문
 */

function solution(s, n) {
    const direction = {};
    for (let i = 0; i < 26; i++) {
        const alphabet = String.fromCharCode('a'.charCodeAt() + i);
        direction[alphabet] = i;
    }

    return [...s]
        .map(character => {
            if (character === ' ') return character;
            const distance = (direction[character.toLowerCase()] + n) % 26;
            const alphabet = String.fromCharCode('a'.charCodeAt() + distance);
            return character === character.toUpperCase()
                ? alphabet.toUpperCase()
                : alphabet;
        })
        .join('');
}

/****** TEST CASE *******/

console.log(solution('AB', 1));
console.log(solution('z', 1));
console.log(solution('a B z', 4));
