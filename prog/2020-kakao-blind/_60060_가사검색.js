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
    const reverseWords = words.map(reverseString);
    const reverseQueries = queries.map(reverseString);

    const [mapWords, mapReverseWords] = [words, reverseWords]
        .map(divideByWordLength)
        .map(sortWords);

    const answer = [];
    queries.forEach((query, index) => {
        const info =
            query[0] === '?'
                ? [mapReverseWords[query.length], reverseQueries[index]]
                : [mapWords[query.length], query];

        answer.push(countMachtedWord(...info));
    });

    return answer;
}

function reverseString(string) {
    return [...string].reverse().join('');
}

function divideByWordLength(words) {
    return words.reduce((map, word) => {
        map[word.length] = map[word.length] || [];
        map[word.length].push(word);
        return map;
    }, {});
}

function sortWords(mapWords) {
    for (const key in mapWords) {
        mapWords[key].sort(ASC);
    }
    return mapWords;
}

const ASC = (a, b) => {
    if (a.length === b.length) return a.localeCompare(b);
    return a.length - b.length;
};

function countMachtedWord(words = [], query) {
    const minQuery = query.replace(/\?/g, 'a');
    const maxQuery = query.replace(/\?/g, 'z');

    return search(maxQuery) - search(minQuery);

    function search(query) {
        let start = 0;
        let end = words.length;

        while (start < end) {
            let mid = Math.floor((start + end) / 2);

            if (query.localeCompare(words[mid]) >= 0) {
                start = mid + 1;
                continue;
            }
            end = mid;
        }

        return start;
    }
}

console.log(
    solution(
        ['frodo', 'front', 'frost', 'frozen', 'frame', 'kakao'],
        ['fro??', '????o', 'fr???', 'fro???', 'pro?'],
    ),
);

console.log(solution(['aa', 'ac', 'az', 'aaa', 'a'], ['a?']));
