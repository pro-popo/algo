/**
 * 선행 스킬이란, 스킬을 배우기 전 먼저 배워야 하는 스킬을 의미한다.
 * [EX] 스파크 → 라이트닝 볼트 → 썬더
 * 이때, 순서에 없는 다른 스킬은 순서에 상관없이 배울 수 있다.
 *
 * @param {*} skill 선행 스킬 순서 (1~20)
 * @param {*} skill_trees 유저들이 만든 스킬트리 (1,20)
 * @returns 가능한 스킬트리 개수
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   스킬트리로 가능한 경우는 다음과 같이 찾는다.
 *   1. 스킬트리에서 선행 스킬만 골라낸다.
 *      이때, 정규식을 사용하여 선행스킬 이외의 스킬을 제거하면 된다.
 *      선행 스킬이 "ABD"인 경우, "EABS" => "AB"
 *
 *   2. 추출한 스킬과 선행 스킬의 순서가 동일한지 확인한다.
 *      이 경우, 선행 스킬이 추출한 스킬로 시작하는지 확인하면 된다.
 *      - 선행스킬.indexOf(추출스킬) === 0
 *      - 선행스킬.startsWith(추출스킬)
 *
 *   위 과정을 통해 유저들이 만든 스킬트리 중 가능한 스킬트리를 찾는다.
 *
 * - 처음에는 선행해야 하는 스킬이 스킬트리에서 존재하지 않는 경우, 무시해도 되는줄 알았다.
 *   그래서 추출한 스킬이 선행 스킬에 속하는지 확인하였다. 😅
 */

function solution(priorSkill, skillTrees) {
    return skillTrees.filter(isPossibleSkill).length;

    function isPossibleSkill(skillTree) {
        const notPriorSkill = new RegExp(`[^${priorSkill}]`, 'g');
        const skills = skillTree.replace(notPriorSkill, '');

        return priorSkill.startsWith(skills);
    }
}

/****** TEST CASE *******/

console.log(solution('CBD', ['BACDE', 'CBADF', 'AECB', 'BDA']));
