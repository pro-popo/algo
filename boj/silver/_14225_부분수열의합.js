const [N, arr] = (function () {
    const fs = require('fs');
    const stdin = (process.platform === 'linux'
        ? fs.readFileSync('/dev/stdin').toString()
        : `3
5 1 2`
    ).split("\n");
    return [...stdin];
})();

function solution(){
    arr = [...arr].sort((a,b) => a-b);
    0
}

solution();