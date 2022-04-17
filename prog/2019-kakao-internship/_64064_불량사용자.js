/**
 * [불량 사용자]는 이벤트에서 비정상적으로 당첨을 시도한 응모자들이다.
 * 이러한 불량 사용자라는 이름으로 목록을 만들어 당첨 처리 시 제외하려고 한다.
 * 이때, 개인정보 보호를 위해 아이디의 일부 문자를 "*" 문자로 대체했다.
 * 문자 하나 당 하나의 "*"문자가 사용되며, 최소 하나 이상의 "*"문자가 사용될 수 있다.
 *
 * 이렇게 불량 사용자 목록에 매핑된 응모자 아이디를 [제재 아이디]라고 한다.
 * 응모자 아이디와 불량 사용자가 주어졌을 때,
 * 제재 아이디 목록은 몇 가지 경우의 수가 가능한지 구하고자 한다.
 *
 * @param {*} userId 응모자 아이디 목록
 * @param {*} bannedId 불량 사용자 아이디 목록
 * @returns 당첨에서 제외되어야 할 제재 아이디 목록의 경우의 수
 */
function solution(userIds, bannedIds) {
    bannedIds = bannedIds.map(bannedId => bannedId.replace(/\*/g, '.'));
    const sanctions = bannedIds.map(findSanctionUsers);

    const answer = new Set();
    permutation(0, 0);

    return answer.size;

    function findSanctionUsers(bannedId) {
        const sanctionIds = userIds.filter(isSanctionUser);
        return sanctionIds.map(sanctionId =>
            userIds.findIndex(userId => userId === sanctionId),
        );

        function isSanctionUser(userId) {
            return (userId.match(bannedId) || [''])[0] === userId;
        }
    }

    function permutation(sanctionIndex, selected) {
        if (sanctions.length === sanctionIndex) {
            answer.add(selected);
            return;
        }

        sanctions[sanctionIndex].forEach(userIndex => {
            if (Bitmask.has(selected, userIndex)) return;
            permutation(sanctionIndex + 1, Bitmask.add(selected, userIndex));
        });
    }
}

class Bitmask {
    static has(bit, target) {
        return (bit & (1 << target)) !== 0;
    }

    static add(bit, target) {
        return bit | (1 << target);
    }
}

/****** TEST CASE *******/

console.log(
    solution(
        ['frodo', 'fradi', 'crodo', 'abc123', 'frodoc'],
        ['fr*d*', 'abc1**'],
    ),
);

console.log(
    solution(
        ['frodo', 'fradi', 'crodo', 'abc123', 'frodoc'],
        ['*rodo', '*rodo', '******'],
    ),
);

console.log(
    solution(
        ['frodo', 'fradi', 'crodo', 'abc123', 'frodoc'],
        ['fr*d*', '*rodo', '******', '******'],
    ),
);
