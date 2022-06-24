const input = (function () {
    const fs = require('fs');
    return (
        process.platform === 'linux'
            ? fs.readFileSync('/dev/stdin').toString()
            : `3 3
10 5 5
5 10 5
5 5 10`
    )
        .trim()
        .split('\n');
})();

class Enumy {
    constructor(power, agility, intelligence) {
        this.power = power;
        this.agility = agility;
        this.intelligence = intelligence;
    }
}

function solution() {
    const [N, K] = input.shift().split(' ');
    const enemies = [];
    const power = new Set();
    const agility = new Set();
    const intelligence = new Set();

    for (let i = 0; i < N; i++) {
        const enemy = new Enumy(...input[i].split(' ').map(Number));
        enemies.push(enemy);
        power.add(enemy.power);
        agility.add(enemy.agility);
        intelligence.add(enemy.intelligence);
    }

    let result = Number.MAX_SAFE_INTEGER;
    power.forEach(power => {
        agility.forEach(agility => {
            intelligence.forEach(intelligence => {
                let win = 0;
                for (let idx = 0; idx < N; idx++) {
                    const enemy = enemies[idx];

                    if (
                        enemy.power <= power &&
                        enemy.agility <= agility &&
                        enemy.intelligence <= intelligence
                    )
                        win++;
                    if (win == K) {
                        result = Math.min(
                            result,
                            power + agility + intelligence,
                        );
                    }
                }
            });
        });
    });
    console.log(result);
}

solution();
