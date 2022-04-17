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
 * @param {*} user_id 응모자 아이디 목록
 * @param {*} banned_id 불량 사용자 아이디 목록
 * @returns 당첨에서 제외되어야 할 제재 아이디 목록의 경우의 수
 */
function solution(userId, bannedId) {
    const userIndexes = userId.reduce(
        (userIndexes, userId, index) => userIndexes.set(userId, index),
        new Map(),
    );

    const sanctions = bannedId
        .map(bannedId => bannedId.replace(/\*/g, '.'))
        .reduce((sanctions, bannedId) => {
            const sanctionIds = userId.filter(
                userId => (userId.match(bannedId) || [''])[0] === userId,
            );
            sanctions.push(sanctionIds.map(userId => userIndexes.get(userId)));
            return sanctions;
        }, []);

    const answer = new Set();
    permutation(0, 0);
    return answer.size;

    function permutation(sanctionIndex, selected) {
        if (sanctions.length === sanctionIndex) {
            answer.add(selected);
            return;
        }

        sanctions[sanctionIndex].forEach(userIndex => {
            if ((selected & (1 << userIndex)) !== 0) return;
            permutation(sanctionIndex + 1, selected | (1 << userIndex));
        });
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
