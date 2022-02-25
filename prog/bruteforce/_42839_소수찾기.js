/**
 * 각 종이 조각에 적힌 숫자로 만들 수 있는 소수가 몇 개인가?
 *
 * @param {*} numbers :숫자 배열 (1~7의 자리)
 * @returns : 몇 개의 소수가 만들어지는지
 */

function solution(numbers) {
    const result = new Set();
    combination([...numbers], '', (usedPapers = 0), result);

    return [...result].filter(isPrime).length;
}

function combination(numbers, currentNumber, usedPapers, result) {
    if (currentNumber.length === numbers.length) return;

    numbers.forEach((number, index) => {
        if (isUsedPaper(usedPapers, index + 1)) return;

        const newNumber = currentNumber + number;
        result.add(+newNumber);
        combination(
            numbers,
            newNumber,
            usedPapers | (1 << (index + 1)),
            result,
        );
    });
}

function isUsedPaper(usedPapers, paperIndex) {
    return usedPapers & (1 << paperIndex);
}

function isPrime(number) {
    if (number < 2) return false;

    for (let i = 2; i * i <= number; i++) {
        if (number % i === 0) return false;
    }
    return true;
}

console.log(solution('17'));
console.log(solution('011'));
