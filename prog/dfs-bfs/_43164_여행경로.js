/**
 * 주어진 항공권을 모두 사용하여 여행경로 계획하기
 *
 * ### 조건
 * - 항상 INC 공항에서 출발
 * - 모든 공항은 알파벳 대문자 3글자
 * - 공항 수 3<= x <=10_000
 * - [a, b] : a공항에서 b공항으로 가는 항공권
 * - 주어진 항공권 모두 사용
 * - 가능한 경로가 2개 이상일 경우, 알파벳 순서가 앞서는 경로를 return
 * - 모든 도시를 방문할 수 없는 경우 X
 *
 * @param {*} tickets :항공권 정보가 담긴 2차원 배열
 * @returns :방문하는 공항 경로 배열
 *
 * ### 리뷰
 * - 풀이 과정은 다음과 같다.
 *   DFS로, tickets를 순회하면서 이동 가능한 항공권 추가 및 탐색 반복한다.
 *   모든 티켓을 사용했을 경우, 순회를 종료하고 최적의 경로인지 확인한다.
 *
 * - 오랜 시간을 투자한 이유.
 *   조건 중 "주어진 항공권 모두 사용"을 오해했다.
 *   사용한 티켓을 처리해야 하는데, 방문한 공항을 필터링했다...
 *
 * - 다른 사람의 풀이 중,
 *   경로를 문자열로 배열에 저장한 후, 정렬하는 방법도 있었다.
 *   => "문자열"이라는 아이디어를 보고,
 *      for문으로 순회하여 하나씩 원소를 비교하는 것이 아닌,
 *      join 함수를 사용하여 비교하도록 수정하였다.
 */

let answer = [];

function solution(tickets) {
    const START_AIRPORT = 'ICN';

    answer = [];
    goTravel(
        tickets,
        START_AIRPORT,
        (visited = Array(tickets.length).fill(false)),
        (route = [START_AIRPORT]),
    );

    return answer;
}

function goTravel(tickets, currentAirport, visited, route) {
    if (isUesdAllTickets(visited)) {
        if (isChangeRoute(answer, route)) answer = [...route];
        return;
    }

    tickets.forEach(([start, end], index) => {
        if (isUsableTicket(visited[index], currentAirport, start)) return;

        visited[index] = true;
        goTravel(tickets, end, visited, route.concat(end));
        visited[index] = false;
    });
}

function isUesdAllTickets(visited) {
    return visited.filter((ticket) => ticket).length === visited.length;
}

function isUsableTicket(isVisited, currentAirport, startAirport) {
    return isVisited || currentAirport != startAirport;
}

function isChangeRoute(oldRoute, newRoute) {
    if (oldRoute.length === 0) return true;

    return oldRoute.join('') > newRoute.join('');
}

console.log(
    solution([
        ['ICN', 'JFK'],
        ['HND', 'IAD'],
        ['JFK', 'HND'],
    ]),
);

console.log(
    solution([
        ['ICN', 'SFO'],
        ['ICN', 'ATL'],
        ['SFO', 'ATL'],
        ['ATL', 'ICN'],
        ['ATL', 'SFO'],
    ]),
);
