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
 */

function solution(words) {
    const direction = new Map();
    for (let i = 'a'.charCodeAt(); i <= 'z'.charCodeAt(); i++) {
        direction.set(String.fromCharCode(i), new Map().set('count', 0));
    }

    words.forEach(word => {
        let parent = direction.get(word[0]);

        for (let i = 1; i < word.length; i++) {
            const child = parent.get(word[i]) || new Map().set('count', 0);
            parent.set(word[i], child.set('count', child.get('count') + 1));

            parent = child;
        }

        parent = direction.get(word[0]);
        parent.set(
            'count',
            parent.get('count') + parent.get(word[1]).get('count'),
        );
    });

    return words.reduce((sum, word) => sum + countInput(word), 0);

    function countInput(word) {
        let parent = direction.get(word[0]);
        if (parent.get('count') === 1) return 1;

        let input = 1;
        for (let i = 1; i < word.length; i++) {
            input++;
            const child = parent.get(word[i]);
            if (child.get('count') === 1) break;

            parent = child;
        }
        return input;
    }
}

/****** TEST CASE *******/

console.log(solution(['go', 'gone', 'guild']));
console.log(solution(['abc', 'def', 'ghi', 'jklm']));
console.log(solution(['word', 'war', 'warrior', 'world']));
