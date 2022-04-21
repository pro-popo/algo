/**
 * 오픈채팅방은 가상의 닉네임을 사용하여 채팅방에 들어갈 수 있다.
 * 채팅방을 개설한 사람을 위해, 관리자창을 만들기로 했다.
 * 관리자창에는 채팅방에 누군가 들어오거나 나갈 때 메시지가 출력된다.
 * > [닉네임] 메시지
 *
 * 채팅방에서 닉네임을 변경하는 방법은 다음과 같다.
 * - 채팅방을 나간 후, 새로운 닉네임으로 다시 들어간다.
 * - 채팅방에서 닉네임을 변경한다.
 *
 * 이때, 닉네임을 변경하면 기존에 채팅방에 출력되어 있던 메시지의 닉네임도 변경된다.
 *
 * 닉네임은 알파벳 대문자, 소문자를 구별한다.
 * 또한 중복 닉네임을 허용한다.
 *
 * @param {*} record 기록이 담긴 문자열 배열 (1 ~ 100_000)
 *                   [${type} ${유저 아이디} ${닉네임}]
 * @returns 모든 기록이 처리된 후, 최종적으로 보게 되는 메시지
 */

function solution(record) {
    const [ENTER, LEAVE] = ['Enter', 'Leave'];

    const users = new Map();
    const messages = record.map(record => {
        const [type, userId, nickname] = record.split(' ');
        if (nickname) users.set(userId, nickname);
        return [type, userId];
    });

    return messages
        .filter(([type]) => [ENTER, LEAVE].includes(type))
        .map(([type, userId]) => {
            const nickname = users.get(userId);
            if (type === ENTER) return `${nickname}님이 들어왔습니다.`;
            if (type === LEAVE) return `${nickname}님이 나갔습니다.`;
        });
}

/****** TEST CASE *******/

console.log(
    solution([
        'Enter uid1234 Muzi',
        'Enter uid4567 Prodo',
        'Leave uid1234',
        'Enter uid1234 Prodo',
        'Change uid4567 Ryan',
    ]),
);
