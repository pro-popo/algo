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
 */

function solution(cacheSize, cities) {
    const cache = new Cache(cacheSize);
    let time = 0;
    cities
        .map(city => city.toUpperCase())
        .forEach(city => {
            if (!cache.has(city)) time += 5;
            else time++;

            cache.add(city);
        });

    return time;
}

class Cache {
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
