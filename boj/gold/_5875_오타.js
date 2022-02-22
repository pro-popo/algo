const input = (function () {
    const fs = require('fs');
    const stdin = (process.platform === 'linux'
        ? fs.readFileSync('/dev/stdin').toString()
        : `()(())))`
    ).split("\n");
    return stdin[0];
})();

const solution = () => {
    const N = input.length;
    let left = 0;
    let right = 0;
    const arr = [...input].map(i => i == '(' ? ++left : --right);
    const total = arr.reduce((acc, cur) => acc + cur);
    let result = 0;
    for (let i = 0; i < N; i++) {
        let sum = total;
        if (arr[i] > 0) {
            sum += right > -arr[i] ? (right - 1 + -arr[i]) : (-arr[i] * 2);
            sum -= left - arr[i];
            sum += -right - (arr[i] - 1);
        }
        else {
            sum += left < -arr[i] ? (left + 1 + -arr[i]) : (-arr[i] * 2);
            sum += -right + arr[i];
            sum += left + arr[i] + 1;
        }
        if (sum == 0)
            result++;
    }
    console.log(result);
}

solution();

