/**
 * 무지는 단순한 문자 코드 순이 아닌,
 * 파일명에 포함된 숫자를 반영한 정렬 기능을 저장소 관리 프로그램에 구현하기로 했다.
 *
 * 소스 파일 저장소에 저장된 파일명은 100 글자 이내로,
 * 영문 대소문자, 숫자, 공백, 마침표, 빼기 부호만으로 이루어져 있다.
 * 파일명은 영문자로 시작하며, 숫자를 하나 이상 포함하고 있다.
 *
 * 파일명은 크게 HEAD, NUMBER, TAIL의 세 부분으로 구성된다.
 * - HEAD는 숫자가 아닌 문자로, 최소한 한 글자 이상이다.
 * - NUMBER는 한 글자 ~ 다섯 글자 사이의 연속된 숫자로, 앞쪽에 0이 올 수 있다.
 * - TAIL은 그 나머지 부분으로, 아무 글자도 없을 수 있다.
 *
 * 정렬 기준은 다음과 같다.
 * - 우선 HEAD 부분을 기준으로 사전 순으로 정렬한다.
 *   이때, 대소문자는 구분하지 않는다.
 * - HEAD가 같을 경우, NUMBER의 숫자 순으로 정렬한다.
 *   이때, 012와 12는 동일하다.
 * - 위의 두 부분이 동일할 경우, 입력 순으로 유지한다.
 *
 * @param {*} files 문자열 배열 (~1_000)
 * @returns 정렬된 배열
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저, 각 파일에 대한 이름을 HEAD, NUMBER, TAIL 구성으로 분류한다.
 *   구성을 구하는 방법은,
 *   정규식을 활용하여, (숫자가 아닌 문자들)(숫자인 문자들)(그 외 문자들)와 같이 구분할 수 있다.
 *
 *   그 다음, 파일들에 대한 정렬을 시작한다.
 *   HEAD와 NUMBER이 동일할 경우, 그대로 순서를 유지한다.
 *   HEAD만 동일할 경우, NUMBER를 기준으로 오름차순 정렬한다.
 *   HEAD가 다를 경우, HEAD를 기준으로 사전순 정렬한다.
 *
 *   정렬된 파일들의 이름을 순서대로 반환한다.
 *
 * - 다른 풀이 방식과 유사하다!
 *
 * - "안정 정렬(Stable Sort)"은 정렬 기준에 따라 차이가 없다면, 원래 입력에서 주어진 순서를 유지한다.
 *   빠른 정렬 알고리즘으로 유명한 퀵 정렬은 안정 정렬이 아니다.
 *   반면, O(NlogN) 복잡도의 정렬 알고리즘 중에 병합 정렬,
 *   O(N^2) 복잡도의 정렬 알고리즘 중에 버블 정렬과 삽입 정렬은 모두 안정 정렬이다.
 *
 *   C++과 Python에는 안정 정렬이 있지만,
 *   Java, JavaScript, Swift에는 안정 정렬이 없다.
 */

function solution(files) {
    return files
        .map(name => new File(name))
        .sort(File.compare)
        .map(file => file.name);
}

class File {
    constructor(name) {
        this.name = name;
        this.configuration = this.getConfiguration();
    }

    getConfiguration() {
        const filePattern = /(?<HEAD>[^0-9]+)(?<NUMBER>[0-9]+)(?<TAIL>.*)/;
        return this.name.match(filePattern).groups;
    }

    get HEAD() {
        return this.configuration.HEAD.toUpperCase();
    }

    get NUMBER() {
        return +this.configuration.NUMBER;
    }

    static compare(file, otherfile) {
        const HEAD_COMPARE = file.HEAD.localeCompare(otherfile.HEAD);
        const NUMBER_COMPARE = file.NUMBER - otherfile.NUMBER;

        if (!HEAD_COMPARE && !NUMBER_COMPARE) return 0;
        if (!HEAD_COMPARE) return NUMBER_COMPARE;
        return HEAD_COMPARE;
    }
}

/****** TEST CASE *******/

console.log(
    solution([
        'img12.png',
        'img10.png',
        'img02.png',
        'img1.png',
        'IMG01.GIF',
        'img2.JPG',
    ]),
);

console.log(solution(['img12.png', 'img10.png', 'img2']));
