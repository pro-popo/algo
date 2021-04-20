function solution(input){
    const N = input.shift();
    let print = '';
    for (let i = 0; i < N; i++) {
        const str = input[i];
        const stack = [];
        let check = 'YES\n';
        for (let i = 0; i < str.length; i++) {
            if(str[i] == '(') stack.push('(');
            else if(!stack.pop()){
                check = 'NO\n';
                break;
            }
        }
        if(stack.length != 0) check = 'NO\n';
        print += check;
    }
    return print;
}
function input() {
    const fs = require('fs');
    const stdin = (process.platform === 'linux'
        ? fs.readFileSync('/dev/stdin').toString()
        : ``
    ).split("\n");
    return stdin;
}

console.log(solution(input()));