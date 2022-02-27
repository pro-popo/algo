/**
 * 체육복을 도난 당했다.
 * 학생들의 번호는 체격 순으로, 앞/뒷번호 학생에게 체육복을 빌릴수 있다.
 * 체육수업을 들을 수 있는 학생들을 구하자.
 *
 * @param {*} n 전체 학생의 수 (2-30)
 * @param {*} lost 도난당한 학생들의 번호 배열
 * @param {*} reserve 여벌의 체육복을 가진 학생들의 번호 배열
 * @returns 체육수업을 들을 수 있는 학생의 최댓값
 *
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저 여벌의 체육복을 잃어버린 학생들을 제외한다. (lost와 reserve 둘 다 존재하는 학생)
 *   앞, 뒤 순서로 여벌의 체육복이 존재하는지 검사한 후, 체육복을 빌린다.
 *   마지막까지 체육복을 빌리지 못한 학생들만 뽑아낸다.
 *
 * - 문제를 풀면서 두 가지 포인트를 놓쳤다.
 *   첫 번째는, lost가 기본적으로 오름차순으로 입력이 들어오지 않는다는 점.
 *   두 번째는, 여벌의 체육복을 잃어버린 학생이 존재할 수 있다는 점이다.
 *
 * - 다른 사람 문제 중,
 *   reserve.find(r => Math.abs(r-a) <= 1)와 같이 Math.abs로 앞/뒤 번호를 찾는 방법도 있었다.
 *
 * - reserve를 boolean 배열로 바꿀 필요없이 그대로 사용할 수 있다.
 *   그러면, 더 짧은 코드로 작성할 수 있으나, 사용한 여벌에 대해 기존 배열에서 제거하는 과정이 필요하다.
 */

function solution(n, lost, reserve) {
    const isReserve = changeToBooleanArray(reserve, n);

    lost.sort(ASC);
    lost = removeStudentsLostReserve(lost, isReserve);

    return n - countStudentWithoutQymClothes(lost, isReserve);
}

function changeToBooleanArray(numbers, n) {
    return numbers.reduce((arr, number) => {
        arr[number] = true;
        return arr;
    }, Array(n + 1).fill(false));
}

const ASC = (a, b) => a - b;

function removeStudentsLostReserve(lost, isReserve) {
    return lost.filter((student) => {
        if (isReserve[student]) {
            isReserve[student] = false;
            return false;
        }
        return true;
    });
}

function countStudentWithoutQymClothes(lost, isReserve) {
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
