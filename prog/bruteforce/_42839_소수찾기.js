/**
 * 각 종이 조각에 적힌 숫자로 만들 수 있는 소수가 몇 개인가?
 *
 * @param {*} numbers :숫자 배열 (길이 1~7)
 * @returns : 몇 개의 소수가 만들어지는지
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저, 각 숫자로 만들 수 있는 조합을 구한다. (중복 제거)
 *   구한 조합을 가지고 소수인지 판단한다.
 *
 * - 소수인지 판단하기 위해서,
 *   해당 숫자의 √N 까지 확인하면, 시간 복잡도는 O(√N)이 된다.
 *   √N는 해당 숫자의 약수의 중간값을 구하는 방법이다.
 *
 * - 다른 사람 풀이와 유사!
 */

function solution(numbers) {
    const result = new Set();
    combination([...numbers], '', (usedPapers = 0), result);

    return countingPrime(result);
}

function combination(numbers, currentNumber, usedPapers, result) {
    if (isMaxNumberLength(currentNumber, numbers.length)) return;

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

function isMaxNumberLength(number, maxLength) {
    return number.length === maxLength;
}

function isUsedPaper(usedPapers, paperIndex) {
    return usedPapers & (1 << paperIndex);
}

function countingPrime(numbers) {
    return [...numbers].filter(isPrime).length;
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
