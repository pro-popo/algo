/**
 * 유사한 기사를 묶는 기준을 정하기 위해, "자카드 유사도"라는 방법이 있다.
 * 자카드 유사도는 집합 간의 유사도를 검사하는 여러 방법 중 하나이다.
 *
 * 두 집합 A, B 사이의 자카드 유사도 J(A, B)는
 * 두 집합의 교집합 크기를 두 집합의 합집합 크기로 나눈 값으로 정의된다.
 *
 * 예로, A={1,2,3}, B={2,3,4}일 때
 * 교집합은 {2,3}, 합집합은 {1,2,3,4}이다.
 * 이때 자카드 유사도는 2/4 = 0.5가 된다.
 *
 * 만약 집합 A, B가 모두 공집합일 경우, 1로 정의한다.
 *
 * 자카드 유사도는 원소의 중복을 허용하는 다중집합에 대해서 확장할 수 있다.
 * 만약 A가 1을 3개, B가 1을 5개 가진 경우,
 * 교집합은 3개, 합집합은 5개를 가지게 된다.
 *
 * 이를 이용하여, 문자열 사이의 유사도를 계산할 수 있다.
 * 문자열 "FRANCE"와 "FRENCH"가 주어졌을 때,
 * 두 글자씩 끊어서 다중집합을 만들 수 있다.
 * {FR, RA, AN, NC, CE}, {FR, RE, EN, NC, CH}
 * 이때 교집합은 {FR, NC}, 합집합은 {FR, RA, AN, NC, CE, RE, EN, CH}가 된다.
 *
 * 입력 문자열은 두 글자씩 끊어서 다중집합의 원소로 만든다.
 * 이때 영문자만 유효하고, 이 외의 글자가 포함된 쌍은 버린다.
 * 또한, 대소문자는 구분하지 않는다.
 *
 * @param {*} str1 문자열 (2~1_000)
 * @param {*} str2 문자열 (2~1_000)
 * @returns 두 문자열의 자카드 유사도
 *          65536를 곱한 뒤 소수점 아래를 버리고 정수만 출력
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저 두 문자열을 두 글자씩 끊어서 다중집합의 원소로 만든다.
 *   이때, 대소문자를 구분하지 않기 위해 전부 대문자로 바뀌며,
 *   알파벳 이외의 문자가 들어간 단어는 제거한다.
 *
 *   그 다음, 두 개의 다중집합을 가지고 교집합과 합집합을 구한다. (이때, 배열을 직접 변경해야하므로 복사본으로 사용한다.)
 *   교집합의 경우,
 *   A집합을 순회하여, 각 단어가 B집합에 포함된 단어인지 확인한다.
 *   만약 존재하면, B집합에서 해당 단어를 제거한다.
 *   반대로 존재하지 않는다면, A집합에서 해당 단어를 제거한다.
 *   마지막으로, A집합에 남아있는 단어들이 교집합이 된다.
 *
 *   합집합의 경우,
 *   A집합을 순회하여, 각 단어가 B집합에 포함된 단어인지 확인한다.
 *   만약 존재한다면, B집합에서 해당 단어를 제거한다.
 *   마지막으로, A집합과 B집합에 남아있는 단어들이 합집합이 된다.
 *
 *   만약 두 집합 모두 공집합이면 1을 반환하고,
 *   아니면 교집합 / 합집합을 반환한다.
 *
 *   위처럼 자카드 유사도를 구했으면, 65536를 곱한 뒤 소수점 아래를 버리고 정수만 출력
 *
 * - 다른 풀이 방식으로는,
 *   두 집합을 하나의 Set 객체에 합쳐 중복을 제거한다.
 *   Set 객체를 순회하여, 각 집합에서 해당 단어와 일치하는 단어의 개수를 구한다.
 *   이때, 적은 개수를 교집합의 개수에 포함하고, 큰 개수를 합집합의 개수에 포함한다.
 *
 * - 테스트 케이스 중, 5번 13번이 틀린 이유는 공집합에 대한 처리를 잘못했기 때문이다.
 *   두 집합 모두 공집합일 경우, 즉 합집합이 없을 경우 자카드 유사도를 1로 처리해야 한다.
 *   처음에는 교집합/합집합의 값이 불가능한 경우만 1로 처리하면 된다는 생각에 (교집합/합집합 || 1)와 같이 처리했으나,
 *   교집합이 없으나, 합집합이 없는 경우는 0으로 처리해야 하므로 틀린 풀이 방식이다.
 */

function solution(str1, str2) {
    const [set, otherSet] = [str1, str2].map(createSet);

    return Math.floor(jaccardSimilarity(set, otherSet) * 65536);
}

function createSet(str) {
    return str
        .toUpperCase()
        .split('')
        .map((_, i, str) => str[i] + str[i + 1])
        .filter(word => /[A-Z]{2}/.test(word));
}

function jaccardSimilarity(set, otherSet) {
    if ([set, otherSet].every(isEmptySet)) return 1;

    const { intersection, union } = calculateSet(set, otherSet);
    return intersection.length / union.length;
}

function isEmptySet(set) {
    return set.length === 0;
}

function calculateSet(set, otherSet) {
    const hashSet = new Set([...set, ...otherSet]);
    const [intersection, union] = [[], []];

    [...hashSet].forEach(searchWord => {
        const words = set.filter(word => word === searchWord);
        const otherWords = otherSet.filter(word => word === searchWord);

        const [minSizeWords, maxSizeWords] =
            words.length < otherWords.length
                ? [words, otherWords]
                : [otherWords, words];

        intersection.push(...minSizeWords);
        union.push(...maxSizeWords);
    });

    return { intersection, union };
}

/****** TEST CASE *******/

console.log(solution('FRANCE', 'french'));
console.log(solution('handshake', 'shake hands'));
console.log(solution('aa1+aa2', 'AAAA12'));
console.log(solution('E=M*C^2', 'e=m*c^2'));
console.log(solution('', 'FRANCE'));
console.log(solution('', ''));
