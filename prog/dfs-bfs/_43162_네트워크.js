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
 */

function solution(n, computers) {
    let connectCount = 0;

    const visited = Array(computers[0].length).fill(false);
    computers.forEach((_, target) => {
        if (!visited[target]) connectCount++;
        checkConnectComputer(target, computers, visited, false);
    });
    return connectCount;
}

function checkConnectComputer(target, computers, visited) {
    const N = computers.length;
    const qu = [];
    for (let computer = 0; computer < N; computer++) {
        if (visited[computer]) continue;
        if (!computers[computer][target]) continue;

        visited[target] = true;
        qu.push(computer);
    }
    while (qu.length !== 0) {
        checkConnectComputer(qu.shift(), computers, visited);
    }
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
