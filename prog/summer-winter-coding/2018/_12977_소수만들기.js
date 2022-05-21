/**
 * 주어진 숫자 중 3개의 수를 더했을 때 소수가 되는 경우의 수를 구하고자 한다.
 * 
 * @param {number[]} nums 숫자들이 들어있는 배열 (3~50)
 * @returns {number} 서로 다른 3개를 골라 더했을 때 소수가 되는 경우의 개수
 * 
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저 조합을 활용하여, 세 개의 숫자를 고를 수 있는 모든 경우를 구한다.
 *   고른 숫자들의 조합을 순회하여 각각의 숫자들을 더해준다.
 *   그 다음, 모두 더한 숫자가 소수인 경우를 찾는다.
 */

function solution(nums) {
    return selectNums(nums).map(sum).filter(isPrime).length;
}

function sum(numbers) {
    return numbers.reduce((sum, number)=> sum + number, 0);
}

function isPrime(number){
    for (let i = 2; i * i <= number; i++) {
        if(number % i === 0) return false;        
    }
    return true;
}

function selectNums(nums){
    const selectedNums = [];
    combination([], 0);
    return selectedNums;

    function combination(selectNums, index){
        if(selectNums.length === 3) {
            selectedNums.push(selectNums);
            return;
        }
        for (let i = index; i < nums.length; i++) {
            combination(selectNums.concat(nums[i]), i+1);
        }
    }
}


/****** TEST CASE *******/

console.log(solution([1, 2, 3, 4]));
console.log(solution([1, 2, 7, 6, 4]));
