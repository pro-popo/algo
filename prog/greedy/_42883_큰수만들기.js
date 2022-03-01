/**
 * 어떤 숫자에서 k개의 수를 제거했을 때 얻을 수 있는 가장 큰 숫자를 구하자.
 *
 * @param {*} number 숫자 (1~1_000_000)
 * @param {*} k 제거할 수의 개수
 * @returns 만들 수 있는 가장 큰 수
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   숫자를 제거할 조건을 찾다가, "이전 숫자가 다음 숫자보다 작은 경우" 제거 대상임을 발견했다.
 *
 *   먼저, number을 순회하여 현재 숫자가 다음 숫자(nextNumber)보다 작은 경우를 찾는다.
 *   찾았다면, nextNumber 이전의 숫자들을 순회(가까운 순으로)하면서 nextNumber와 비교한다.
 *   만약, nextNumber보다 작은 경우 제거 대상이되며, 크거나 같은 경우에는 순회를 종료한다.
 *   마지막으로, 제거할 수의 개수(k)가 남아있다면, k만큼 뒤에서부터 숫자를 제거해준다.
 *
 * - 위 접근 방식에서 주의할 점은,
 *   반드시 nextNumber보다 크거나 같은 경우에는 순회를 종료해야 한다는 것이다.
 *   return 대신 continue를 넣었더니 테스트 10번만 시간 초과가 났다. 😂
 *   이때, 통과한 테스트 중 가장 오래 걸린 테스트 8번은 2649ms가 걸렸다.
 *   참고로, 통과한 코드에서 가장 오래 걸린 테스트 10번은 70ms이하였다.
 *
 * - 처음 코드는 시간 초과가 발생했다.
 *   풀이 방식은, 조건에 맞는 숫자를 하나씩 제거하는 것이었다.
 *   k가 0이 될 때까지 다음과 같은 과정을 반복한다. O(N)
 *   1. 이전 숫자가 다음 숫자보다 작은 경우 찾기 O(N)
 *   2. 없다면, 이전 숫자가 다음 숫자와 동일한 경우 찾기 O(N)
 *   3. 없다면, 맨 뒤의 숫자 선택하기
 *   4. 조건에 맞는 숫자 제거하기 O(N)
 *
 *   예시 중, "4177252841"가 잘 통과하길래 충분히 가능하다고 생각했었다.
 *   하지만 시간복잡도를 계산해보니, O(N*N), 최악의 경우 대략 1_000_000_000_000 였다. 😨
 *   통과한 테스트 9번은 6600ms나 나왔다.
 *   애써 침착한 척, 1-4번을 한 번의 순회로 줄여봤지만, 그래도 시간 초과가 발생했다. 🤤
 *
 *   결국 이 방법은 안될 것 같다고 판단하여, 새로운 접근 방식을 찾았다.
 *
 * - 다른 사람 방식 중,
 *   풀이 방식은 비슷하지만 스택을 활용하여 숫자를 제거하는 코드가 있었다.
 *   스택을 활용한 방식이 훨씬 깔끔하다고 판단하여 코드를 수정해 보았다! 👍
 *
 */
function solution(number, k) {
    let answer = [number[0]];
    let pointer = 1;
    while (pointer < number.length) {
        const [previous, current] = [answer.pop(), number[pointer]];
        if (isPossibleRemoveNumber(previous, current, k)) {
            k--;
            continue;
        }
        answer.push(previous, current);
        pointer++;
    }

    return usingRemainRemoveChances(answer, k).join('');
}

const isPossibleRemoveNumber = (previous, current, removeChances) =>
    isRemainRemoveChance(removeChances) && previous < current;

const isRemainRemoveChance = (removeChanes) => removeChanes > 0;

const usingRemainRemoveChances = (numbers, removeChances) =>
    numbers.slice(0, numbers.length - removeChances);

console.log(solution('1924', 2));
console.log(solution('1231234', 3));
console.log(solution('4177252841', 4));
console.log(solution('44444', 4));
console.log(solution('987654', 4));
