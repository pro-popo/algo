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
 * @returns 최소화된 매출액의 합
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
