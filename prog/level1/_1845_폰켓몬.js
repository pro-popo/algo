/**
 * 홍 박사는 자신의 연구실에 있는 총 N 마리의 폰켓몬 중에서 N/2마리를 가져가도 좋다고 했다.
 * 폰켓몬은 종류에 따라 번호를 붙여 구분한다.
 *
 * 이때 폰켓몬을 선택하는 경우 중,
 * 가질 수 있는 폰켓몬 종류 수가 최대인 경우를 찾고자 한다.
 *
 * 예로, 연구실에 [3번, 1번, 2번, 3번]인 4마리의 폰켓몬이 있다면,
 * 4마리의 폰켓몬 중 마리를 고르는 방법은 다음과 같이 6가지이다.
 * 1. [3,1]
 * 2. [3,2]
 * 3. [3,3]
 * 4. [1,2]
 * 5. [1,3]
 * 6. [2,3]
 *
 * 이때, 가질 수 있는 폰켓몬 종류 수의 최댓값은 2가 된다.
 *
 * 최대한 다양한 종류의 폰켓몬을 가지길 원하기 위해,
 * 최대한 많은 종류의 폰켓몬을 포함해서 N/2마리를 선택하려 한다.
 *
 * @param {number[]} nums - N마리 폰켓몬의 종류 번호가 담긴 배열
 * @returns - 선택할 수 있는 폰켓몬 종류 수의 최댓값
 */

function solution(nums) {
    const types = new Set(nums);
    const half = Math.floor(nums.length / 2);
    return half < types.size ? half : types.size;
}

/****** TEST CASE *******/

console.log(solution([3, 1, 2, 3]));
console.log(solution([3, 3, 3, 2, 2, 4]));
console.log(solution([3, 3, 3, 2, 2, 2]));
