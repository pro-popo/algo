function solution(input){
    const [N, arr, M, findList] = [...input];
    arr.sort();
    findList.forEach(num =>
        {
            if(find(arr, num))
                console.log(1);
            else
                console.log(0); 
        }
    );
}

function find(arr, num){
    let s = 0;
    let e = arr.length - 1;
    while(s <= e){
        let mid = Math.floor((s+e)/2);
        if(arr[mid] == num)
            return true;
        if(arr[mid] < num)
            s = mid + 1;
        else
            e = mid - 1;
    }
    return false;
}
function input() {
    const fs = require('fs');
    const stdin = (process.platform === 'linux'
        ? fs.readFileSync('/dev/stdin').toString()
        : `5
4 -9 5 2 3
5
1 3 7 -9 5`
    ).split("\n");
    let cnt = 1;
    return stdin.map(
        input => {
            return cnt++%2==0
            ? input.split(' ').map(n => +n)
            : +input;
        }
    );
}

solution(input());