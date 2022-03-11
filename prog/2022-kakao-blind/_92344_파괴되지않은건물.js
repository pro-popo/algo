/**
 * 적의 공격 / 아군의 회복 스킬 이후, 파괴되지 않은 건물을 찾자.
 *
 * N*M 크기의 맵에는 내구도를 가진 건물이 각 칸마다 하나씩 있다.
 * 건물은 적의 공격을 받으면 내구도가 감소하고,
 * 내구도가 0이하가 되면 파괴된다. (단, 이미 파괴된 건물도 계속 내구도가 하락/상승될 수 있다)
 * 아군은 회복 스킬을 사용하여 건물의 내구도를 높일 수 있다.
 *
 * @param {*} board 건물의 내구도를 나타내는 2차원 정수 배열 (1~1_000)
 * @param {*} skill 적의 공격 혹은 아군의 회복 스킬을 나타내는 2차원 정수 배열 (1~250_000)
 *                  [type, r1, c1, r2, c2, degree] => type: 1(공격) 2(회복)
 * @returns 적의 공격 혹은 아군의 회복 스킬이 모두 끝난 뒤, 파괴되지 않은 건물의 개수
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   먼저, 스킬에 대한 범위를 하나의 2차원 배열로 합친다.
 *   만약, 0번째 원소부터 2번째 원소까지 -n만큼 변화를 주어야 한다면,
 *   n 0 0 -n
 *   0 0 0 0
 *   0 0 0 0
 *   -n 0 0 n
 *   와 같이 적용시킨다.
 *
 *   그 다음, 누적합을 이용하여 각 원소마다 어느 정도의 변화를 주어야 하는지 계산한다.
 *   2차원 배열인 경우, 왼쪽에서 오른쪽으로 누적합을 구한 뒤, 위쪽에서 아래쪽으로 누적합을 구하면 된다.
 *   n n n 0
 *   n n n 0
 *   n n n 0
 *   0 0 0 0
 *
 *   위에서 계산한 배열을 가지고 건물의 내구도를 변화 시킨 후,
 *   파괴되지 않은 건물의 수를 센다.
 *
 * - 처음 접근했던 풀이 방식은,
 *   만약, 0번째 원소부터 2번째 원소까지 -n만큼 변화를 주어야 할 때
 *   n 0 0 -n
 *   n 0 0 -n
 *   n 0 0 -n
 *   0 0 0 0
 *   위와 같이 스킬에 대한 범위를 합쳤다.
 *
 *   이를 누적합을 적용하여
 *   n n n 0
 *   n n n 0
 *   n n n 0
 *   0 0 0 0
 *   와 같은 형태로 만들었다.
 *
 *   좋은 접근이라 생각해서 신나게 코드를 작성하다가,
 *   시간초과가 나는 걸 보고 좌절해버렸다.. 😭
 *
 *   하나씩 스킬을 적용하는 경우, O(N*M*K)의 복잡도를 가진다.
 *   이를 위와 같은 방식으로 O(N*K)의 복잡도로 줄일 수 있지만,
 *   최악의 경우 1_000 * 250_000 = 250_000_000 이다.
 *
 *   n 0 0 -n
 *   0 0 0 0
 *   0 0 0 0
 *   -n 0 0 n
 *   와 같은 형태로 만들면,
 *   행, 열에 대한 누적합을 진행할 때 O(N*M)이므로,
 *   최종적으로 O(K+N*M)으로 문제를 해결할 수 있다.
 *
 * - 사실 내가 접근한 풀이법이 누적합인지도 몰랐다..! 😅
 *   결국 답지를 참고했지만, 재밌는 문제였다.
 *   이런 식으로 누적합을 사용하는구나. 새롭게 배우게 됐다! 👍
 *
 */

function solution(board, skill) {
    const skills = combineSkillsRanges(skill);
    prefixSum(skills);

    usingSkills(board, skills);
    return countUndestroyedBuilding(board);
}

const [ROW, COLUWN] = [1000, 1000];
function combineSkillsRanges(skill) {
    const skills = Array.from(Array(ROW + 1), () => Array(COLUWN + 1).fill(0));

    skill.forEach(([type, r1, c1, r2, c2, degree]) => {
        type === 1 && (degree = -degree);
        skills[r1][c1] += degree;
        skills[r1][c2 + 1] += -degree;
        skills[r2 + 1][c1] += -degree;
        skills[r2 + 1][c2 + 1] += degree;
    });
    return skills;
}

function prefixSum(skills) {
    leftToRight(skills);
    topToBottom(skills);
}

function leftToRight(skills) {
    for (let i = 0; i <= ROW; i++) {
        for (let j = 0; j <= COLUWN; j++) {
            skills[i][j] += skills[i][j - 1] || 0;
        }
    }
}

function topToBottom(skills) {
    for (let j = 0; j <= COLUWN; j++) {
        for (let i = 0; i <= ROW; i++) {
            if (i - 1 >= 0) skills[i][j] += skills[i - 1][j];
        }
    }
}

function usingSkills(board, skills) {
    board.forEach((_, r) => {
        board[r].forEach((_, c) => {
            board[r][c] += skills[r][c];
        });
    });
}

function countUndestroyedBuilding(board) {
    return board.reduce(
        (totalBuilding, _, r) =>
            totalBuilding + board[r].filter((_, c) => board[r][c] > 0).length,
        0,
    );
}

console.log(
    solution(
        [
            [5, 5, 5, 5, 5],
            [5, 5, 5, 5, 5],
            [5, 5, 5, 5, 5],
            [5, 5, 5, 5, 5],
        ],
        [
            [1, 0, 0, 3, 4, 4],
            [1, 2, 0, 2, 3, 2],
            [2, 1, 0, 3, 1, 2],
            [1, 0, 1, 3, 3, 1],
        ],
    ),
);
