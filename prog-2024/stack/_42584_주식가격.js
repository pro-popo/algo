/**
 * 가격이 떨어지지 않는 기간은 몇초인지
 * @param {number[]} prices 초 단위로 기록된 주식가격
 * @returns 가격이 떨어지지 않은 기간
 */

function solution(prices) {
    const answer = [];
    for (let i = 0; i < prices.length; i++) {
        let count = 0;
        for (let j = i + 1; j < prices.length; j++) {
            count++;
            if (prices[i] > prices[j]) break;
        }
        answer.push(count);
    }
    return answer;
}

console.log(solution([1, 2, 3, 2, 3]));
