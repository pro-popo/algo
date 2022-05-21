/**
 * 주어진 숫자 중 3개의 수를 더했을 때 소수가 되는 경우의 수를 구하고자 한다.
 * 
 * @param {number[]} nums 숫자들이 들어있는 배열 (3~50)
 * @returns {number} 서로 다른 3개를 골라 더했을 때 소수가 되는 경우의 개수
 */

function solution(nums) {
    const selectedNumbers = selectNums(nums);
    return selectedNumbers
        .map(numbers => numbers.reduce((sum, number)=> sum + number, 0))
        .filter(isPrime).length;
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
