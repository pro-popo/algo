/**
 * 후보키란,
 * 관계 데이터베이스에서 릴레이션의 튜플을 유일하게 식별할 수 있는 속성 또는 속성의 집합 중,
 * 다음 두 성질을 만족한다.
 * - 유일성: 릴레이션에 있는 모든 튜플에 대해 유일하게 식별
 * - 최소성: 유일성을 가진 키를 구성하는 속성 중 하나라도 제외하는 경우 유일성이 깨지는 것을 의미.
 *          즉, 릴레이션의 모든 튜플을 유일하게 식별하는 데 꼭 필요한 속성들로만 구성되어야 한다.
 *
 * 학생들의 인적사항이 주어졌을 때, 후보 키의 최대 개수를 구하자.
 *
 * @param {*} relation 릴레이션을 나타내는 문자열 배열
 *                     컬럼: 1~8, 로우: 1~20
 * @returns 후보키의 개수
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저 순서와 관계없이 column을 선택할 수 있는 모든 경우,
 *   즉 key가 될 수 있는 모든 경우를 구한다. (조합)
 *   그리고 key의 길이(선택한 column의 수)를 기준으로 오름차순으로 정렬한다.
 *
 *   key의 모든 경우를 순회하여, 해당 key가 후보키인지 확인한다.
 *   후보키인지 확인하는 방법은,
 *   1. 해당 key로 모든 튜플을 유일하게 식별할 수 있는지 검사한다. (유일성)
 *      각 튜플의 특정 column(key의 column)의 데이터만 이어 붙여(join) Set 객체에 저장한다.
 *      이때, 모든 튜플을 저장한 Set 객체의 길이가 전체 column의 길이와 동일하다면
 *      모든 튜플을 유일하게 식별할 수 있음을 의미한다.
 *
 *   2. 해당 key가 저장한 후보키들을 포함하고 있는지 검사한다. (최소성)
 *      즉, 특정 후보키의 column들을 해당 key가 전부 포함하고 있는지 검사한다.
 *      이때, 전부 포함하는 경우 최소성을 만족하지 못함을 의미한다.
 *      [EX] 후보키가 [0,1]일 때,
 *           key가 [0,1,2]라면, 최소성을 만족하지 않는다.
 *           key가 [1,2]라면, 최소성을 만족한다.
 *
 *   위의 조건을 만족하는 key의 개수를 센다.
 *
 * - 처음에는, 후보키에 대한 정보를 문자열로 저장하여 최소성을 검사했다.
 *   즉, 해당 문자열(후보키)를 key가 포함하고 있는지 판단했다. (includes)
 *   그러나, 후보키가 "1,3"이고 검사할 키가 "1,2,3"일 때 잘못된 결과를 반환했다.
 *
 *   이를 위해, key에 대한 정보를 문자열 대신 배열로 저장했다.
 *
 * - 원래는, 비트마스킹으로 key에 대한 정보를 관리하고자 했으나,
 *   A비트가 B비트를 포함하고 있는지에 대한 여부를 판단하는 방법을 모르겠어서 대신 배열로 선택했었다.
 *
 *   그러나 다른 풀이를 참고해보니,
 *   "(B비트 & A비트) === B비트"를 만족하면 A비트가 B비트를 포함하고 있음을 알 수 있었다. 👍
 *   [EX] 101 & 111 = 101
 *        101 & 011 = 001
 *   이를 활용하면 최소성을 만족하는지 쉽게 판단할 수 있다.
 *
 *   이뿐만 아니라, 비트마스킹으로 풀면 굳이 key의 모든 경우를 조합으로 구할 필요없이,
 *   1부터 (1 << (column의 길이))-1 까지 순회하면 된다.
 *   또한 key를 짧은 순으로 정렬할 필요도 없어진다.
 *   이에 대한 예제는 코드 맨 아래에서 확인할 수 있다. 🤗
 *
 *   현재 코드는 비트마스킹으로 다시 푼 코드이다!
 */

function solution(relation) {
    const COLUMN_LENGTH = relation[0].length;
    const keys = createKeys(COLUMN_LENGTH);

    return countCandidateKey(relation, keys);
}

function createKeys(COLUMN_LENGTH) {
    return [...Array((1 << COLUMN_LENGTH) - 1)].map((_, i) => i + 1);
}

function countCandidateKey(relation, keys) {
    const candidateKeys = [];
    keys.forEach(key => {
        if (isUniqueness(key) && isMinimality(key)) candidateKeys.push(key);
    });

    return candidateKeys.length;

    function isUniqueness(key) {
        const ROW_LENGTH = relation.length;
        const rows = relation.map(row =>
            row.filter((_, column) => BitMask.has(key, column)).join(' '),
        );

        return new Set(rows).size === ROW_LENGTH;
    }

    function isMinimality(key) {
        return candidateKeys.every(
            candidateKey => !BitMask.isContain(key, candidateKey),
        );
    }
}

class BitMask {
    static has(bit, value) {
        return (bit & (1 << value)) !== 0;
    }

    static isContain(bit, targetBit) {
        return (targetBit & bit) === targetBit;
    }
}

/****** TEST CASE *******/

console.log(
    solution([
        ['100', 'ryan', 'music', '2'],
        ['200', 'apeach', 'math', '2'],
        ['300', 'tube', 'computer', '3'],
        ['400', 'con', 'computer', '4'],
        ['500', 'muzi', 'music', '3'],
        ['600', 'apeach', 'music', '2'],
    ]),
);

console.log(
    solution([
        ['100', 'ryan', 'music', '2'],
        ['200', 'apeach', 'math', '2'],
        ['300', 'tube', 'computer', '3'],
        ['400', 'con', 'computer', '4'],
        ['500', 'muzi', 'music', '3'],
        ['600', 'apeach', 'music', '1'],
    ]),
);

console.log(
    solution([
        ['500', 'ryan', 'music'],
        ['200', 'apeach', 'math'],
        ['300', 'tube', 'computer'],
        ['400', 'tube', 'computer'],
        ['500', 'muzi', 'music'],
        ['200', 'apeach', 'music'],
    ]),
);

/****** BitMask CASE *******/
// column의 길이가 3인 경우
// key의 모든 경우 : [[0], [1], [2], [0,1], [0,2], [1,2], [1,2,3]]
// 비트마스킹 : [1, 2, 4, 3, 5, 6, 7] === 1 ~ (1<<3)-1 === 1 ~ 7

// 이때 key가 [0,2]인 경우에는 [0]과 [2]인 경우를 먼저 확인해야 한다.
// [0]은 bit로 1, [2]는 bit로 4, [0, 2]는 bit로 5이다.
// 즉, 1부터 7까지 순차적으로 확인해도 위의 조건을 만족한다.

console.log(0 | (1 << 0)); // 0       => 1
console.log(0 | (1 << 1)); // 1       => 2
console.log(1 | (1 << 1)); // 0, 1    => 3

console.log(0 | (1 << 2)); // 2       => 4
console.log(1 | (1 << 2)); // 0, 2    => 5
console.log(2 | (1 << 2)); // 1, 2    => 6

console.log(3 | (1 << 2)); // 0, 1, 2 => 7
