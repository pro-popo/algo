const input = (function () {
    const fs = require('fs');
    const stdin = (process.platform === 'linux'
        ? fs.readFileSync('/dev/stdin').toString()
        : `(0/(0))`
    ).split("\n");
    return [...stdin[0]];
})();

// 비트마스킹 부분조합
function solution() {
    let leftCnt = input.filter(el => el == "(").length;
    const set = new Set();
    const stack = [];
    for (let used = 0; used < (1 << leftCnt)-1; used++) {
        let idx = 0;
        let expression = '';
        input.forEach(el => {
            if (el == "(") {
                stack.push(idx);
                if ((used & 1 << idx++) == 0) return;
            }
            else if (el == ")" && (used & 1 << stack.pop()) == 0) return;
            expression += el;
        })
        set.add(`${expression}\n`);
    }
    let result = '';
    [...set].sort().forEach(ex => result += ex);
    console.log(result);
}

// 일반적인 부분조합
function solution2() {
    const stack = [];
    const pair = [];
    input.forEach((el, idx) => {
        if (el == '(') stack.push(idx);
        else if (el == ')') pair.push([stack.pop(), idx]);
    });

    subset(pair, new Array(pair.length).fill(false), 0);
    let ans = '';
    const expression = [];
    set.forEach(el => expression.push(el))
    expression.sort().shift();
    expression.forEach(ex => ans += ex + '\n');
    console.log(ans);
}
const set = new Set();
function subset(pair, selected, cur) {
    if (cur == pair.length) {
        let str = '';
        let check = new Array(input.length).fill(true);
        pair.forEach((p, idx) => {
            if (!selected[idx]) {
                check[p[0]] = false;
                check[p[1]] = false;
            }
        });
        input.forEach((el, idx) => {
            if (check[idx]) str += el;
        });
        set.add(str);
        return;
    }
    selected[cur] = true;
    subset(pair, selected, cur + 1);
    selected[cur] = false;
    subset(pair, selected, cur + 1);
}

solution();