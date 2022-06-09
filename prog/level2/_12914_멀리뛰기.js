/**
 * 효진이는 멀리 뛰기를 연습하고 있다.
 * 효진이는 한 번에 1칸 또는 2칸을 뛸 수 있다.
 * 이때 맨 끝 칸에 도달할 수 있는 방법이 몇 가지인지 알아내자.
 *
 * @param {number} n - 멀리 뛰에 사용될 칸의 수
 * @returns - 끝에 도달하는 방법의 수
 */

function solution(n) {
    let count = 0;
    jump(0);
    return count % 1234567;

    function jump(point) {
        if (point >= n) {
            if (point === n) count++;
            return;
        }
        jump(point + 1);
        jump(point + 2);
    }
}

/****** TEST CASE *******/

console.log(solution(4));
console.log(solution(3));
