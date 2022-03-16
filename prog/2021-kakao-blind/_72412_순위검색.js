/**
 * 조건을 만족하는 사람 중 코딩 테스트 점수를 X점 이상 받은 사람은 모두 몇 명인가?
 * 지원자는 지원서 작성 시, 4가지 항목을 반드시 선택한다.
 * - 개발언어, 직군, 경력, 소울푸드
 *
 * @param {*} info 지원자가 지원서에 입력한 4가지의 정보와 획득한 코딩테스트 점수를
 *                 하나의 문자열로 구성한 값의 배열 (1~50_000)
 * @param {*} query 개발팀이 궁금해하는 문의조건이 문자열 형태로 담긴 배열
 *                  만약, 특정 조건을 고려하지 않는다면 '-'표시 (1~100_000)
 * @returns 각 문의조건에 해당하는 사람들의 숫자를 순서대로 배열에 담아 반환
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저 각각의 지원서 정보(4가지 정보)로 만들 수 있는 모든 문의조건을 생성한다.
 *   [EX] java backend junior pizza => - backend junior pizza, - - junior pizza , ... , - - - -
 *   이렇게 각 지원자는 총 16가지 문의조건에 속하게 된다. (2*2*2*2)
 *
 *   이때, 문의조건을 key, 지원자의 코딩테스트 점수를 value로 저장한다.
 *   {
 *     javabackendjuniorpizza: [150]
 *   }
 *   즉, 해당 문의조건을 만족하는 지원자들의 코딩테스트 점수에 대해 Map 객체로 저장한다.
 *
 *   모든 지원서 정보를 문의조건별로 분류한 뒤,
 *   코딩테스트 점수들(value)을 내림차순으로 정렬한다. => 이분 탐색을 위한 정렬
 *
 *   그 다음 query를 순회하여,
 *   개발팀의 문의 조건(4가지 정보)을 만족하는 지원서 중
 *   요구한 코딩 테스트 점수를 만족하는 점수가 몇 개인지 판단한다.
 *   이때, 코딩테스트 점수들을 대상으로 이분 탐색을 진행한다.
 *
 *   단순히 순차적으로 점수를 찾게 되면,
 *   최악의 경우 50_000(info) * 100_000(query) = 10_000_000_000으로 시간 초과가 발생한다.
 *
 *   참고로, 이분 탐색의 시간복잡도는 O(logN)이다.
 *
 * - 처음에는,
 *   다음과 같은 형태로 데이터를 분류했다.
 *   {
 *      java: [0],
 *      backend: [0,1],
 *      ...
 *      scores: [150, 80, ..., 0]
 *   }
 *   위처럼 분류한 뒤,
 *   각각의 조건에 맞는 지원서들을 하나씩 걸러내면서 정답을 찾았다.
 *   정확성은 전부 통과했지만, 효율성에서 0점을 받았다. 😭
 *   혹시나 하는 마음에 메모이제이션으로 다음과 같이 저장해 보았지만,
 *   {
 *     java: [0, 1],
 *     javabackend: [0, 1],
 *     javabackendjunior : [0],
 *     ...
 *   }
 *   그래도 시간 초과가 발생했다..😂
 *
 * - 고민하다가 결국 답지를 봤던 문제다.
 *   범위가 크지 않아서 모든 조합을 만들 수 있다, 라는 중요한 포인트를 놓쳤다..😂
 *   아쉽지만, 재미있는 문제였다.👍
 *
 */

function solution(info, query) {
    const scoresByCondition = classifyScoresByCondition(info);
    sortScoresInDESC(scoresByCondition);

    return query.map((query) => {
        query = query.replace(/ and /g, ' ').split(' ');
        const [minScore, condition] = [+query.pop(), query.join('')];
        const scores = scoresByCondition.get(condition) || [];

        return countScoresMoreThenMinScore(minScore, scores);
    });
}

function classifyScoresByCondition(info) {
    return info.reduce((scoresByCondition, application) => {
        const [language, job, career, soulFood, score] = application.split(' ');
        [language, '-'].forEach((language) => {
            [job, '-'].forEach((job) => {
                [career, '-'].forEach((career) => {
                    [soulFood, '-'].forEach((soulFood) => {
                        const condition = language + job + career + soulFood;
                        const scores = scoresByCondition.get(condition) || [];
                        scores.push(+score);
                        scoresByCondition.set(condition, scores);
                    });
                });
            });
        });
        return scoresByCondition;
    }, new Map());
}

function sortScoresInDESC(scoresByCondition) {
    for (const scores of scoresByCondition.values()) {
        scores.sort((a, b) => b - a);
    }
}

function countScoresMoreThenMinScore(minScore, scores) {
    let [min, max] = [0, scores.length - 1];
    let answer = -1;
    while (min <= max) {
        let mid = Math.floor((min + max) / 2);

        if (scores[mid] < minScore) {
            max = mid - 1;
            continue;
        }
        answer = mid;
        min = mid + 1;
    }
    return answer + 1;
}

/****** TEST CASE *******/

console.log(
    solution(
        [
            'java backend junior pizza 150',
            'python frontend senior chicken 210',
            'python frontend senior chicken 150',
            'cpp backend senior pizza 260',
            'java backend junior chicken 80',
            'python backend senior chicken 50',
        ],
        [
            'java and backend and junior and pizza 100',
            'python and frontend and senior and chicken 200',
            'cpp and - and senior and pizza 250',
            '- and backend and senior and - 150',
            '- and - and - and chicken 100',
            '- and - and - and - 150',
        ],
    ),
);
