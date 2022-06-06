/**
 * 가운데를 말해요 게임의 규칙은 다음과 같다.
 * - 백준이는 임의의 정수를 하나씩 말한다.
 * - 동생은 백준이가 지금까지 말한 수 중에서 중간값을 말한다.
 *   만약 외친 수의 개수가 짝수개라면 중간에 있는 두 수 중에서 작은 수를 말한다.
 *
 * @param {number[]} input - 백준이가 말한 수들, N: 1~100,000
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저 두 개의 우선순위큐를 준비한다.
 *   하나는 최대힙이고, 다른 하나는 최소힙이다.
 *   - 최대힙: 부모의 우선순위가 모든 자식의 우선순위보다 높음
 *   - 최소힙: 부모의 우선순위가 모든 자식의 우선순위보다 낮음
 *
 *   numbers를 순회하여, 숫자를 최대힙과 최소힙에 번갈아가면서 추가한다.
 *   이때, 최대힙의 top이 최소힙의 top보다 큰 경우 두 값을 서로 바꿔준다.
 *   이 과정에서 최대힙의 top이 해당 number까지의 숫자 중 중간에 있는 수가 된다.
 *
 * - JavaScript에서는 우선순위큐를 기본적으로 제공하지 않는다. 😅
 *   따라서 직접 우선순위큐를 구현해야한다.
 */

function solution(numbers) {
    const maxHeap = new PriorityQueue(new Comparator((a, b) => b - a));
    const minHeap = new PriorityQueue(new Comparator((a, b) => a - b));

    let answer = '';
    numbers.forEach(number => {
        if (maxHeap.size === minHeap.size) {
            maxHeap.push(number);
        } else {
            minHeap.push(number);
        }

        if (maxHeap.top > minHeap.top) {
            const [max, min] = [maxHeap.pop(), minHeap.pop()];
            maxHeap.push(min);
            minHeap.push(max);
        }

        answer += maxHeap.top + '\n';
    });

    return answer;
}

class PriorityQueue {
    values = [];
    constructor(comparator = new Comparator()) {
        this.comparator = comparator;
    }

    get top() {
        return this.values[0];
    }

    get size() {
        return this.values.length;
    }

    push(value) {
        this.values.push(value);
        this.bubbleUp();
    }

    pop() {
        const top = this.values[0];
        const end = this.values.pop();
        if (this.size > 0) {
            this.values[0] = end;
            this.sinkDown();
        }
        return top;
    }

    bubbleUp() {
        let childIndex = this.size - 1;
        const child = this.values[childIndex];
        while (childIndex > 0) {
            const parentIndex = Math.floor((childIndex - 1) / 2);
            const parent = this.values[parentIndex];

            if (this.isHigherPrioity(parent, child)) break;
            this.swap(parentIndex, childIndex);
            childIndex = parentIndex;
        }
    }

    sinkDown() {
        const parent = this.values[0];
        let parentIndex = 0;
        let swapIndex = null;

        do {
            swapIndex = null;

            let [leftIndex, rightIndex] = [
                2 * parentIndex + 1,
                2 * parentIndex + 2,
            ];

            let [left, right] = [
                this.values[leftIndex],
                this.values[rightIndex],
            ];

            swapIndex = this.isHigherPrioity(left, right)
                ? leftIndex
                : rightIndex;

            if (
                swapIndex >= this.size ||
                this.isHigherPrioity(parent, this.values[swapIndex])
            )
                break;

            this.swap(parentIndex, swapIndex);
            parentIndex = swapIndex;
        } while (swapIndex !== null);
    }

    isHigherPrioity(target, comparisonTarget) {
        return this.comparator.compare(target, comparisonTarget) < 0;
    }

    swap(index, otherIndex) {
        [this.values[index], this.values[otherIndex]] = [
            this.values[otherIndex],
            this.values[index],
        ];
    }
}

class Comparator {
    constructor(compare = () => {}) {
        this.compare = compare;
    }
}

const input = testCase => {
    const fs = require('fs');
    const data = (
        process.platform === 'linux'
            ? fs.readFileSync('/dev/stdin').toString()
            : testCase
    )
        .trim()
        .split('\n');

    const [, ...numbers] = data;
    return numbers.map(Number);
};

/****** TEST CASE *******/

const testCase = `7
1
5
2
10
-99
7
6
2`;
console.log(solution(input(testCase)));
