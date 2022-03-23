/**
 * 제이지는 하루 일정으로 워크숍을 계획하고 있다.
 * 모든 직원을 참석시킬 수 없어, 아래와 같은 기준으로 직원들을 선발한다.
 * 1. 모든 팀은 최소 1명 이상의 직원을 워크숍에 참석시켜야 한다.
 * 2. 회사의 매출 손실을 최소화하기 위해
 *    워크숍에 참석하는 직원들의 하루평균 매출액의 합이 최소가 되어야 한다.
 * 만약, 선발된 한 명의 직원이 두 팀에 속해있다면, 두 팀 모두 참석한 것으로 인정된다.
 *
 * [ 조직도 설명 ]
 * - 직원 정보: [직원번호, 하루평균 매출액]
 * - CEO를 포함한 모든 직원은 팀장 또는 팀원이라는 직위를 가지고 있다.
 *   화살표가 시작되는 쪽이 팀장, 화살표를 받는 쪽이 팀원이다.
 *   -> CEO는 항상 팀장이며, 팀원일 수가 없다.
 *   -> CEO를 제외한 나머지 모든 직원들은 1개의 화살표를 받는다.
 *   -> 한 직원은 최대 2개의 팀에 소속될 수 있다.
 *      -> 무조건 하나의 팀에서는 팀장, 다른 팀에서는 팀원이어야 한다.
 *
 * @param {*} sales 직원들의 하루평균 매출액 값을 담은 배열 (2~300_000)
 * @param {*} links 팀장-팀원의 관계를 나타내는 2차원 배열
 *                  (sales 배열크기 - 1) , [팀장번호, 팀원번호]
 *                  1번은 CEO로 고정된다.
 * @returns 참석하는 직원들의 하루평균 매출액의 최소 합
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저, 주어진 links를 순회하여 tree 구조를 생성한다.
 *   DFS로 tree를 순회하면서,
 *   P직원이 "참여하는 경우"와 "불참하는 경우"에 대한 최소 매출액을 구하고자 한다.
 *   memo[P][0]은 P직원이 불참하는 경우
 *   memo[P][1]은 P직원이 참여하는 경우를 의미한다.
 *
 *   먼저, P의 모든 자식(C)에 대한 sum(min(...memo[C]))를 구한다. (= sum_child)
 *   즉, 해당 자식이 참여하는 경우와 불참하는 경우 중 매출액이 적은 경우를 선택하여 더해준다.
 *
 *   memo[P][1]은 다음과 같이 계산한다. (P 참여)
 *   memo[P][1] = sales[P] + sum_child
 *
 *   memo[P][0]은 다음과 같이 두 가지 경우로 나뉜다. (P 불참)
 *   - 자식 중 한 명이라도 참여하는 경우
 *   - 모든 자식이 불참하는 경우
 *
 *   1. 자식 중 한 명이라도 참여하는 경우 는,
 *   P가 선택될 필요가 없기 때문에 조건을 만족한다.
 *   따라서, memo[P][0] = sum_child이다.
 *
 *   2. 모든 자식이 불참하는 경우는,
 *   P가 참여하지 않기 위해서는 반드시 자식 중 한 명이라도 참여 시켜야 한다.
 *   따라서, 자식들 중 memo[P][1] - memo[P][0]의 값이 가장 작은 자식을 강제로 참여시켜야 한다. (매출 손해가 적은 자식)
 *   "memo[P][1] - memo[P][0]"는 memo[P][0] 대신 memo[P][1]을 선택했을 때의 차이가 가장 적은 자식을 의미한다.
 *   즉, memo[P][0] = sum_child + min(memo[C][1] - memo[C][0])이다.
 *
 *   특정 자식의 참여여부를 판별하기 위해서는,
 *   "memo[C][0] > memo[C][1]" 조건을 사용할 수 있다.
 *   sum_child에서는 memo[C][0]와 memo[C][1] 중 작은 값을 선택하여 저장한다.
 *   따라서, memo[C][0] > memo[C][1]인 경우 memo[C][1]를 선택하기 때문에 C가 참여함을 의미한다.
 *
 *   마지막으로, min(...memo[1])를 반환하면, 최소화된 매출액의 합을 구할 수 있다.
 *
 * - 어렵다..
 *   어떤 식으로 최소 매출액을 저장해야 할지 감이 안 잡혀서 결국 풀이를 본 문제이다. 😂
 */

function solution(sales, links) {
    const N = sales.length + 1;

    const tree = createTree(N, links);
    const memo = Array.from(Array(N), () => Array(2).fill(0));
    DFS(1);

    return Math.min(...memo[1]);

    function DFS(parent) {
        tree[parent].forEach((child) => DFS(child));

        memo[parent] = [
            sumSaleWhenSelectChild(parent),
            sumSaleWhenSelectParent(parent),
        ];
    }

    function sumSaleWhenSelectParent(parent) {
        return sales[parent - 1] + sumSaleOfChilds(parent);
    }

    function sumSaleWhenSelectChild(parent) {
        const sumSale = sumSaleOfChilds(parent);

        if (isNotExistChild(parent) || isExistSelectedChild(parent))
            return sumSale;

        return sumSale + selectChildWithMinSale(parent);
    }

    function isNotExistChild(parent) {
        return tree[parent].length === 0;
    }

    function isExistSelectedChild(parent) {
        return tree[parent].filter((child) => memo[child][0] > memo[child][1])
            .length;
    }

    function sumSaleOfChilds(parent) {
        return tree[parent]
            .map((child) => Math.min(...memo[child]))
            .reduce((sumSale, sale) => sumSale + sale, 0);
    }

    function selectChildWithMinSale(parent) {
        return Math.min(
            ...tree[parent].map((child) => memo[child][1] - memo[child][0]),
        );
    }
}

function createTree(N, links) {
    return links.reduce(
        (tree, [parent, child]) => {
            tree[parent].push(child);
            return tree;
        },
        Array.from(Array(N), () => []),
    );
}

/****** TEST CASE *******/

console.log(
    solution(
        [14, 17, 15, 18, 19, 14, 13, 16, 28, 17],
        [
            [10, 8],
            [1, 9],
            [9, 7],
            [5, 4],
            [1, 5],
            [5, 10],
            [10, 6],
            [1, 3],
            [10, 2],
        ],
    ),
);

console.log(
    solution(
        [5, 6, 5, 3, 4],
        [
            [2, 3],
            [1, 4],
            [2, 5],
            [1, 2],
        ],
    ),
);

console.log(
    solution(
        [5, 6, 5, 1, 4],
        [
            [2, 3],
            [1, 4],
            [2, 5],
            [1, 2],
        ],
    ),
);
