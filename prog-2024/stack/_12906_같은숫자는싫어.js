/**
 * 0 ~ 9까지 이루어진 배열
 * 연속적으로 나타나는 숫자는 하나만 남기고 전부 제거
 * 단, 제거된 후 남은 수들을 반환할 때에는 순서 유지
 * @param {string[]} arr 숫자 배열
 * @returns 연속적으로 나타나는 숫자는 제거한 남은 수들
 */
function solution01(arr) {
    return arr.reduce((stack, num) => {
        if (stack[stack.length - 1] === num) return stack;
        stack.push(num);
        return stack;
    }, []);
}

function solution02(arr) {
    return arr.filter((num, idx) => num !== arr[idx - 1]);
}

console.log(solution01([1, 1, 3, 3, 0, 1, 1]));
console.log(solution02([1, 1, 3, 3, 0, 1, 1]));
