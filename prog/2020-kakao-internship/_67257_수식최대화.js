/**
 * 모든 참가자들에게는 숫자들과 3가지의 연산문자만으로 이루어진 연산 수식이 전달된다.
 * 이때, 참가자의 미션은 전달받은 수식에 포함된 연산자의 우선순위를 자유롭게 재정의하여
 * 만들 수 있는 가장 큰 숫자를 제출하는 것이다.
 *
 * 단, 연산자의 우선순위를 새로 정의할 때, 같은 순위의 연산자는 없어야 한다.
 * [EX] (+,*) > -
 *
 * 만약, 계산된 결과가 음수라면 절대값으로 변환하여 제출한다.
 * 이때, 제출한 숫자가 가장 큰 참가자를 우승자로 선정하며, 제출한 숫자는 우승상금이 된다<div className=""></div>
 *
 * @param {*} expression 참가자에게 주어진 연산 수식이 담긴 문자열 (1~100)
 * @returns 우승 시 받을 수 있는 가장 큰 상금 금액
 *
 * ### 리뷰
 * - 풀이 방식은 다음과 같다.
 *   연산자의 우선순위를 정할 수 있는 모든 방법을 구한다. (순열)
 *   그 다음, 모든 우선순위 방법을 순회하여
 *   해당 연산자의 우선순위에 따라 연산 수식을 계산하여 연산 결과를 반환한다.
 *
 *   이때 계산 과정은,
 *   연산자의 우선순위에 따라 순서대로 연산자를 사용한다.
 *   해당 연산자만 사용하여 계산된 연산 결과를 반환한다. (Stack 활용)
 *   모든 연산자를 사용할 때까지 위의 과정을 반복한다.
 *
 * - 연산자 우선순위에 대한 방법은 최대 3!이고,
 *   연산 수식의 길이는 최대 100이기 때문에
 *   충분히 완전탐색으로 풀 수 있다!
 */

function solution(expression) {
    const numbers = filterNumbers(expression);
    const operators = filterOperators(expression);

    const priorities = createOperatorPriorities();
    return Math.max(...priorities.map(calculateExpression));

    function calculateExpression(priority) {
        let remainNumbers = [...numbers];
        let remainOperators = [...operators];

        priority.forEach(priorityOperator => {
            const resultNumbers = useOperator(priorityOperator);
            remainNumbers = [...resultNumbers];
            remainOperators = remainOperators.filter(
                operator => operator !== priorityOperator,
            );
        });

        return Math.abs(remainNumbers.pop());

        function useOperator(targetOperator) {
            const stack = [remainNumbers[0]];
            remainOperators.forEach((operator, index) => {
                let result = remainNumbers[index + 1];
                if (operator === targetOperator) {
                    result = calculator(stack.pop(), result, operator);
                }
                stack.push(result);
            });
            return stack;
        }
    }
}

function filterNumbers(expression) {
    return expression
        .replace(/[*,+,-]/g, ' ')
        .split(' ')
        .map(Number);
}

function filterOperators(expression) {
    return expression.replace(/[0-9]/g, '').split('');
}

function createOperatorPriorities() {
    const operators = ['+', '-', '*'];
    const priorities = [];
    const usedOperators = new Set();

    permutation([]);
    return priorities;

    function permutation(priority) {
        if (priority.length === 3) {
            priorities.push(priority);
            return;
        }

        operators.forEach(operator => {
            if (usedOperators.has(operator)) return;

            usedOperators.add(operator);
            permutation(priority.concat(operator));
            usedOperators.delete(operator);
        });
    }
}

function calculator(a, b, operator) {
    if (operator === '+') return a + b;
    if (operator === '-') return a - b;
    if (operator === '*') return a * b;
}

/****** TEST CASE *******/

console.log(solution('100-200*300-500+20'));
console.log(solution('50*6-3*2'));
