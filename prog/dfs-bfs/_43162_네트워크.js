/**
 * 네트워크 : 컴퓨터 상호 간에 정보를 교환할 수 있도록 연결된 형태
 * 네트워크의 개수를 구하자.
 *
 * [EX] A-B, B-C인 경우,
 * A-C도 간접적으로 연결되어 모두 같은 네트워크 상에 존재
 *
 * @param {*} n :컴퓨터 개수
 * @param {*} computers :연결 정보가 담긴 2차원 배열
 * @returns : 네트워크의 개수
 *
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   target computer와 연결된 computer을 전부 큐에 저장한다.
 *   그리고, 큐를 순회하여 저당된 computer와 연결된 computer를 저장하며,
 *   더 이상 연결된 computer가 존재하지 않을 때까지 이를 반복한다.
 *
 * - target과 연결된 computer를 체크하는 것이 아닌,
 *   target이 연결한 computer를 체크하면 더 깔끔해질 것 같다.
 *
 * - 다른 사람의 풀이를 보면,
 *   굳이 큐를 사용하지 않아도 dfs로 접근한다.
 *   연결된 모든 computer를 저장한 다음 접근하는 것이 아닌,
 *   연결된 computer가 발견되면 해당 computer와 연결된 computer를 찾는다.
 *   이 방식이 좀 더 깔끔하다고 생각한다!
 *   (이 방식으로 코드 재작성! 속도는 비슷하지만, 코드는 더 깔끔하다.)
 *
 * - 함수를 수시로 바꾸다보니 불필요한 인자전달 하는 것을 발견했다. 주의하자!
 *
 */

function solution(n, computers) {
    const visited = Array(computers[0].length).fill(false);
    let connectCount = 0;

    computers.forEach((_, target) => {
        if (!visited[target]) connectCount++;
        checkConnectComputer(target, computers, visited);
    });
    return connectCount;
}

function checkConnectComputer(target, computers, visited) {
    computers[target].forEach((isConnected, other) => {
        if (visited[other] || !isConnected) return;

        visited[other] = true;
        checkConnectComputer(other, computers, visited);
    });
}

console.log(
    solution(3, [
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 1],
    ]),
);

console.log(
    solution(3, [
        [1, 1, 0],
        [1, 1, 1],
        [0, 1, 1],
    ]),
);
