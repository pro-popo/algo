/**
 * 정답을 찍어서 가장 많은 문제를 맞힌 사람이 누구인가?
 *
 * 1번 수포자가 찍는 방식: 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, ...
 * 2번 수포자가 찍는 방식: 2, 1, 2, 3, 2, 4, 2, 5, 2, 1, 2, 3, 2, 4, 2, 5, ...
 * 3번 수포자가 찍는 방식: 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, 3, 3, 1, 1, 2, 2, 4, 4, 5, 5, ...
 *
 * @param {*} answers :정답이 순서대로 들은 배열
 * @returns :가장 많은 문제를 맞힌 사람, 여럿인 경우 오른차순 정렬
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   answers의 길이만큼 학생들의 정답을 생성한다.
 *   차례대로 answers와 비교하여 정답수를 계산하고,
 *   가장 점수가 높은 학생들을 반환한다.
 *
 * - 다른 사람의 풀이를 보면,
 *   학생들의 규칙을 정답의 길이만큼 생성하는 것이 아닌,
 *   학생들의 규칙을 활용(answersIndex%rule.length)한다.
 *
 * - 정답수를 계산할 때,
 *   reduce 대신 filter를 사용하면 코드가 더 짧아진다!
 *   reduce가 정답을 누적한다는 의미를 더 잘 주는 것 같아서 filter 대신에 사용했지만,
 *   여기서는 filter 또한 의미 전달이 잘 된다고 판단하여 수정했다.
 */

function solution(answers) {
    const students = createAnswers(
        answers.length,
        [1, 2, 3, 4, 5],
        [2, 1, 2, 3, 2, 4, 2, 5],
        [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
    );

    const rank = students
        .map((student, studentId) => [
            countingAnswer(answers, student),
            studentId + 1,
        ])
        .sort(DESC);

    return getWinnerStudents(rank);
}

function createAnswers(length, ...rules) {
    return rules.map((rule) => ''.padEnd(length, rule.join('')));
}

function countingAnswer(answers, student) {
    return answers.filter((answer, index) => isAnswer(answer, student[index]))
        .length;
}

function isAnswer(answer, myAnswer) {
    return answer == myAnswer;
}

const DESC = ([a], [b]) => b - a;

function getWinnerStudents(rank) {
    const [highestScore] = rank[0];
    return rank
        .filter(([score, _]) => score == highestScore)
        .map(([_, student]) => student);
}

console.log(solution([1, 2, 3, 4, 5]));
console.log(solution([1, 3, 2, 4, 2]));
