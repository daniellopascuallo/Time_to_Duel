
class Card {
    constructor(name, cost) {
        this.name = name;
        this.cost = cost;
    }
}

class Unit extends Card {
    constructor(name, cost, power, res) {
        super(name, cost);
        this.power = power;
        this.res = res;
    }

    attack(target) {
        if (target instanceof Unit) {
            target.res -= this.power;
        }
        else {
            throw new Error("Target must be a unit!");
        }
    }

    showStats(){
        console.log(`
            ${this.name} Stats:
            ==========================
            power:    ${this.power}
            resilience: ${this.res}
        `)
    }
}

class Effect extends Card {
    constructor(name, cost, text, stat, magnitude) {
        super(name, cost);
        this.text = text;
        this.stat = stat;
        this.magnitude = magnitude;
    }

    play(target) {
        console.log(`Played ${this.name} on ${target.name}`);
        if (target instanceof Unit) {
            if (this.stat == "res") {
                target.res += this.magnitude;
            }
            else if (this.stat == "power") {
                target.power += this.magnitude;
            }
        }
        else {
            throw new Error("Target must be a unit!");
        }
    }
}

var rbNinja = new Unit("Red Belt Ninja", 3, 3, 4);
var bbNinja = new Unit("Black Belt Ninja", 4, 5, 4);

var ha = new Effect("Hard Algorithm", 2, "increase target's resilience by 3", "res", 3);
var upr = new Effect("Unhandled Promise Rejection", 1, "reduce target's resilience by 2", "res", -2);
var pp = new Effect("Pair Programming", 3, "increase target's power by 2", "power", 2);

// Scenario:
// turn 1)
console.log("Turn 1: Player 1 plays Red Belt Ninja and the effect Hard Algorithm on Red Belt Ninja");
rbNinja.showStats();
ha.play(rbNinja);
rbNinja.showStats();
// turn 2)
console.log("Turn 2: Player 2 plays Black Belt Ninja and the effect Unhandled Promise Rejection on Red Belt Ninja");
bbNinja.showStats();
upr.play(rbNinja);
rbNinja.showStats();
// turn 3)
console.log("Turn 3: Player 1 plays Pair Programming on Red Belt Ninja and attacks Black Belt Ninja");
rbNinja.showStats();
pp.play(rbNinja);
rbNinja.showStats();
bbNinja.showStats();
rbNinja.attack(bbNinja);
bbNinja.showStats();


// Alternative play(target) method on Effect class:

// play(target) {
//     if (target instanceof Unit) {
//         target[this.stat] += this.magnitude;
//         console.log(`${this.name}: ${this.magnitude > 0 ? "increase" : "reduce"} ${target.name}'s ${this.stat} by ${this.magnitude}`);
//     }
//     else {
//         throw new Error("Target must be a unit!");
//     }
// }


