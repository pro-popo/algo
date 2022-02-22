const input = (function () {
    const fs = require('fs');
    return (process.platform === 'linux'
        ? fs.readFileSync('/dev/stdin').toString()
        : `3 6
antarctica
antahellotica
antacartica`).trim().split("\n");
})();

const solution = function (){
    let [N, K] = input.shift().split(" ");
    if((K -= 5) < 0) return 0;
    let max = 0;

    const words = input.map(word => [...word].reduce((acc,cur) => acc |= 1 << (cur.charCodeAt(0) - 97), 0));
    const solve = (used, cntOfUsed, idx) =>{
        if(cntOfUsed == K){
            let cnt = 0;
            words.forEach(word=>{
                if((word & used) == word) cnt++;
            });
            max = Math.max(max, cnt);
            return;
        }
        for (let i = idx; i < 26; i++) {
            if((used & 1 << i) != 0) continue;
            solve(used | 1 << i, cntOfUsed+1, i+1);
        }
    };
    solve([...'antic'].reduce((acc,cur) => acc |= 1 << (cur.charCodeAt(0) - 97), 0), 0, 0);

    return max;
};

console.log(solution());