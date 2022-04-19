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
 */

function solution(k, room_number) {
    const parents = new Map();

    return room_number.map(room => {
        const useRoom = findParent(room);
        setParent(useRoom, useRoom + 1);
        return useRoom;
    });

    function findParent(room) {
        if (!parents.get(room)) return room;
        parents.set(room, findParent(parents.get(room)));
        return parents.get(room);
    }

    function setParent(room, nextRoom) {
        let nextRoomParent = findParent(nextRoom);
        parents.set(room, nextRoomParent);
    }
}

console.log(solution(10, [1, 3, 4, 1, 3, 1]));
