/**
 * 주어진 괄호 문자열은 괄호가 개수는 맞지만
 * 짝이 맞지 않은 형태로 작성된 경우가 있다.
 *
 * 이를 위해, 작성된 모든 괄호를 뽑아서
 * 올바른 순서대로 배치된 괄호 문자열을 알려주는 프로그램을 개발하고자 한다.
 *
 * "("와 ")"의 개수가 같다면, 균형잡힌 괄호 문자열
 * 개수와 짝이 맞으면, 올바른 괄호 문자열
 *
 * 다음 규칙에 따라 올바른 괄호 문자열로 변환한다.
 * 1. 입력이 빈 문자열인 경우, 빈 문자열 반환
 * 2. 문자열 w를 두 균형잡힌 괄호 문자열 (u, v)로 분리.
 *    단, u는 "균형잡힌 괄호 문자열"로 더 이상 분리할 수 없어야한다.
 * 3. 문자열 u가 올바른 괄호 문자열이라면, 문자열 v에 대해 1단계부터 다시 수행
 *    -> 수행한 결과 문자열을 u에 이어 붙인 후 반환
 * 4. 문자열 u가 올바른 괄호 문자열이 아니라면, 아래 과정을 수행
 *    -> 빈 문자열에 첫 번쨰 문자열로 "("를 추가
 *    -> 문자열 v에 대해 1단계부터 재귀적으로 수행한 결과 문자열을 이어 붙임
 *    -> ")"를 다시 붙음
 *    -> u의 첫 번째와 마지막 문자를 제거하고, 나머지 문자열의 괄호 방향을 뒤집어 뒤에 붙임
 *    -> 생성된 문자열 반환
 *
 * @param {*} p 균형잡힌 괄호 문자열
 * @returns 올바른 괄호 문자열로 변환한 결과
 *
 * ### 리뷰
 * - 풀이 방식은,
 *   문제에서 제시한 규칙을 그대로 적용하면 된다!
 *
 * - 균형잡힌 괄호로 문자열로 분리하는 로직에서 균형잡힌 괄호를 찾을 때,
 *   굳이 "("와 ")"의 개수를 셀 필요없이,
 *   "("인 경우 1을 더하고, ")"인 경우 1을 빼서 값이 0이 될 때까지 반복하여 구할 수 있다.
 *
 * - 주어진 규칙을 그대로 구현하면 되는 문제라 푸는데에는 어려움이 없었다.
 *   오히려 변수명이나 메서드명을 정하는 것과, 클래스로 변환하는 과정이 더 어려웠다.. 😩
 */

function solution(p) {
    return new Bracket(p).convertCorrectBrackets();
}

class Bracket {
    constructor(brackets) {
        this.brackets = brackets;
    }

    toString() {
        return this.brackets;
    }

    convertCorrectBrackets() {
        if (!this.brackets) return '';

        let [u, v] = this.splitByBalancedBrackets();

        if (u.isCorrect()) return u + v.convertCorrectBrackets();

        return (
            `(${v.convertCorrectBrackets()})` +
            u.removeBracketAtBothEnds().reverse()
        );
    }

    splitByBalancedBrackets() {
        let [start, end] = this.findBalancedBrackets();
        return [this.brackets.slice(start, end), this.brackets.slice(end)].map(
            (brackets) => new Bracket(brackets),
        );
    }

    findBalancedBrackets() {
        const pairOfBracket = {
            '(': 0,
            ')': 0,
        };
        for (const bracket of this.brackets) {
            pairOfBracket[bracket]++;

            if (pairOfBracket['('] === pairOfBracket[')']) break;
        }

        return [0, pairOfBracket['('] + pairOfBracket[')']];
    }

    isCorrect() {
        const stack = [];
        for (const bracket of this.brackets) {
            if (bracket === '(') stack.push(bracket);
            if (bracket === ')' && !stack.pop()) return false;
        }
        return true;
    }

    removeBracketAtBothEnds() {
        this.brackets = this.brackets.slice(1, this.brackets.length - 1);
        return this;
    }

    reverse() {
        return [...this.brackets]
            .map((bracket) => (bracket === '(' ? ')' : '('))
            .join('');
    }
}

console.log(solution('(()())()'));
console.log(solution(')('));
console.log(solution('()))((()'));
