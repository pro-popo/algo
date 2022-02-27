/**
 * 체육복을 도난 당했다.
 * 학생들의 번호는 체격 순으로, 앞/뒷번호 학생에게 체육복을 빌릴수 있다.
 * 체육수업을 들을 수 있는 학생들을 구하자.
 *
 * @param {*} n 전체 학생의 수 (2-30)
 * @param {*} lost 도난당한 학생들의 번호 배열
 * @param {*} reserve 여벌의 체육복을 가진 학생들의 번호 배열
 * @returns 체육수업을 들을 수 있는 학생의 최댓값
 */

function solution(n, lost, reserve) {
    const isReserve = changeToBooleanArray(reserve, n);

    lost.sort(ASC);
    lost = removePersonLostReserve(lost, isReserve);

    return n - countPersonWithoutQymClothes(lost, isReserve);
}

function changeToBooleanArray(numbers, n) {
    return numbers.reduce((arr, number) => {
        arr[number] = true;
        return arr;
    }, Array(n + 1).fill(false));
}

const ASC = (a, b) => a - b;

function removePersonLostReserve(lost, isReserve) {
    return lost.filter((student) => {
        if (isReserve[student]) {
            isReserve[student] = false;
            return false;
        }
        return true;
    });
}

function countPersonWithoutQymClothes(lost, isReserve) {
    return lost.filter((studentNumber) => {
        const [front, back] = [studentNumber - 1, studentNumber + 1];
        if (isReserve[front]) {
            isReserve[front] = false;
            return false;
        }
        if (isReserve[back]) {
            isReserve[back] = false;
            return false;
        }
        return true;
    }).length;
}

console.log(solution(5, [2, 4], [1, 3, 5]));
console.log(solution(5, [2, 4], [3]));
console.log(solution(3, [3], [1]));
