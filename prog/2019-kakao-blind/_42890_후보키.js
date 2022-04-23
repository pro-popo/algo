/**
 * 후보키란,
 * 관계 데이터베이스에서 릴레이션의 튜플을 유일하게 식별할 수 있는 속성 또는 속성의 집합 중,
 * 다음 두 성질을 만족한다.
 * - 유일성: 릴레이션에 있는 모든 튜플에 대해 유일하게 식별
 * - 최소성: 유일성을 가진 키를 구성하는 속성 중 하나라도 제외하는 경우 유일성이 깨지는 것을 의미.
 *          즉, 릴레이션의 모든 큐플을 유일하게 식별하는 데 꼭 필요한 속성들로만 구성되어야 한다.
 *
 * 학생들의 인적사항이 주어졌을 때, 후보 키의 최대 개수를 구하자.
 *
 * @param {*} relation 릴레이션을 나타내는 문자열 배열
 *                     컬럼: 1~8, 로우: 1~20
 * @returns 후보키의 개수
 */

function solution(relation) {
    const COLUMN_LENGTH = relation[0].length;
    const keys = createKeys(COLUMN_LENGTH);

    return countCandidateKey(relation, keys);
}

function countCandidateKey(relation, keys) {
    const candidateKeys = [];
    keys.forEach(key => {
        if (isContainCandidateKey(key)) return;
        if (isCandidateKey(key)) candidateKeys.push(key);
    });

    return candidateKeys.length;

    function isContainCandidateKey(key) {
        return candidateKeys.some(
            candidateKey => (candidateKey & key) === candidateKey,
        );
    }

    function isCandidateKey(key) {
        const ROW_LENGTH = relation.length;
        const rows = relation.map(row =>
            row.filter((_, column) => (key & (1 << column)) !== 0).join(' '),
        );

        return new Set(rows).size === ROW_LENGTH;
    }
}

function createKeys(COLUMN_LENGTH) {
    return [...Array((1 << COLUMN_LENGTH) - 1)].map((_, i) => i + 1);
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
