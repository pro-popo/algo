/**
 * 게시판 불량 이용자를 신고하고,
 * 처리 결과를 메일로 발송하는 시스템 개발
 *
 * - 각 유저는 한 번에 한 명의 유저 신고 가능
 *   신고 횟수 제한 X
 *   한 유저를 여러 번 신고할 수 있지만, 신고 횟수는 1회로 처리
 * - k번 이상 신고된 유저는 게시판 이용 정지
 *   신고한 유저들에게 메일 발송
 *
 * @param {*} id_list 이용자의 ID가 담긴 문자열 배열 (2~1000) / id(1~10, 소문자, 중복 X)
 * @param {*} report [유저ID, 신고한ID] 배열 (1~200_000)
 * @param {*} k 정지 기준이 되는 신고 횟수 (1~200)
 * @returns 각 유저별로 처리 결과 메일을 받은 횟수가 담긴 배열
 */

function solution(id_list, report, k) {
    const store = {};

    report.forEach((discription) => {
        const [reporter, reportedID] = discription.split(' ');
        store[reportedID] = store[reportedID] || new Set();
        store[reportedID].add(reporter);
    });

    const mails = Object.values(store)
        .filter((reporters) => reporters.size >= k)
        .flatMap((reporters) => Array.from(reporters))
        .reduce((mails, reporter) => {
            mails[reporter] = mails[reporter] + 1 || 1;
            return mails;
        }, {});

    return id_list.map((ID) => mails[ID] || 0);
}

console.log(
    solution(
        ['muzi', 'frodo', 'apeach', 'neo'],
        ['muzi frodo', 'apeach frodo', 'frodo neo', 'muzi neo', 'apeach muzi'],
        2,
    ),
);

console.log(
    solution(
        ['con', 'ryan'],
        ['ryan con', 'ryan con', 'ryan con', 'ryan con'],
        3,
    ),
);
