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
 */

let answer = [];
function solution(tickets) {
    const START_AIRPORT = 'ICN';
    const visited = Array(tickets.length).fill(false);

    answer = [];
    goTravel(
        tickets,
        START_AIRPORT,
        visited,
        (route = [START_AIRPORT]),
        (usedTicketCount = 0),
    );

    return answer;
}

function goTravel(tickets, currentAirport, visited, route, usedTicketCount) {
    if (isUesdAllTickets(tickets.length, usedTicketCount)) {
        if (isChangeRoute(answer, route)) answer = [...route];
        return;
    }

    tickets.forEach(([start, end], index) => {
        if (isUsableTicket(visited[index], currentAirport, start)) return;

        visited[index] = true;
        goTravel(tickets, end, visited, route.concat(end), usedTicketCount + 1);
        visited[index] = false;
    });
}

function isUesdAllTickets(tickectCount, usedTicketCount) {
    return tickectCount === usedTicketCount;
}

function isUsableTicket(isVisited, currentAirport, startAirport) {
    return isVisited || currentAirport != startAirport;
}

function isChangeRoute(oldRoute, newRoute) {
    if (oldRoute.length === 0) return true;

    for (let i = 0, len = oldRoute.length; i < len; i++) {
        if (oldRoute[i] === newRoute[i]) continue;
        if (oldRoute[i] < newRoute[i]) return false;
        return true;
    }
    return false;
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
