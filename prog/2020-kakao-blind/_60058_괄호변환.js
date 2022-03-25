/**
 * 소스 코드 내 작성된 괄호가 개수는 맞지만
 * 짝이 맞지 않은 형태로 작성된 경우가 있다.
 *
 * 이를 위해, 작성된 모든 괄호를 뽑아서
 * 올바른 순서대로 배치된 괄호 문자열을 알려주는 프로그램을 개발하고자 한다.
 *
 * "("와 ")"의 개수가 같다면, 균형잡힌 괄호 문자열
 * 개수와 짝이 맞으면, 올바른 괄호 문자열
 *
 * 1. 입력이 빈 문자열인 경우, 빈 문자열 반환
 * 2. 문자열 w를 두 균형잡힌 괄호 문자열 (u, v)로 분리
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
 */

function solution(p) {
    return convertBrackets(p);
}

function convertBrackets(p) {
    if (!p) return '';

    let [u, v] = splitByBalancedBrackets(p);

    if (isCorrectBrackets(u)) return u + convertBrackets(v);

    return (
        `(${convertBrackets(v)})` + reverseBrackets(u.slice(1, u.length - 1))
    );
}

function splitByBalancedBrackets(p) {
    const balance = [0, 0];
    let balanceIndex = 0;
    for (const [i, bracket] of Object.entries(p)) {
        if (bracket === '(') balance[0]++;
        else balance[1]++;

        if (balance[0] && balance[0] === balance[1]) {
            balanceIndex = +i;
            break;
        }
    }

    return [p.slice(0, balanceIndex + 1), p.slice(balanceIndex + 1)];
}

function isCorrectBrackets(u) {
    const stack = [];
    for (const bracket of u) {
        if (bracket === '(') stack.push(bracket);
        if (bracket === ')' && !stack.pop()) return false;
    }
    return true;
}

function reverseBrackets(p) {
    return [...p].map((bracket) => (bracket === '(' ? ')' : '(')).join('');
}

console.log(solution('(()())()'));
console.log(solution(')('));
console.log(solution('()))((()'));
