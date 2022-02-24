/**
 * 정답을 찍어서 가장 많은 문제를 맞힌 사람이 누구인가?
 *
 * 1번 수포자가 찍는 방식: 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, ...
 * 2번 수포자가 찍는 방식: 2, 1, 2, 3, 2, 4, 2, 5, 2, 1, 2, 3, 2, 4, 2, 5, ...
 * 3번 수포자가 찍는 방식: 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, ...
 *
 * @param {*} answers :정답이 순서대로 들은 배열
 * @returns :가장 많은 문제를 맞힌 사람, 여럿인 경우 오른차순 정렬
 */
function solution(answers) {
    const students = createAnswers(
        answers.length,
        [1, 2, 3, 4, 5],
        [2, 1, 2, 3, 2, 4, 2, 5],
        [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
    );

    console.log([1, 2, 3, 4, 5].join('').padEnd(20));
    console.log(students);
    const rank = students
        .map((student, index) => {
            return [
                answers.reduce((sum, answer, index) => {
                    if (answer == student[index]) sum++;
                    return sum;
                }, 0),
                index + 1,
            ];
        })
        .sort(([a], [b]) => b - a);

    return getWinnerStudents(rank);
}

function createAnswers(length, ...rules) {
    return rules.map((rule) => ''.padEnd(length, rule.join('')));
}

function getWinnerStudents(rank) {
    const [highestScore] = rank[0];
    return rank
        .filter(([score, _]) => score == highestScore)
        .map(([_, student]) => student);
}

console.log(solution([1, 2, 3, 4, 5, 5, 5]));
console.log(solution([1, 3, 2, 4, 2]));
