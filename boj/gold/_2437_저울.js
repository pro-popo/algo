const input = (function () {
    const fs = require('fs');
    return (process.platform === 'linux'
        ? fs.readFileSync('/dev/stdin').toString()
        : `7
3 1 6 2 7 30`).trim().split("\n");
})();

const solution = () => {
    const arr = input[1].split(" ").map(Number).sort((a,b) => a-b);
    
    let target = 1
    for(let num of arr){
        if(target < num) break;
        target += num;
    }
    return target;
}

console.log(solution());