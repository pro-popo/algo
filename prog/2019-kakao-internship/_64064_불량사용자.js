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
 * @param {*} userIds 응모자 아이디 목록
 *                    크기: 1~8, 길이: 1~8
 * @param {*} bannedIds 불량 사용자 아이디 목록
 * @returns 당첨에서 제외되어야 할 제재 아이디 목록의 경우의 수
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저, bannedIds의 "*"문자를 "."문자로 변환한다.
 *   이는 bannedId를 그대로 정규식에서 활용하기 위함이다. ("."문자는 정규식에서 하나의 문자를 의미한다.)
 *   > ["fr.d.", "abc1.."]
 *
 *   그 다음, 정규식을 활용하여 각각의 bannedId와 아이디를 매칭하여 제재 아이디를 찾는다.
 *   > [["frodo", "fradi"], ["abc123"]]
 *
 *   이때, 아이디 대신 아이디의 index를 저장한다.
 *   아이디를 index로 관리하면, 선택한 제재 아이디에 대해 비트마스킹으로 관리할 수 있다.
 *   > [[0,1], [3]]
 *
 *   그 다음, 각 bannedId에 해당되는 제재 아이디에 대해 순열로 선택할 수 있는 모든 경우를 구한다.
 *   각 bannedId에 해당되는 제재 아이디를 하나씩 선택한다.
 *   선택한 제재 아이디에 대해 비트마스킹으로 저장한다.
 *   이는, 같은 응모자 아이디가 중복해서 제재 아이디 목록에 들어가는 경우를 거르기 위해서다.
 *
 *   이렇게 선택한 제재 아이디의 목록은 Set 객체에 저장한다.
 *   이는, 나열된 순서와 관계없이 아이디 목록의 내용이 동일하면 같은 것으로 처리하기 위해서다.
 *
 * - 매개변수의 크기가 비교적 크지 않기 때문에,
 *   충분히 완전탐색으로 계산할 수 있다!
 *
 * - 다른 풀이 방식에서,
 *   제재 아이디를 찾을 때, 다음과 같이 정규식을 짤 수 있다.
 *   > `^${아이디}$`
 *
 * - 또 다른 풀이 방식 중,
 *   유저 아이디에 대해 bannedIds의 길이만큼 선택할 수 있는 모든 경우를 구한다. (순열)
 *   그 다음, 해당 경우의 모든 아이디가 순서대로 불량 사용자 아이디와 비교하여 제재 아이디에 해당하는지 확인한다.
 *   이때 모든 아이디가 제재 아이디에 해당하는 경우를 count한다.
 */

function solution(userIds, bannedIds) {
    bannedIds = bannedIds.map(convertToRegExp);

    const sanctions = bannedIds.map(findSanctionUsers);
    const answer = new Set();
    permutation(0, 0);

    return answer.size;

    function findSanctionUsers(bannedId) {
        const sanctionIds = userIds.filter(isSanctionUser);
        return sanctionIds.map(convertToUserIndex);

        function isSanctionUser(userId) {
            return (userId.match(bannedId) || [''])[0] === userId;
        }

        function convertToUserIndex(targetId) {
            return userIds.findIndex(userId => userId === targetId);
        }
    }

    function permutation(sanctionIndex, selected) {
        if (sanctions.length === sanctionIndex) {
            answer.add(selected);
            return;
        }

        sanctions[sanctionIndex].forEach(userIndex => {
            if (Bitmask.has(selected, userIndex)) return;
            permutation(sanctionIndex + 1, Bitmask.insert(selected, userIndex));
        });
    }
}

function convertToRegExp(bannedId) {
    return bannedId.replace(/\*/g, '.');
}

class Bitmask {
    static has(bit, target) {
        return (bit & (1 << target)) !== 0;
    }

    static insert(bit, target) {
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
