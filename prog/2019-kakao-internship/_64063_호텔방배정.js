/**
 * 호텔에 추숙하려는 고객들에게 방을 배정하고자 한다.
 * 호텔에는 방이 총 K개가 있으며, 번호로 구분하고 있다.
 *
 * 처음에는 모든 방이 비어 있으며,
 * 다음과 같은 규칙에 따라 고객에게 방을 배정하려고 한다.
 * 1. 한 번에 한 명씩 신청한 순서대로 방을 배정한다.
 * 2. 고객은 원하는 방 번호를 제출한다.
 * 3. 고객이 원하는 방이 비어 있다면 즉시 배정한다.
 * 4. 이미 배정되어 있다면,
 *    원하는 방보다 크면서
 *    비어있는 방 중 가장 번호가 작은 방을 배정한다.
 *
 * @param {*} k (1 ~ 10^12)
 * @param {*} room_number 고객들이 원하는 방 번호가 순서대로 들어있는 배열 (200,000)
 * @returns 각 고객에게 배정되는 방 번호
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   Union-Find 알고리즘을 응용하여,
 *   고객이 원하는 방 혹은 원하는 방과 가장 가까운 방 중 사용할 수 있는 방을 찾을 수 있다.
 *
 *   먼저, 사용한 방에 대해 관리할 Map 객체를 준비한다. {사용한 방: 대체할 방}
 *
 *   만약 고객이 원하는 방이 비어있는 방이라면, 해당 방을 사용한다.
 *   반면 사용한 방이라면, 해당 방 대신 사용할 방을 Map 객체에서 찾는다.
 *   이때, 대체할 방 또한 사용한 방일 수 있다.
 *   이를 위해, 빈방을 찾을 때까지 Map 객체를 재귀로 탐색한다.
 *
 *   빈방을 찾았다면, 해당 방을 사용하고 Map 객체에 추가한다.
 *   {사용한 방: 사용한 방의 다음 방(혹은 그 다음 방을 대체하는 방)}
 *
 *   참고로, 빈방을 찾는 과정에서 사용한 방이 많아질수록 재귀로 탐색하는 과정이 길어진다.
 *   따라서, 빈방을 찾을 때 방문한 방의 대체할 방을 빈방으로 변경해 주면 탐색 과정을 줄일 수 있다.
 *
 * - 처음에는, 남아있는 방을 관리하고자 했으나,
 *   방의 최대 범위가 10^12으로 메모리가 부족하여 관리가 불가능하다고 판단했다.
 *
 * - 참고로, Union-Find의 시간 복잡도는,
 *   평균적으로 트리의 높이만큼 탐색하는 O(logN)이다.
 *   그러나 사향트리가 되면 최악의 경우 O(N)이 되어 버린다.
 *   이때, 경로를 압축하면(최적화) 시간복잡도는 O(α(N))이 된다.
 *   여기서 α(N)는 아커만 함수를 의미하며, 매우 느리게 증가하기 때문에 사실상 O(1)와 유사하다고 한다.
 */

function solution(k, room_number) {
    const hotel = new Hotel();
    return room_number.map(room => hotel.useRoom(room));
}

class Hotel {
    alternativeRooms = new Map();

    useRoom(room) {
        const targetRoom = this.findEmptyRoom(room);
        this.setAlternativeRoom(targetRoom, targetRoom + 1);
        return targetRoom;
    }

    findEmptyRoom(room) {
        if (this.isEmptyRoom(room)) return room;

        this.setAlternativeRoom(room, this.getAlternativeRoom(room));
        return this.getAlternativeRoom(room);
    }

    isEmptyRoom(room) {
        return !this.getAlternativeRoom(room);
    }

    setAlternativeRoom(room, alternativeRoom) {
        this.alternativeRooms.set(room, this.findEmptyRoom(alternativeRoom));
    }

    getAlternativeRoom(room) {
        return this.alternativeRooms.get(room);
    }
}

/****** TEST CASE *******/

console.log(solution(10, [1, 3, 4, 1, 3, 1]));
