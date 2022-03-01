/**
 * 어떤 숫자에서 k개의 수를 제거했을 때 얻을 수 있는 가장 큰 숫자를 구하자.
 *
 * @param {*} number 숫자
 * @param {*} k 제거할 수의 개수
 * @returns 만들 수 있는 가장 큰 수
 *
 */
function solution(number, k) {
    let numbers = [...number];
    numbers.forEach((number, index) => {
        if (
            !isRemainRemoveChance(k) ||
            isNotRemovalNumber(number, numbers[index + 1])
        )
            return;

        let preIndex = index + 1;
        let nextNumber = numbers[index + 1];
        while (isRemainRemoveChance(k) && --preIndex >= 0) {
            if (!isRemainNumber(numbers[preIndex])) continue;
            if (isNotRemovalNumber(numbers[preIndex], nextNumber)) return;

            numbers[preIndex] = REMOVED;
            k--;
        }
    });
    numbers = numbers.filter(isRemainNumber).join('');
    return usingRemainRemoveChances(numbers, k);
}

const REMOVED = -1;

const isRemainRemoveChance = (removeChane) => removeChane > 0;

const isNotRemovalNumber = (preNumber, nextNumber) => preNumber >= nextNumber;

const isRemainNumber = (number) => number !== REMOVED;

const usingRemainRemoveChances = (numbers, removeChances) =>
    numbers.slice(0, numbers.length - removeChances);

console.log(solution('1924', 2));
console.log(solution('1231234', 3));
console.log(solution('4177252841', 4));
console.log(solution('44444', 4));
console.log(solution('987654', 4));
