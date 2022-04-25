/**
 * 올바른 괄호 문자열은 다음 규칙을 지킨다.
 * - (), [], {}는 모두 올바른 괄호 문자열이다.
 * - A가 올바른 괄호 문자열이라면 (A)도 올바른 괄호 문자열이다.
 * - A와 B가 올바른 괄호 문자열이라면, AB도 올바른 문자열이다.
 *
 * 올바른 괄호 문자열이 아니라면,
 * 왼쪽으로 x칸만큼 회전시켜 올바른 괄호 문자열로 만들어야 한다.
 *
 * @param {*} s 괄호로 이루어진 문자열 (1~1_000)
 * @returns s를 회전시켰을 때 나타나는 올바른 괄호 문자열의 개수
 */

function solution(s) {
    let answer = 0;
    let numberOfRorate = s.length;
    do {
        const rotated = s.slice(numberOfRorate) + s.slice(0, numberOfRorate);
        if (isCorrectBracket(rotated)) answer++;
    } while (--numberOfRorate);

    return answer;
}

function isCorrectBracket(s) {
    const brackets = new Bracket();

    const stack = [];
    for (let i = 0; i < s.length; i++) {
        const bracket = s[i];
        if (brackets.isLeft(bracket)) {
            stack.push(bracket);
            continue;
        }
        if (brackets.isPair(stack.pop(), bracket)) continue;

        return false;
    }

    if (!stack.length) return true;
}

class Bracket {
    brackets = new Map([
        ['(', ')'],
        ['[', ']'],
        ['{', '}'],
    ]);

    isLeft(bracket) {
        return [...this.brackets.keys()].includes(bracket);
    }

    isPair(left, right) {
        return this.brackets.get(left) === right;
    }
}

/****** TEST CASE *******/

console.log(solution('[](){}'));
console.log(solution('}]()[{'));
console.log(solution('('));
