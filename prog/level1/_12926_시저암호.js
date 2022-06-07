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
 *
 * ### 리뷰
 * - 먼저, 알파벳을 순회하여 'a' 혹은 'A'부터 거리가 얼마나 떨어져 있는지
 *   객체(dictionary)로 저장한다.
 *   {
 *      a: 0, b: 1, ... , z: 25
 *      A: 0, B: 1, ... , Z: 25
 *   }
 *
 *   그 다음 문자열 s를 순회한다.
 *   이때 현재 문자(character)가 공백인 경우 그대로 공백을 유지한다.
 *
 *   character에서 n만큼 민 알파벳을 구해야 한다.
 *   이 경우, 'a'부터 character까지의 거리에서 + n을 더하면 된다.
 *   이때, 'z'로 넘어갈 경우 다시 'a'로 돌아가기 위해 26으로 나눈 나머지를 구한다.
 *   (dictionary['문자'] + n) % 26
 */

function solution(s, n) {
    const dictionary = {};
    for (let i = 0; i < 26; i++) {
        const alphabet = nextAlphabet('a', i);
        dictionary[alphabet] = i;
        dictionary[alphabet.toUpperCase()] = i;
    }

    return [...s]
        .map(character => {
            if (character === ' ') return character;
            const distance = (dictionary[character] + n) % 26;
            return nextAlphabet(
                character === character.toUpperCase() ? 'A' : 'a',
                distance,
            );
        })
        .join('');
}

function nextAlphabet(alphabet, distance) {
    return String.fromCharCode(alphabet.charCodeAt() + distance);
}

/****** TEST CASE *******/

console.log(solution('AB', 1));
console.log(solution('z', 1));
console.log(solution('a B z', 4));
