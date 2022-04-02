/**
 * 음악의 노래 가사에 사용된 단어들 중,
 * 특정 키워드가 몇 개 포함되어 있는지 찾는 프로그램을 개발하고자 한다.
 * 와일드 문자인 "?"는 글자 하나를 의미한다.
 *
 * @param {*} words 가사에 사용된 모든 단어들이 담긴 배열 (1~100_000)
 *                  전체 가사 단어 길이의 합(2~1_000_000)
 * @param {*} queries 찾고자 하는 키워드가 담긴 배열
 * @returns 각 키워드 별로 매치된 단어가 몇 개인지 순서대로 배열에 담아 반환
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저 1️⃣words와 queries의 단어들을 뒤집어 별도의 변수에 저장한다. [reverseWords, reverseQueries]
 *   [EX] abc => cba, ???a => a???
 *   이는 query와 단어를 비교할 때 "?"가 맨 앞에 존재하는 경우,
 *   뒤에서부터 비교하는 과정을 편하게 하기 위함이다.
 *
 *   그 다음, 2️⃣단어의 길이별로 단어들을 분류한다.
 *   [EX] aaaa => [4]: "aaaa"
 *   이 과정을 생략할 경우 "시간 초과"가 발생한다.
 *   해당 query와 매치되는 단어를 찾기 위해,
 *   매번 query와 길이가 동일한 단어들을 찾아내야 한다.
 *   따라서, 테스트 케이스 효율성 1~3번에 대해 시간 초과가 발생한다.
 *
 *   분류가 끝났다면, 3️⃣단어들을 정렬한다.
 *   이때 정렬 기준은 "단어의 길이가 짧은 순"이며,
 *   만약 단어의 길이가 동일할 경우, 사전 순으로 정렬한다.
 *
 *   위의 준비 과정이 끝나면, queries를 순회하여,
 *   4️⃣해당 query와 매치된 단어를 찾기 위해 이분 탐색을 진행한다.
 *
 *   만약 query가 "a???"인 경우,
 *   "aaaa"와 "azzz"사이의 단어를 찾아야 한다.
 *
 *   이를 위해, 먼저 "?"를 "a"와 "z"로 채워 별도의 변수에 저장한다. (minQuery, maxQuery)
 *   그 다음, maxQuery("azzz")보다 크거나 같은 최초의 단어 index와
 *   minQuery("aaaa")보다 크거나 같은 최초의 단어 index를 각각 이분 탐색으로 구한 뒤 두 값을 빼준다.
 *   즉, 이분탐색(maxQuery) - 이분탐색(minQuery)를 계산하면,
 *   "aaaa"와 "azzz"사이의 단어가 몇 개인지 찾을 수 있다.
 *
 *   참고로, "???a"인 경우,
 *   별도로 문자열을 뒤집지 않는다면,
 *   "aaaa"와 "zzza" 사이의 값을 찾게 된다.
 *   이렇게 되면, "bbbb" 또한 위의 조건을 맞기 때문에 잘못된 계산이 될 수 있다.
 *
 * - 너무 어려웠다...
 *   계속 시간 초과가 발생해서 결국 답지를 참고했던 문제이다. 😪
 *
 * - 다른 풀이 방식으로는,
 *   Trie 알고리즘을 사용할 수 있다.
 *
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
