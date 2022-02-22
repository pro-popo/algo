/**
 * [실버3] 후보 추천하기
 * 추천받은 학생의 사진을 사진틀에 게시하고 
 * 추천받은 횟수를 표시하는 규칙
 * 
 * 1. 추천 시작 전, 모든 사진틀은 비어있음
 * 2. 추천 시, 학생의 사진이 반드시 사진틀에 게시
 * 3. 비어있는 사진틀이 없는 경우, 현재까지 추천 받은 횟수가 가장 적은 학생의 사진 제거
 *  -> 두 명이상인 경우, 가장 오래된 사진을 삭제
 * 4. 현재 사진이 게시된 학생이 추천받으면, 횟수만 증가
 * 5. 사진틀에서 삭제되면 해당 학생이 받은 추천수는 0
 * 
 * N : 1~20
 * 추천 횟수 : 1000 이하
 * 학생 번호 : 1~100
 * 
 * [ result ]
 * 사진틀에 사진이 게재된 최종 후보의 학생 번호를 증가하는 순서대로 출력
 */

function input() {
    const fs = require('fs');
    const stdin = (process.platform === 'linux'
        ? fs.readFileSync('/dev/stdin').toString()
        : `3
9
2 1 4 3 5 6 2 7 2`
    ).split("\n");
    return stdin;
}

function solution(){
    const [ N, R, list ] = input(); // 사진틀 개수, 총 추천 횟수, 추천받은 학생 번호
    const students = list.split(' ');
    
    const candidates = new Map();
    
    // 학생번호, idx, 추천수(cnt)
    for (let i = 0; i < R; i++) {
        if(candidates.has(+students[i])){
            candidates.get(+students[i])[1]++;
            continue;
        }
        if(candidates.size == N){
            let min = null;
            for([key, value] of candidates){
                if(!min) min = [key, value];
                else {
                    const [minIdx, minCnt] = min[1];
                    const [idx, cnt] = value;
                    if(minCnt < cnt) continue;
                    else if(minCnt == cnt && minIdx < idx) continue;
                    else
                        min = [key, value];
                }
            }
            candidates.delete(min[0]);
        }
        candidates.set(+students[i], [i, 1]);
    }
    let result = '';
    [...candidates.keys()].sort((a,b) => a-b).forEach(candidate => result += candidate + " ");
    console.log(result);

}
solution();