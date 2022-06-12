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