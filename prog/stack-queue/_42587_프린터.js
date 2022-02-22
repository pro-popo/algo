/**
 * [STACK/QUEUE] 프린터
 * ### 문제
 * - 중요도가 높은 문서부터 먼저 인쇄
 * 1. 대기 목록 중, 가장 앞에 있는 문서 pop
 * 2. 해당 문서보다 중요도가 높은 문서가 한개라도 있다면, 가장 마지막에 다시 집어넣기
 * 3. 아니면 인쇄
 * - 요청한 문서가 몇 번쨰로 인쇄될까
 * 
 * ### 입력
 * - priorities : 중요도
 * - location : 내가 인쇄를 요청한 문서 위치
 * 
 * ### 출력
 * - 내가 요청한 문서가 몇 번째로 인쇄되는지 return
*/

function solution(priorities, location) {
    const documentList = priorities.map((priority, location) => ({ priority, location }));
    let printCount = 0;

    while (true) {
        const print = documentList.shift();
        if (documentList.find(document => document.priority > print.priority))
            documentList.push(print);
        else {
            printCount++;
            if (print.location === location) return printCount;
        }
    }
}

console.log(solution([2, 1, 3, 2], 2));
console.log(solution([1, 1, 9, 1, 1, 1], 0));