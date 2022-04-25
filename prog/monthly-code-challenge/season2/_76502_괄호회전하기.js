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
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저 문자열을 회전시킨 모든 경우를 구한다.
 *   그리고, 회전시킨 모든 경우를 순회하여 올바른 괄호 문자열인 경우를 찾는다.
 *
 *   올바른 괄호인지 확인하는 방법은 다음과 같다.
 *   문자열을 순회하여,
 *   만약 열린 괄호라면, 스택에 추가한다.
 *   만약 닫힌 괄호라면, 스택에서 괄호를 꺼내 해당 열린 괄호와 한 쌍인지 확인한다.
 *   이때 한 쌍이 아닌 경우, 올바른 괄호가 아님을 의미한다.
 *
 *   모든 순회를 마친 후,
 *   스택에 괄호가 남아있는 경우, 또한 올바른 괄호가 아님을 의미한다.
 *   스택이 비어있다면, 올바른 괄호임을 의미한다.
 *
 * - 처음에 테스트 케이스 13번만 틀렸던 이유는,
 *   스택에 괄호가 남아있는 경우를 생각하지 못했기 때문이다!
 *
 * - 다른 풀이 방식으로,
 *   올바른 괄호 문자열인지 확인하는 방법으로 정규식을 활용할 수 있다.
 *   해당 문자열 내에서 정규식으로 "()"나 "[]"나 "{}"인 경우를 빈 문자열로 바꾼다.
 *   > 정규식: /([(][)]|[[][\]]|[{][}])+/g
 *   변환한 문자열을 저장한 뒤, 해당 과정을 문자열 길이의 절반만큼 반복한다.
 *
 *   위 과정을 마친 후,
 *   변환된 문자열이 빈 문자열이 된 경우 올바른 괄호 문자열임을 의미한다.
 */

function solution(s) {
    const rotatedStrings = [...Array(s.length)]
        .map((_, i) => i)
        .map(numberRotate => s.slice(numberRotate) + s.slice(0, numberRotate));

    return rotatedStrings.filter(isCorrectBrackets).length;
}

function isCorrectBrackets(s) {
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

console.log('[(){}]'.replace(/([(][)]|[[][\]]|[{][}])+/g, ''));
