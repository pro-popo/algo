/**
 * 폰켓몬은 종류에 따라 번호로 구분
 * 최대한 많은 종류의 폰켓몬을 포함해 n/2마리를 선택하고자 한다.
 *
 * @param {*} nums 폰켓몬의 종류 번호가 담긴 배열
 * @returns 가장 많은 종류의 폰켓몬을 선택하는 방법
 */
function solution(nums) {
    const setNumbs = new Set(nums);
    return Math.min(Math.floor(nums.length / 2), setNumbs.size);
}

console.log(solution([3, 1, 2, 3]));
