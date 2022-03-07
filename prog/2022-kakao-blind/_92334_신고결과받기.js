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
 * @param {*} report [신고자ID, 신고당한ID] 배열 (1~200_000)
 * @param {*} k 정지 기준이 되는 신고 횟수 (1~200)
 * @returns 각 유저별로 처리 결과 메일을 받은 횟수가 담긴 배열
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저 report를 순회하여 {신고당한ID: [신고자IDs]} 형태의 객체를 생성한다.
 *   이때, 중복 신고를 제거하고자 [신고자IDs]은 Set 객체를 사용한다.
 *   그리고 그 중에 정지당한 IDs를 뽑아낸다. (신고자들이 k보다 많거나 같은 경우)
 *
 *   그 다음, 정지당한 IDs를 신고한 IDs를 하나의 배열에 모아서,
 *   신고한 유저들에게 각각 몇 개의 메일을 보내야 하는지 계산한다.
 *
 * - 시나리오에 따라 진행하면 쉽게 답을 구할 수 있는 문제다!
 *
 * - 다른 풀이에서,
 *   먼저 report를 Set으로 중복 제거한 다음에 풀이를 진행하는 것을 보았다.
 *   이를 코드에 적용해 보니까, 불필요한 변환(Set -> Array)를 제거할 수 있어서 좋았다!
 *
 *   report를 두 번만 순회하여 풀 수도 있다.
 *   첫 번째 순회에서는, 신고 당한 사람을 기준으로 신고 당한 횟수를 count한다.
 *   두 번째 순회에서는, 신고한 사람 기준으로 메일을 몇 개 받아야하는지 count한다.
 *   이때, report가 신고 당한 횟수가 K보다 많거나 같은 경우에만 count하면 된다.
 */

function solution(id_list, report, k) {
    const reportedIDs = preceedToReport([...new Set(report)]);
    const suspendedIDs = findSuspensionIDs(reportedIDs, k);
    const mails = countSendMailToReporter(suspendedIDs);

    return mailsToReporters(id_list, mails);
}

function preceedToReport(reports) {
    return reports.reduce((reportedIDs, discription) => {
        const [reporter, reportedID] = discription.split(' ');

        reportedIDs[reportedID] = reportedIDs[reportedID] || [];
        reportedIDs[reportedID].push(reporter);

        return reportedIDs;
    }, {});
}

function findSuspensionIDs(reportedIDs, k) {
    return Object.entries(reportedIDs).filter(
        ([_, reporters]) => reporters.length >= k,
    );
}

function countSendMailToReporter(suspendedIDs) {
    const reporters = suspendedIDs.flatMap(([_, reporters]) => reporters);
    return reporters.reduce((mails, reporter) => {
        mails[reporter] = mails[reporter] + 1 || 1;
        return mails;
    }, {});
}

function mailsToReporters(id_list, mails) {
    return id_list.map((ID) => mails[ID] || 0);
}

/****** TEST CASE *******/
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
