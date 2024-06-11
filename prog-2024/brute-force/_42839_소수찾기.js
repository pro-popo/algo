/**
 * 흩어진 종이 조각을 붙여 소수를 몇 개 만들 수 있는가
 *
 * @param {string} numbers 각 종이 조각에 적힌 숫자가 적힌 문자열
 * @returns 종이 조각으로 만들 수 있는 소수
 */

function solution(numbers) {
    const answer = new Set();

    const permutation = selected => {
        if (selected.length === numbers + 1) return;

        const number = Number(selected.map(idx => numbers[idx]).join(''));
        if (isPrime(number)) answer.add(number);

        for (let i = 0; i < numbers.length; i++) {
            if (selected.includes(i)) continue;
            permutation(selected.concat(i));
        }
    };
    permutation([], 0);

    return answer.size;
}

const isPrime = number => {
    if (number <= 1) return false;
    for (let i = 2; i * i <= number; i++) {
        if (number % i === 0) return false;
    }
    return true;
};

console.log(solution('17'));
