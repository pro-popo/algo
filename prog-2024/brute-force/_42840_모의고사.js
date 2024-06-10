/**
 * 수포자는 모의고사에 수학 문제를 전부 찍고자 한다.
 * 1번 문제부터 마지막 문제까지의 정답이 순서대로 주어졌을 때 가장 많은 문제를 맞힌 사람
 *
 * @param {number[]} answers
 * @returns
 */
function solution(answers) {
    const p1 = [1, 2, 3, 4, 5];
    const p2 = [2, 1, 2, 3, 2, 4, 2, 5];
    const p3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

    const count = [0, 0, 0];
    answers.forEach((answer, i) => {
        [p1, p2, p3].forEach((person, pid) => {
            if (person[i % person.length] === answer) count[pid]++;
        });
    });

    const max = Math.max(...count);
    return count.reduce((answer, num, idx) => {
        if (num === max) answer.push(idx + 1);
        return answer;
    }, []);
}

console.log(solution([1, 2, 3, 4, 5]));
