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
 */
function solution(str1, str2) {
    const [set, otherSet] = [str1, str2].map(str => createSet(str));

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
    const intersection = caculateIntersection(set, otherSet).length;
    const union = caculateUnion(set, otherSet).length;

    if (!intersection && !union) return 1;
    return intersection / union;
}

function caculateIntersection(set, otherSet) {
    [set, otherSet] = [[...set], [...otherSet]];
    set.forEach((word, index) => {
        const findIndex = otherSet.indexOf(word);
        if (findIndex === -1) set[index] = '';
        else otherSet[findIndex] = '';
    });

    return set.filter(word => word);
}

function caculateUnion(set, otherSet) {
    [set, otherSet] = [[...set], [...otherSet]];
    set.forEach(word => {
        const findIndex = otherSet.indexOf(word);
        if (findIndex !== -1) otherSet[findIndex] = '';
    });

    return [...set.filter(word => word), ...otherSet.filter(word => word)];
}

/****** TEST CASE *******/

console.log(solution('FRANCE', 'french'));
console.log(solution('handshake', 'shake hands'));
console.log(solution('aa1+aa2', 'AAAA12'));
console.log(solution('E=M*C^2', 'e=m*c^2'));
console.log(solution('', 'FRANCE'));
console.log(solution('', ''));
