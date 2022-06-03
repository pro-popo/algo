/**
 * 가운데를 말해요 게임의 규칙은 다음과 같다.
 * - 백준이는 임의의 정수를 하나씩 말한다.
 * - 동생은 백준이가 지금까지 말한 수 중에서 중간값을 말한다.
 *   만약 외친 수의 개수가 짝수개라면 중간에 있는 두 수 중에서 작은 수를 말한다.
 *
 * @param {number[]} input - 백준이가 말한 수들, N: 1~100,000
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

            if (this.comparator.compare(parent, child) < 0) break;
            this.swap(parentIndex, childIndex);
            childIndex = parentIndex;
        }
    }

    sinkDown() {
        const parent = this.values[0];
        let parentIndex = 0;

        while (true) {
            let swapIndex = null;

            let [leftIndex, rightIndex] = [
                2 * parentIndex + 1,
                2 * parentIndex + 2,
            ];

            if (
                leftIndex < this.size &&
                this.comparator.compare(parent, this.values[leftIndex]) > 0
            ) {
                swapIndex = leftIndex;
            }

            if (rightIndex < this.size) {
                if (
                    (swapIndex === null &&
                        this.comparator.compare(
                            parent,
                            this.values[rightIndex],
                        )) > 0 ||
                    (swapIndex !== null &&
                        this.comparator.compare(
                            this.values[leftIndex],
                            this.values[rightIndex],
                        )) > 0
                ) {
                    swapIndex = rightIndex;
                }
            }

            if (swapIndex === null) break;
            this.swap(parentIndex, swapIndex);
            parentIndex = swapIndex;
        }
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
