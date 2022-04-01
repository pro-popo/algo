/**
 * 음악의 노래 가사에 사용된 단어들 중,
 * 특정 키워드가 몇 개 포함되어 있는지 찾는 프로그램을 개발하고자 한다.
 * 와일드 문자인 "?"는 글자 하나를 의미한다.
 *
 * @param {*} words 가사에 사용된 모든 단어들이 담긴 배열 (1~100_000)
 *                  전체 가사 단어 길이의 합(2~1_000_000)
 * @param {*} queries 찾고자 하는 키워드가 담긴 배열
 * @returns 각 키워드 별로 매치된 단어가 몇 개인지 순서대로 배열에 담아 반환
 */
function solution(words, queries) {
    const reverseWords = words.map(reverseString).sort(ASC);
    const reverseQueries = queries.map(reverseString);

    const answer = [];
    words.sort(ASC);
    queries.forEach((query, index) => {
        const info =
            query[0] === '?'
                ? [reverseWords, reverseQueries[index]]
                : [words, query];

        answer.push(countMachtedWord(...info));
    });
    return answer;
}

function countMachtedWord(words, query) {
    const str = query.split('?')[0];
    return maximumRange() - minimumRange() + 1;

    function minimumRange() {
        const min = query.replace(/\?/g, 'a');

        let start = 0;
        let end = words.length - 1;
        let answer = words.length;
        while (start <= end) {
            const mid = Math.floor((start + end) / 2);

            if (
                words[mid].length === query.length &&
                words[mid].startsWith(str) &&
                words[mid].localeCompare(min) >= 0
            ) {
                answer = mid;
                end = mid - 1;
                continue;
            }
            start = mid + 1;
        }
        return answer;
    }

    function maximumRange() {
        const max = query.replace(/\?/g, 'z');

        let start = 0;
        let end = words.length - 1;
        let answer = words.length - 1;
        while (start <= end) {
            const mid = Math.floor((start + end) / 2);

            if (
                words[mid].length === query.length &&
                words[mid].startsWith(str) &&
                words[mid].localeCompare(max) <= 0
            ) {
                answer = mid;
                start = mid + 1;
                continue;
            }
            end = mid - 1;
        }
        return answer;
    }
}

function reverseString(string) {
    return [...string].reverse().join('');
}

const ASC = (a, b) => {
    if (a.length === b.length) return a.localeCompare(b);
    return a.length - b.length;
};

console.log(
    solution(
        ['frodo', 'front', 'frost', 'frozen', 'frame', 'kakao'],
        ['fro??', '????o', 'fr???', 'fro???', 'pro?'],
    ),
);

console.log(solution(['aa', 'ac', 'az', 'aaa', 'a'], ['z?']));
