/**
 * 선행 스킬이란, 스킬을 배우기 전 먼저 배워야 하는 스킬을 의미한다.
 * [EX] 스파크 → 라이트닝 볼트 → 썬더
 * 이때, 순서에 없는 다른 스킬은 순서에 상관없이 배울 수 있다.
 *
 * @param {*} skill 선행 스킬 순서 (1~20)
 * @param {*} skill_trees 유저들이 만든 스킬트리 (1,20)
 * @returns 가능한 스킬트리 개수
 */

function solution(priorSkill, skillTrees) {
    return skillTrees.filter(isPossibleSkill).length;

    function isPossibleSkill(skillTree) {
        const skills = skillTree.replace(
            new RegExp(`[^${priorSkill}]`, 'g'),
            '',
        );

        return priorSkill.startsWith(skills);
    }
}

/****** TEST CASE *******/

console.log(solution('CBD', ['BACDE', 'CBADF', 'AECB', 'BDA']));
