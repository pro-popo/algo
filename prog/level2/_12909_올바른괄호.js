/**
 * 괄호가 바르게 짝지어졌다는 것은 "("문자로 열렸으면 반드시 ")"문자로닫혀야 한다는 뜻이다.
 * 
 * 예로,
 * - "()()", "(())()"는 올바른 괄호
 * - ")()(", "(()("는 올바르지 않은 괄호
 * 
 * 이때 문자열 s가 올바른 괄호인지 아닌지 검사하자.
 * 
 * @param {string} s - 문자열 (100_000)
 * @returns  - 문자열 s가 올바른 괄호이면 true, 아니면 false를 반환
 * 
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   열린 괄호의 개수를 카운트하여 닫힌 괄호와 짝이 맞는지 확인하였다.
 *   
 *   문자열을 순회하여,
 *   열린 괄호인 경우 열린 괄호의 개수를 증가시킨다.
 *   반대로 닫힌 괄호인 경우 열린 괄호의 개수를 감소시킨다.
 *   이때 열린 괄호의 개수가 0보다 작아질 경우 짝이 맞지 않는 경우이므로 false를 반환한다.
 * 
 *   마지막으로 순회를 마친 후,
 *   열린 괄호의 개수가 남아있는 경우 false, 없는 경우 true를 반환한다.
 * 
 * - 처음에는 스택을 활용하였다.
 *   위와 동일한 방식으로 열린 괄호인 경우 스택에 저장하고,
 *   닫힌 괄호인 경우 스택에서 열린 괄호를 pop하였다.
 *   그러나 효율성 2번 문제에서 시간 초과가 발생했다.
 */

function solution(s){
    let leftBracket = 0;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === "(") leftBracket++;
        else leftBracket--;
        
        if (leftBracket < 0) return false;
    }

    return leftBracket === 0 ? true : false;
}

/****** TEST CASE *******/

console.log(solution("()()"));
console.log(solution("(())()"));
console.log(solution(")()("));
console.log(solution("(()("));