/**
 * 어떤 숫자에서 k개의 수를 제거했을 때 얻을 수 있는 가장 큰 숫자를 구하자.
 *
 * @param {*} number 숫자
 * @param {*} k 제거할 수의 개수
 * @returns 만들 수 있는 가장 큰 수
 */

function solution(number, k) {
    let numbers = [...number];
    while (k-- > 0) {
        let removeIndex = findSmallThenNextNumber(numbers);
        if (isNotFindIndexForRemoval(removeIndex))
            removeIndex = findSameNextNumber(numbers);
        if (isNotFindIndexForRemoval(removeIndex))
            removeIndex = getLastIndexOfNumbers(numbers);
        numbers = removeNumber(numbers, removeIndex);
    }
    return numbers.join('');
}

function isNotFindIndexForRemoval(index) {
    return index === -1;
}

function findSmallThenNextNumber(array) {
    return array.findIndex((number, index) => number < array[index + 1]);
}

function findSameNextNumber(array) {
    return array.findIndex((number, index) => number === array[index + 1]);
}

function getLastIndexOfNumbers(array) {
    return array.length - 1;
}

function removeNumber(array, removeIndex) {
    return array.filter((_, index) => index != removeIndex);
}

console.log(solution('1924', 2));
console.log(solution('1231234', 3));
console.log(solution('4177252841', 4));
console.log(solution('44444', 4));
console.log(solution('987654', 4));
