/**
 * DB 캐시를 적용할 때 캐시 크기에 따른 실행시간 측정 프로그램 작성하기.
 * 이때, 도시 이름은 대소문자를 구분하지 않는다.
 *
 * 캐시 교체 알고리즘은 LRU(Least Recently Used)를 사용한다.
 * cache hit인 경우의 실행시간은 1,
 * cache miss인 경우의 실행시간은 5이다.
 *
 * @param {*} cacheSize 캐시 크기 (0~30)
 * @param {*} cities 도시이름 배열 (~100_000)
 * @returns 입력된 도시이름 배열을 순서대로 처리할 때, 총 실행시간 출력
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저 프로그램을 생성하여, 도시이름을 하나씩 추가한다.
 *   이때, 프로그램은 LRU 캐시를 사용한다.
 *
 *   프로그램에 도시이름을 추가하는 과정은 다음과 같다.
 *   먼저 캐시에 추가하고자 하는 도시이름의 존재 여부에 따라 실행시간을 추가한다. (존재하지 않을 경우 5, 아니면 1)
 *   그 다음에 LRU 캐시에 해당 도시이름을 추가한다.
 *
 *   LRU 캐시는 Set 객체로 값을 관리한다.
 *   캐시에 값을 추가하는 과정은 다음과 같다.
 *   추가하고자 하는 값이 캐시에 존재하지 않으면서 캐시가 꽉찼을 경우,
 *   가장 오랫동안 참조되지 않은 값, 즉 Set 객체의 가장 첫 번째 값을 삭제한다. (LRU 알고리즘)
 *   그 다음, 캐시에 기존의 값을 제거하고 다시 추가한다.
 *
 * - Set 객체는 삽입순으로 값들을 정렬한다.
 *   이를 활용하여 캐시에 값을 추가할 때 무조건 기존의 값을 삭제한 뒤에 추가해주면, 참조된 순서대로 정렬할 수 있다.
 *   즉, Set 객체의 첫 번째 값은 가장 오랫동안 참조되지 않은 값이 된다.
 *   Set 객체에서 삽입,삭제에 대한 시간복잡도는 O(1)이기 때문에 빠르게 값을 업데이트 할 수 있다.
 */

function solution(cacheSize, cities) {
    const program = new Program(cacheSize);

    cities
        .map(city => city.toUpperCase())
        .forEach(city => program.insert(city));

    return program.runtime;
}

class Program {
    static MISS = 5;
    static HIT = 1;

    runtime = 0;
    constructor(cacheSize) {
        this.cache = new LRUCache(cacheSize);
    }

    insert(value) {
        if (!this.cache.has(value)) this.runtime += Program.MISS;
        else this.runtime += Program.HIT;

        this.cache.add(value);
    }
}

class LRUCache {
    memory = new Set();
    constructor(cacheSize) {
        this.cacheSize = cacheSize;
    }

    has(value) {
        return this.memory.has(value);
    }

    isFull() {
        return this.memory.size === this.cacheSize;
    }

    add(value) {
        if (!this.has(value) && this.isFull())
            this.memory.delete(this.memory.values().next().value);

        if (this.cacheSize === 0) return;

        this.memory.delete(value);
        this.memory.add(value);
    }
}

/****** TEST CASE *******/

console.log(
    solution(3, [
        'Jeju',
        'Pangyo',
        'Seoul',
        'NewYork',
        'LA',
        'Jeju',
        'Pangyo',
        'Seoul',
        'NewYork',
        'LA',
    ]),
);

console.log(
    solution(0, ['Jeju', 'Pangyo', 'Jeju', 'NewYork', 'Pangyo', 'Seoul', 'LA']),
);
