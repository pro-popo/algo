/**
 * 아래와 같은 규칙으로 검색어에 대한 웹페이지의 매칭점수를 계산하고자 한다.
 * - 한 웹페이지에 대해 기본점수, 외부 링크 수, 링크점수, 매칭점수를 구할 수 있다.
 * - 기본점수: 해당 웹페이지의 텍스트 중, 검색어가 등장하는 횟수 (대소문자 무시)
 * - 외부 링크 수: 해당 웹페이지에서 다른 외부 페이지로 연결된 링크의 개수
 * - 링크점수: (해당 웹페이지로 링크가 걸린 다른 웹페이지의 기본점수 / 외부 링크 수)의 총합
 *             [EX] A로 링크가 걸린 페이지가 B, C일 때
 *                 (B의 기본점수 / B의 외부 링크 수) + (C의 기본점수 / C의 외부 링크 수)
 * - 매칭점수: 기본점수와 링크점수의 합
 *
 * 한 웹페이지의 url은 HTML의 태그 내에 태그의 값으로 주어진다.
 * <meta property="og:url" content="https://careers.kakao.com/index" />
 *
 * 한 웹페이지에서 모든 외부 링크의 형태는 다음과 같다.
 * - <a href="https://careers.kakao.com/index">
 * - a태그 내에 다른 attribute가 주어지는 경우는 없다.
 *
 * 검색어를 찾을 때,
 * - 대소문자 구분은 무시한다.
 * - 단어와 완전히 일치하는 경우에만 기본 점수에 반영한다.
 *   이때 알파벳을 제외한 다른 모든 문자로 구분한다.
 *   "abab abababa" => 0
 *   "aba!aba aba" => 3
 *
 * @param {*} word 검색어 (1~12)
 * @param {*} pages 웹페이지의 HTML 목록
 *                  원소: 1~20, 길이: 1~1_500
 * @returns 매칭점수가 가장 높은 웹페이지의 index
 *          만약 여러 개인 경우, 그중 번호가 가장 작은 것
 */

function solution(word, pages) {
    WebPage.pages = pages.map((HTML, index) => new WebPage(HTML, index));
    WebPage.searchWord = word;

    return WebPage.sortPages(WebPage.DESC_MathScore)[0].index;
}

class WebPage {
    static pages = [];
    static searchWord = '';

    constructor(HTML, index) {
        this.HTML = HTML;
        this.index = index;
    }

    get url() {
        const urlRegExp = /<meta property="og:url" content="(?<url>[^"]+)/;
        return this.HTML.match(urlRegExp).groups.url;
    }

    get defaultScore() {
        return this.HTML.split(/[^a-zA-Z]/).filter(word =>
            this.isSearchWord(word),
        ).length;
    }

    isSearchWord(word) {
        const wordRegExp = new RegExp(`^${WebPage.searchWord}$`, 'gi');
        return word.match(wordRegExp);
    }

    get externalLinks() {
        const externalLinkRegExp = /<a href="(?<url>[^"]+)/g;
        return [...this.HTML.matchAll(externalLinkRegExp)].map(
            regExp => regExp.groups.url,
        );
    }

    get linkScore() {
        return WebPage.pages.reduce((matchScore, page) => {
            if (!page.externalLinks.includes(this.url)) return matchScore;

            return matchScore + page.defaultScore / page.externalLinks.length;
        }, 0);
    }

    get matchScore() {
        return this.defaultScore + this.linkScore;
    }

    static sortPages(predicate) {
        return WebPage.pages.sort(predicate);
    }

    static DESC_MathScore(page, otherPage) {
        if (page.matchScore === otherPage.matchScore)
            return page.index - otherPage.index;
        return otherPage.matchScore - page.matchScore;
    }
}

/****** TEST CASE *******/

console.log(
    solution('blind', [
        '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://a.com"/>\n</head>  \n<body>\nBlind Lorem Blind ipsum dolor Blind test sit amet, consectetur adipiscing elit. \n<a href="https://b.com"> Link to b </a>\n</body>\n</html>',
        '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://b.com"/>\n</head>  \n<body>\nSuspendisse potenti. Vivamus venenatis tellus non turpis bibendum, \n<a href="https://a.com"> Link to a </a>\nblind sed congue urna varius. Suspendisse feugiat nisl ligula, quis malesuada felis hendrerit ut.\n<a href="https://c.com"> Link to c </a>\n</body>\n</html>',
        '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://c.com"/>\n</head>  \n<body>\nUt condimentum urna at felis sodales rutrum. Sed dapibus cursus diam, non interdum nulla tempor nec. Phasellus rutrum enim at orci consectetu blind\n<a href="https://a.com"> Link to a </a>\n</body>\n</html>',
    ]),
);

console.log(
    solution('Muzi', [
        '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://careers.kakao.com/interview/list"/>\n</head>  \n<body>\n<a href="https://programmers.co.kr/learn/courses/4673"></a>#!MuziMuzi!)jayg07con&&\n\n</body>\n</html>',
        '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://www.kakaocorp.com"/>\n</head>  \n<body>\ncon%\tmuzI92apeach&2<a href="https://hashcode.co.kr/tos"></a>\n\n\t^\n</body>\n</html>',
    ]),
);

console.log(
    solution('Muzi', [
        '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://careers.kakao.com/interview/list"/>\n</head>  \n<body>\n<a href="https://programmers.co.kr/learn/courses/4673"></a>MuziMuzi 0Muzi0Muzi0)jayg07con&&\n\n</body>\n</html>',
        '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://www.kakaocorp.com"/>\n</head>  \n<body>\ncon%\tmuzI92apeach&2<a href="https://hashcode.co.kr/tos"></a>\n\n\t^\n</body>\n</html>',
    ]),
);
