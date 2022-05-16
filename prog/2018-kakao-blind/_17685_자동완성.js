/**
 * 자동완성 기능을 넣기 위해, 한 번 입력된 문자열을 학습해서
 * 다음 입력 때 활용하고자 한다.
 * 예로, go를 한 번 입력하면, 다음 사용자는 g만 입력해도 go를 추천해준다.
 * 단, 합습에 사용된 단어들 중 앞부분이 같은 경우에는 다른 문자가 나올 때까지 입력한다.
 *
 * 주어진 입력을 학습한 후, 학습된 단어들을 순서대로 찾을 때 몇 개의 문자를 입력하면 되는지 계산하자.
 *
 * @param {*} words 중복 없는 단어 N개 (2~100_000), 단어의 길이 : 2~1_000_000
 * @returns 단어를 찾을 때 입력해야 할 총 문자수
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저, words를 사전 순으로 정렬한다.
 *
 *   그 다음 words를 순회하여,
 *   해당 단어와 해당 단어의 이전 단어/다음 단어를 각각 비교하여
 *   두 단어의 동일한 접두어(prefix)를 찾는다.
 *   그 중, 접두어의 길이가 긴 경우가 해당 단어를 찾을 때 입력해야 할 총 문자수이다.
 *
 * - 처음에는, 트라이(Trie) 알고리즘을 활용했다.
 *   트라이 알고리즘은, 문자열의 접두사에 대응하는 노드들이 서로 연결된 트리이다.
 *   (참고로, 트라이 알고리즘의 시간복잡도는 O(m)이다. m:문자열 길이)
 *
 *   먼저, 사전을 생성한다.
 *   이때, Map 객체는 접두사가 key인 단어들과, 해당 단어들이 몇 개인지에 대한 정보를 가지고 있다.
 *   {
 *     "다음 문자": Map 객체,
 *     "count": 해당 접두사를 가진 단어들의 수
 *   }
 *
 *   즉, "ab"와 "abc"를 사전에 등록하면 다음과 같다.
 *   사전에 추가할 때에는, 단어의 문자들을 순회하여 하나씩 등록한다.
 *   {
 *     "a": {
 *        "b": {
 *           "c": {
 *             "count": 1
 *           },
 *           "count": 2
 *        },
 *        "count": 2
 *     }
 *   }
 *
 *   위와 같이, words를 순회하여 각 단어들을 사전(Trie 객체)에 추가한다.
 *   모든 단어를 사전에 등록했다면,
 *   다시 words를 순회하여 각 단어를 찾기 위해 입력해야 할 단어의 수를 구한다.
 *   이때, 사전에서 단어의 접두사를 순차적으로 방문하여 "count"가 1인 경우를 찾으면 된다.
 *
 *   위와 같은 방식으로 접근했으나,
 *   테스트 케이스 중 9번과 10번이 런타임 에러가 발생했다.
 *   원인으로는 메모리 초과로 생각된다.
 *
 *   그러나, 많은 풀이에서 Trie 알고리즘을 활용하여 접근했다.
 *   무엇이 문제인지 좀 더 고민해봐야 할 것 같다. 😭
 *
 *   (+) 추가
 *   동일한 로직으로 Map 객체 대신, 일반 Object로 수정했더니 통과했다. 😅
 *   코드는 other_solution 함수에서 확인할 수 있다!
 */

function solution(words) {
    words.sort((word, otherWord) => word.localeCompare(otherWord));

    return words.reduce(
        (sum, word, index) =>
            sum +
            Math.max(
                findSamePrefix(word, words[index - 1]).length,
                findSamePrefix(word, words[index + 1]).length,
            ),
        0,
    );

    function findSamePrefix(word, otherWord) {
        if (!word || !otherWord) return '';

        const prefix = [...word].findIndex(
            (alphabet, index) => alphabet !== otherWord[index],
        );
        return prefix === -1 ? word : word.slice(0, prefix + 1);
    }
}

/*eslint no-unused-vars: "off" */
function other_solution(words) {
    const direction = new Trie();
    words.forEach(word => direction.insert(word));

    return words.reduce((sum, word) => sum + direction.countInput(word), 0);
}

class Trie {
    constructor() {
        this.childs = {};
        this.count = 0;
    }

    insert(word) {
        let parent = this;

        for (let i = 0; i < word.length; i++) {
            const child = parent.childs[word[i]] || new Trie();
            child.count++;
            parent.childs[word[i]] = child;
            parent = child;
        }
    }

    countInput(word) {
        let parent = this;

        for (let i = 0; i < word.length; i++) {
            const child = parent.childs[word[i]];
            if (child.count === 1) return i + 1;

            parent = child;
        }

        return word.length;
    }
}

/****** TEST CASE *******/

console.log(solution(['go', 'gone', 'guild']));
console.log(solution(['abc', 'def', 'ghi', 'jklm']));
console.log(solution(['word', 'war', 'warrior', 'world']));

// FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory
// const bigData = Array.from(Array(100_000), (_, i) =>
//     Array(1_000_000 - i).fill('a'),
// );
// console.log(solution(bigData));
